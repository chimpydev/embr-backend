import { masterchefService } from '../../subgraphs/masterchef-subgraph/masterchef.service';
import { FarmUserFragment } from '../../subgraphs/masterchef-subgraph/generated/masterchef-subgraph-types';
import _ from 'lodash';
import { prisma } from '../../util/prisma-client';
import { getContractAt, jsonRpcProvider } from '../../util/ethers';
import MasterChefAbi from '../../abi/MasterChef.json';
import { Multicaller } from '../../util/multicaller';
import { networkConfig } from '../../config/network-config';
import { BigNumber } from 'ethers';
import { formatFixed } from '@ethersproject/bignumber';
import { prismaBulkExecuteOperations } from '../../../prisma/prisma-util';
import { UserStakedBalanceService } from '../user-types';
import { AmountHumanReadable } from '../../global/global-types';

export class UserSyncMasterchefFarmBalanceService implements UserStakedBalanceService {
    public async syncStakedBalances(): Promise<void> {
        const status = await prisma.prismaUserBalanceSyncStatus.findUnique({ where: { type: 'STAKED' } });

        if (!status) {
            throw new Error('UserMasterchefFarmBalanceService: syncStakedBalances called before initStakedBalances');
        }

        const pools = await prisma.prismaPool.findMany({ include: { staking: true } });
        const latestBlock = await jsonRpcProvider.getBlockNumber();
        const farms = await masterchefService.getAllFarms({});

        const startBlock = status.blockNumber + 1;
        const amountUpdates = await this.getAmountsForUsersWithBalanceChangesSinceStartBlock(
            networkConfig.masterchef.address,
            startBlock,
        );
        const userAddresses = _.uniq(amountUpdates.map((update) => update.userAddress));

        if (amountUpdates.length === 0) {
            await prisma.prismaUserBalanceSyncStatus.update({
                where: { type: 'STAKED' },
                data: { blockNumber: latestBlock },
            });

            return;
        }

        await prismaBulkExecuteOperations([
            prisma.prismaUser.createMany({
                data: userAddresses.map((userAddress) => ({ address: userAddress })),
                skipDuplicates: true,
            }),
            ...amountUpdates.map((update) => {
                const pool = pools.find((pool) => pool.staking?.id === update.farmId);
                const farm = farms.find((farm) => farm.id === update.farmId);

                return prisma.prismaUserStakedBalance.upsert({
                    where: { id: `${update.farmId}-${update.userAddress}` },
                    update: {
                        balance: update.amount,
                        balanceNum: parseFloat(update.amount),
                    },
                    create: {
                        id: `${update.farmId}-${update.userAddress}`,
                        balance: update.amount,
                        balanceNum: parseFloat(update.amount),
                        userAddress: update.userAddress,
                        poolId: pool?.id,
                        tokenAddress: farm!.pair,
                        stakingId: update.farmId,
                    },
                });
            }),
            prisma.prismaUserBalanceSyncStatus.update({
                where: { type: 'STAKED' },
                data: { blockNumber: latestBlock },
            }),
        ]);
    }

    public async initStakedBalances(): Promise<void> {
        const { block } = await masterchefService.getMetadata();
        console.log('initStakedBalances: loading subgraph users...');
        const farmUsers = await this.loadAllSubgraphUsers();
        console.log('initStakedBalances: finished loading subgraph users...');
        console.log('initStakedBalances: loading pools...');
        const pools = await prisma.prismaPool.findMany({ select: { id: true, address: true } });
        console.log('initStakedBalances: finished loading pools...');
        const userAddresses = _.uniq(farmUsers.map((farmUser) => farmUser.address));

        console.log('initStakedBalances: performing db operations...');
        await prismaBulkExecuteOperations([
            prisma.prismaUser.createMany({
                data: userAddresses.map((userAddress) => ({ address: userAddress })),
                skipDuplicates: true,
            }),
            prisma.prismaUserStakedBalance.deleteMany({}),
            prisma.prismaUserStakedBalance.createMany({
                data: farmUsers
                    .filter((farmUser) => !networkConfig.masterchef.excludedFarmIds.includes(farmUser.pool!.id))
                    .map((farmUser) => {
                        const pool = pools.find((pool) => pool.address === farmUser.pool?.pair);

                        return {
                            id: farmUser.id,
                            balance: formatFixed(farmUser.amount, 18),
                            balanceNum: parseFloat(formatFixed(farmUser.amount, 18)),
                            userAddress: farmUser.address,
                            poolId: pool?.id,
                            tokenAddress: farmUser.pool!.pair,
                            stakingId: farmUser.pool!.id,
                        };
                    }),
            }),
            prisma.prismaUserBalanceSyncStatus.upsert({
                where: { type: 'STAKED' },
                create: { type: 'STAKED', blockNumber: block.number },
                update: { blockNumber: block.number },
            }),
        ]);

        console.log('initStakedBalances: finished...');
    }

    private async getAmountsForUsersWithBalanceChangesSinceStartBlock(
        masterChefAddress: string,
        startBlock: number,
    ): Promise<{ farmId: string; userAddress: string; amount: AmountHumanReadable }[]> {
        const contract = getContractAt(masterChefAddress, MasterChefAbi);
        const events = await contract.queryFilter({ address: masterChefAddress }, startBlock);
        const filteredEvents = events.filter((event) =>
            ['Deposit', 'Withdraw', 'EmergencyWithdraw'].includes(event.event!),
        );

        const multicall = new Multicaller(networkConfig.multicall, jsonRpcProvider, MasterChefAbi);
        let response: {
            [farmId: string]: { [userAddress: string]: [BigNumber, BigNumber] };
        } = {};

        for (const event of filteredEvents) {
            multicall.call(`${event.args?.pid}.${event.args?.user}`, masterChefAddress, 'userInfo', [
                event.args?.pid,
                event.args?.user,
            ]);

            if (event.args?.user !== event.args?.to) {
                //need to also update the amount for the to address
                multicall.call(`${event.args?.pid}.${event.args?.to}`, masterChefAddress, 'userInfo', [
                    event.args?.pid,
                    event.args?.to,
                ]);
            }

            if (multicall.numCalls >= 100) {
                response = _.merge(response, await multicall.execute());
            }
        }

        if (multicall.numCalls > 0) {
            response = _.merge(response, await multicall.execute());
        }

        return _.map(response, (farmData, farmId) => {
            return _.map(farmData, ([amount], userAddress) => ({
                farmId,
                userAddress: userAddress.toLowerCase(),
                amount: formatFixed(amount, 18),
            }));
        })
            .flat()
            .filter((item) => !networkConfig.masterchef.excludedFarmIds.includes(item.farmId));
    }

    private async loadAllSubgraphUsers(): Promise<FarmUserFragment[]> {
        const pageSize = 1000;
        const MAX_SKIP = 5000;
        let users: FarmUserFragment[] = [];
        let timestamp = '0';
        let hasMore = true;
        let skip = 0;

        while (hasMore) {
            const { farmUsers } = await masterchefService.getFarmUsers({
                where: { timestamp_gte: timestamp, amount_not: '0' },
                first: pageSize,
                skip,
            });

            users = [...users, ...farmUsers];
            hasMore = farmUsers.length >= pageSize;

            skip += pageSize;

            if (skip > MAX_SKIP) {
                timestamp = users[users.length - 1].timestamp;
                skip = 0;
            }
        }

        return _.uniqBy(users, (user) => user.id);
    }
}