import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
    BigDecimal: string;
    BigInt: string;
    Bytes: string;
};

export type Bar = {
    __typename?: 'Bar';
    address: Scalars['Bytes'];
    block: Scalars['BigInt'];
    decimals: Scalars['Int'];
    cEmbrBurned: Scalars['BigDecimal'];
    cEmbrMinted: Scalars['BigDecimal'];
    id: Scalars['ID'];
    name: Scalars['String'];
    ratio: Scalars['BigDecimal'];
    sharedVestingTokenRevenue: Scalars['BigDecimal'];
    symbol: Scalars['String'];
    timestamp: Scalars['BigInt'];
    totalSupply: Scalars['BigDecimal'];
    users: Array<User>;
    vestingToken: Scalars['Bytes'];
    vestingTokenStaked: Scalars['BigDecimal'];
};

export type BarUsersArgs = {
    first?: Maybe<Scalars['Int']>;
    orderBy?: Maybe<User_OrderBy>;
    orderDirection?: Maybe<OrderDirection>;
    skip?: Maybe<Scalars['Int']>;
    where?: Maybe<User_Filter>;
};

export type Bar_Filter = {
    address?: Maybe<Scalars['Bytes']>;
    address_contains?: Maybe<Scalars['Bytes']>;
    address_in?: Maybe<Array<Scalars['Bytes']>>;
    address_not?: Maybe<Scalars['Bytes']>;
    address_not_contains?: Maybe<Scalars['Bytes']>;
    address_not_in?: Maybe<Array<Scalars['Bytes']>>;
    block?: Maybe<Scalars['BigInt']>;
    block_gt?: Maybe<Scalars['BigInt']>;
    block_gte?: Maybe<Scalars['BigInt']>;
    block_in?: Maybe<Array<Scalars['BigInt']>>;
    block_lt?: Maybe<Scalars['BigInt']>;
    block_lte?: Maybe<Scalars['BigInt']>;
    block_not?: Maybe<Scalars['BigInt']>;
    block_not_in?: Maybe<Array<Scalars['BigInt']>>;
    decimals?: Maybe<Scalars['Int']>;
    decimals_gt?: Maybe<Scalars['Int']>;
    decimals_gte?: Maybe<Scalars['Int']>;
    decimals_in?: Maybe<Array<Scalars['Int']>>;
    decimals_lt?: Maybe<Scalars['Int']>;
    decimals_lte?: Maybe<Scalars['Int']>;
    decimals_not?: Maybe<Scalars['Int']>;
    decimals_not_in?: Maybe<Array<Scalars['Int']>>;
    cEmbrBurned?: Maybe<Scalars['BigDecimal']>;
    cEmbrBurned_gt?: Maybe<Scalars['BigDecimal']>;
    cEmbrBurned_gte?: Maybe<Scalars['BigDecimal']>;
    cEmbrBurned_in?: Maybe<Array<Scalars['BigDecimal']>>;
    cEmbrBurned_lt?: Maybe<Scalars['BigDecimal']>;
    cEmbrBurned_lte?: Maybe<Scalars['BigDecimal']>;
    cEmbrBurned_not?: Maybe<Scalars['BigDecimal']>;
    cEmbrBurned_not_in?: Maybe<Array<Scalars['BigDecimal']>>;
    cEmbrMinted?: Maybe<Scalars['BigDecimal']>;
    cEmbrMinted_gt?: Maybe<Scalars['BigDecimal']>;
    cEmbrMinted_gte?: Maybe<Scalars['BigDecimal']>;
    cEmbrMinted_in?: Maybe<Array<Scalars['BigDecimal']>>;
    cEmbrMinted_lt?: Maybe<Scalars['BigDecimal']>;
    cEmbrMinted_lte?: Maybe<Scalars['BigDecimal']>;
    cEmbrMinted_not?: Maybe<Scalars['BigDecimal']>;
    cEmbrMinted_not_in?: Maybe<Array<Scalars['BigDecimal']>>;
    id?: Maybe<Scalars['ID']>;
    id_gt?: Maybe<Scalars['ID']>;
    id_gte?: Maybe<Scalars['ID']>;
    id_in?: Maybe<Array<Scalars['ID']>>;
    id_lt?: Maybe<Scalars['ID']>;
    id_lte?: Maybe<Scalars['ID']>;
    id_not?: Maybe<Scalars['ID']>;
    id_not_in?: Maybe<Array<Scalars['ID']>>;
    name?: Maybe<Scalars['String']>;
    name_contains?: Maybe<Scalars['String']>;
    name_ends_with?: Maybe<Scalars['String']>;
    name_gt?: Maybe<Scalars['String']>;
    name_gte?: Maybe<Scalars['String']>;
    name_in?: Maybe<Array<Scalars['String']>>;
    name_lt?: Maybe<Scalars['String']>;
    name_lte?: Maybe<Scalars['String']>;
    name_not?: Maybe<Scalars['String']>;
    name_not_contains?: Maybe<Scalars['String']>;
    name_not_ends_with?: Maybe<Scalars['String']>;
    name_not_in?: Maybe<Array<Scalars['String']>>;
    name_not_starts_with?: Maybe<Scalars['String']>;
    name_starts_with?: Maybe<Scalars['String']>;
    ratio?: Maybe<Scalars['BigDecimal']>;
    ratio_gt?: Maybe<Scalars['BigDecimal']>;
    ratio_gte?: Maybe<Scalars['BigDecimal']>;
    ratio_in?: Maybe<Array<Scalars['BigDecimal']>>;
    ratio_lt?: Maybe<Scalars['BigDecimal']>;
    ratio_lte?: Maybe<Scalars['BigDecimal']>;
    ratio_not?: Maybe<Scalars['BigDecimal']>;
    ratio_not_in?: Maybe<Array<Scalars['BigDecimal']>>;
    sharedVestingTokenRevenue?: Maybe<Scalars['BigDecimal']>;
    sharedVestingTokenRevenue_gt?: Maybe<Scalars['BigDecimal']>;
    sharedVestingTokenRevenue_gte?: Maybe<Scalars['BigDecimal']>;
    sharedVestingTokenRevenue_in?: Maybe<Array<Scalars['BigDecimal']>>;
    sharedVestingTokenRevenue_lt?: Maybe<Scalars['BigDecimal']>;
    sharedVestingTokenRevenue_lte?: Maybe<Scalars['BigDecimal']>;
    sharedVestingTokenRevenue_not?: Maybe<Scalars['BigDecimal']>;
    sharedVestingTokenRevenue_not_in?: Maybe<Array<Scalars['BigDecimal']>>;
    symbol?: Maybe<Scalars['String']>;
    symbol_contains?: Maybe<Scalars['String']>;
    symbol_ends_with?: Maybe<Scalars['String']>;
    symbol_gt?: Maybe<Scalars['String']>;
    symbol_gte?: Maybe<Scalars['String']>;
    symbol_in?: Maybe<Array<Scalars['String']>>;
    symbol_lt?: Maybe<Scalars['String']>;
    symbol_lte?: Maybe<Scalars['String']>;
    symbol_not?: Maybe<Scalars['String']>;
    symbol_not_contains?: Maybe<Scalars['String']>;
    symbol_not_ends_with?: Maybe<Scalars['String']>;
    symbol_not_in?: Maybe<Array<Scalars['String']>>;
    symbol_not_starts_with?: Maybe<Scalars['String']>;
    symbol_starts_with?: Maybe<Scalars['String']>;
    timestamp?: Maybe<Scalars['BigInt']>;
    timestamp_gt?: Maybe<Scalars['BigInt']>;
    timestamp_gte?: Maybe<Scalars['BigInt']>;
    timestamp_in?: Maybe<Array<Scalars['BigInt']>>;
    timestamp_lt?: Maybe<Scalars['BigInt']>;
    timestamp_lte?: Maybe<Scalars['BigInt']>;
    timestamp_not?: Maybe<Scalars['BigInt']>;
    timestamp_not_in?: Maybe<Array<Scalars['BigInt']>>;
    totalSupply?: Maybe<Scalars['BigDecimal']>;
    totalSupply_gt?: Maybe<Scalars['BigDecimal']>;
    totalSupply_gte?: Maybe<Scalars['BigDecimal']>;
    totalSupply_in?: Maybe<Array<Scalars['BigDecimal']>>;
    totalSupply_lt?: Maybe<Scalars['BigDecimal']>;
    totalSupply_lte?: Maybe<Scalars['BigDecimal']>;
    totalSupply_not?: Maybe<Scalars['BigDecimal']>;
    totalSupply_not_in?: Maybe<Array<Scalars['BigDecimal']>>;
    vestingToken?: Maybe<Scalars['Bytes']>;
    vestingTokenStaked?: Maybe<Scalars['BigDecimal']>;
    vestingTokenStaked_gt?: Maybe<Scalars['BigDecimal']>;
    vestingTokenStaked_gte?: Maybe<Scalars['BigDecimal']>;
    vestingTokenStaked_in?: Maybe<Array<Scalars['BigDecimal']>>;
    vestingTokenStaked_lt?: Maybe<Scalars['BigDecimal']>;
    vestingTokenStaked_lte?: Maybe<Scalars['BigDecimal']>;
    vestingTokenStaked_not?: Maybe<Scalars['BigDecimal']>;
    vestingTokenStaked_not_in?: Maybe<Array<Scalars['BigDecimal']>>;
    vestingToken_contains?: Maybe<Scalars['Bytes']>;
    vestingToken_in?: Maybe<Array<Scalars['Bytes']>>;
    vestingToken_not?: Maybe<Scalars['Bytes']>;
    vestingToken_not_contains?: Maybe<Scalars['Bytes']>;
    vestingToken_not_in?: Maybe<Array<Scalars['Bytes']>>;
};

