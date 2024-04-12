import { Permit2Signature } from "@pancakeswap/universal-router-sdk";
import type { Address } from "viem";
import { WalletOperationBuilder } from "../encoder/walletOperations";
export type ApproveProtocol = {
    token: string;
    protocol: string;
};
export type Permit2TransferFrom = {
    token: string;
    amount: string;
    recipient?: string;
};
export type InputTokenOptions = {
    approval?: ApproveProtocol;
    permit2Permit?: Permit2Signature;
    permit2TransferFrom?: Permit2TransferFrom;
};
export declare function encodePermit(planner: WalletOperationBuilder, permit2: Permit2Signature, contract: Address): void;
//# sourceMappingURL=permit2Operations.d.ts.map