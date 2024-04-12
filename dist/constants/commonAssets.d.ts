import { ChainId } from "@pancakeswap/chains";
import type { ERC20Token } from "@pancakeswap/sdk";
import { Address } from "viem";
export declare const AssetAdapter: {
    [chain in ChainId]: {
        [token: string]: ERC20Token;
    };
};
export declare const SupportedFeeTokens: {
    [chain: number]: Address[];
};
//# sourceMappingURL=commonAssets.d.ts.map