export enum Bar_OrderBy {
    Address = 'address',
    Block = 'block',
    Decimals = 'decimals',
    CEmbrBurned = 'cEmbrBurned',
    CEmbrMinted = 'cEmbrMinted',
    Id = 'id',
    Name = 'name',
    Ratio = 'ratio',
    SharedVestingTokenRevenue = 'sharedVestingTokenRevenue',
    Symbol = 'symbol',
    Timestamp = 'timestamp',
    TotalSupply = 'totalSupply',
    Users = 'users',
    VestingToken = 'vestingToken',
    VestingTokenStaked = 'vestingTokenStaked',
}

export type Block_Height = {
    hash?: Maybe<Scalars['Bytes']>;
    number?: Maybe<Scalars['Int']>;
};

export enum OrderDirection {
    Asc = 'asc',
    Desc = 'desc',
}

export type Query = {
    __typename?: 'Query';
    /** Access to subgraph metadata */
    _meta?: Maybe<_Meta_>;
    pit?: Maybe<Bar>;
    pits: Array<Bar>;
    user?: Maybe<User>;
    users: Array<User>;
};

export type Query_MetaArgs = {
    block?: Maybe<Block_Height>;
};

export type QueryBarArgs = {
    block?: Maybe<Block_Height>;
    id: Scalars['ID'];
};

