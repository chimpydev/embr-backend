import { Contract, utils } from 'ethers';
import { ethersService } from '../ethers/ethers.service';
import { fp, bn } from '../util/numbers';
import embrAbi from './abi/EmbrToken.json';
import { env } from '../../app/env';
import { masterchefService } from '../masterchef-subgraph/masterchef.service';
import { blocksSubgraphService } from '../blocks-subgraph/blocks-subgraph.service';
import {
    Migrations,
} from '../masterchef-subgraph/generated/masterchef-subgraph-types';
import moment from 'moment-timezone';

class EmbrService {
    private readonly embrContract: Contract;
    constructor() {
        this.embrContract = ethersService.getContractAt(env.EMBR_ADDRESS, embrAbi);
    }

    async getCirculatingSupply() {
        //const start = moment.tz(env.SUBGRAPH_START_DATE, 'GMT').unix()
        const args = {
            first: 5
        };
        const response = await masterchefService.getMigrations(args);

        if (!response || response.migrations.length === 0) {
            throw new Error('Missing migrations');
        }

        const totalSupply = await this.embrContract.totalSupply();
        const migrationData = response.migrations as any
        const totalAdjSupply =  bn(totalSupply).sub(migrationData.unclaimed)
        return utils.formatUnits(totalAdjSupply);
    }
}

export const embrService = new EmbrService();
