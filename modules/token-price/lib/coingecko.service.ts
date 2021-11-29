import axios from 'axios';
import { twentyFourHoursInSecs } from '../../util/time';
import { fromPairs, invert } from 'lodash';
import { env } from '../../../app/env';
import { coinGeckoTokenMappings } from './coingecko-token-mappings';
import { HistoricalPrice, HistoricalPriceResponse, Price, PriceResponse, TokenPrices } from '../token-price-types';
import moment from 'moment-timezone';

export class CoingeckoService {
    baseUrl: string;
    fiatParam: string;
    appNetwork: string;
    platformId: string;
    nativeAssetId: string;
    nativeAssetAddress: string;

    constructor() {
        this.baseUrl = 'https://api.coingecko.com/api/v3';
        this.fiatParam = 'usd';
        this.appNetwork = env.CHAIN_ID;
        this.platformId = env.COINGECKO_PLATFORM_ID;
        this.nativeAssetId = env.COINGECKO_NATIVE_ASSET_ID;
        this.nativeAssetAddress = env.NATIVE_ASSET_ADDRESS;
    }

    public async getNativeAssetPrice(): Promise<Price> {
        try {
            const response = await this.get<PriceResponse>(
                `/simple/price?ids=${this.nativeAssetId}&vs_currencies=${this.fiatParam}`,
            );
            return response[this.nativeAssetId];
        } catch (error) {
            console.error('Unable to fetch Ether price', error);
            throw error;
        }
    }

    /**
     *  Rate limit for the CoinGecko API is 10 calls each second per IP address.
     */
    public async getTokenPrices(addresses: string[], addressesPerRequest = 100): Promise<TokenPrices> {
        try {
            if (addresses.length / addressesPerRequest > 10) throw new Error('To many requests for rate limit.');

            addresses = addresses.map((address) => this.addressMapIn(address));
            const addressesWithCustomPlatform = addresses
                .filter((address) => coinGeckoTokenMappings.Prices.CustomPlatformId[address.toLowerCase()])
                .map((address) => address.toLowerCase());

            addresses = addresses.filter((address) => !addressesWithCustomPlatform.includes(address.toLowerCase()));

            const pageCount = Math.ceil(addresses.length / addressesPerRequest);
            const pages = Array.from(Array(pageCount).keys());
            const requests: Promise<PriceResponse>[] = [];

            pages.forEach((page) => {
                const addressString = addresses.slice(addressesPerRequest * page, addressesPerRequest * (page + 1));
                console.log("get token price a)", this.platformId, addressString, this.fiatParam)
                for (let i =0; i < addressString.length; i++) { 
                    addressString[i] = this.swapAddress(addressString[i])
                }
                console.log("get token price b)", this.platformId, addressString, this.fiatParam)

                const endpoint = `/simple/token_price/${this.platformId}?contract_addresses=${addressString}&vs_currencies=${this.fiatParam}`;
               //console.log(endpoint)
                const request = this.get<PriceResponse>(endpoint);
                requests.push(request);
            });

            addressesWithCustomPlatform.forEach((address) => {
                console.log("get token price v)", this.getPlatformIdForAddress(
                    address,
                ), address, this.fiatParam)

                const endpoint = `/simple/token_price/${this.getPlatformIdForAddress(
                    address,
                )}?contract_addresses=${address}&vs_currencies=${this.fiatParam}`;
                const request = this.get<PriceResponse>(endpoint);
                requests.push(request);
            });

            const paginatedResults = await Promise.all(requests);
            const results = this.parsePaginatedTokens(paginatedResults);

            // Inject native asset price if included in requested addresses
            if (addresses.includes(this.nativeAssetAddress)) {
                results[this.nativeAssetAddress] = await this.getNativeAssetPrice();
            }

            console.log(this.nativeAssetAddress, addresses)
            return results;
        } catch (error) {
            console.error('Unable to fetch token prices', addresses, error);
            throw error;
        }
    }

    public async getTokenHistoricalPrices(address: string, days: number): Promise<HistoricalPrice[]> {
        const now = Math.floor(Date.now() / 1000);
        const end = now;
        const start = end - days * twentyFourHoursInSecs;

        const mappedAddress = this.addressMapIn(address).toLowerCase();

        const endpoint = `/coins/${this.getPlatformIdForAddress(
            mappedAddress,
        )}/contract/${mappedAddress}/market_chart/range?vs_currency=${this.fiatParam}&from=${start}&to=${end}`;

        const result = await this.get<HistoricalPriceResponse>(endpoint);

        return result.prices.map((item) => ({
            //anchor to the start of the hour
            timestamp:
                moment
                    .unix(item[0] / 1000)
                    .startOf('hour')
                    .unix() * 1000,
            price: item[1],
        }));
    }

    private parsePaginatedTokens(paginatedResults: TokenPrices[]): TokenPrices {
        const results = paginatedResults.reduce((result, page) => ({ ...result, ...page }), {});
        const entries = Object.entries(results)
            .filter((result) => Object.keys(result[1]).length > 0)

            .map((result) => [this.addressMapOut(result[0]), result[1]]);

        return fromPairs(entries);
    }

    /**
     * Map address to mainnet address if app network is a testnet
     */
    public addressMapIn(address: string): string {
        const addressMap = coinGeckoTokenMappings.Prices.ChainMap[this.appNetwork];
        if (!addressMap) return address;
        return addressMap[address.toLowerCase()] || address;
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

    /**
     * Map mainnet address back to testnet address
     */
    public addressMapOut(address: string): string {
        const addressMap = coinGeckoTokenMappings.Prices.ChainMap[this.appNetwork];
        if (!addressMap) return address;
        return invert(addressMap)[address.toLowerCase()] || address;
    }

    /**
     * Support instances where a token address is not supported by the platform id, provide the option to use a different platform
     * @param address
     */
    public getPlatformIdForAddress(address: string): string {
        return coinGeckoTokenMappings.Prices.CustomPlatformId[address] || this.platformId;
    }

    private async get<T>(endpoint: string): Promise<T> {
        const { data } = await axios.get(this.baseUrl + endpoint);
        return data;
    }
}

export const coingeckoService = new CoingeckoService();