export type QueryBarsArgs = {
    block?: Maybe<Block_Height>;
    first?: Maybe<Scalars['Int']>;
    orderBy?: Maybe<Bar_OrderBy>;
    orderDirection?: Maybe<OrderDirection>;
    skip?: Maybe<Scalars['Int']>;
    where?: Maybe<Bar_Filter>;
};

export type QueryUserArgs = {
    block?: Maybe<Block_Height>;
    id: Scalars['ID'];
};

export type QueryUsersArgs = {
    block?: Maybe<Block_Height>;
    first?: Maybe<Scalars['Int']>;
    orderBy?: Maybe<User_OrderBy>;
    orderDirection?: Maybe<OrderDirection>;
    skip?: Maybe<Scalars['Int']>;
    where?: Maybe<User_Filter>;
};

export type Subscription = {
    __typename?: 'Subscription';
    /** Access to subgraph metadata */
    _meta?: Maybe<_Meta_>;
    pit?: Maybe<Bar>;
    pits: Array<Bar>;
    user?: Maybe<User>;
    users: Array<User>;
};

export type Subscription_MetaArgs = {
    block?: Maybe<Block_Height>;
};

export type SubscriptionBarArgs = {
    block?: Maybe<Block_Height>;
    id: Scalars['ID'];
};

export type SubscriptionBarsArgs = {
    block?: Maybe<Block_Height>;
    first?: Maybe<Scalars['Int']>;
    orderBy?: Maybe<Bar_OrderBy>;
    orderDirection?: Maybe<OrderDirection>;
    skip?: Maybe<Scalars['Int']>;
    where?: Maybe<Bar_Filter>;
};

