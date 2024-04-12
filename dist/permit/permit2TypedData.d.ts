import type { PermitTransferFrom, PermitTransferFromData, Witness } from "@pancakeswap/permit2-sdk";
import type { ChainId } from "@pancakeswap/sdk";
import type { Address } from "viem";
export declare const PERMIT_SIG_EXPIRATION = 1800000;
export interface PermitWithWithWitness {
    permit: PermitTransferFrom;
    witness: Witness;
}
export declare const toDeadline: (expiration: number) => number;
export declare const generatePermitTransferFromTypedData: (token: Address, amount: bigint, spender: Address, _witness: Address, nonce: bigint) => PermitWithWithWitness;
export declare const permit2TpedData: (chainId: ChainId, token: Address, spender: Address, witness: Address, amount: bigint, nonce: bigint | undefined) => PermitTransferFromData & PermitWithWithWitness;
//# sourceMappingURL=permit2TypedData.d.ts.map