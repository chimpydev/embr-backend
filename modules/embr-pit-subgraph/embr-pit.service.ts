import { GraphQLClient } from 'graphql-request';
import { env } from '../../app/env';
import { subgraphLoadAll, subgraphLoadAllAtBlock, subgraphPurgeCacheKeyAtBlock } from '../util/subgraph-util';
import {
    EmbrPitFragment,
    EmbrPitUserFragment,
    EmbrPitUsersQueryVariables,
    getSdk,
} from './generated/embr-pit-subgraph-types';

const ALL_USERS_CACHE_KEY = 'embr-pit-subgraph_all-users';

export class EmbrPitSubgraphService {
    private readonly client: GraphQLClient;

    constructor() {
        this.client = new GraphQLClient(env.EMBR_PIT_SUBGRAPH);
    }

    public async getPortfolioData(
        userAddress: string,
        previousBlockNumber: number,
    ): Promise<{
        embrPit: EmbrPitFragment;
        previousEmbrPit: EmbrPitFragment;
        embrPitUser: EmbrPitUserFragment | null;
        previousEmbrPitUser: EmbrPitUserFragment | null;
    }> {
        const { embrPitUser, embrPit, previousEmbrPitUser, previousEmbrPit } = await this.sdk.EmbrPitPortfolioData(
            {
                pitId: env.CEMBR_ADDRESS,
                userAddress,
                previousBlockNumber,
            },
        );

        return {
            embrPit: embrPit || this.emptyEmbrPit,
            embrPitUser: embrPitUser || null,
            previousEmbrPit: previousEmbrPit || this.emptyEmbrPit,
            previousEmbrPitUser: previousEmbrPitUser || null,
        };
    }

    public async getEmbrPit(block?: number): Promise<EmbrPitFragment> {
        const { pit } = await this.sdk.GetEmbrPit({ id: env.CEMBR_ADDRESS, block: { number: block } });

        if (!pit) {
            return this.emptyEmbrPit;
        }

        return pit;
    }

    public async getAllUsers(args: EmbrPitUsersQueryVariables): Promise<EmbrPitUserFragment[]> {
        return subgraphLoadAll<EmbrPitUserFragment>(this.sdk.EmbrPitUsers, 'users', args);
    }

    public async getUserAtBlock(address: string, block: number): Promise<EmbrPitUserFragment | null> {
        const users = await this.getAllUsersAtBlock(block);

        return users.find((user) => user.id === address) || null;
    }

    public async getAllUsersAtBlock(block: number): Promise<EmbrPitUserFragment[]> {
        return subgraphLoadAllAtBlock<EmbrPitUserFragment>(
            this.sdk.EmbrPitUsers,
            'users',
            block,
            ALL_USERS_CACHE_KEY,
        );
    }

    public async clearCacheAtBlock(block: number) {
        await subgraphPurgeCacheKeyAtBlock(ALL_USERS_CACHE_KEY, block);
    }

    private get sdk() {
        return getSdk(this.client);
    }

    private get emptyEmbrPit(): EmbrPitFragment {
        return {
            id: env.CEMBR_ADDRESS,
            address: env.CEMBR_ADDRESS,
            block: '',
            decimals: 19,
            cEmbrBurned: '0',
            cEmbrMinted: '0',
            name: '',
            ratio: '1',
            sharedVestingTokenRevenue: '0',
            symbol: 'fBEETS',
            timestamp: '',
            totalSupply: '0',
            vestingToken: '0',
            vestingTokenStaked: '0',
        };
    }
}

export const embrPitService = new EmbrPitSubgraphService();