export type SubscriptionUserArgs = {
    block?: Maybe<Block_Height>;
    id: Scalars['ID'];
};

export type SubscriptionUsersArgs = {
    block?: Maybe<Block_Height>;
    first?: Maybe<Scalars['Int']>;
    orderBy?: Maybe<User_OrderBy>;
    orderDirection?: Maybe<OrderDirection>;
    skip?: Maybe<Scalars['Int']>;
    where?: Maybe<User_Filter>;
};

export type User = {
    __typename?: 'User';
    address: Scalars['Bytes'];
    pit?: Maybe<Bar>;
    block: Scalars['BigInt'];
    cEmbr: Scalars['BigDecimal'];
    id: Scalars['ID'];
    timestamp: Scalars['BigInt'];
    vestingTokenHarvested: Scalars['BigDecimal'];
    vestingTokenIn: Scalars['BigDecimal'];
    vestingTokenOut: Scalars['BigDecimal'];
};

export type User_Filter = {
    address?: Maybe<Scalars['Bytes']>;
    address_contains?: Maybe<Scalars['Bytes']>;
    address_in?: Maybe<Array<Scalars['Bytes']>>;
    address_not?: Maybe<Scalars['Bytes']>;
    address_not_contains?: Maybe<Scalars['Bytes']>;
    address_not_in?: Maybe<Array<Scalars['Bytes']>>;
    pit?: Maybe<Scalars['String']>;
    pit_contains?: Maybe<Scalars['String']>;
    pit_ends_with?: Maybe<Scalars['String']>;
    pit_gt?: Maybe<Scalars['String']>;
    pit_gte?: Maybe<Scalars['String']>;
    pit_in?: Maybe<Array<Scalars['String']>>;
    pit_lt?: Maybe<Scalars['String']>;
    pit_lte?: Maybe<Scalars['String']>;
    pit_not?: Maybe<Scalars['String']>;
    pit_not_contains?: Maybe<Scalars['String']>;
    pit_not_ends_with?: Maybe<Scalars['String']>;
    pit_not_in?: Maybe<Array<Scalars['String']>>;
    pit_not_starts_with?: Maybe<Scalars['String']>;
    pit_starts_with?: Maybe<Scalars['String']>;
    block?: Maybe<Scalars['BigInt']>;
    block_gt?: Maybe<Scalars['BigInt']>;
    block_gte?: Maybe<Scalars['BigInt']>;
    block_in?: Maybe<Array<Scalars['BigInt']>>;
    block_lt?: Maybe<Scalars['BigInt']>;
    block_lte?: Maybe<Scalars['BigInt']>;
    block_not?: Maybe<Scalars['BigInt']>;
    block_not_in?: Maybe<Array<Scalars['BigInt']>>;
    cEmbr?: Maybe<Scalars['BigDecimal']>;
    cEmbr_gt?: Maybe<Scalars['BigDecimal']>;
    cEmbr_gte?: Maybe<Scalars['BigDecimal']>;
    cEmbr_in?: Maybe<Array<Scalars['BigDecimal']>>;
    cEmbr_lt?: Maybe<Scalars['BigDecimal']>;
    cEmbr_lte?: Maybe<Scalars['BigDecimal']>;
    cEmbr_not?: Maybe<Scalars['BigDecimal']>;
    cEmbr_not_in?: Maybe<Array<Scalars['BigDecimal']>>;
    id?: Maybe<Scalars['ID']>;
    id_gt?: Maybe<Scalars['ID']>;
    id_gte?: Maybe<Scalars['ID']>;
    id_in?: Maybe<Array<Scalars['ID']>>;
    id_lt?: Maybe<Scalars['ID']>;
    id_lte?: Maybe<Scalars['ID']>;
    id_not?: Maybe<Scalars['ID']>;
    id_not_in?: Maybe<Array<Scalars['ID']>>;
    timestamp?: Maybe<Scalars['BigInt']>;
    timestamp_gt?: Maybe<Scalars['BigInt']>;
    timestamp_gte?: Maybe<Scalars['BigInt']>;
    timestamp_in?: Maybe<Array<Scalars['BigInt']>>;
    timestamp_lt?: Maybe<Scalars['BigInt']>;
    timestamp_lte?: Maybe<Scalars['BigInt']>;
    timestamp_not?: Maybe<Scalars['BigInt']>;
    timestamp_not_in?: Maybe<Array<Scalars['BigInt']>>;
    vestingTokenHarvested?: Maybe<Scalars['BigDecimal']>;
    vestingTokenHarvested_gt?: Maybe<Scalars['BigDecimal']>;
    vestingTokenHarvested_gte?: Maybe<Scalars['BigDecimal']>;
    vestingTokenHarvested_in?: Maybe<Array<Scalars['BigDecimal']>>;
    vestingTokenHarvested_lt?: Maybe<Scalars['BigDecimal']>;
    vestingTokenHarvested_lte?: Maybe<Scalars['BigDecimal']>;
    vestingTokenHarvested_not?: Maybe<Scalars['BigDecimal']>;
    vestingTokenHarvested_not_in?: Maybe<Array<Scalars['BigDecimal']>>;
    vestingTokenIn?: Maybe<Scalars['BigDecimal']>;
    vestingTokenIn_gt?: Maybe<Scalars['BigDecimal']>;
    vestingTokenIn_gte?: Maybe<Scalars['BigDecimal']>;
    vestingTokenIn_in?: Maybe<Array<Scalars['BigDecimal']>>;
    vestingTokenIn_lt?: Maybe<Scalars['BigDecimal']>;
    vestingTokenIn_lte?: Maybe<Scalars['BigDecimal']>;
    vestingTokenIn_not?: Maybe<Scalars['BigDecimal']>;
    vestingTokenIn_not_in?: Maybe<Array<Scalars['BigDecimal']>>;
    vestingTokenOut?: Maybe<Scalars['BigDecimal']>;
    vestingTokenOut_gt?: Maybe<Scalars['BigDecimal']>;
    vestingTokenOut_gte?: Maybe<Scalars['BigDecimal']>;
    vestingTokenOut_in?: Maybe<Array<Scalars['BigDecimal']>>;
    vestingTokenOut_lt?: Maybe<Scalars['BigDecimal']>;
    vestingTokenOut_lte?: Maybe<Scalars['BigDecimal']>;
    vestingTokenOut_not?: Maybe<Scalars['BigDecimal']>;
    vestingTokenOut_not_in?: Maybe<Array<Scalars['BigDecimal']>>;
};

