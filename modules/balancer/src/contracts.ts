import { BalancerNetworkConfig } from '../balancer-types';

export const BALANCER_NETWORK_CONFIG: Record<string, BalancerNetworkConfig> = {
    '250': {
        vault: '0x20dd72Ed959b6147912C2e529F0a0C651c33c9ce',
        weth: '0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83',
        multicall: '0x09523Acc78Dd297Ae5Da00DdeBE6f10ebF784565',
    },
    '4': {
        vault: '0xF07513C68C55A31337E3b58034b176A15Dce16eD',
        weth: '0x80dD2B80FbcFB06505A301d732322e987380EcD6',
        multicall: '0x42ad527de7d4e9d9d011ac45b31d8551f8fe9821',
    },
    '43113': {
        vault: '0x9aed52F3074ba468c6ad17822b8833210868c31b',
        weth: '0xd00ae08403B9bbb9124bB305C09058E32C39A48c',
        multicall: '0x98c23524db6852e04327e8021391e1715e0eace7',
    },
    '43114': {
        vault: '0xad68ea482860cd7077a5D0684313dD3a9BC70fbB',
        weth: '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7',
        multicall: '0x653f3e6c7e2ae666c22e063d87a012c2f13ea416',
    },
};
