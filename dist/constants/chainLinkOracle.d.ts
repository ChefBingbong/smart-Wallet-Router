import { ChainId } from '@pancakeswap/chains';
import type { Address } from 'viem';
export declare const SUPPORTED_CHAIN_IDS: readonly [ChainId.BSC, ChainId.ZKSYNC];
export type SupportedChainId = (typeof SUPPORTED_CHAIN_IDS)[number];
export type ContractAddresses<T extends ChainId = SupportedChainId> = {
    [chainId in T]: Address;
};
export declare const chainlinkOracleBNB: Record<string, Address>;
export declare const chainlinkOracleCAKE: Record<string, Address>;
export declare const chainlinkOracleETH: Record<string, Address>;
export declare const chainlinkOracleWBTC: Record<string, Address>;
//# sourceMappingURL=chainLinkOracle.d.ts.map