export enum User_OrderBy {
    Address = 'address',
    Bar = 'pit',
    Block = 'block',
    CEmbr = 'cEmbr',
    Id = 'id',
    Timestamp = 'timestamp',
    VestingTokenHarvested = 'vestingTokenHarvested',
    VestingTokenIn = 'vestingTokenIn',
    VestingTokenOut = 'vestingTokenOut',
}

export type _Block_ = {
    __typename?: '_Block_';
    /** The hash of the block */
    hash?: Maybe<Scalars['Bytes']>;
    /** The block number */
    number: Scalars['Int'];
};

/** The type for the top-level _meta field */
export type _Meta_ = {
    __typename?: '_Meta_';
    /**
     * Information about a specific subgraph block. The hash of the block
     * will be null if the _meta field has a block constraint that asks for
     * a block number. It will be filled if the _meta field has no block constraint
     * and therefore asks for the latest  block
     *
     */
    block: _Block_;
    /** The deployment ID */
    deployment: Scalars['String'];
    /** If `true`, the subgraph encountered indexing errors at some past block */
    hasIndexingErrors: Scalars['Boolean'];
};

export enum _SubgraphErrorPolicy_ {
    /** Data will be returned even if the subgraph has indexing errors */
    Allow = 'allow',
    /** If the subgraph has indexing errors, data will be omitted. The default. */
    Deny = 'deny',
}

export type GetEmbrPitQueryVariables = Exact<{
    id: Scalars['ID'];
    block?: Maybe<Block_Height>;
}>;

export type GetEmbrPitQuery = {
    __typename?: 'Query';
    pit?:
        | {
              __typename?: 'Bar';
              id: string;
              address: string;
              block: string;
              decimals: number;
              cEmbrBurned: string;
              cEmbrMinted: string;
              name: string;
              ratio: string;
              sharedVestingTokenRevenue: string;
              symbol: string;
              timestamp: string;
              totalSupply: string;
              vestingToken: string;
              vestingTokenStaked: string;
          }
        | null
        | undefined;
};

