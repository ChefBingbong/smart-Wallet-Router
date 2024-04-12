import type { AbiParametersToPrimitiveTypes } from "abitype";
import { type Address, type Hex } from "viem";
import type { SwapCall, UserOp } from "../types/smartWallet";
export type ABIType = typeof ABI_PARAMETER;
export type OperationUsed = keyof typeof ABI_PARAMETER;
export type ABIParametersType<TOperationType extends OperationUsed> = AbiParametersToPrimitiveTypes<ABIType[TOperationType]["inputs"]>;
export declare enum OperationType {
    EXEC = "EXEC",
    CREATE_WALLET = "CREATE_WALLET",
    TRANSFER = "TRANSFER",
    TRANSFER_FROM = "TRANSFER_FROM",
    APPROVE = "APPROVE",
    PERMIT2_PERMIT = "PERMIT2_PERMIT",
    PERMIT2_PERMIT_BATCH = "PERMIT2_PERMIT_BATCH",
    PERMIT2_TRANSFER_FROM = "PERMIT2_TRANSFER_FROM",
    PERMIT2_TRANSFER_FROM_BATCH = "PERMIT2_TRANSFER_FROM_BATCH",
    PERMIT2_TRANSFER_TO_RELAYER_WITNESS = "PERMIT2_TRANSFER_TO_RELAYER_WITNESS",
    CLAIM_PERMIT = "CLAIM_PERMIT"
}
export declare const ABI_PARAMETER: {
    CREATE_WALLET: {
        readonly name: "createWallet";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "_owner";
        }];
        readonly outputs: readonly [];
    };
    EXEC: {
        readonly name: "exec";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "tuple[]";
            readonly components: readonly [{
                readonly type: "address";
                readonly name: "to";
            }, {
                readonly type: "uint256";
                readonly name: "amount";
            }, {
                readonly type: "bytes";
                readonly name: "data";
            }];
            readonly name: "userOps";
        }, {
            readonly type: "bytes";
            readonly name: "_signature";
        }];
        readonly outputs: readonly [];
    };
    TRANSFER: {
        readonly name: "transfer";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "to";
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
        readonly outputs: readonly [];
    };
    TRANSFER_FROM: {
        readonly name: "transferFrom";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "from";
        }, {
            readonly type: "address";
            readonly name: "to";
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
        readonly outputs: readonly [];
    };
    APPROVE: {
        readonly name: "approve";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "spender";
        }, {
            readonly type: "uint256";
            readonly name: "amount";
        }];
        readonly outputs: readonly [];
    };
    PERMIT2_PERMIT: {
        readonly name: "permit2Permit";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "PermitSingle";
            readonly name: "permitSingle";
        }, {
            readonly type: "bytes";
            readonly name: "data";
        }];
        readonly outputs: readonly [];
    };
    PERMIT2_PERMIT_BATCH: {
        readonly name: "permit2PermitBatch";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "PermitBatch";
            readonly name: "permitBatch";
        }, {
            readonly type: "bytes";
            readonly name: "data";
        }];
        readonly outputs: readonly [];
    };
    PERMIT2_TRANSFER_FROM: {
        readonly name: "permit2TransferFrom";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "token";
        }, {
            readonly type: "address";
            readonly name: "recipient";
        }, {
            readonly type: "uint160";
            readonly name: "amount";
        }];
        readonly outputs: readonly [];
    };
    PERMIT2_TRANSFER_FROM_BATCH: {
        readonly name: "permit2PermitTransferFromBatch";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "AllowanceTransferDetails[]";
            readonly name: "batchDetails";
        }];
        readonly outputs: readonly [];
    };
    PERMIT2_TRANSFER_TO_RELAYER_WITNESS: {
        readonly name: "deposit";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "uint256";
            readonly name: "_amount";
        }, {
            readonly type: "address";
            readonly name: "_token";
        }, {
            readonly type: "address";
            readonly name: "_owner";
        }, {
            readonly type: "address";
            readonly name: "_user";
        }, {
            readonly type: "tuple";
            readonly components: readonly [{
                readonly name: "permitted";
                readonly type: "tuple";
                readonly components: readonly [{
                    readonly type: "address";
                    readonly name: "token";
                }, {
                    readonly type: "uint256";
                    readonly name: "amount";
                }];
            }, {
                readonly type: "uint256";
                readonly name: "nonce";
            }, {
                readonly type: "uint256";
                readonly name: "deadline";
            }];
            readonly name: "_permit";
        }, {
            readonly type: "bytes";
            readonly name: "_signature";
        }];
        readonly outputs: readonly [];
    };
    CLAIM_PERMIT: {
        readonly name: "withdrawERC20";
        readonly type: "function";
        readonly stateMutability: "nonpayable";
        readonly inputs: readonly [{
            readonly type: "address";
            readonly name: "_token";
        }, {
            readonly type: "uint256";
            readonly name: "_amount";
        }, {
            readonly type: "address";
            readonly name: "recipient";
        }];
        readonly outputs: readonly [];
    };
};
export declare class WalletOperationBuilder {
    userOps: UserOp[];
    externalUserOps: any[];
    constructor();
    addUserOperation<TOperationType extends OperationUsed>(type: TOperationType, parameters: ABIParametersType<TOperationType>, contract: Address, value?: bigint): void;
    addExternalUserOperation<TOperationType extends OperationUsed>(type: TOperationType, parameters: ABIParametersType<TOperationType>, contract?: Address | undefined, value?: bigint): void;
    addUserOperationFromCall: (calls: SwapCall[]) => void;
}
export type WalletOperation = {
    encodedInput: Hex;
    encodedSelector: Hex;
};
export declare function encodeOperation<TOperationType extends OperationUsed>(type: TOperationType, parameters: ABIParametersType<TOperationType>): WalletOperation;
//# sourceMappingURL=walletOperations.d.ts.map