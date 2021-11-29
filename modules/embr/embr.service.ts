import { Contract, utils } from 'ethers';
import { ethersService } from '../ethers/ethers.service';
import { fp } from '../util/numbers';
import embrAbi from './abi/EmbrToken.json';
import { env } from '../../app/env';

const INITIAL_MINT = fp(5_000_000);

class EmbrService {
    private readonly embrContract: Contract;
    constructor() {
        this.embrContract = ethersService.getContractAt(env.EMBR_ADDRESS, embrAbi);
    }

    async getCirculatingSupply() {
        const totalSupply = await this.embrContract.totalSupply();
        return utils.formatUnits(totalSupply.sub(INITIAL_MINT));
    }
}

export const embrService = new EmbrService();