export type GetEmbrPitUserQueryVariables = Exact<{
    id: Scalars['ID'];
    block?: Maybe<Block_Height>;
}>;

export type GetEmbrPitUserQuery = {
    __typename?: 'Query';
    user?:
        | {
              __typename?: 'User';
              id: string;
              address: string;
              block: string;
              cEmbr: string;
              timestamp: string;
              vestingTokenHarvested: string;
              vestingTokenIn: string;
              vestingTokenOut: string;
          }
        | null
        | undefined;
};

export type EmbrPitUsersQueryVariables = Exact<{
    skip?: Maybe<Scalars['Int']>;
    first?: Maybe<Scalars['Int']>;
    orderBy?: Maybe<User_OrderBy>;
    orderDirection?: Maybe<OrderDirection>;
    where?: Maybe<User_Filter>;
    block?: Maybe<Block_Height>;
}>;

export type EmbrPitUsersQuery = {
    __typename?: 'Query';
    users: Array<{
        __typename?: 'User';
        id: string;
        address: string;
        block: string;
        cEmbr: string;
        timestamp: string;
        vestingTokenHarvested: string;
        vestingTokenIn: string;
        vestingTokenOut: string;
    }>;
};

export type EmbrPitFragment = {
    __typename?: 'Bar';
    id: string;
    address: string;
    block: string;
    decimals: number;
    cEmbrBurned: string;
    cEmbrMinted: string;
    name: string;
    ratio: string;
    sharedVestingTokenRevenue: string;
    symbol: string;
    timestamp: string;
    totalSupply: string;
    vestingToken: string;
    vestingTokenStaked: string;
};

export type EmbrPitUserFragment = {
    __typename?: 'User';
    id: string;
    address: string;
    block: string;
    cEmbr: string;
    timestamp: string;
    vestingTokenHarvested: string;
    vestingTokenIn: string;
    vestingTokenOut: string;
};

export type EmbrPitPortfolioDataQueryVariables = Exact<{
    pitId: Scalars['ID'];
    userAddress: Scalars['ID'];
    previousBlockNumber: Scalars['Int'];
}>;

export type EmbrPitPortfolioDataQuery = {
    __typename?: 'Query';
    embrPit?:
        | {
              __typename?: 'Bar';
              id: string;
              address: string;
              block: string;
              decimals: number;
              cEmbrBurned: string;
              cEmbrMinted: string;
              name: string;
              ratio: string;
              sharedVestingTokenRevenue: string;
              symbol: string;
              timestamp: string;
              totalSupply: string;
              vestingToken: string;
              vestingTokenStaked: string;
          }
        | null
        | undefined;
    previousEmbrPit?:
        | {
              __typename?: 'Bar';
              id: string;
              address: string;
              block: string;
              decimals: number;
              cEmbrBurned: string;
              cEmbrMinted: string;
              name: string;
              ratio: string;
              sharedVestingTokenRevenue: string;
              symbol: string;
              timestamp: string;
              totalSupply: string;
              vestingToken: string;
              vestingTokenStaked: string;
          }
        | null
        | undefined;
    embrPitUser?:
        | {
              __typename?: 'User';
              id: string;
              address: string;
              block: string;
              cEmbr: string;
              timestamp: string;
              vestingTokenHarvested: string;
              vestingTokenIn: string;
              vestingTokenOut: string;
          }
        | null
        | undefined;
    previousEmbrPitUser?:
        | {
              __typename?: 'User';
              id: string;
              address: string;
              block: string;
              cEmbr: string;
              timestamp: string;
              vestingTokenHarvested: string;
              vestingTokenIn: string;
              vestingTokenOut: string;
          }
        | null
        | undefined;
};

