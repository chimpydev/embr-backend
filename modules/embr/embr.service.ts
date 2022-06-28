import { balancerSubgraphService } from '../balancer-subgraph/balancer-subgraph.service';
import { env } from '../../app/env';
import { GqlEmbrConfig, GqlEmbrProtocolData } from '../../schema';
import { getCirculatingSupply } from './embr';
import { fiveMinutesInMs } from '../util/time';
import { Cache, CacheClass } from 'memory-cache';
import { blocksSubgraphService } from '../blocks-subgraph/blocks-subgraph.service';
import { sanityClient } from '../sanity/sanity';
import { cache } from '../cache/cache';
import axios from 'axios';

const PROTOCOL_DATA_CACHE_KEY = 'embrProtocolData';
const CONFIG_CACHE_KEY = 'embrConfig';

export class EmbrService {
    cache: CacheClass<string, any>;

    constructor() {
        this.cache = new Cache<string, any>();
    }

    public async getProtocolData(): Promise<GqlEmbrProtocolData> {
        const memCached = this.cache.get(PROTOCOL_DATA_CACHE_KEY) as GqlEmbrProtocolData | null;

        if (memCached) {
            return memCached;
        }

        const cached = await cache.getObjectValue<GqlEmbrProtocolData>(PROTOCOL_DATA_CACHE_KEY);

        if (cached) {
            this.cache.put(PROTOCOL_DATA_CACHE_KEY, cached, 15000);

            return cached;
        }

        return this.cacheProtocolData();
    }

    public async cacheProtocolData(): Promise<GqlEmbrProtocolData> {

        const { embrPrice, marketCap, circulatingSupply } = await this.getEmbrData();
        const { totalLiquidity, totalSwapFee, totalSwapVolume, poolCount } =
            await balancerSubgraphService.getProtocolData({});

        const block = await blocksSubgraphService.getBlockFrom24HoursAgo();
        const prev = await balancerSubgraphService.getProtocolData({ block: { number: parseInt(block.number) } });

        const protocolData: GqlEmbrProtocolData = {
            totalLiquidity,
            totalSwapFee,
            totalSwapVolume,
            embrPrice,
            marketCap,
            circulatingSupply,
            poolCount: `${poolCount}`,
            swapVolume24h: `${parseFloat(totalSwapVolume) - parseFloat(prev.totalSwapVolume)}`,
            swapFee24h: `${parseFloat(totalSwapFee) - parseFloat(prev.totalSwapFee)}`,
        };

        await cache.putObjectValue(PROTOCOL_DATA_CACHE_KEY, protocolData, 30);

        return protocolData;
    }

    public async getConfig(): Promise<GqlEmbrConfig> {
        const cached = this.cache.get(CONFIG_CACHE_KEY) as GqlEmbrConfig | null;

        if (cached) {
            return cached;
        }
        const { data } = await axios.get(env.POOL_CONFIG);
        const embrConfig: GqlEmbrConfig = {
            pausedPools: data?.result?.pausedPools ?? [],
            featuredPools: data?.result?.featuredPools ?? [],
            incentivizedPools: data?.result?.incentivizedPools ?? [],
            blacklistedPools: data?.result?.blacklistedPools ?? [],
            poolFilters: data?.result?.poolFilters ?? [],
        };
        

        this.cache.put(CONFIG_CACHE_KEY, embrConfig, fiveMinutesInMs);

        return embrConfig;
    }

    private async getEmbrData(): Promise<{
        embrPrice: string;
        marketCap: string;
        circulatingSupply: string;
    }> {
        //if (env.CHAIN_ID !== '250') {
        //    return { embrPrice: '0', marketCap: '0', circulatingSupply: '0' };
        //}

            const { pool: embrAusdPool } = await balancerSubgraphService.getPool({
                id: '0xe0d8da1b899c6161a8960db9ff3ea2f1f2f7862b00020000000000000000001e',
            });

            const embr = (embrAusdPool?.tokens ?? []).find((token) => token.address === env.EMBR_ADDRESS.toLowerCase());
            const ausd = (embrAusdPool?.tokens ?? []).find((token) => token.address !== env.EMBR_ADDRESS.toLowerCase());


            const { pool: embrWavaxPool } = await balancerSubgraphService.getPool({
                id: '0xb8d86c8b188196ff6b837a0e78f5534be751caa300020000000000000000001f',
            });

            if (!embr || !ausd || !embrWavaxPool) {
                throw new Error('did not find price for embr');
            }

            
            //xploited getEmbrData 0.8 0.5 296.342522769214859558 2015316.698115856827299486
           // const bptPrice = parseFloat(embrWavaxPool.totalLiquidity) / parseFloat(embrWavaxPool.totalShares);

            const embrPrice =
            ((parseFloat(embr.weight || '0') / parseFloat(ausd.weight || '1')) * parseFloat(ausd.balance)) /
            parseFloat(embr.balance);
             const circulatingSupply = parseFloat(await getCirculatingSupply());

             console.log("xploited getEmbrData", embr.weight, embr.balance, embrPrice, circulatingSupply)

            return {
                embrPrice: `${embrPrice}`,
                marketCap: `${embrPrice * circulatingSupply}`,
                circulatingSupply: `${circulatingSupply}`,
            };
    }
}

export const embrService = new EmbrService();