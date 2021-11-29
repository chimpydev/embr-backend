import { balancerService } from '../../balancer-subgraph/balancer.service';
import { OrderDirection, TokenPrice_OrderBy } from '../../balancer-subgraph/generated/balancer-subgraph-types';
import { HistoricalPrice, TokenHistoricalPrices, TokenPrices } from '../token-price-types';
import { fiveMinutesInSeconds, getDailyTimestampRanges, getHourlyTimestamps } from '../../util/time';
import _ from 'lodash';

export class BalancerPriceService {
    public async getTokenPrices(addresses: string[], coingeckoPrices: TokenPrices): Promise<TokenPrices> {
        const balancerTokenPrices: TokenPrices = {};

       
        const { tokenPrices } = await balancerService.getTokenPrices({
            first: 1000, //TODO: this could stop working at some point
            orderBy: TokenPrice_OrderBy.Timestamp,
            orderDirection: OrderDirection.Desc,
            where: { asset_in: addresses },
        });

        console.log('coin gecko prices', coingeckoPrices);
        for (const address of addresses) {
            console.log("checking price for address", address)
            const tokenPrice = tokenPrices.find((tokenPrice) => {
                return tokenPrice.asset === address 
            });

            //console.log("found token price a)", tokenPrice)
            if (tokenPrice) {
                if (coingeckoPrices[this.swapAddress(tokenPrice.pricingAsset)]) {
                    balancerTokenPrices[address] = {
                        usd: (coingeckoPrices[this.swapAddress(tokenPrice.pricingAsset)]?.usd || 0) * parseFloat(tokenPrice.price),
                    };
                } else {
                    balancerTokenPrices[address] = {
                        usd: parseFloat(tokenPrice.priceUSD),
                    };
                }
            }
        }

        return balancerTokenPrices;
    }

    public swapAddress(address: string): string { 
        switch(address) { 
            case "0xcbb327140e91039a3f4e8ecf144b0f12238d6fdd":
                return "0x78ea17559b3d2cf85a7f9c2c704eda119db5e6de"
            case "0xfb8fa9f5f0bd47591ba6f7c75fe519e3e8fde429":
                return "0xa7d7079b0fead91f3e65f86e8915cb59c1a4c664"
            case "0x4b20b17bdb9991a8549f5ceb8bd813419e537209":
                return "0xd586e7f844cea2f87f50152665bcbc2c279d8d70"
            case "0xd00ae08403b9bbb9124bb305c09058e32c39a48c":
                return "0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7"
            case "0xee67880a6aaba39c5eaf833b68ea5fd908dc008d":
                return "0x78ea17559b3d2cf85a7f9c2c704eda119db5e6de"
            default:
                return address
        }
    }

    public async getHistoricalTokenPrices({
        address,
        days,
        coingeckoHistoricalPrices,
    }: {
        address: string;
        days: number;
        coingeckoHistoricalPrices: TokenHistoricalPrices;
    }): Promise<HistoricalPrice[]> {
        const ranges = getDailyTimestampRanges(days);
        const historicalTokenPrices: HistoricalPrice[] = [];
        const minTimestamp = _.min(_.flatten(ranges));
        const maxTimestamp = _.max(_.flatten(ranges));

        const allTokenPrices = await balancerService.getAllTokenPrices({
            where: { asset: address, timestamp_gte: minTimestamp, timestamp_lte: maxTimestamp },
            orderBy: TokenPrice_OrderBy.Timestamp,
            orderDirection: OrderDirection.Asc,
        });

        for (const range of ranges) {
            const tokenPrices = allTokenPrices.filter(
                (item) => item.timestamp >= range[0] && item.timestamp < range[1],
            );

            if (tokenPrices.length === 0) {
                continue;
            }

            const hourlyTimestamps = getHourlyTimestamps(range[0], range[1]);

            for (const timestamp of hourlyTimestamps) {
                //find the price with the closest timestamp
                const closest = tokenPrices.reduce((a, b) => {
                    return Math.abs(b.timestamp - timestamp) < Math.abs(a.timestamp - timestamp) ? b : a;
                });

                //filter out any matches that are further than 5 minutes away.
                //This can happen for periods before the token was listed or times in the future
                if (Math.abs(timestamp - closest.timestamp) < fiveMinutesInSeconds) {
                    const pricingAsset = coingeckoHistoricalPrices[closest.pricingAsset]?.find(
                        (price) => price.timestamp === timestamp * 1000,
                    );

                    if (pricingAsset) {
                        historicalTokenPrices.push({
                            timestamp: timestamp * 1000,
                            price: parseFloat(closest.price) * pricingAsset.price,
                        });
                    }
                }
            }
        }

        return historicalTokenPrices;
    }
}

export const balancerPriceService = new BalancerPriceService();