export const EmbrPitFragmentDoc = gql`
    fragment EmbrPit on Bar {
        id
        address
        block
        decimals
        cEmbrBurned
        cEmbrMinted
        name
        ratio
        sharedVestingTokenRevenue
        symbol
        timestamp
        totalSupply
        vestingToken
        vestingTokenStaked
    }
`;
export const EmbrPitUserFragmentDoc = gql`
    fragment EmbrPitUser on User {
        id
        address
        block
        cEmbr
        timestamp
        vestingTokenHarvested
        vestingTokenIn
        vestingTokenOut
    }
`;
export const GetEmbrPitDocument = gql`
    query GetEmbrPit($id: ID!, $block: Block_height) {
        pit(id: $id, block: $block) {
            ...EmbrPit
        }
    }
    ${EmbrPitFragmentDoc}
`;
export const GetEmbrPitUserDocument = gql`
    query GetEmbrPitUser($id: ID!, $block: Block_height) {
        user(id: $id, block: $block) {
            ...EmbrPitUser
        }
    }
    ${EmbrPitUserFragmentDoc}
`;
export const EmbrPitUsersDocument = gql`
    query EmbrPitUsers(
        $skip: Int
        $first: Int
        $orderBy: User_orderBy
        $orderDirection: OrderDirection
        $where: User_filter
        $block: Block_height
    ) {
        users(
            skip: $skip
            first: $first
            orderBy: $orderBy
            orderDirection: $orderDirection
            where: $where
            block: $block
        ) {
            ...EmbrPitUser
        }
    }
    ${EmbrPitUserFragmentDoc}
`;
export const EmbrPitPortfolioDataDocument = gql`
    query EmbrPitPortfolioData($pitId: ID!, $userAddress: ID!, $previousBlockNumber: Int!) {
        embrPit: pit(id: $pitId) {
            ...EmbrPit
        }
        previousEmbrPit: pit(id: $pitId, block: { number: $previousBlockNumber }) {
            ...EmbrPit
        }
        embrPitUser: user(id: $userAddress) {
            ...EmbrPitUser
        }
        previousEmbrPitUser: user(id: $userAddress, block: { number: $previousBlockNumber }) {
            ...EmbrPitUser
        }
    }
    ${EmbrPitFragmentDoc}
    ${EmbrPitUserFragmentDoc}
`;

export type SdkFunctionWrapper = <T>(
    action: (requestHeaders?: Record<string, string>) => Promise<T>,
    operationName: string,
) => Promise<T>;

const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
    return {
        GetEmbrPit(
            variables: GetEmbrPitQueryVariables,
            requestHeaders?: Dom.RequestInit['headers'],
        ): Promise<GetEmbrPitQuery> {
            return withWrapper(
                (wrappedRequestHeaders) =>
                    client.request<GetEmbrPitQuery>(GetEmbrPitDocument, variables, {
                        ...requestHeaders,
                        ...wrappedRequestHeaders,
                    }),
                'GetEmbrPit',
            );
        },
        GetEmbrPitUser(
            variables: GetEmbrPitUserQueryVariables,
            requestHeaders?: Dom.RequestInit['headers'],
        ): Promise<GetEmbrPitUserQuery> {
            return withWrapper(
                (wrappedRequestHeaders) =>
                    client.request<GetEmbrPitUserQuery>(GetEmbrPitUserDocument, variables, {
                        ...requestHeaders,
                        ...wrappedRequestHeaders,
                    }),
                'GetEmbrPitUser',
            );
        },
        EmbrPitUsers(
            variables?: EmbrPitUsersQueryVariables,
            requestHeaders?: Dom.RequestInit['headers'],
        ): Promise<EmbrPitUsersQuery> {
            return withWrapper(
                (wrappedRequestHeaders) =>
                    client.request<EmbrPitUsersQuery>(EmbrPitUsersDocument, variables, {
                        ...requestHeaders,
                        ...wrappedRequestHeaders,
                    }),
                'EmbrPitUsers',
            );
        },
        EmbrPitPortfolioData(
            variables: EmbrPitPortfolioDataQueryVariables,
            requestHeaders?: Dom.RequestInit['headers'],
        ): Promise<EmbrPitPortfolioDataQuery> {
            return withWrapper(
                (wrappedRequestHeaders) =>
                    client.request<EmbrPitPortfolioDataQuery>(EmbrPitPortfolioDataDocument, variables, {
                        ...requestHeaders,
                        ...wrappedRequestHeaders,
                    }),
                'EmbrPitPortfolioData',
            );
        },
    };
}
export type Sdk = ReturnType<typeof getSdk>;
