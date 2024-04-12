import type { PermitTransferFrom, PermitTransferFromData, Witness } from "@pancakeswap/permit2-sdk";
import type { BigintIsh } from "@pancakeswap/sdk";
import { ChainId } from "@pancakeswap/sdk";
import type { Address } from "viem";
export declare const PERMIT_SIG_EXPIRATION = 1800000;
export interface PermitWithWithWitness {
    permit: PermitTransferFrom;
    witness: Witness;
}
export declare const toDeadline: (expiration: number) => number;
export declare const generatePermitTransferFromTypedData: (token: Address, amount: bigint, spender: Address, _witness: Address, nonce: BigintIsh) => PermitWithWithWitness;
export declare const permit2TpedData: (chainId: ChainId, token: Address, spender: Address, account: Address, witness: Address, amount: bigint, nonce: bigint | undefined) => Promise<PermitTransferFromData & PermitWithWithWitness>;
//# sourceMappingURL=permit2TypedData.d.ts.map