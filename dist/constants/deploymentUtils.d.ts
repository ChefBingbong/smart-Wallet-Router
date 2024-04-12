import { ChainId } from "@pancakeswap/chains";
import type { Address } from "viem";
export declare enum Contracts {
    ECDSAWalletFactory = "ECDSAWalletFactory",
    SmartWalletFactory = "SmartWalletFactory",
    Depositor = "Depositor",
    Permit2 = "Permit2"
}
export declare enum ExtendedChainId {
    POLYGON_TESTNET = 80001,
    LOCAL = 31337
}
type Deployments = {
    [chain in ChainId | ExtendedChainId]: {
        [contract in Contracts]: Address;
    };
};
export declare const polygonTokens: {
    weth: string;
};
export declare const Deployments: Deployments;
export {};
//# sourceMappingURL=deploymentUtils.d.ts.map