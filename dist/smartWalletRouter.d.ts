import type { ChainId } from "@pancakeswap/chains";
import { CurrencyAmount, Token, type Currency, type TradeType } from "@pancakeswap/sdk";
import { type SmartRouterTrade, type SwapOptions } from "@pancakeswap/smart-router";
import { type PancakeSwapOptions } from "@pancakeswap/universal-router-sdk";
import { type Address, type Hex, type PublicClient } from "viem";
import { WalletOperationBuilder } from "./encoder/walletOperations";
import type { ClassicTradeOptions, SmartWalletGasParams, SmartWalletTradeOptions, UserOp } from "./types/smartWallet";
export declare abstract class SmartWalletRouter {
    static account: Address;
    static smartWallet: Address;
    static chainId: ChainId;
    static isInitialized: boolean;
    static tradeConfig: Partial<ClassicTradeOptions<any>> & SmartRouterTrade<TradeType>;
    static updateConfig(config: SmartWalletTradeOptions): void;
    static buildClassicTrade<UTradeOps extends SwapOptions & PancakeSwapOptions>(trade: SmartRouterTrade<TradeType>, options: ClassicTradeOptions<UTradeOps>): {
        address: `0x${string}`;
        calldata: `0x${string}`;
        value: `0x${string}`;
    };
    static buildSmartWalletTrade(trade: SmartRouterTrade<TradeType>, options: SmartWalletTradeOptions): {
        permitDetails: Promise<import("@pancakeswap/permit2-sdk").PermitTransferFromData & import("./permit/permit2TypedData").PermitWithWithWitness>;
        smartWalletDetails: import("./types/eip712").TypedSmartWalletData;
        externalUserOps: any[];
    };
    static encodePlan(planner: WalletOperationBuilder, config: SmartWalletTradeOptions & {
        token: Address;
        amount: bigint;
    }): {
        permitDetails: Promise<import("@pancakeswap/permit2-sdk").PermitTransferFromData & import("./permit/permit2TypedData").PermitWithWithWitness>;
        smartWalletDetails: import("./types/eip712").TypedSmartWalletData;
        externalUserOps: any[];
    };
    static sendTransactionFromRelayer(chainId: ChainId, txConfig: UserOp, config?: {
        externalClient?: PublicClient;
    }): Promise<import("viem").TransactionReceipt>;
    static estimateSmartWalletFees({ address, options, trade, chainId }: SmartWalletGasParams): Promise<{
        gasEstimate: bigint;
        gasCostInNative: CurrencyAmount<Token>;
        gasCostInQuoteToken: CurrencyAmount<Currency>;
        gasCostInBaseToken: CurrencyAmount<Currency>;
        gasCostInUSD: CurrencyAmount<Currency>;
    }>;
    static getContractAllowance(tokenAddress: Address, owner: Address, spender: Address, chainId: ChainId, amountToCheck?: bigint): Promise<{
        allowance: bigint;
        needsApproval: boolean;
    }>;
    static encodeSmartRouterTrade(args: [UserOp[], Hex], to: Address): {
        to: `0x${string}`;
        amount: bigint;
        data: `0x${string}`;
    };
    static getUserSmartWalletDetails(userAddress: Address, chainId: ChainId): Promise<{
        address: `0x${string}`;
        nonce: bigint;
        wallet: {
            read: {
                domainSeperator: (args: readonly [bigint], options?: {
                    account?: `0x${string}` | import("viem").Account | undefined;
                    blockNumber?: bigint | undefined;
                    blockTag?: import("viem").BlockTag | undefined;
                    stateOverride?: import("viem").StateOverride | undefined;
                } | undefined) => Promise<`0x${string}`>;
                nonce: (options?: {
                    account?: `0x${string}` | import("viem").Account | undefined;
                    blockNumber?: bigint | undefined;
                    blockTag?: import("viem").BlockTag | undefined;
                    stateOverride?: import("viem").StateOverride | undefined;
                } | undefined) => Promise<bigint>;
                owner: (options?: {
                    account?: `0x${string}` | import("viem").Account | undefined;
                    blockNumber?: bigint | undefined;
                    blockTag?: import("viem").BlockTag | undefined;
                    stateOverride?: import("viem").StateOverride | undefined;
                } | undefined) => Promise<`0x${string}`>;
                proxiableUUID: (options?: {
                    account?: `0x${string}` | import("viem").Account | undefined;
                    blockNumber?: bigint | undefined;
                    blockTag?: import("viem").BlockTag | undefined;
                    stateOverride?: import("viem").StateOverride | undefined;
                } | undefined) => Promise<`0x${string}`>;
            };
            estimateGas: {
                __ECDSAWallet_init: (args: readonly [`0x${string}`], options: import("viem/chains").Prettify<import("viem").UnionOmit<import("viem").EstimateContractGasParameters<readonly [{
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: false;
                        readonly internalType: "address";
                        readonly name: "previousAdmin";
                        readonly type: "address";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "address";
                        readonly name: "newAdmin";
                        readonly type: "address";
                    }];
                    readonly name: "AdminChanged";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "beacon";
                        readonly type: "address";
                    }];
                    readonly name: "BeaconUpgraded";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: false;
                        readonly internalType: "uint8";
                        readonly name: "version";
                        readonly type: "uint8";
                    }];
                    readonly name: "Initialized";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "_contract";
                        readonly type: "address";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "uint256";
                        readonly name: "_value";
                        readonly type: "uint256";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "bytes";
                        readonly name: "_data";
                        readonly type: "bytes";
                    }];
                    readonly name: "LogCall";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "_from";
                        readonly type: "address";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "uint256";
                        readonly name: "_amount";
                        readonly type: "uint256";
                    }];
                    readonly name: "LogReceivedEther";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "implementation";
                        readonly type: "address";
                    }];
                    readonly name: "Upgraded";
                    readonly type: "event";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "_owner";
                        readonly type: "address";
                    }];
                    readonly name: "__ECDSAWallet_init";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "__SmartWallet_init";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "uint256";
                        readonly name: "_chainID";
                        readonly type: "uint256";
                    }];
                    readonly name: "domainSeperator";
                    readonly outputs: readonly [{
                        readonly internalType: "bytes32";
                        readonly name: "";
                        readonly type: "bytes32";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly components: readonly [{
                            readonly internalType: "address";
                            readonly name: "to";
                            readonly type: "address";
                        }, {
                            readonly internalType: "uint256";
                            readonly name: "amount";
                            readonly type: "uint256";
                        }, {
                            readonly internalType: "bytes";
                            readonly name: "data";
                            readonly type: "bytes";
                        }];
                        readonly internalType: "struct IWallet.UserOp[]";
                        readonly name: "userOps";
                        readonly type: "tuple[]";
                    }, {
                        readonly internalType: "bytes";
                        readonly name: "_signature";
                        readonly type: "bytes";
                    }];
                    readonly name: "exec";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "nonce";
                    readonly outputs: readonly [{
                        readonly internalType: "uint256";
                        readonly name: "";
                        readonly type: "uint256";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "owner";
                    readonly outputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "";
                        readonly type: "address";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "proxiableUUID";
                    readonly outputs: readonly [{
                        readonly internalType: "bytes32";
                        readonly name: "";
                        readonly type: "bytes32";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "newImplementation";
                        readonly type: "address";
                    }];
                    readonly name: "upgradeTo";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "newImplementation";
                        readonly type: "address";
                    }, {
                        readonly internalType: "bytes";
                        readonly name: "data";
                        readonly type: "bytes";
                    }];
                    readonly name: "upgradeToAndCall";
                    readonly outputs: readonly [];
                    readonly stateMutability: "payable";
                    readonly type: "function";
                }, {
                    readonly stateMutability: "payable";
                    readonly type: "receive";
                }], "__ECDSAWallet_init", readonly [`0x${string}`], import("viem").Chain | undefined>, "address" | "abi" | "args" | "functionName">>) => Promise<bigint>;
                __SmartWallet_init: (options: import("viem/chains").Prettify<import("viem").UnionOmit<import("viem").EstimateContractGasParameters<readonly [{
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: false;
                        readonly internalType: "address";
                        readonly name: "previousAdmin";
                        readonly type: "address";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "address";
                        readonly name: "newAdmin";
                        readonly type: "address";
                    }];
                    readonly name: "AdminChanged";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "beacon";
                        readonly type: "address";
                    }];
                    readonly name: "BeaconUpgraded";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: false;
                        readonly internalType: "uint8";
                        readonly name: "version";
                        readonly type: "uint8";
                    }];
                    readonly name: "Initialized";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "_contract";
                        readonly type: "address";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "uint256";
                        readonly name: "_value";
                        readonly type: "uint256";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "bytes";
                        readonly name: "_data";
                        readonly type: "bytes";
                    }];
                    readonly name: "LogCall";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "_from";
                        readonly type: "address";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "uint256";
                        readonly name: "_amount";
                        readonly type: "uint256";
                    }];
                    readonly name: "LogReceivedEther";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "implementation";
                        readonly type: "address";
                    }];
                    readonly name: "Upgraded";
                    readonly type: "event";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "_owner";
                        readonly type: "address";
                    }];
                    readonly name: "__ECDSAWallet_init";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "__SmartWallet_init";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "uint256";
                        readonly name: "_chainID";
                        readonly type: "uint256";
                    }];
                    readonly name: "domainSeperator";
                    readonly outputs: readonly [{
                        readonly internalType: "bytes32";
                        readonly name: "";
                        readonly type: "bytes32";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly components: readonly [{
                            readonly internalType: "address";
                            readonly name: "to";
                            readonly type: "address";
                        }, {
                            readonly internalType: "uint256";
                            readonly name: "amount";
                            readonly type: "uint256";
                        }, {
                            readonly internalType: "bytes";
                            readonly name: "data";
                            readonly type: "bytes";
                        }];
                        readonly internalType: "struct IWallet.UserOp[]";
                        readonly name: "userOps";
                        readonly type: "tuple[]";
                    }, {
                        readonly internalType: "bytes";
                        readonly name: "_signature";
                        readonly type: "bytes";
                    }];
                    readonly name: "exec";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "nonce";
                    readonly outputs: readonly [{
                        readonly internalType: "uint256";
                        readonly name: "";
                        readonly type: "uint256";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "owner";
                    readonly outputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "";
                        readonly type: "address";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "proxiableUUID";
                    readonly outputs: readonly [{
                        readonly internalType: "bytes32";
                        readonly name: "";
                        readonly type: "bytes32";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "newImplementation";
                        readonly type: "address";
                    }];
                    readonly name: "upgradeTo";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "newImplementation";
                        readonly type: "address";
                    }, {
                        readonly internalType: "bytes";
                        readonly name: "data";
                        readonly type: "bytes";
                    }];
                    readonly name: "upgradeToAndCall";
                    readonly outputs: readonly [];
                    readonly stateMutability: "payable";
                    readonly type: "function";
                }, {
                    readonly stateMutability: "payable";
                    readonly type: "receive";
                }], "__SmartWallet_init", readonly [], import("viem").Chain | undefined>, "address" | "abi" | "args" | "functionName">>) => Promise<bigint>;
                exec: (args: readonly [readonly {
                    to: `0x${string}`;
                    amount: bigint;
                    data: `0x${string}`;
                }[], `0x${string}`], options: import("viem/chains").Prettify<import("viem").UnionOmit<import("viem").EstimateContractGasParameters<readonly [{
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: false;
                        readonly internalType: "address";
                        readonly name: "previousAdmin";
                        readonly type: "address";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "address";
                        readonly name: "newAdmin";
                        readonly type: "address";
                    }];
                    readonly name: "AdminChanged";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "beacon";
                        readonly type: "address";
                    }];
                    readonly name: "BeaconUpgraded";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: false;
                        readonly internalType: "uint8";
                        readonly name: "version";
                        readonly type: "uint8";
                    }];
                    readonly name: "Initialized";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "_contract";
                        readonly type: "address";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "uint256";
                        readonly name: "_value";
                        readonly type: "uint256";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "bytes";
                        readonly name: "_data";
                        readonly type: "bytes";
                    }];
                    readonly name: "LogCall";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "_from";
                        readonly type: "address";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "uint256";
                        readonly name: "_amount";
                        readonly type: "uint256";
                    }];
                    readonly name: "LogReceivedEther";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "implementation";
                        readonly type: "address";
                    }];
                    readonly name: "Upgraded";
                    readonly type: "event";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "_owner";
                        readonly type: "address";
                    }];
                    readonly name: "__ECDSAWallet_init";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "__SmartWallet_init";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "uint256";
                        readonly name: "_chainID";
                        readonly type: "uint256";
                    }];
                    readonly name: "domainSeperator";
                    readonly outputs: readonly [{
                        readonly internalType: "bytes32";
                        readonly name: "";
                        readonly type: "bytes32";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly components: readonly [{
                            readonly internalType: "address";
                            readonly name: "to";
                            readonly type: "address";
                        }, {
                            readonly internalType: "uint256";
                            readonly name: "amount";
                            readonly type: "uint256";
                        }, {
                            readonly internalType: "bytes";
                            readonly name: "data";
                            readonly type: "bytes";
                        }];
                        readonly internalType: "struct IWallet.UserOp[]";
                        readonly name: "userOps";
                        readonly type: "tuple[]";
                    }, {
                        readonly internalType: "bytes";
                        readonly name: "_signature";
                        readonly type: "bytes";
                    }];
                    readonly name: "exec";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "nonce";
                    readonly outputs: readonly [{
                        readonly internalType: "uint256";
                        readonly name: "";
                        readonly type: "uint256";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "owner";
                    readonly outputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "";
                        readonly type: "address";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "proxiableUUID";
                    readonly outputs: readonly [{
                        readonly internalType: "bytes32";
                        readonly name: "";
                        readonly type: "bytes32";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "newImplementation";
                        readonly type: "address";
                    }];
                    readonly name: "upgradeTo";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "newImplementation";
                        readonly type: "address";
                    }, {
                        readonly internalType: "bytes";
                        readonly name: "data";
                        readonly type: "bytes";
                    }];
                    readonly name: "upgradeToAndCall";
                    readonly outputs: readonly [];
                    readonly stateMutability: "payable";
                    readonly type: "function";
                }, {
                    readonly stateMutability: "payable";
                    readonly type: "receive";
                }], "exec", readonly [readonly {
                    to: `0x${string}`;
                    amount: bigint;
                    data: `0x${string}`;
                }[], `0x${string}`], import("viem").Chain | undefined>, "address" | "abi" | "args" | "functionName">>) => Promise<bigint>;
                upgradeTo: (args: readonly [`0x${string}`], options: import("viem/chains").Prettify<import("viem").UnionOmit<import("viem").EstimateContractGasParameters<readonly [{
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: false;
                        readonly internalType: "address";
                        readonly name: "previousAdmin";
                        readonly type: "address";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "address";
                        readonly name: "newAdmin";
                        readonly type: "address";
                    }];
                    readonly name: "AdminChanged";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "beacon";
                        readonly type: "address";
                    }];
                    readonly name: "BeaconUpgraded";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: false;
                        readonly internalType: "uint8";
                        readonly name: "version";
                        readonly type: "uint8";
                    }];
                    readonly name: "Initialized";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "_contract";
                        readonly type: "address";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "uint256";
                        readonly name: "_value";
                        readonly type: "uint256";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "bytes";
                        readonly name: "_data";
                        readonly type: "bytes";
                    }];
                    readonly name: "LogCall";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "_from";
                        readonly type: "address";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "uint256";
                        readonly name: "_amount";
                        readonly type: "uint256";
                    }];
                    readonly name: "LogReceivedEther";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "implementation";
                        readonly type: "address";
                    }];
                    readonly name: "Upgraded";
                    readonly type: "event";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "_owner";
                        readonly type: "address";
                    }];
                    readonly name: "__ECDSAWallet_init";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "__SmartWallet_init";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "uint256";
                        readonly name: "_chainID";
                        readonly type: "uint256";
                    }];
                    readonly name: "domainSeperator";
                    readonly outputs: readonly [{
                        readonly internalType: "bytes32";
                        readonly name: "";
                        readonly type: "bytes32";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly components: readonly [{
                            readonly internalType: "address";
                            readonly name: "to";
                            readonly type: "address";
                        }, {
                            readonly internalType: "uint256";
                            readonly name: "amount";
                            readonly type: "uint256";
                        }, {
                            readonly internalType: "bytes";
                            readonly name: "data";
                            readonly type: "bytes";
                        }];
                        readonly internalType: "struct IWallet.UserOp[]";
                        readonly name: "userOps";
                        readonly type: "tuple[]";
                    }, {
                        readonly internalType: "bytes";
                        readonly name: "_signature";
                        readonly type: "bytes";
                    }];
                    readonly name: "exec";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "nonce";
                    readonly outputs: readonly [{
                        readonly internalType: "uint256";
                        readonly name: "";
                        readonly type: "uint256";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "owner";
                    readonly outputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "";
                        readonly type: "address";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "proxiableUUID";
                    readonly outputs: readonly [{
                        readonly internalType: "bytes32";
                        readonly name: "";
                        readonly type: "bytes32";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "newImplementation";
                        readonly type: "address";
                    }];
                    readonly name: "upgradeTo";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "newImplementation";
                        readonly type: "address";
                    }, {
                        readonly internalType: "bytes";
                        readonly name: "data";
                        readonly type: "bytes";
                    }];
                    readonly name: "upgradeToAndCall";
                    readonly outputs: readonly [];
                    readonly stateMutability: "payable";
                    readonly type: "function";
                }, {
                    readonly stateMutability: "payable";
                    readonly type: "receive";
                }], "upgradeTo", readonly [`0x${string}`], import("viem").Chain | undefined>, "address" | "abi" | "args" | "functionName">>) => Promise<bigint>;
                upgradeToAndCall: (args: readonly [`0x${string}`, `0x${string}`], options: import("viem/chains").Prettify<import("viem").UnionOmit<import("viem").EstimateContractGasParameters<readonly [{
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: false;
                        readonly internalType: "address";
                        readonly name: "previousAdmin";
                        readonly type: "address";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "address";
                        readonly name: "newAdmin";
                        readonly type: "address";
                    }];
                    readonly name: "AdminChanged";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "beacon";
                        readonly type: "address";
                    }];
                    readonly name: "BeaconUpgraded";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: false;
                        readonly internalType: "uint8";
                        readonly name: "version";
                        readonly type: "uint8";
                    }];
                    readonly name: "Initialized";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "_contract";
                        readonly type: "address";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "uint256";
                        readonly name: "_value";
                        readonly type: "uint256";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "bytes";
                        readonly name: "_data";
                        readonly type: "bytes";
                    }];
                    readonly name: "LogCall";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "_from";
                        readonly type: "address";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "uint256";
                        readonly name: "_amount";
                        readonly type: "uint256";
                    }];
                    readonly name: "LogReceivedEther";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "implementation";
                        readonly type: "address";
                    }];
                    readonly name: "Upgraded";
                    readonly type: "event";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "_owner";
                        readonly type: "address";
                    }];
                    readonly name: "__ECDSAWallet_init";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "__SmartWallet_init";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "uint256";
                        readonly name: "_chainID";
                        readonly type: "uint256";
                    }];
                    readonly name: "domainSeperator";
                    readonly outputs: readonly [{
                        readonly internalType: "bytes32";
                        readonly name: "";
                        readonly type: "bytes32";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly components: readonly [{
                            readonly internalType: "address";
                            readonly name: "to";
                            readonly type: "address";
                        }, {
                            readonly internalType: "uint256";
                            readonly name: "amount";
                            readonly type: "uint256";
                        }, {
                            readonly internalType: "bytes";
                            readonly name: "data";
                            readonly type: "bytes";
                        }];
                        readonly internalType: "struct IWallet.UserOp[]";
                        readonly name: "userOps";
                        readonly type: "tuple[]";
                    }, {
                        readonly internalType: "bytes";
                        readonly name: "_signature";
                        readonly type: "bytes";
                    }];
                    readonly name: "exec";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "nonce";
                    readonly outputs: readonly [{
                        readonly internalType: "uint256";
                        readonly name: "";
                        readonly type: "uint256";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "owner";
                    readonly outputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "";
                        readonly type: "address";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "proxiableUUID";
                    readonly outputs: readonly [{
                        readonly internalType: "bytes32";
                        readonly name: "";
                        readonly type: "bytes32";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "newImplementation";
                        readonly type: "address";
                    }];
                    readonly name: "upgradeTo";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "newImplementation";
                        readonly type: "address";
                    }, {
                        readonly internalType: "bytes";
                        readonly name: "data";
                        readonly type: "bytes";
                    }];
                    readonly name: "upgradeToAndCall";
                    readonly outputs: readonly [];
                    readonly stateMutability: "payable";
                    readonly type: "function";
                }, {
                    readonly stateMutability: "payable";
                    readonly type: "receive";
                }], "upgradeToAndCall", readonly [`0x${string}`, `0x${string}`], import("viem").Chain | undefined>, "address" | "abi" | "args" | "functionName">>) => Promise<bigint>;
            } & {
                __ECDSAWallet_init: (args: readonly [`0x${string}`], options: import("viem/chains").Prettify<import("viem").UnionOmit<import("viem").EstimateContractGasParameters<readonly [{
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: false;
                        readonly internalType: "address";
                        readonly name: "previousAdmin";
                        readonly type: "address";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "address";
                        readonly name: "newAdmin";
                        readonly type: "address";
                    }];
                    readonly name: "AdminChanged";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "beacon";
                        readonly type: "address";
                    }];
                    readonly name: "BeaconUpgraded";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: false;
                        readonly internalType: "uint8";
                        readonly name: "version";
                        readonly type: "uint8";
                    }];
                    readonly name: "Initialized";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "_contract";
                        readonly type: "address";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "uint256";
                        readonly name: "_value";
                        readonly type: "uint256";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "bytes";
                        readonly name: "_data";
                        readonly type: "bytes";
                    }];
                    readonly name: "LogCall";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "_from";
                        readonly type: "address";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "uint256";
                        readonly name: "_amount";
                        readonly type: "uint256";
                    }];
                    readonly name: "LogReceivedEther";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "implementation";
                        readonly type: "address";
                    }];
                    readonly name: "Upgraded";
                    readonly type: "event";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "_owner";
                        readonly type: "address";
                    }];
                    readonly name: "__ECDSAWallet_init";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "__SmartWallet_init";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "uint256";
                        readonly name: "_chainID";
                        readonly type: "uint256";
                    }];
                    readonly name: "domainSeperator";
                    readonly outputs: readonly [{
                        readonly internalType: "bytes32";
                        readonly name: "";
                        readonly type: "bytes32";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly components: readonly [{
                            readonly internalType: "address";
                            readonly name: "to";
                            readonly type: "address";
                        }, {
                            readonly internalType: "uint256";
                            readonly name: "amount";
                            readonly type: "uint256";
                        }, {
                            readonly internalType: "bytes";
                            readonly name: "data";
                            readonly type: "bytes";
                        }];
                        readonly internalType: "struct IWallet.UserOp[]";
                        readonly name: "userOps";
                        readonly type: "tuple[]";
                    }, {
                        readonly internalType: "bytes";
                        readonly name: "_signature";
                        readonly type: "bytes";
                    }];
                    readonly name: "exec";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "nonce";
                    readonly outputs: readonly [{
                        readonly internalType: "uint256";
                        readonly name: "";
                        readonly type: "uint256";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "owner";
                    readonly outputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "";
                        readonly type: "address";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "proxiableUUID";
                    readonly outputs: readonly [{
                        readonly internalType: "bytes32";
                        readonly name: "";
                        readonly type: "bytes32";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "newImplementation";
                        readonly type: "address";
                    }];
                    readonly name: "upgradeTo";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "newImplementation";
                        readonly type: "address";
                    }, {
                        readonly internalType: "bytes";
                        readonly name: "data";
                        readonly type: "bytes";
                    }];
                    readonly name: "upgradeToAndCall";
                    readonly outputs: readonly [];
                    readonly stateMutability: "payable";
                    readonly type: "function";
                }, {
                    readonly stateMutability: "payable";
                    readonly type: "receive";
                }], "__ECDSAWallet_init", readonly [`0x${string}`], import("viem").Chain | undefined>, "address" | "abi" | "args" | "functionName">>) => Promise<bigint>;
                __SmartWallet_init: (options: import("viem/chains").Prettify<import("viem").UnionOmit<import("viem").EstimateContractGasParameters<readonly [{
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: false;
                        readonly internalType: "address";
                        readonly name: "previousAdmin";
                        readonly type: "address";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "address";
                        readonly name: "newAdmin";
                        readonly type: "address";
                    }];
                    readonly name: "AdminChanged";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "beacon";
                        readonly type: "address";
                    }];
                    readonly name: "BeaconUpgraded";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: false;
                        readonly internalType: "uint8";
                        readonly name: "version";
                        readonly type: "uint8";
                    }];
                    readonly name: "Initialized";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "_contract";
                        readonly type: "address";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "uint256";
                        readonly name: "_value";
                        readonly type: "uint256";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "bytes";
                        readonly name: "_data";
                        readonly type: "bytes";
                    }];
                    readonly name: "LogCall";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "_from";
                        readonly type: "address";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "uint256";
                        readonly name: "_amount";
                        readonly type: "uint256";
                    }];
                    readonly name: "LogReceivedEther";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "implementation";
                        readonly type: "address";
                    }];
                    readonly name: "Upgraded";
                    readonly type: "event";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "_owner";
                        readonly type: "address";
                    }];
                    readonly name: "__ECDSAWallet_init";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "__SmartWallet_init";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "uint256";
                        readonly name: "_chainID";
                        readonly type: "uint256";
                    }];
                    readonly name: "domainSeperator";
                    readonly outputs: readonly [{
                        readonly internalType: "bytes32";
                        readonly name: "";
                        readonly type: "bytes32";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly components: readonly [{
                            readonly internalType: "address";
                            readonly name: "to";
                            readonly type: "address";
                        }, {
                            readonly internalType: "uint256";
                            readonly name: "amount";
                            readonly type: "uint256";
                        }, {
                            readonly internalType: "bytes";
                            readonly name: "data";
                            readonly type: "bytes";
                        }];
                        readonly internalType: "struct IWallet.UserOp[]";
                        readonly name: "userOps";
                        readonly type: "tuple[]";
                    }, {
                        readonly internalType: "bytes";
                        readonly name: "_signature";
                        readonly type: "bytes";
                    }];
                    readonly name: "exec";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "nonce";
                    readonly outputs: readonly [{
                        readonly internalType: "uint256";
                        readonly name: "";
                        readonly type: "uint256";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "owner";
                    readonly outputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "";
                        readonly type: "address";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "proxiableUUID";
                    readonly outputs: readonly [{
                        readonly internalType: "bytes32";
                        readonly name: "";
                        readonly type: "bytes32";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "newImplementation";
                        readonly type: "address";
                    }];
                    readonly name: "upgradeTo";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "newImplementation";
                        readonly type: "address";
                    }, {
                        readonly internalType: "bytes";
                        readonly name: "data";
                        readonly type: "bytes";
                    }];
                    readonly name: "upgradeToAndCall";
                    readonly outputs: readonly [];
                    readonly stateMutability: "payable";
                    readonly type: "function";
                }, {
                    readonly stateMutability: "payable";
                    readonly type: "receive";
                }], "__SmartWallet_init", readonly [], import("viem").Chain | undefined>, "address" | "abi" | "args" | "functionName">>) => Promise<bigint>;
                exec: (args: readonly [readonly {
                    to: `0x${string}`;
                    amount: bigint;
                    data: `0x${string}`;
                }[], `0x${string}`], options: import("viem/chains").Prettify<import("viem").UnionOmit<import("viem").EstimateContractGasParameters<readonly [{
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: false;
                        readonly internalType: "address";
                        readonly name: "previousAdmin";
                        readonly type: "address";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "address";
                        readonly name: "newAdmin";
                        readonly type: "address";
                    }];
                    readonly name: "AdminChanged";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "beacon";
                        readonly type: "address";
                    }];
                    readonly name: "BeaconUpgraded";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: false;
                        readonly internalType: "uint8";
                        readonly name: "version";
                        readonly type: "uint8";
                    }];
                    readonly name: "Initialized";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "_contract";
                        readonly type: "address";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "uint256";
                        readonly name: "_value";
                        readonly type: "uint256";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "bytes";
                        readonly name: "_data";
                        readonly type: "bytes";
                    }];
                    readonly name: "LogCall";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "_from";
                        readonly type: "address";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "uint256";
                        readonly name: "_amount";
                        readonly type: "uint256";
                    }];
                    readonly name: "LogReceivedEther";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "implementation";
                        readonly type: "address";
                    }];
                    readonly name: "Upgraded";
                    readonly type: "event";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "_owner";
                        readonly type: "address";
                    }];
                    readonly name: "__ECDSAWallet_init";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "__SmartWallet_init";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "uint256";
                        readonly name: "_chainID";
                        readonly type: "uint256";
                    }];
                    readonly name: "domainSeperator";
                    readonly outputs: readonly [{
                        readonly internalType: "bytes32";
                        readonly name: "";
                        readonly type: "bytes32";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly components: readonly [{
                            readonly internalType: "address";
                            readonly name: "to";
                            readonly type: "address";
                        }, {
                            readonly internalType: "uint256";
                            readonly name: "amount";
                            readonly type: "uint256";
                        }, {
                            readonly internalType: "bytes";
                            readonly name: "data";
                            readonly type: "bytes";
                        }];
                        readonly internalType: "struct IWallet.UserOp[]";
                        readonly name: "userOps";
                        readonly type: "tuple[]";
                    }, {
                        readonly internalType: "bytes";
                        readonly name: "_signature";
                        readonly type: "bytes";
                    }];
                    readonly name: "exec";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "nonce";
                    readonly outputs: readonly [{
                        readonly internalType: "uint256";
                        readonly name: "";
                        readonly type: "uint256";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "owner";
                    readonly outputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "";
                        readonly type: "address";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "proxiableUUID";
                    readonly outputs: readonly [{
                        readonly internalType: "bytes32";
                        readonly name: "";
                        readonly type: "bytes32";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "newImplementation";
                        readonly type: "address";
                    }];
                    readonly name: "upgradeTo";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "newImplementation";
                        readonly type: "address";
                    }, {
                        readonly internalType: "bytes";
                        readonly name: "data";
                        readonly type: "bytes";
                    }];
                    readonly name: "upgradeToAndCall";
                    readonly outputs: readonly [];
                    readonly stateMutability: "payable";
                    readonly type: "function";
                }, {
                    readonly stateMutability: "payable";
                    readonly type: "receive";
                }], "exec", readonly [readonly {
                    to: `0x${string}`;
                    amount: bigint;
                    data: `0x${string}`;
                }[], `0x${string}`], import("viem").Chain | undefined>, "address" | "abi" | "args" | "functionName">>) => Promise<bigint>;
                upgradeTo: (args: readonly [`0x${string}`], options: import("viem/chains").Prettify<import("viem").UnionOmit<import("viem").EstimateContractGasParameters<readonly [{
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: false;
                        readonly internalType: "address";
                        readonly name: "previousAdmin";
                        readonly type: "address";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "address";
                        readonly name: "newAdmin";
                        readonly type: "address";
                    }];
                    readonly name: "AdminChanged";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "beacon";
                        readonly type: "address";
                    }];
                    readonly name: "BeaconUpgraded";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: false;
                        readonly internalType: "uint8";
                        readonly name: "version";
                        readonly type: "uint8";
                    }];
                    readonly name: "Initialized";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "_contract";
                        readonly type: "address";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "uint256";
                        readonly name: "_value";
                        readonly type: "uint256";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "bytes";
                        readonly name: "_data";
                        readonly type: "bytes";
                    }];
                    readonly name: "LogCall";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "_from";
                        readonly type: "address";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "uint256";
                        readonly name: "_amount";
                        readonly type: "uint256";
                    }];
                    readonly name: "LogReceivedEther";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "implementation";
                        readonly type: "address";
                    }];
                    readonly name: "Upgraded";
                    readonly type: "event";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "_owner";
                        readonly type: "address";
                    }];
                    readonly name: "__ECDSAWallet_init";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "__SmartWallet_init";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "uint256";
                        readonly name: "_chainID";
                        readonly type: "uint256";
                    }];
                    readonly name: "domainSeperator";
                    readonly outputs: readonly [{
                        readonly internalType: "bytes32";
                        readonly name: "";
                        readonly type: "bytes32";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly components: readonly [{
                            readonly internalType: "address";
                            readonly name: "to";
                            readonly type: "address";
                        }, {
                            readonly internalType: "uint256";
                            readonly name: "amount";
                            readonly type: "uint256";
                        }, {
                            readonly internalType: "bytes";
                            readonly name: "data";
                            readonly type: "bytes";
                        }];
                        readonly internalType: "struct IWallet.UserOp[]";
                        readonly name: "userOps";
                        readonly type: "tuple[]";
                    }, {
                        readonly internalType: "bytes";
                        readonly name: "_signature";
                        readonly type: "bytes";
                    }];
                    readonly name: "exec";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "nonce";
                    readonly outputs: readonly [{
                        readonly internalType: "uint256";
                        readonly name: "";
                        readonly type: "uint256";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "owner";
                    readonly outputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "";
                        readonly type: "address";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "proxiableUUID";
                    readonly outputs: readonly [{
                        readonly internalType: "bytes32";
                        readonly name: "";
                        readonly type: "bytes32";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "newImplementation";
                        readonly type: "address";
                    }];
                    readonly name: "upgradeTo";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "newImplementation";
                        readonly type: "address";
                    }, {
                        readonly internalType: "bytes";
                        readonly name: "data";
                        readonly type: "bytes";
                    }];
                    readonly name: "upgradeToAndCall";
                    readonly outputs: readonly [];
                    readonly stateMutability: "payable";
                    readonly type: "function";
                }, {
                    readonly stateMutability: "payable";
                    readonly type: "receive";
                }], "upgradeTo", readonly [`0x${string}`], import("viem").Chain | undefined>, "address" | "abi" | "args" | "functionName">>) => Promise<bigint>;
                upgradeToAndCall: (args: readonly [`0x${string}`, `0x${string}`], options: import("viem/chains").Prettify<import("viem").UnionOmit<import("viem").EstimateContractGasParameters<readonly [{
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: false;
                        readonly internalType: "address";
                        readonly name: "previousAdmin";
                        readonly type: "address";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "address";
                        readonly name: "newAdmin";
                        readonly type: "address";
                    }];
                    readonly name: "AdminChanged";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "beacon";
                        readonly type: "address";
                    }];
                    readonly name: "BeaconUpgraded";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: false;
                        readonly internalType: "uint8";
                        readonly name: "version";
                        readonly type: "uint8";
                    }];
                    readonly name: "Initialized";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "_contract";
                        readonly type: "address";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "uint256";
                        readonly name: "_value";
                        readonly type: "uint256";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "bytes";
                        readonly name: "_data";
                        readonly type: "bytes";
                    }];
                    readonly name: "LogCall";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "_from";
                        readonly type: "address";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "uint256";
                        readonly name: "_amount";
                        readonly type: "uint256";
                    }];
                    readonly name: "LogReceivedEther";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "implementation";
                        readonly type: "address";
                    }];
                    readonly name: "Upgraded";
                    readonly type: "event";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "_owner";
                        readonly type: "address";
                    }];
                    readonly name: "__ECDSAWallet_init";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "__SmartWallet_init";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "uint256";
                        readonly name: "_chainID";
                        readonly type: "uint256";
                    }];
                    readonly name: "domainSeperator";
                    readonly outputs: readonly [{
                        readonly internalType: "bytes32";
                        readonly name: "";
                        readonly type: "bytes32";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly components: readonly [{
                            readonly internalType: "address";
                            readonly name: "to";
                            readonly type: "address";
                        }, {
                            readonly internalType: "uint256";
                            readonly name: "amount";
                            readonly type: "uint256";
                        }, {
                            readonly internalType: "bytes";
                            readonly name: "data";
                            readonly type: "bytes";
                        }];
                        readonly internalType: "struct IWallet.UserOp[]";
                        readonly name: "userOps";
                        readonly type: "tuple[]";
                    }, {
                        readonly internalType: "bytes";
                        readonly name: "_signature";
                        readonly type: "bytes";
                    }];
                    readonly name: "exec";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "nonce";
                    readonly outputs: readonly [{
                        readonly internalType: "uint256";
                        readonly name: "";
                        readonly type: "uint256";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "owner";
                    readonly outputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "";
                        readonly type: "address";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "proxiableUUID";
                    readonly outputs: readonly [{
                        readonly internalType: "bytes32";
                        readonly name: "";
                        readonly type: "bytes32";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "newImplementation";
                        readonly type: "address";
                    }];
                    readonly name: "upgradeTo";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "newImplementation";
                        readonly type: "address";
                    }, {
                        readonly internalType: "bytes";
                        readonly name: "data";
                        readonly type: "bytes";
                    }];
                    readonly name: "upgradeToAndCall";
                    readonly outputs: readonly [];
                    readonly stateMutability: "payable";
                    readonly type: "function";
                }, {
                    readonly stateMutability: "payable";
                    readonly type: "receive";
                }], "upgradeToAndCall", readonly [`0x${string}`, `0x${string}`], import("viem").Chain | undefined>, "address" | "abi" | "args" | "functionName">>) => Promise<bigint>;
            };
            simulate: {
                __ECDSAWallet_init: <TChainOverride extends import("viem").Chain | undefined, TAccountOverride extends `0x${string}` | import("viem").Account | undefined = undefined>(args: readonly [`0x${string}`], options?: Omit<import("viem").SimulateContractParameters<readonly [{
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: false;
                        readonly internalType: "address";
                        readonly name: "previousAdmin";
                        readonly type: "address";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "address";
                        readonly name: "newAdmin";
                        readonly type: "address";
                    }];
                    readonly name: "AdminChanged";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "beacon";
                        readonly type: "address";
                    }];
                    readonly name: "BeaconUpgraded";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: false;
                        readonly internalType: "uint8";
                        readonly name: "version";
                        readonly type: "uint8";
                    }];
                    readonly name: "Initialized";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "_contract";
                        readonly type: "address";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "uint256";
                        readonly name: "_value";
                        readonly type: "uint256";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "bytes";
                        readonly name: "_data";
                        readonly type: "bytes";
                    }];
                    readonly name: "LogCall";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "_from";
                        readonly type: "address";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "uint256";
                        readonly name: "_amount";
                        readonly type: "uint256";
                    }];
                    readonly name: "LogReceivedEther";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "implementation";
                        readonly type: "address";
                    }];
                    readonly name: "Upgraded";
                    readonly type: "event";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "_owner";
                        readonly type: "address";
                    }];
                    readonly name: "__ECDSAWallet_init";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "__SmartWallet_init";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "uint256";
                        readonly name: "_chainID";
                        readonly type: "uint256";
                    }];
                    readonly name: "domainSeperator";
                    readonly outputs: readonly [{
                        readonly internalType: "bytes32";
                        readonly name: "";
                        readonly type: "bytes32";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly components: readonly [{
                            readonly internalType: "address";
                            readonly name: "to";
                            readonly type: "address";
                        }, {
                            readonly internalType: "uint256";
                            readonly name: "amount";
                            readonly type: "uint256";
                        }, {
                            readonly internalType: "bytes";
                            readonly name: "data";
                            readonly type: "bytes";
                        }];
                        readonly internalType: "struct IWallet.UserOp[]";
                        readonly name: "userOps";
                        readonly type: "tuple[]";
                    }, {
                        readonly internalType: "bytes";
                        readonly name: "_signature";
                        readonly type: "bytes";
                    }];
                    readonly name: "exec";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "nonce";
                    readonly outputs: readonly [{
                        readonly internalType: "uint256";
                        readonly name: "";
                        readonly type: "uint256";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "owner";
                    readonly outputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "";
                        readonly type: "address";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "proxiableUUID";
                    readonly outputs: readonly [{
                        readonly internalType: "bytes32";
                        readonly name: "";
                        readonly type: "bytes32";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "newImplementation";
                        readonly type: "address";
                    }];
                    readonly name: "upgradeTo";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "newImplementation";
                        readonly type: "address";
                    }, {
                        readonly internalType: "bytes";
                        readonly name: "data";
                        readonly type: "bytes";
                    }];
                    readonly name: "upgradeToAndCall";
                    readonly outputs: readonly [];
                    readonly stateMutability: "payable";
                    readonly type: "function";
                }, {
                    readonly stateMutability: "payable";
                    readonly type: "receive";
                }], "__ECDSAWallet_init", readonly [`0x${string}`], import("viem").Chain | undefined, TChainOverride, TAccountOverride>, "address" | "abi" | "args" | "functionName"> | undefined) => Promise<import("viem").SimulateContractReturnType<readonly [{
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: false;
                        readonly internalType: "address";
                        readonly name: "previousAdmin";
                        readonly type: "address";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "address";
                        readonly name: "newAdmin";
                        readonly type: "address";
                    }];
                    readonly name: "AdminChanged";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "beacon";
                        readonly type: "address";
                    }];
                    readonly name: "BeaconUpgraded";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: false;
                        readonly internalType: "uint8";
                        readonly name: "version";
                        readonly type: "uint8";
                    }];
                    readonly name: "Initialized";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "_contract";
                        readonly type: "address";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "uint256";
                        readonly name: "_value";
                        readonly type: "uint256";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "bytes";
                        readonly name: "_data";
                        readonly type: "bytes";
                    }];
                    readonly name: "LogCall";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "_from";
                        readonly type: "address";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "uint256";
                        readonly name: "_amount";
                        readonly type: "uint256";
                    }];
                    readonly name: "LogReceivedEther";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "implementation";
                        readonly type: "address";
                    }];
                    readonly name: "Upgraded";
                    readonly type: "event";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "_owner";
                        readonly type: "address";
                    }];
                    readonly name: "__ECDSAWallet_init";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "__SmartWallet_init";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "uint256";
                        readonly name: "_chainID";
                        readonly type: "uint256";
                    }];
                    readonly name: "domainSeperator";
                    readonly outputs: readonly [{
                        readonly internalType: "bytes32";
                        readonly name: "";
                        readonly type: "bytes32";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly components: readonly [{
                            readonly internalType: "address";
                            readonly name: "to";
                            readonly type: "address";
                        }, {
                            readonly internalType: "uint256";
                            readonly name: "amount";
                            readonly type: "uint256";
                        }, {
                            readonly internalType: "bytes";
                            readonly name: "data";
                            readonly type: "bytes";
                        }];
                        readonly internalType: "struct IWallet.UserOp[]";
                        readonly name: "userOps";
                        readonly type: "tuple[]";
                    }, {
                        readonly internalType: "bytes";
                        readonly name: "_signature";
                        readonly type: "bytes";
                    }];
                    readonly name: "exec";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "nonce";
                    readonly outputs: readonly [{
                        readonly internalType: "uint256";
                        readonly name: "";
                        readonly type: "uint256";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "owner";
                    readonly outputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "";
                        readonly type: "address";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "proxiableUUID";
                    readonly outputs: readonly [{
                        readonly internalType: "bytes32";
                        readonly name: "";
                        readonly type: "bytes32";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "newImplementation";
                        readonly type: "address";
                    }];
                    readonly name: "upgradeTo";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "newImplementation";
                        readonly type: "address";
                    }, {
                        readonly internalType: "bytes";
                        readonly name: "data";
                        readonly type: "bytes";
                    }];
                    readonly name: "upgradeToAndCall";
                    readonly outputs: readonly [];
                    readonly stateMutability: "payable";
                    readonly type: "function";
                }, {
                    readonly stateMutability: "payable";
                    readonly type: "receive";
                }], "__ECDSAWallet_init", readonly [`0x${string}`], import("viem").Chain | undefined, undefined, TChainOverride, TAccountOverride>>;
                __SmartWallet_init: <TChainOverride_1 extends import("viem").Chain | undefined, TAccountOverride_1 extends `0x${string}` | import("viem").Account | undefined = undefined>(options?: Omit<import("viem").SimulateContractParameters<readonly [{
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: false;
                        readonly internalType: "address";
                        readonly name: "previousAdmin";
                        readonly type: "address";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "address";
                        readonly name: "newAdmin";
                        readonly type: "address";
                    }];
                    readonly name: "AdminChanged";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "beacon";
                        readonly type: "address";
                    }];
                    readonly name: "BeaconUpgraded";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: false;
                        readonly internalType: "uint8";
                        readonly name: "version";
                        readonly type: "uint8";
                    }];
                    readonly name: "Initialized";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "_contract";
                        readonly type: "address";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "uint256";
                        readonly name: "_value";
                        readonly type: "uint256";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "bytes";
                        readonly name: "_data";
                        readonly type: "bytes";
                    }];
                    readonly name: "LogCall";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "_from";
                        readonly type: "address";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "uint256";
                        readonly name: "_amount";
                        readonly type: "uint256";
                    }];
                    readonly name: "LogReceivedEther";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "implementation";
                        readonly type: "address";
                    }];
                    readonly name: "Upgraded";
                    readonly type: "event";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "_owner";
                        readonly type: "address";
                    }];
                    readonly name: "__ECDSAWallet_init";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "__SmartWallet_init";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "uint256";
                        readonly name: "_chainID";
                        readonly type: "uint256";
                    }];
                    readonly name: "domainSeperator";
                    readonly outputs: readonly [{
                        readonly internalType: "bytes32";
                        readonly name: "";
                        readonly type: "bytes32";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly components: readonly [{
                            readonly internalType: "address";
                            readonly name: "to";
                            readonly type: "address";
                        }, {
                            readonly internalType: "uint256";
                            readonly name: "amount";
                            readonly type: "uint256";
                        }, {
                            readonly internalType: "bytes";
                            readonly name: "data";
                            readonly type: "bytes";
                        }];
                        readonly internalType: "struct IWallet.UserOp[]";
                        readonly name: "userOps";
                        readonly type: "tuple[]";
                    }, {
                        readonly internalType: "bytes";
                        readonly name: "_signature";
                        readonly type: "bytes";
                    }];
                    readonly name: "exec";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "nonce";
                    readonly outputs: readonly [{
                        readonly internalType: "uint256";
                        readonly name: "";
                        readonly type: "uint256";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "owner";
                    readonly outputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "";
                        readonly type: "address";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "proxiableUUID";
                    readonly outputs: readonly [{
                        readonly internalType: "bytes32";
                        readonly name: "";
                        readonly type: "bytes32";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "newImplementation";
                        readonly type: "address";
                    }];
                    readonly name: "upgradeTo";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "newImplementation";
                        readonly type: "address";
                    }, {
                        readonly internalType: "bytes";
                        readonly name: "data";
                        readonly type: "bytes";
                    }];
                    readonly name: "upgradeToAndCall";
                    readonly outputs: readonly [];
                    readonly stateMutability: "payable";
                    readonly type: "function";
                }, {
                    readonly stateMutability: "payable";
                    readonly type: "receive";
                }], "__SmartWallet_init", readonly [], import("viem").Chain | undefined, TChainOverride_1, TAccountOverride_1>, "address" | "abi" | "args" | "functionName"> | undefined) => Promise<import("viem").SimulateContractReturnType<readonly [{
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: false;
                        readonly internalType: "address";
                        readonly name: "previousAdmin";
                        readonly type: "address";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "address";
                        readonly name: "newAdmin";
                        readonly type: "address";
                    }];
                    readonly name: "AdminChanged";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "beacon";
                        readonly type: "address";
                    }];
                    readonly name: "BeaconUpgraded";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: false;
                        readonly internalType: "uint8";
                        readonly name: "version";
                        readonly type: "uint8";
                    }];
                    readonly name: "Initialized";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "_contract";
                        readonly type: "address";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "uint256";
                        readonly name: "_value";
                        readonly type: "uint256";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "bytes";
                        readonly name: "_data";
                        readonly type: "bytes";
                    }];
                    readonly name: "LogCall";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "_from";
                        readonly type: "address";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "uint256";
                        readonly name: "_amount";
                        readonly type: "uint256";
                    }];
                    readonly name: "LogReceivedEther";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "implementation";
                        readonly type: "address";
                    }];
                    readonly name: "Upgraded";
                    readonly type: "event";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "_owner";
                        readonly type: "address";
                    }];
                    readonly name: "__ECDSAWallet_init";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "__SmartWallet_init";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "uint256";
                        readonly name: "_chainID";
                        readonly type: "uint256";
                    }];
                    readonly name: "domainSeperator";
                    readonly outputs: readonly [{
                        readonly internalType: "bytes32";
                        readonly name: "";
                        readonly type: "bytes32";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly components: readonly [{
                            readonly internalType: "address";
                            readonly name: "to";
                            readonly type: "address";
                        }, {
                            readonly internalType: "uint256";
                            readonly name: "amount";
                            readonly type: "uint256";
                        }, {
                            readonly internalType: "bytes";
                            readonly name: "data";
                            readonly type: "bytes";
                        }];
                        readonly internalType: "struct IWallet.UserOp[]";
                        readonly name: "userOps";
                        readonly type: "tuple[]";
                    }, {
                        readonly internalType: "bytes";
                        readonly name: "_signature";
                        readonly type: "bytes";
                    }];
                    readonly name: "exec";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "nonce";
                    readonly outputs: readonly [{
                        readonly internalType: "uint256";
                        readonly name: "";
                        readonly type: "uint256";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "owner";
                    readonly outputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "";
                        readonly type: "address";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "proxiableUUID";
                    readonly outputs: readonly [{
                        readonly internalType: "bytes32";
                        readonly name: "";
                        readonly type: "bytes32";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "newImplementation";
                        readonly type: "address";
                    }];
                    readonly name: "upgradeTo";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "newImplementation";
                        readonly type: "address";
                    }, {
                        readonly internalType: "bytes";
                        readonly name: "data";
                        readonly type: "bytes";
                    }];
                    readonly name: "upgradeToAndCall";
                    readonly outputs: readonly [];
                    readonly stateMutability: "payable";
                    readonly type: "function";
                }, {
                    readonly stateMutability: "payable";
                    readonly type: "receive";
                }], "__SmartWallet_init", readonly [], import("viem").Chain | undefined, undefined, TChainOverride_1, TAccountOverride_1>>;
                exec: <TChainOverride_2 extends import("viem").Chain | undefined, TAccountOverride_2 extends `0x${string}` | import("viem").Account | undefined = undefined>(args: readonly [readonly {
                    to: `0x${string}`;
                    amount: bigint;
                    data: `0x${string}`;
                }[], `0x${string}`], options?: Omit<import("viem").SimulateContractParameters<readonly [{
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: false;
                        readonly internalType: "address";
                        readonly name: "previousAdmin";
                        readonly type: "address";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "address";
                        readonly name: "newAdmin";
                        readonly type: "address";
                    }];
                    readonly name: "AdminChanged";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "beacon";
                        readonly type: "address";
                    }];
                    readonly name: "BeaconUpgraded";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: false;
                        readonly internalType: "uint8";
                        readonly name: "version";
                        readonly type: "uint8";
                    }];
                    readonly name: "Initialized";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "_contract";
                        readonly type: "address";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "uint256";
                        readonly name: "_value";
                        readonly type: "uint256";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "bytes";
                        readonly name: "_data";
                        readonly type: "bytes";
                    }];
                    readonly name: "LogCall";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "_from";
                        readonly type: "address";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "uint256";
                        readonly name: "_amount";
                        readonly type: "uint256";
                    }];
                    readonly name: "LogReceivedEther";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "implementation";
                        readonly type: "address";
                    }];
                    readonly name: "Upgraded";
                    readonly type: "event";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "_owner";
                        readonly type: "address";
                    }];
                    readonly name: "__ECDSAWallet_init";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "__SmartWallet_init";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "uint256";
                        readonly name: "_chainID";
                        readonly type: "uint256";
                    }];
                    readonly name: "domainSeperator";
                    readonly outputs: readonly [{
                        readonly internalType: "bytes32";
                        readonly name: "";
                        readonly type: "bytes32";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly components: readonly [{
                            readonly internalType: "address";
                            readonly name: "to";
                            readonly type: "address";
                        }, {
                            readonly internalType: "uint256";
                            readonly name: "amount";
                            readonly type: "uint256";
                        }, {
                            readonly internalType: "bytes";
                            readonly name: "data";
                            readonly type: "bytes";
                        }];
                        readonly internalType: "struct IWallet.UserOp[]";
                        readonly name: "userOps";
                        readonly type: "tuple[]";
                    }, {
                        readonly internalType: "bytes";
                        readonly name: "_signature";
                        readonly type: "bytes";
                    }];
                    readonly name: "exec";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "nonce";
                    readonly outputs: readonly [{
                        readonly internalType: "uint256";
                        readonly name: "";
                        readonly type: "uint256";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "owner";
                    readonly outputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "";
                        readonly type: "address";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "proxiableUUID";
                    readonly outputs: readonly [{
                        readonly internalType: "bytes32";
                        readonly name: "";
                        readonly type: "bytes32";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "newImplementation";
                        readonly type: "address";
                    }];
                    readonly name: "upgradeTo";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "newImplementation";
                        readonly type: "address";
                    }, {
                        readonly internalType: "bytes";
                        readonly name: "data";
                        readonly type: "bytes";
                    }];
                    readonly name: "upgradeToAndCall";
                    readonly outputs: readonly [];
                    readonly stateMutability: "payable";
                    readonly type: "function";
                }, {
                    readonly stateMutability: "payable";
                    readonly type: "receive";
                }], "exec", readonly [readonly {
                    to: `0x${string}`;
                    amount: bigint;
                    data: `0x${string}`;
                }[], `0x${string}`], import("viem").Chain | undefined, TChainOverride_2, TAccountOverride_2>, "address" | "abi" | "args" | "functionName"> | undefined) => Promise<import("viem").SimulateContractReturnType<readonly [{
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: false;
                        readonly internalType: "address";
                        readonly name: "previousAdmin";
                        readonly type: "address";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "address";
                        readonly name: "newAdmin";
                        readonly type: "address";
                    }];
                    readonly name: "AdminChanged";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "beacon";
                        readonly type: "address";
                    }];
                    readonly name: "BeaconUpgraded";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: false;
                        readonly internalType: "uint8";
                        readonly name: "version";
                        readonly type: "uint8";
                    }];
                    readonly name: "Initialized";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "_contract";
                        readonly type: "address";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "uint256";
                        readonly name: "_value";
                        readonly type: "uint256";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "bytes";
                        readonly name: "_data";
                        readonly type: "bytes";
                    }];
                    readonly name: "LogCall";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "_from";
                        readonly type: "address";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "uint256";
                        readonly name: "_amount";
                        readonly type: "uint256";
                    }];
                    readonly name: "LogReceivedEther";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "implementation";
                        readonly type: "address";
                    }];
                    readonly name: "Upgraded";
                    readonly type: "event";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "_owner";
                        readonly type: "address";
                    }];
                    readonly name: "__ECDSAWallet_init";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "__SmartWallet_init";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "uint256";
                        readonly name: "_chainID";
                        readonly type: "uint256";
                    }];
                    readonly name: "domainSeperator";
                    readonly outputs: readonly [{
                        readonly internalType: "bytes32";
                        readonly name: "";
                        readonly type: "bytes32";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly components: readonly [{
                            readonly internalType: "address";
                            readonly name: "to";
                            readonly type: "address";
                        }, {
                            readonly internalType: "uint256";
                            readonly name: "amount";
                            readonly type: "uint256";
                        }, {
                            readonly internalType: "bytes";
                            readonly name: "data";
                            readonly type: "bytes";
                        }];
                        readonly internalType: "struct IWallet.UserOp[]";
                        readonly name: "userOps";
                        readonly type: "tuple[]";
                    }, {
                        readonly internalType: "bytes";
                        readonly name: "_signature";
                        readonly type: "bytes";
                    }];
                    readonly name: "exec";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "nonce";
                    readonly outputs: readonly [{
                        readonly internalType: "uint256";
                        readonly name: "";
                        readonly type: "uint256";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "owner";
                    readonly outputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "";
                        readonly type: "address";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "proxiableUUID";
                    readonly outputs: readonly [{
                        readonly internalType: "bytes32";
                        readonly name: "";
                        readonly type: "bytes32";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "newImplementation";
                        readonly type: "address";
                    }];
                    readonly name: "upgradeTo";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "newImplementation";
                        readonly type: "address";
                    }, {
                        readonly internalType: "bytes";
                        readonly name: "data";
                        readonly type: "bytes";
                    }];
                    readonly name: "upgradeToAndCall";
                    readonly outputs: readonly [];
                    readonly stateMutability: "payable";
                    readonly type: "function";
                }, {
                    readonly stateMutability: "payable";
                    readonly type: "receive";
                }], "exec", readonly [readonly {
                    to: `0x${string}`;
                    amount: bigint;
                    data: `0x${string}`;
                }[], `0x${string}`], import("viem").Chain | undefined, undefined, TChainOverride_2, TAccountOverride_2>>;
                upgradeTo: <TChainOverride_3 extends import("viem").Chain | undefined, TAccountOverride_3 extends `0x${string}` | import("viem").Account | undefined = undefined>(args: readonly [`0x${string}`], options?: Omit<import("viem").SimulateContractParameters<readonly [{
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: false;
                        readonly internalType: "address";
                        readonly name: "previousAdmin";
                        readonly type: "address";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "address";
                        readonly name: "newAdmin";
                        readonly type: "address";
                    }];
                    readonly name: "AdminChanged";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "beacon";
                        readonly type: "address";
                    }];
                    readonly name: "BeaconUpgraded";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: false;
                        readonly internalType: "uint8";
                        readonly name: "version";
                        readonly type: "uint8";
                    }];
                    readonly name: "Initialized";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "_contract";
                        readonly type: "address";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "uint256";
                        readonly name: "_value";
                        readonly type: "uint256";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "bytes";
                        readonly name: "_data";
                        readonly type: "bytes";
                    }];
                    readonly name: "LogCall";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "_from";
                        readonly type: "address";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "uint256";
                        readonly name: "_amount";
                        readonly type: "uint256";
                    }];
                    readonly name: "LogReceivedEther";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "implementation";
                        readonly type: "address";
                    }];
                    readonly name: "Upgraded";
                    readonly type: "event";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "_owner";
                        readonly type: "address";
                    }];
                    readonly name: "__ECDSAWallet_init";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "__SmartWallet_init";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "uint256";
                        readonly name: "_chainID";
                        readonly type: "uint256";
                    }];
                    readonly name: "domainSeperator";
                    readonly outputs: readonly [{
                        readonly internalType: "bytes32";
                        readonly name: "";
                        readonly type: "bytes32";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly components: readonly [{
                            readonly internalType: "address";
                            readonly name: "to";
                            readonly type: "address";
                        }, {
                            readonly internalType: "uint256";
                            readonly name: "amount";
                            readonly type: "uint256";
                        }, {
                            readonly internalType: "bytes";
                            readonly name: "data";
                            readonly type: "bytes";
                        }];
                        readonly internalType: "struct IWallet.UserOp[]";
                        readonly name: "userOps";
                        readonly type: "tuple[]";
                    }, {
                        readonly internalType: "bytes";
                        readonly name: "_signature";
                        readonly type: "bytes";
                    }];
                    readonly name: "exec";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "nonce";
                    readonly outputs: readonly [{
                        readonly internalType: "uint256";
                        readonly name: "";
                        readonly type: "uint256";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "owner";
                    readonly outputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "";
                        readonly type: "address";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "proxiableUUID";
                    readonly outputs: readonly [{
                        readonly internalType: "bytes32";
                        readonly name: "";
                        readonly type: "bytes32";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "newImplementation";
                        readonly type: "address";
                    }];
                    readonly name: "upgradeTo";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "newImplementation";
                        readonly type: "address";
                    }, {
                        readonly internalType: "bytes";
                        readonly name: "data";
                        readonly type: "bytes";
                    }];
                    readonly name: "upgradeToAndCall";
                    readonly outputs: readonly [];
                    readonly stateMutability: "payable";
                    readonly type: "function";
                }, {
                    readonly stateMutability: "payable";
                    readonly type: "receive";
                }], "upgradeTo", readonly [`0x${string}`], import("viem").Chain | undefined, TChainOverride_3, TAccountOverride_3>, "address" | "abi" | "args" | "functionName"> | undefined) => Promise<import("viem").SimulateContractReturnType<readonly [{
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: false;
                        readonly internalType: "address";
                        readonly name: "previousAdmin";
                        readonly type: "address";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "address";
                        readonly name: "newAdmin";
                        readonly type: "address";
                    }];
                    readonly name: "AdminChanged";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "beacon";
                        readonly type: "address";
                    }];
                    readonly name: "BeaconUpgraded";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: false;
                        readonly internalType: "uint8";
                        readonly name: "version";
                        readonly type: "uint8";
                    }];
                    readonly name: "Initialized";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "_contract";
                        readonly type: "address";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "uint256";
                        readonly name: "_value";
                        readonly type: "uint256";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "bytes";
                        readonly name: "_data";
                        readonly type: "bytes";
                    }];
                    readonly name: "LogCall";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "_from";
                        readonly type: "address";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "uint256";
                        readonly name: "_amount";
                        readonly type: "uint256";
                    }];
                    readonly name: "LogReceivedEther";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "implementation";
                        readonly type: "address";
                    }];
                    readonly name: "Upgraded";
                    readonly type: "event";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "_owner";
                        readonly type: "address";
                    }];
                    readonly name: "__ECDSAWallet_init";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "__SmartWallet_init";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "uint256";
                        readonly name: "_chainID";
                        readonly type: "uint256";
                    }];
                    readonly name: "domainSeperator";
                    readonly outputs: readonly [{
                        readonly internalType: "bytes32";
                        readonly name: "";
                        readonly type: "bytes32";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly components: readonly [{
                            readonly internalType: "address";
                            readonly name: "to";
                            readonly type: "address";
                        }, {
                            readonly internalType: "uint256";
                            readonly name: "amount";
                            readonly type: "uint256";
                        }, {
                            readonly internalType: "bytes";
                            readonly name: "data";
                            readonly type: "bytes";
                        }];
                        readonly internalType: "struct IWallet.UserOp[]";
                        readonly name: "userOps";
                        readonly type: "tuple[]";
                    }, {
                        readonly internalType: "bytes";
                        readonly name: "_signature";
                        readonly type: "bytes";
                    }];
                    readonly name: "exec";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "nonce";
                    readonly outputs: readonly [{
                        readonly internalType: "uint256";
                        readonly name: "";
                        readonly type: "uint256";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "owner";
                    readonly outputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "";
                        readonly type: "address";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "proxiableUUID";
                    readonly outputs: readonly [{
                        readonly internalType: "bytes32";
                        readonly name: "";
                        readonly type: "bytes32";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "newImplementation";
                        readonly type: "address";
                    }];
                    readonly name: "upgradeTo";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "newImplementation";
                        readonly type: "address";
                    }, {
                        readonly internalType: "bytes";
                        readonly name: "data";
                        readonly type: "bytes";
                    }];
                    readonly name: "upgradeToAndCall";
                    readonly outputs: readonly [];
                    readonly stateMutability: "payable";
                    readonly type: "function";
                }, {
                    readonly stateMutability: "payable";
                    readonly type: "receive";
                }], "upgradeTo", readonly [`0x${string}`], import("viem").Chain | undefined, undefined, TChainOverride_3, TAccountOverride_3>>;
                upgradeToAndCall: <TChainOverride_4 extends import("viem").Chain | undefined, TAccountOverride_4 extends `0x${string}` | import("viem").Account | undefined = undefined>(args: readonly [`0x${string}`, `0x${string}`], options?: Omit<import("viem").SimulateContractParameters<readonly [{
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: false;
                        readonly internalType: "address";
                        readonly name: "previousAdmin";
                        readonly type: "address";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "address";
                        readonly name: "newAdmin";
                        readonly type: "address";
                    }];
                    readonly name: "AdminChanged";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "beacon";
                        readonly type: "address";
                    }];
                    readonly name: "BeaconUpgraded";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: false;
                        readonly internalType: "uint8";
                        readonly name: "version";
                        readonly type: "uint8";
                    }];
                    readonly name: "Initialized";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "_contract";
                        readonly type: "address";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "uint256";
                        readonly name: "_value";
                        readonly type: "uint256";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "bytes";
                        readonly name: "_data";
                        readonly type: "bytes";
                    }];
                    readonly name: "LogCall";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "_from";
                        readonly type: "address";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "uint256";
                        readonly name: "_amount";
                        readonly type: "uint256";
                    }];
                    readonly name: "LogReceivedEther";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "implementation";
                        readonly type: "address";
                    }];
                    readonly name: "Upgraded";
                    readonly type: "event";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "_owner";
                        readonly type: "address";
                    }];
                    readonly name: "__ECDSAWallet_init";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "__SmartWallet_init";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "uint256";
                        readonly name: "_chainID";
                        readonly type: "uint256";
                    }];
                    readonly name: "domainSeperator";
                    readonly outputs: readonly [{
                        readonly internalType: "bytes32";
                        readonly name: "";
                        readonly type: "bytes32";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly components: readonly [{
                            readonly internalType: "address";
                            readonly name: "to";
                            readonly type: "address";
                        }, {
                            readonly internalType: "uint256";
                            readonly name: "amount";
                            readonly type: "uint256";
                        }, {
                            readonly internalType: "bytes";
                            readonly name: "data";
                            readonly type: "bytes";
                        }];
                        readonly internalType: "struct IWallet.UserOp[]";
                        readonly name: "userOps";
                        readonly type: "tuple[]";
                    }, {
                        readonly internalType: "bytes";
                        readonly name: "_signature";
                        readonly type: "bytes";
                    }];
                    readonly name: "exec";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "nonce";
                    readonly outputs: readonly [{
                        readonly internalType: "uint256";
                        readonly name: "";
                        readonly type: "uint256";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "owner";
                    readonly outputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "";
                        readonly type: "address";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "proxiableUUID";
                    readonly outputs: readonly [{
                        readonly internalType: "bytes32";
                        readonly name: "";
                        readonly type: "bytes32";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "newImplementation";
                        readonly type: "address";
                    }];
                    readonly name: "upgradeTo";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "newImplementation";
                        readonly type: "address";
                    }, {
                        readonly internalType: "bytes";
                        readonly name: "data";
                        readonly type: "bytes";
                    }];
                    readonly name: "upgradeToAndCall";
                    readonly outputs: readonly [];
                    readonly stateMutability: "payable";
                    readonly type: "function";
                }, {
                    readonly stateMutability: "payable";
                    readonly type: "receive";
                }], "upgradeToAndCall", readonly [`0x${string}`, `0x${string}`], import("viem").Chain | undefined, TChainOverride_4, TAccountOverride_4>, "address" | "abi" | "args" | "functionName"> | undefined) => Promise<import("viem").SimulateContractReturnType<readonly [{
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: false;
                        readonly internalType: "address";
                        readonly name: "previousAdmin";
                        readonly type: "address";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "address";
                        readonly name: "newAdmin";
                        readonly type: "address";
                    }];
                    readonly name: "AdminChanged";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "beacon";
                        readonly type: "address";
                    }];
                    readonly name: "BeaconUpgraded";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: false;
                        readonly internalType: "uint8";
                        readonly name: "version";
                        readonly type: "uint8";
                    }];
                    readonly name: "Initialized";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "_contract";
                        readonly type: "address";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "uint256";
                        readonly name: "_value";
                        readonly type: "uint256";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "bytes";
                        readonly name: "_data";
                        readonly type: "bytes";
                    }];
                    readonly name: "LogCall";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "_from";
                        readonly type: "address";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "uint256";
                        readonly name: "_amount";
                        readonly type: "uint256";
                    }];
                    readonly name: "LogReceivedEther";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "implementation";
                        readonly type: "address";
                    }];
                    readonly name: "Upgraded";
                    readonly type: "event";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "_owner";
                        readonly type: "address";
                    }];
                    readonly name: "__ECDSAWallet_init";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "__SmartWallet_init";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "uint256";
                        readonly name: "_chainID";
                        readonly type: "uint256";
                    }];
                    readonly name: "domainSeperator";
                    readonly outputs: readonly [{
                        readonly internalType: "bytes32";
                        readonly name: "";
                        readonly type: "bytes32";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly components: readonly [{
                            readonly internalType: "address";
                            readonly name: "to";
                            readonly type: "address";
                        }, {
                            readonly internalType: "uint256";
                            readonly name: "amount";
                            readonly type: "uint256";
                        }, {
                            readonly internalType: "bytes";
                            readonly name: "data";
                            readonly type: "bytes";
                        }];
                        readonly internalType: "struct IWallet.UserOp[]";
                        readonly name: "userOps";
                        readonly type: "tuple[]";
                    }, {
                        readonly internalType: "bytes";
                        readonly name: "_signature";
                        readonly type: "bytes";
                    }];
                    readonly name: "exec";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "nonce";
                    readonly outputs: readonly [{
                        readonly internalType: "uint256";
                        readonly name: "";
                        readonly type: "uint256";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "owner";
                    readonly outputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "";
                        readonly type: "address";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "proxiableUUID";
                    readonly outputs: readonly [{
                        readonly internalType: "bytes32";
                        readonly name: "";
                        readonly type: "bytes32";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "newImplementation";
                        readonly type: "address";
                    }];
                    readonly name: "upgradeTo";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "newImplementation";
                        readonly type: "address";
                    }, {
                        readonly internalType: "bytes";
                        readonly name: "data";
                        readonly type: "bytes";
                    }];
                    readonly name: "upgradeToAndCall";
                    readonly outputs: readonly [];
                    readonly stateMutability: "payable";
                    readonly type: "function";
                }, {
                    readonly stateMutability: "payable";
                    readonly type: "receive";
                }], "upgradeToAndCall", readonly [`0x${string}`, `0x${string}`], import("viem").Chain | undefined, undefined, TChainOverride_4, TAccountOverride_4>>;
            };
            createEventFilter: {
                AdminChanged: <const TArgs extends Record<string, unknown> | readonly unknown[] | undefined, TStrict extends boolean | undefined = undefined>(options?: ({
                    fromBlock?: bigint | import("viem").BlockTag | undefined;
                    toBlock?: bigint | import("viem").BlockTag | undefined;
                } & {
                    strict?: TStrict | undefined;
                }) | undefined) => Promise<import("viem").CreateContractEventFilterReturnType<readonly [{
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: false;
                        readonly internalType: "address";
                        readonly name: "previousAdmin";
                        readonly type: "address";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "address";
                        readonly name: "newAdmin";
                        readonly type: "address";
                    }];
                    readonly name: "AdminChanged";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "beacon";
                        readonly type: "address";
                    }];
                    readonly name: "BeaconUpgraded";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: false;
                        readonly internalType: "uint8";
                        readonly name: "version";
                        readonly type: "uint8";
                    }];
                    readonly name: "Initialized";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "_contract";
                        readonly type: "address";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "uint256";
                        readonly name: "_value";
                        readonly type: "uint256";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "bytes";
                        readonly name: "_data";
                        readonly type: "bytes";
                    }];
                    readonly name: "LogCall";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "_from";
                        readonly type: "address";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "uint256";
                        readonly name: "_amount";
                        readonly type: "uint256";
                    }];
                    readonly name: "LogReceivedEther";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "implementation";
                        readonly type: "address";
                    }];
                    readonly name: "Upgraded";
                    readonly type: "event";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "_owner";
                        readonly type: "address";
                    }];
                    readonly name: "__ECDSAWallet_init";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "__SmartWallet_init";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "uint256";
                        readonly name: "_chainID";
                        readonly type: "uint256";
                    }];
                    readonly name: "domainSeperator";
                    readonly outputs: readonly [{
                        readonly internalType: "bytes32";
                        readonly name: "";
                        readonly type: "bytes32";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly components: readonly [{
                            readonly internalType: "address";
                            readonly name: "to";
                            readonly type: "address";
                        }, {
                            readonly internalType: "uint256";
                            readonly name: "amount";
                            readonly type: "uint256";
                        }, {
                            readonly internalType: "bytes";
                            readonly name: "data";
                            readonly type: "bytes";
                        }];
                        readonly internalType: "struct IWallet.UserOp[]";
                        readonly name: "userOps";
                        readonly type: "tuple[]";
                    }, {
                        readonly internalType: "bytes";
                        readonly name: "_signature";
                        readonly type: "bytes";
                    }];
                    readonly name: "exec";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "nonce";
                    readonly outputs: readonly [{
                        readonly internalType: "uint256";
                        readonly name: "";
                        readonly type: "uint256";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "owner";
                    readonly outputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "";
                        readonly type: "address";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "proxiableUUID";
                    readonly outputs: readonly [{
                        readonly internalType: "bytes32";
                        readonly name: "";
                        readonly type: "bytes32";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "newImplementation";
                        readonly type: "address";
                    }];
                    readonly name: "upgradeTo";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "newImplementation";
                        readonly type: "address";
                    }, {
                        readonly internalType: "bytes";
                        readonly name: "data";
                        readonly type: "bytes";
                    }];
                    readonly name: "upgradeToAndCall";
                    readonly outputs: readonly [];
                    readonly stateMutability: "payable";
                    readonly type: "function";
                }, {
                    readonly stateMutability: "payable";
                    readonly type: "receive";
                }], "AdminChanged", TArgs, TStrict>>;
                BeaconUpgraded: <const TArgs_1 extends {
                    beacon?: `0x${string}` | `0x${string}`[] | null | undefined;
                } | undefined, TStrict_1 extends boolean | undefined = undefined>(args: {
                    beacon?: `0x${string}` | `0x${string}`[] | null | undefined;
                } | ({
                    beacon?: `0x${string}` | `0x${string}`[] | null | undefined;
                } extends infer T ? T extends {
                    beacon?: `0x${string}` | `0x${string}`[] | null | undefined;
                } ? T extends TArgs_1 ? Readonly<TArgs_1> : never : never : never), options?: ({
                    fromBlock?: bigint | import("viem").BlockTag | undefined;
                    toBlock?: bigint | import("viem").BlockTag | undefined;
                } & {
                    strict?: TStrict_1 | undefined;
                }) | undefined) => Promise<import("viem").CreateContractEventFilterReturnType<readonly [{
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: false;
                        readonly internalType: "address";
                        readonly name: "previousAdmin";
                        readonly type: "address";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "address";
                        readonly name: "newAdmin";
                        readonly type: "address";
                    }];
                    readonly name: "AdminChanged";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "beacon";
                        readonly type: "address";
                    }];
                    readonly name: "BeaconUpgraded";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: false;
                        readonly internalType: "uint8";
                        readonly name: "version";
                        readonly type: "uint8";
                    }];
                    readonly name: "Initialized";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "_contract";
                        readonly type: "address";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "uint256";
                        readonly name: "_value";
                        readonly type: "uint256";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "bytes";
                        readonly name: "_data";
                        readonly type: "bytes";
                    }];
                    readonly name: "LogCall";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "_from";
                        readonly type: "address";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "uint256";
                        readonly name: "_amount";
                        readonly type: "uint256";
                    }];
                    readonly name: "LogReceivedEther";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "implementation";
                        readonly type: "address";
                    }];
                    readonly name: "Upgraded";
                    readonly type: "event";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "_owner";
                        readonly type: "address";
                    }];
                    readonly name: "__ECDSAWallet_init";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "__SmartWallet_init";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "uint256";
                        readonly name: "_chainID";
                        readonly type: "uint256";
                    }];
                    readonly name: "domainSeperator";
                    readonly outputs: readonly [{
                        readonly internalType: "bytes32";
                        readonly name: "";
                        readonly type: "bytes32";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly components: readonly [{
                            readonly internalType: "address";
                            readonly name: "to";
                            readonly type: "address";
                        }, {
                            readonly internalType: "uint256";
                            readonly name: "amount";
                            readonly type: "uint256";
                        }, {
                            readonly internalType: "bytes";
                            readonly name: "data";
                            readonly type: "bytes";
                        }];
                        readonly internalType: "struct IWallet.UserOp[]";
                        readonly name: "userOps";
                        readonly type: "tuple[]";
                    }, {
                        readonly internalType: "bytes";
                        readonly name: "_signature";
                        readonly type: "bytes";
                    }];
                    readonly name: "exec";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "nonce";
                    readonly outputs: readonly [{
                        readonly internalType: "uint256";
                        readonly name: "";
                        readonly type: "uint256";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "owner";
                    readonly outputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "";
                        readonly type: "address";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "proxiableUUID";
                    readonly outputs: readonly [{
                        readonly internalType: "bytes32";
                        readonly name: "";
                        readonly type: "bytes32";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "newImplementation";
                        readonly type: "address";
                    }];
                    readonly name: "upgradeTo";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "newImplementation";
                        readonly type: "address";
                    }, {
                        readonly internalType: "bytes";
                        readonly name: "data";
                        readonly type: "bytes";
                    }];
                    readonly name: "upgradeToAndCall";
                    readonly outputs: readonly [];
                    readonly stateMutability: "payable";
                    readonly type: "function";
                }, {
                    readonly stateMutability: "payable";
                    readonly type: "receive";
                }], "BeaconUpgraded", TArgs_1, TStrict_1>>;
                Initialized: <const TArgs_2 extends Record<string, unknown> | readonly unknown[] | undefined, TStrict_2 extends boolean | undefined = undefined>(options?: ({
                    fromBlock?: bigint | import("viem").BlockTag | undefined;
                    toBlock?: bigint | import("viem").BlockTag | undefined;
                } & {
                    strict?: TStrict_2 | undefined;
                }) | undefined) => Promise<import("viem").CreateContractEventFilterReturnType<readonly [{
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: false;
                        readonly internalType: "address";
                        readonly name: "previousAdmin";
                        readonly type: "address";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "address";
                        readonly name: "newAdmin";
                        readonly type: "address";
                    }];
                    readonly name: "AdminChanged";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "beacon";
                        readonly type: "address";
                    }];
                    readonly name: "BeaconUpgraded";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: false;
                        readonly internalType: "uint8";
                        readonly name: "version";
                        readonly type: "uint8";
                    }];
                    readonly name: "Initialized";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "_contract";
                        readonly type: "address";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "uint256";
                        readonly name: "_value";
                        readonly type: "uint256";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "bytes";
                        readonly name: "_data";
                        readonly type: "bytes";
                    }];
                    readonly name: "LogCall";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "_from";
                        readonly type: "address";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "uint256";
                        readonly name: "_amount";
                        readonly type: "uint256";
                    }];
                    readonly name: "LogReceivedEther";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "implementation";
                        readonly type: "address";
                    }];
                    readonly name: "Upgraded";
                    readonly type: "event";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "_owner";
                        readonly type: "address";
                    }];
                    readonly name: "__ECDSAWallet_init";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "__SmartWallet_init";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "uint256";
                        readonly name: "_chainID";
                        readonly type: "uint256";
                    }];
                    readonly name: "domainSeperator";
                    readonly outputs: readonly [{
                        readonly internalType: "bytes32";
                        readonly name: "";
                        readonly type: "bytes32";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly components: readonly [{
                            readonly internalType: "address";
                            readonly name: "to";
                            readonly type: "address";
                        }, {
                            readonly internalType: "uint256";
                            readonly name: "amount";
                            readonly type: "uint256";
                        }, {
                            readonly internalType: "bytes";
                            readonly name: "data";
                            readonly type: "bytes";
                        }];
                        readonly internalType: "struct IWallet.UserOp[]";
                        readonly name: "userOps";
                        readonly type: "tuple[]";
                    }, {
                        readonly internalType: "bytes";
                        readonly name: "_signature";
                        readonly type: "bytes";
                    }];
                    readonly name: "exec";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "nonce";
                    readonly outputs: readonly [{
                        readonly internalType: "uint256";
                        readonly name: "";
                        readonly type: "uint256";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "owner";
                    readonly outputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "";
                        readonly type: "address";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "proxiableUUID";
                    readonly outputs: readonly [{
                        readonly internalType: "bytes32";
                        readonly name: "";
                        readonly type: "bytes32";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "newImplementation";
                        readonly type: "address";
                    }];
                    readonly name: "upgradeTo";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "newImplementation";
                        readonly type: "address";
                    }, {
                        readonly internalType: "bytes";
                        readonly name: "data";
                        readonly type: "bytes";
                    }];
                    readonly name: "upgradeToAndCall";
                    readonly outputs: readonly [];
                    readonly stateMutability: "payable";
                    readonly type: "function";
                }, {
                    readonly stateMutability: "payable";
                    readonly type: "receive";
                }], "Initialized", TArgs_2, TStrict_2>>;
                LogCall: <const TArgs_3 extends {
                    _contract?: `0x${string}` | `0x${string}`[] | null | undefined;
                } | undefined, TStrict_3 extends boolean | undefined = undefined>(args: {
                    _contract?: `0x${string}` | `0x${string}`[] | null | undefined;
                } | ({
                    _contract?: `0x${string}` | `0x${string}`[] | null | undefined;
                } extends infer T_1 ? T_1 extends {
                    _contract?: `0x${string}` | `0x${string}`[] | null | undefined;
                } ? T_1 extends TArgs_3 ? Readonly<TArgs_3> : never : never : never), options?: ({
                    fromBlock?: bigint | import("viem").BlockTag | undefined;
                    toBlock?: bigint | import("viem").BlockTag | undefined;
                } & {
                    strict?: TStrict_3 | undefined;
                }) | undefined) => Promise<import("viem").CreateContractEventFilterReturnType<readonly [{
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: false;
                        readonly internalType: "address";
                        readonly name: "previousAdmin";
                        readonly type: "address";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "address";
                        readonly name: "newAdmin";
                        readonly type: "address";
                    }];
                    readonly name: "AdminChanged";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "beacon";
                        readonly type: "address";
                    }];
                    readonly name: "BeaconUpgraded";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: false;
                        readonly internalType: "uint8";
                        readonly name: "version";
                        readonly type: "uint8";
                    }];
                    readonly name: "Initialized";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "_contract";
                        readonly type: "address";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "uint256";
                        readonly name: "_value";
                        readonly type: "uint256";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "bytes";
                        readonly name: "_data";
                        readonly type: "bytes";
                    }];
                    readonly name: "LogCall";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "_from";
                        readonly type: "address";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "uint256";
                        readonly name: "_amount";
                        readonly type: "uint256";
                    }];
                    readonly name: "LogReceivedEther";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "implementation";
                        readonly type: "address";
                    }];
                    readonly name: "Upgraded";
                    readonly type: "event";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "_owner";
                        readonly type: "address";
                    }];
                    readonly name: "__ECDSAWallet_init";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "__SmartWallet_init";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "uint256";
                        readonly name: "_chainID";
                        readonly type: "uint256";
                    }];
                    readonly name: "domainSeperator";
                    readonly outputs: readonly [{
                        readonly internalType: "bytes32";
                        readonly name: "";
                        readonly type: "bytes32";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly components: readonly [{
                            readonly internalType: "address";
                            readonly name: "to";
                            readonly type: "address";
                        }, {
                            readonly internalType: "uint256";
                            readonly name: "amount";
                            readonly type: "uint256";
                        }, {
                            readonly internalType: "bytes";
                            readonly name: "data";
                            readonly type: "bytes";
                        }];
                        readonly internalType: "struct IWallet.UserOp[]";
                        readonly name: "userOps";
                        readonly type: "tuple[]";
                    }, {
                        readonly internalType: "bytes";
                        readonly name: "_signature";
                        readonly type: "bytes";
                    }];
                    readonly name: "exec";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "nonce";
                    readonly outputs: readonly [{
                        readonly internalType: "uint256";
                        readonly name: "";
                        readonly type: "uint256";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "owner";
                    readonly outputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "";
                        readonly type: "address";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "proxiableUUID";
                    readonly outputs: readonly [{
                        readonly internalType: "bytes32";
                        readonly name: "";
                        readonly type: "bytes32";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "newImplementation";
                        readonly type: "address";
                    }];
                    readonly name: "upgradeTo";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "newImplementation";
                        readonly type: "address";
                    }, {
                        readonly internalType: "bytes";
                        readonly name: "data";
                        readonly type: "bytes";
                    }];
                    readonly name: "upgradeToAndCall";
                    readonly outputs: readonly [];
                    readonly stateMutability: "payable";
                    readonly type: "function";
                }, {
                    readonly stateMutability: "payable";
                    readonly type: "receive";
                }], "LogCall", TArgs_3, TStrict_3>>;
                LogReceivedEther: <const TArgs_4 extends {
                    _from?: `0x${string}` | `0x${string}`[] | null | undefined;
                } | undefined, TStrict_4 extends boolean | undefined = undefined>(args: {
                    _from?: `0x${string}` | `0x${string}`[] | null | undefined;
                } | ({
                    _from?: `0x${string}` | `0x${string}`[] | null | undefined;
                } extends infer T_2 ? T_2 extends {
                    _from?: `0x${string}` | `0x${string}`[] | null | undefined;
                } ? T_2 extends TArgs_4 ? Readonly<TArgs_4> : never : never : never), options?: ({
                    fromBlock?: bigint | import("viem").BlockTag | undefined;
                    toBlock?: bigint | import("viem").BlockTag | undefined;
                } & {
                    strict?: TStrict_4 | undefined;
                }) | undefined) => Promise<import("viem").CreateContractEventFilterReturnType<readonly [{
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: false;
                        readonly internalType: "address";
                        readonly name: "previousAdmin";
                        readonly type: "address";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "address";
                        readonly name: "newAdmin";
                        readonly type: "address";
                    }];
                    readonly name: "AdminChanged";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "beacon";
                        readonly type: "address";
                    }];
                    readonly name: "BeaconUpgraded";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: false;
                        readonly internalType: "uint8";
                        readonly name: "version";
                        readonly type: "uint8";
                    }];
                    readonly name: "Initialized";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "_contract";
                        readonly type: "address";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "uint256";
                        readonly name: "_value";
                        readonly type: "uint256";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "bytes";
                        readonly name: "_data";
                        readonly type: "bytes";
                    }];
                    readonly name: "LogCall";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "_from";
                        readonly type: "address";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "uint256";
                        readonly name: "_amount";
                        readonly type: "uint256";
                    }];
                    readonly name: "LogReceivedEther";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "implementation";
                        readonly type: "address";
                    }];
                    readonly name: "Upgraded";
                    readonly type: "event";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "_owner";
                        readonly type: "address";
                    }];
                    readonly name: "__ECDSAWallet_init";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "__SmartWallet_init";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "uint256";
                        readonly name: "_chainID";
                        readonly type: "uint256";
                    }];
                    readonly name: "domainSeperator";
                    readonly outputs: readonly [{
                        readonly internalType: "bytes32";
                        readonly name: "";
                        readonly type: "bytes32";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly components: readonly [{
                            readonly internalType: "address";
                            readonly name: "to";
                            readonly type: "address";
                        }, {
                            readonly internalType: "uint256";
                            readonly name: "amount";
                            readonly type: "uint256";
                        }, {
                            readonly internalType: "bytes";
                            readonly name: "data";
                            readonly type: "bytes";
                        }];
                        readonly internalType: "struct IWallet.UserOp[]";
                        readonly name: "userOps";
                        readonly type: "tuple[]";
                    }, {
                        readonly internalType: "bytes";
                        readonly name: "_signature";
                        readonly type: "bytes";
                    }];
                    readonly name: "exec";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "nonce";
                    readonly outputs: readonly [{
                        readonly internalType: "uint256";
                        readonly name: "";
                        readonly type: "uint256";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "owner";
                    readonly outputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "";
                        readonly type: "address";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "proxiableUUID";
                    readonly outputs: readonly [{
                        readonly internalType: "bytes32";
                        readonly name: "";
                        readonly type: "bytes32";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "newImplementation";
                        readonly type: "address";
                    }];
                    readonly name: "upgradeTo";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "newImplementation";
                        readonly type: "address";
                    }, {
                        readonly internalType: "bytes";
                        readonly name: "data";
                        readonly type: "bytes";
                    }];
                    readonly name: "upgradeToAndCall";
                    readonly outputs: readonly [];
                    readonly stateMutability: "payable";
                    readonly type: "function";
                }, {
                    readonly stateMutability: "payable";
                    readonly type: "receive";
                }], "LogReceivedEther", TArgs_4, TStrict_4>>;
                Upgraded: <const TArgs_5 extends {
                    implementation?: `0x${string}` | `0x${string}`[] | null | undefined;
                } | undefined, TStrict_5 extends boolean | undefined = undefined>(args: {
                    implementation?: `0x${string}` | `0x${string}`[] | null | undefined;
                } | ({
                    implementation?: `0x${string}` | `0x${string}`[] | null | undefined;
                } extends infer T_3 ? T_3 extends {
                    implementation?: `0x${string}` | `0x${string}`[] | null | undefined;
                } ? T_3 extends TArgs_5 ? Readonly<TArgs_5> : never : never : never), options?: ({
                    fromBlock?: bigint | import("viem").BlockTag | undefined;
                    toBlock?: bigint | import("viem").BlockTag | undefined;
                } & {
                    strict?: TStrict_5 | undefined;
                }) | undefined) => Promise<import("viem").CreateContractEventFilterReturnType<readonly [{
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: false;
                        readonly internalType: "address";
                        readonly name: "previousAdmin";
                        readonly type: "address";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "address";
                        readonly name: "newAdmin";
                        readonly type: "address";
                    }];
                    readonly name: "AdminChanged";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "beacon";
                        readonly type: "address";
                    }];
                    readonly name: "BeaconUpgraded";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: false;
                        readonly internalType: "uint8";
                        readonly name: "version";
                        readonly type: "uint8";
                    }];
                    readonly name: "Initialized";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "_contract";
                        readonly type: "address";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "uint256";
                        readonly name: "_value";
                        readonly type: "uint256";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "bytes";
                        readonly name: "_data";
                        readonly type: "bytes";
                    }];
                    readonly name: "LogCall";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "_from";
                        readonly type: "address";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "uint256";
                        readonly name: "_amount";
                        readonly type: "uint256";
                    }];
                    readonly name: "LogReceivedEther";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "implementation";
                        readonly type: "address";
                    }];
                    readonly name: "Upgraded";
                    readonly type: "event";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "_owner";
                        readonly type: "address";
                    }];
                    readonly name: "__ECDSAWallet_init";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "__SmartWallet_init";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "uint256";
                        readonly name: "_chainID";
                        readonly type: "uint256";
                    }];
                    readonly name: "domainSeperator";
                    readonly outputs: readonly [{
                        readonly internalType: "bytes32";
                        readonly name: "";
                        readonly type: "bytes32";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly components: readonly [{
                            readonly internalType: "address";
                            readonly name: "to";
                            readonly type: "address";
                        }, {
                            readonly internalType: "uint256";
                            readonly name: "amount";
                            readonly type: "uint256";
                        }, {
                            readonly internalType: "bytes";
                            readonly name: "data";
                            readonly type: "bytes";
                        }];
                        readonly internalType: "struct IWallet.UserOp[]";
                        readonly name: "userOps";
                        readonly type: "tuple[]";
                    }, {
                        readonly internalType: "bytes";
                        readonly name: "_signature";
                        readonly type: "bytes";
                    }];
                    readonly name: "exec";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "nonce";
                    readonly outputs: readonly [{
                        readonly internalType: "uint256";
                        readonly name: "";
                        readonly type: "uint256";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "owner";
                    readonly outputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "";
                        readonly type: "address";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "proxiableUUID";
                    readonly outputs: readonly [{
                        readonly internalType: "bytes32";
                        readonly name: "";
                        readonly type: "bytes32";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "newImplementation";
                        readonly type: "address";
                    }];
                    readonly name: "upgradeTo";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "newImplementation";
                        readonly type: "address";
                    }, {
                        readonly internalType: "bytes";
                        readonly name: "data";
                        readonly type: "bytes";
                    }];
                    readonly name: "upgradeToAndCall";
                    readonly outputs: readonly [];
                    readonly stateMutability: "payable";
                    readonly type: "function";
                }, {
                    readonly stateMutability: "payable";
                    readonly type: "receive";
                }], "Upgraded", TArgs_5, TStrict_5>>;
            };
            getEvents: {
                AdminChanged: (options?: {
                    blockHash?: `0x${string}` | undefined;
                    strict?: boolean | undefined;
                    fromBlock?: bigint | import("viem").BlockTag | undefined;
                    toBlock?: bigint | import("viem").BlockTag | undefined;
                } | undefined) => Promise<import("viem").GetContractEventsReturnType<readonly [{
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: false;
                        readonly internalType: "address";
                        readonly name: "previousAdmin";
                        readonly type: "address";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "address";
                        readonly name: "newAdmin";
                        readonly type: "address";
                    }];
                    readonly name: "AdminChanged";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "beacon";
                        readonly type: "address";
                    }];
                    readonly name: "BeaconUpgraded";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: false;
                        readonly internalType: "uint8";
                        readonly name: "version";
                        readonly type: "uint8";
                    }];
                    readonly name: "Initialized";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "_contract";
                        readonly type: "address";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "uint256";
                        readonly name: "_value";
                        readonly type: "uint256";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "bytes";
                        readonly name: "_data";
                        readonly type: "bytes";
                    }];
                    readonly name: "LogCall";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "_from";
                        readonly type: "address";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "uint256";
                        readonly name: "_amount";
                        readonly type: "uint256";
                    }];
                    readonly name: "LogReceivedEther";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "implementation";
                        readonly type: "address";
                    }];
                    readonly name: "Upgraded";
                    readonly type: "event";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "_owner";
                        readonly type: "address";
                    }];
                    readonly name: "__ECDSAWallet_init";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "__SmartWallet_init";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "uint256";
                        readonly name: "_chainID";
                        readonly type: "uint256";
                    }];
                    readonly name: "domainSeperator";
                    readonly outputs: readonly [{
                        readonly internalType: "bytes32";
                        readonly name: "";
                        readonly type: "bytes32";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly components: readonly [{
                            readonly internalType: "address";
                            readonly name: "to";
                            readonly type: "address";
                        }, {
                            readonly internalType: "uint256";
                            readonly name: "amount";
                            readonly type: "uint256";
                        }, {
                            readonly internalType: "bytes";
                            readonly name: "data";
                            readonly type: "bytes";
                        }];
                        readonly internalType: "struct IWallet.UserOp[]";
                        readonly name: "userOps";
                        readonly type: "tuple[]";
                    }, {
                        readonly internalType: "bytes";
                        readonly name: "_signature";
                        readonly type: "bytes";
                    }];
                    readonly name: "exec";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "nonce";
                    readonly outputs: readonly [{
                        readonly internalType: "uint256";
                        readonly name: "";
                        readonly type: "uint256";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "owner";
                    readonly outputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "";
                        readonly type: "address";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "proxiableUUID";
                    readonly outputs: readonly [{
                        readonly internalType: "bytes32";
                        readonly name: "";
                        readonly type: "bytes32";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "newImplementation";
                        readonly type: "address";
                    }];
                    readonly name: "upgradeTo";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "newImplementation";
                        readonly type: "address";
                    }, {
                        readonly internalType: "bytes";
                        readonly name: "data";
                        readonly type: "bytes";
                    }];
                    readonly name: "upgradeToAndCall";
                    readonly outputs: readonly [];
                    readonly stateMutability: "payable";
                    readonly type: "function";
                }, {
                    readonly stateMutability: "payable";
                    readonly type: "receive";
                }], "AdminChanged">>;
                BeaconUpgraded: (args?: {
                    beacon?: `0x${string}` | `0x${string}`[] | null | undefined;
                } | undefined, options?: {
                    blockHash?: `0x${string}` | undefined;
                    strict?: boolean | undefined;
                    fromBlock?: bigint | import("viem").BlockTag | undefined;
                    toBlock?: bigint | import("viem").BlockTag | undefined;
                } | undefined) => Promise<import("viem").GetContractEventsReturnType<readonly [{
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: false;
                        readonly internalType: "address";
                        readonly name: "previousAdmin";
                        readonly type: "address";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "address";
                        readonly name: "newAdmin";
                        readonly type: "address";
                    }];
                    readonly name: "AdminChanged";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "beacon";
                        readonly type: "address";
                    }];
                    readonly name: "BeaconUpgraded";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: false;
                        readonly internalType: "uint8";
                        readonly name: "version";
                        readonly type: "uint8";
                    }];
                    readonly name: "Initialized";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "_contract";
                        readonly type: "address";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "uint256";
                        readonly name: "_value";
                        readonly type: "uint256";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "bytes";
                        readonly name: "_data";
                        readonly type: "bytes";
                    }];
                    readonly name: "LogCall";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "_from";
                        readonly type: "address";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "uint256";
                        readonly name: "_amount";
                        readonly type: "uint256";
                    }];
                    readonly name: "LogReceivedEther";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "implementation";
                        readonly type: "address";
                    }];
                    readonly name: "Upgraded";
                    readonly type: "event";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "_owner";
                        readonly type: "address";
                    }];
                    readonly name: "__ECDSAWallet_init";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "__SmartWallet_init";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "uint256";
                        readonly name: "_chainID";
                        readonly type: "uint256";
                    }];
                    readonly name: "domainSeperator";
                    readonly outputs: readonly [{
                        readonly internalType: "bytes32";
                        readonly name: "";
                        readonly type: "bytes32";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly components: readonly [{
                            readonly internalType: "address";
                            readonly name: "to";
                            readonly type: "address";
                        }, {
                            readonly internalType: "uint256";
                            readonly name: "amount";
                            readonly type: "uint256";
                        }, {
                            readonly internalType: "bytes";
                            readonly name: "data";
                            readonly type: "bytes";
                        }];
                        readonly internalType: "struct IWallet.UserOp[]";
                        readonly name: "userOps";
                        readonly type: "tuple[]";
                    }, {
                        readonly internalType: "bytes";
                        readonly name: "_signature";
                        readonly type: "bytes";
                    }];
                    readonly name: "exec";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "nonce";
                    readonly outputs: readonly [{
                        readonly internalType: "uint256";
                        readonly name: "";
                        readonly type: "uint256";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "owner";
                    readonly outputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "";
                        readonly type: "address";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "proxiableUUID";
                    readonly outputs: readonly [{
                        readonly internalType: "bytes32";
                        readonly name: "";
                        readonly type: "bytes32";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "newImplementation";
                        readonly type: "address";
                    }];
                    readonly name: "upgradeTo";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "newImplementation";
                        readonly type: "address";
                    }, {
                        readonly internalType: "bytes";
                        readonly name: "data";
                        readonly type: "bytes";
                    }];
                    readonly name: "upgradeToAndCall";
                    readonly outputs: readonly [];
                    readonly stateMutability: "payable";
                    readonly type: "function";
                }, {
                    readonly stateMutability: "payable";
                    readonly type: "receive";
                }], "BeaconUpgraded">>;
                Initialized: (options?: {
                    blockHash?: `0x${string}` | undefined;
                    strict?: boolean | undefined;
                    fromBlock?: bigint | import("viem").BlockTag | undefined;
                    toBlock?: bigint | import("viem").BlockTag | undefined;
                } | undefined) => Promise<import("viem").GetContractEventsReturnType<readonly [{
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: false;
                        readonly internalType: "address";
                        readonly name: "previousAdmin";
                        readonly type: "address";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "address";
                        readonly name: "newAdmin";
                        readonly type: "address";
                    }];
                    readonly name: "AdminChanged";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "beacon";
                        readonly type: "address";
                    }];
                    readonly name: "BeaconUpgraded";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: false;
                        readonly internalType: "uint8";
                        readonly name: "version";
                        readonly type: "uint8";
                    }];
                    readonly name: "Initialized";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "_contract";
                        readonly type: "address";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "uint256";
                        readonly name: "_value";
                        readonly type: "uint256";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "bytes";
                        readonly name: "_data";
                        readonly type: "bytes";
                    }];
                    readonly name: "LogCall";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "_from";
                        readonly type: "address";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "uint256";
                        readonly name: "_amount";
                        readonly type: "uint256";
                    }];
                    readonly name: "LogReceivedEther";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "implementation";
                        readonly type: "address";
                    }];
                    readonly name: "Upgraded";
                    readonly type: "event";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "_owner";
                        readonly type: "address";
                    }];
                    readonly name: "__ECDSAWallet_init";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "__SmartWallet_init";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "uint256";
                        readonly name: "_chainID";
                        readonly type: "uint256";
                    }];
                    readonly name: "domainSeperator";
                    readonly outputs: readonly [{
                        readonly internalType: "bytes32";
                        readonly name: "";
                        readonly type: "bytes32";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly components: readonly [{
                            readonly internalType: "address";
                            readonly name: "to";
                            readonly type: "address";
                        }, {
                            readonly internalType: "uint256";
                            readonly name: "amount";
                            readonly type: "uint256";
                        }, {
                            readonly internalType: "bytes";
                            readonly name: "data";
                            readonly type: "bytes";
                        }];
                        readonly internalType: "struct IWallet.UserOp[]";
                        readonly name: "userOps";
                        readonly type: "tuple[]";
                    }, {
                        readonly internalType: "bytes";
                        readonly name: "_signature";
                        readonly type: "bytes";
                    }];
                    readonly name: "exec";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "nonce";
                    readonly outputs: readonly [{
                        readonly internalType: "uint256";
                        readonly name: "";
                        readonly type: "uint256";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "owner";
                    readonly outputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "";
                        readonly type: "address";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "proxiableUUID";
                    readonly outputs: readonly [{
                        readonly internalType: "bytes32";
                        readonly name: "";
                        readonly type: "bytes32";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "newImplementation";
                        readonly type: "address";
                    }];
                    readonly name: "upgradeTo";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "newImplementation";
                        readonly type: "address";
                    }, {
                        readonly internalType: "bytes";
                        readonly name: "data";
                        readonly type: "bytes";
                    }];
                    readonly name: "upgradeToAndCall";
                    readonly outputs: readonly [];
                    readonly stateMutability: "payable";
                    readonly type: "function";
                }, {
                    readonly stateMutability: "payable";
                    readonly type: "receive";
                }], "Initialized">>;
                LogCall: (args?: {
                    _contract?: `0x${string}` | `0x${string}`[] | null | undefined;
                } | undefined, options?: {
                    blockHash?: `0x${string}` | undefined;
                    strict?: boolean | undefined;
                    fromBlock?: bigint | import("viem").BlockTag | undefined;
                    toBlock?: bigint | import("viem").BlockTag | undefined;
                } | undefined) => Promise<import("viem").GetContractEventsReturnType<readonly [{
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: false;
                        readonly internalType: "address";
                        readonly name: "previousAdmin";
                        readonly type: "address";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "address";
                        readonly name: "newAdmin";
                        readonly type: "address";
                    }];
                    readonly name: "AdminChanged";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "beacon";
                        readonly type: "address";
                    }];
                    readonly name: "BeaconUpgraded";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: false;
                        readonly internalType: "uint8";
                        readonly name: "version";
                        readonly type: "uint8";
                    }];
                    readonly name: "Initialized";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "_contract";
                        readonly type: "address";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "uint256";
                        readonly name: "_value";
                        readonly type: "uint256";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "bytes";
                        readonly name: "_data";
                        readonly type: "bytes";
                    }];
                    readonly name: "LogCall";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "_from";
                        readonly type: "address";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "uint256";
                        readonly name: "_amount";
                        readonly type: "uint256";
                    }];
                    readonly name: "LogReceivedEther";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "implementation";
                        readonly type: "address";
                    }];
                    readonly name: "Upgraded";
                    readonly type: "event";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "_owner";
                        readonly type: "address";
                    }];
                    readonly name: "__ECDSAWallet_init";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "__SmartWallet_init";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "uint256";
                        readonly name: "_chainID";
                        readonly type: "uint256";
                    }];
                    readonly name: "domainSeperator";
                    readonly outputs: readonly [{
                        readonly internalType: "bytes32";
                        readonly name: "";
                        readonly type: "bytes32";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly components: readonly [{
                            readonly internalType: "address";
                            readonly name: "to";
                            readonly type: "address";
                        }, {
                            readonly internalType: "uint256";
                            readonly name: "amount";
                            readonly type: "uint256";
                        }, {
                            readonly internalType: "bytes";
                            readonly name: "data";
                            readonly type: "bytes";
                        }];
                        readonly internalType: "struct IWallet.UserOp[]";
                        readonly name: "userOps";
                        readonly type: "tuple[]";
                    }, {
                        readonly internalType: "bytes";
                        readonly name: "_signature";
                        readonly type: "bytes";
                    }];
                    readonly name: "exec";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "nonce";
                    readonly outputs: readonly [{
                        readonly internalType: "uint256";
                        readonly name: "";
                        readonly type: "uint256";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "owner";
                    readonly outputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "";
                        readonly type: "address";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "proxiableUUID";
                    readonly outputs: readonly [{
                        readonly internalType: "bytes32";
                        readonly name: "";
                        readonly type: "bytes32";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "newImplementation";
                        readonly type: "address";
                    }];
                    readonly name: "upgradeTo";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "newImplementation";
                        readonly type: "address";
                    }, {
                        readonly internalType: "bytes";
                        readonly name: "data";
                        readonly type: "bytes";
                    }];
                    readonly name: "upgradeToAndCall";
                    readonly outputs: readonly [];
                    readonly stateMutability: "payable";
                    readonly type: "function";
                }, {
                    readonly stateMutability: "payable";
                    readonly type: "receive";
                }], "LogCall">>;
                LogReceivedEther: (args?: {
                    _from?: `0x${string}` | `0x${string}`[] | null | undefined;
                } | undefined, options?: {
                    blockHash?: `0x${string}` | undefined;
                    strict?: boolean | undefined;
                    fromBlock?: bigint | import("viem").BlockTag | undefined;
                    toBlock?: bigint | import("viem").BlockTag | undefined;
                } | undefined) => Promise<import("viem").GetContractEventsReturnType<readonly [{
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: false;
                        readonly internalType: "address";
                        readonly name: "previousAdmin";
                        readonly type: "address";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "address";
                        readonly name: "newAdmin";
                        readonly type: "address";
                    }];
                    readonly name: "AdminChanged";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "beacon";
                        readonly type: "address";
                    }];
                    readonly name: "BeaconUpgraded";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: false;
                        readonly internalType: "uint8";
                        readonly name: "version";
                        readonly type: "uint8";
                    }];
                    readonly name: "Initialized";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "_contract";
                        readonly type: "address";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "uint256";
                        readonly name: "_value";
                        readonly type: "uint256";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "bytes";
                        readonly name: "_data";
                        readonly type: "bytes";
                    }];
                    readonly name: "LogCall";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "_from";
                        readonly type: "address";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "uint256";
                        readonly name: "_amount";
                        readonly type: "uint256";
                    }];
                    readonly name: "LogReceivedEther";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "implementation";
                        readonly type: "address";
                    }];
                    readonly name: "Upgraded";
                    readonly type: "event";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "_owner";
                        readonly type: "address";
                    }];
                    readonly name: "__ECDSAWallet_init";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "__SmartWallet_init";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "uint256";
                        readonly name: "_chainID";
                        readonly type: "uint256";
                    }];
                    readonly name: "domainSeperator";
                    readonly outputs: readonly [{
                        readonly internalType: "bytes32";
                        readonly name: "";
                        readonly type: "bytes32";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly components: readonly [{
                            readonly internalType: "address";
                            readonly name: "to";
                            readonly type: "address";
                        }, {
                            readonly internalType: "uint256";
                            readonly name: "amount";
                            readonly type: "uint256";
                        }, {
                            readonly internalType: "bytes";
                            readonly name: "data";
                            readonly type: "bytes";
                        }];
                        readonly internalType: "struct IWallet.UserOp[]";
                        readonly name: "userOps";
                        readonly type: "tuple[]";
                    }, {
                        readonly internalType: "bytes";
                        readonly name: "_signature";
                        readonly type: "bytes";
                    }];
                    readonly name: "exec";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "nonce";
                    readonly outputs: readonly [{
                        readonly internalType: "uint256";
                        readonly name: "";
                        readonly type: "uint256";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "owner";
                    readonly outputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "";
                        readonly type: "address";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "proxiableUUID";
                    readonly outputs: readonly [{
                        readonly internalType: "bytes32";
                        readonly name: "";
                        readonly type: "bytes32";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "newImplementation";
                        readonly type: "address";
                    }];
                    readonly name: "upgradeTo";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "newImplementation";
                        readonly type: "address";
                    }, {
                        readonly internalType: "bytes";
                        readonly name: "data";
                        readonly type: "bytes";
                    }];
                    readonly name: "upgradeToAndCall";
                    readonly outputs: readonly [];
                    readonly stateMutability: "payable";
                    readonly type: "function";
                }, {
                    readonly stateMutability: "payable";
                    readonly type: "receive";
                }], "LogReceivedEther">>;
                Upgraded: (args?: {
                    implementation?: `0x${string}` | `0x${string}`[] | null | undefined;
                } | undefined, options?: {
                    blockHash?: `0x${string}` | undefined;
                    strict?: boolean | undefined;
                    fromBlock?: bigint | import("viem").BlockTag | undefined;
                    toBlock?: bigint | import("viem").BlockTag | undefined;
                } | undefined) => Promise<import("viem").GetContractEventsReturnType<readonly [{
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: false;
                        readonly internalType: "address";
                        readonly name: "previousAdmin";
                        readonly type: "address";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "address";
                        readonly name: "newAdmin";
                        readonly type: "address";
                    }];
                    readonly name: "AdminChanged";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "beacon";
                        readonly type: "address";
                    }];
                    readonly name: "BeaconUpgraded";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: false;
                        readonly internalType: "uint8";
                        readonly name: "version";
                        readonly type: "uint8";
                    }];
                    readonly name: "Initialized";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "_contract";
                        readonly type: "address";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "uint256";
                        readonly name: "_value";
                        readonly type: "uint256";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "bytes";
                        readonly name: "_data";
                        readonly type: "bytes";
                    }];
                    readonly name: "LogCall";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "_from";
                        readonly type: "address";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "uint256";
                        readonly name: "_amount";
                        readonly type: "uint256";
                    }];
                    readonly name: "LogReceivedEther";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "implementation";
                        readonly type: "address";
                    }];
                    readonly name: "Upgraded";
                    readonly type: "event";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "_owner";
                        readonly type: "address";
                    }];
                    readonly name: "__ECDSAWallet_init";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "__SmartWallet_init";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "uint256";
                        readonly name: "_chainID";
                        readonly type: "uint256";
                    }];
                    readonly name: "domainSeperator";
                    readonly outputs: readonly [{
                        readonly internalType: "bytes32";
                        readonly name: "";
                        readonly type: "bytes32";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly components: readonly [{
                            readonly internalType: "address";
                            readonly name: "to";
                            readonly type: "address";
                        }, {
                            readonly internalType: "uint256";
                            readonly name: "amount";
                            readonly type: "uint256";
                        }, {
                            readonly internalType: "bytes";
                            readonly name: "data";
                            readonly type: "bytes";
                        }];
                        readonly internalType: "struct IWallet.UserOp[]";
                        readonly name: "userOps";
                        readonly type: "tuple[]";
                    }, {
                        readonly internalType: "bytes";
                        readonly name: "_signature";
                        readonly type: "bytes";
                    }];
                    readonly name: "exec";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "nonce";
                    readonly outputs: readonly [{
                        readonly internalType: "uint256";
                        readonly name: "";
                        readonly type: "uint256";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "owner";
                    readonly outputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "";
                        readonly type: "address";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "proxiableUUID";
                    readonly outputs: readonly [{
                        readonly internalType: "bytes32";
                        readonly name: "";
                        readonly type: "bytes32";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "newImplementation";
                        readonly type: "address";
                    }];
                    readonly name: "upgradeTo";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "newImplementation";
                        readonly type: "address";
                    }, {
                        readonly internalType: "bytes";
                        readonly name: "data";
                        readonly type: "bytes";
                    }];
                    readonly name: "upgradeToAndCall";
                    readonly outputs: readonly [];
                    readonly stateMutability: "payable";
                    readonly type: "function";
                }, {
                    readonly stateMutability: "payable";
                    readonly type: "receive";
                }], "Upgraded">>;
            };
            watchEvent: {
                AdminChanged: (options: {
                    batch?: boolean | undefined;
                    pollingInterval?: number | undefined;
                    strict?: boolean | undefined;
                    onError?: ((error: Error) => void) | undefined;
                    onLogs: import("viem").WatchContractEventOnLogsFn<readonly [{
                        readonly anonymous: false;
                        readonly inputs: readonly [{
                            readonly indexed: false;
                            readonly internalType: "address";
                            readonly name: "previousAdmin";
                            readonly type: "address";
                        }, {
                            readonly indexed: false;
                            readonly internalType: "address";
                            readonly name: "newAdmin";
                            readonly type: "address";
                        }];
                        readonly name: "AdminChanged";
                        readonly type: "event";
                    }, {
                        readonly anonymous: false;
                        readonly inputs: readonly [{
                            readonly indexed: true;
                            readonly internalType: "address";
                            readonly name: "beacon";
                            readonly type: "address";
                        }];
                        readonly name: "BeaconUpgraded";
                        readonly type: "event";
                    }, {
                        readonly anonymous: false;
                        readonly inputs: readonly [{
                            readonly indexed: false;
                            readonly internalType: "uint8";
                            readonly name: "version";
                            readonly type: "uint8";
                        }];
                        readonly name: "Initialized";
                        readonly type: "event";
                    }, {
                        readonly anonymous: false;
                        readonly inputs: readonly [{
                            readonly indexed: true;
                            readonly internalType: "address";
                            readonly name: "_contract";
                            readonly type: "address";
                        }, {
                            readonly indexed: false;
                            readonly internalType: "uint256";
                            readonly name: "_value";
                            readonly type: "uint256";
                        }, {
                            readonly indexed: false;
                            readonly internalType: "bytes";
                            readonly name: "_data";
                            readonly type: "bytes";
                        }];
                        readonly name: "LogCall";
                        readonly type: "event";
                    }, {
                        readonly anonymous: false;
                        readonly inputs: readonly [{
                            readonly indexed: true;
                            readonly internalType: "address";
                            readonly name: "_from";
                            readonly type: "address";
                        }, {
                            readonly indexed: false;
                            readonly internalType: "uint256";
                            readonly name: "_amount";
                            readonly type: "uint256";
                        }];
                        readonly name: "LogReceivedEther";
                        readonly type: "event";
                    }, {
                        readonly anonymous: false;
                        readonly inputs: readonly [{
                            readonly indexed: true;
                            readonly internalType: "address";
                            readonly name: "implementation";
                            readonly type: "address";
                        }];
                        readonly name: "Upgraded";
                        readonly type: "event";
                    }, {
                        readonly inputs: readonly [{
                            readonly internalType: "address";
                            readonly name: "_owner";
                            readonly type: "address";
                        }];
                        readonly name: "__ECDSAWallet_init";
                        readonly outputs: readonly [];
                        readonly stateMutability: "nonpayable";
                        readonly type: "function";
                    }, {
                        readonly inputs: readonly [];
                        readonly name: "__SmartWallet_init";
                        readonly outputs: readonly [];
                        readonly stateMutability: "nonpayable";
                        readonly type: "function";
                    }, {
                        readonly inputs: readonly [{
                            readonly internalType: "uint256";
                            readonly name: "_chainID";
                            readonly type: "uint256";
                        }];
                        readonly name: "domainSeperator";
                        readonly outputs: readonly [{
                            readonly internalType: "bytes32";
                            readonly name: "";
                            readonly type: "bytes32";
                        }];
                        readonly stateMutability: "view";
                        readonly type: "function";
                    }, {
                        readonly inputs: readonly [{
                            readonly components: readonly [{
                                readonly internalType: "address";
                                readonly name: "to";
                                readonly type: "address";
                            }, {
                                readonly internalType: "uint256";
                                readonly name: "amount";
                                readonly type: "uint256";
                            }, {
                                readonly internalType: "bytes";
                                readonly name: "data";
                                readonly type: "bytes";
                            }];
                            readonly internalType: "struct IWallet.UserOp[]";
                            readonly name: "userOps";
                            readonly type: "tuple[]";
                        }, {
                            readonly internalType: "bytes";
                            readonly name: "_signature";
                            readonly type: "bytes";
                        }];
                        readonly name: "exec";
                        readonly outputs: readonly [];
                        readonly stateMutability: "nonpayable";
                        readonly type: "function";
                    }, {
                        readonly inputs: readonly [];
                        readonly name: "nonce";
                        readonly outputs: readonly [{
                            readonly internalType: "uint256";
                            readonly name: "";
                            readonly type: "uint256";
                        }];
                        readonly stateMutability: "view";
                        readonly type: "function";
                    }, {
                        readonly inputs: readonly [];
                        readonly name: "owner";
                        readonly outputs: readonly [{
                            readonly internalType: "address";
                            readonly name: "";
                            readonly type: "address";
                        }];
                        readonly stateMutability: "view";
                        readonly type: "function";
                    }, {
                        readonly inputs: readonly [];
                        readonly name: "proxiableUUID";
                        readonly outputs: readonly [{
                            readonly internalType: "bytes32";
                            readonly name: "";
                            readonly type: "bytes32";
                        }];
                        readonly stateMutability: "view";
                        readonly type: "function";
                    }, {
                        readonly inputs: readonly [{
                            readonly internalType: "address";
                            readonly name: "newImplementation";
                            readonly type: "address";
                        }];
                        readonly name: "upgradeTo";
                        readonly outputs: readonly [];
                        readonly stateMutability: "nonpayable";
                        readonly type: "function";
                    }, {
                        readonly inputs: readonly [{
                            readonly internalType: "address";
                            readonly name: "newImplementation";
                            readonly type: "address";
                        }, {
                            readonly internalType: "bytes";
                            readonly name: "data";
                            readonly type: "bytes";
                        }];
                        readonly name: "upgradeToAndCall";
                        readonly outputs: readonly [];
                        readonly stateMutability: "payable";
                        readonly type: "function";
                    }, {
                        readonly stateMutability: "payable";
                        readonly type: "receive";
                    }], "AdminChanged", undefined>;
                    poll?: true | undefined;
                }) => import("viem").WatchContractEventReturnType;
                BeaconUpgraded: (args: {
                    beacon?: `0x${string}` | `0x${string}`[] | null | undefined;
                }, options: {
                    batch?: boolean | undefined;
                    pollingInterval?: number | undefined;
                    strict?: boolean | undefined;
                    onError?: ((error: Error) => void) | undefined;
                    onLogs: import("viem").WatchContractEventOnLogsFn<readonly [{
                        readonly anonymous: false;
                        readonly inputs: readonly [{
                            readonly indexed: false;
                            readonly internalType: "address";
                            readonly name: "previousAdmin";
                            readonly type: "address";
                        }, {
                            readonly indexed: false;
                            readonly internalType: "address";
                            readonly name: "newAdmin";
                            readonly type: "address";
                        }];
                        readonly name: "AdminChanged";
                        readonly type: "event";
                    }, {
                        readonly anonymous: false;
                        readonly inputs: readonly [{
                            readonly indexed: true;
                            readonly internalType: "address";
                            readonly name: "beacon";
                            readonly type: "address";
                        }];
                        readonly name: "BeaconUpgraded";
                        readonly type: "event";
                    }, {
                        readonly anonymous: false;
                        readonly inputs: readonly [{
                            readonly indexed: false;
                            readonly internalType: "uint8";
                            readonly name: "version";
                            readonly type: "uint8";
                        }];
                        readonly name: "Initialized";
                        readonly type: "event";
                    }, {
                        readonly anonymous: false;
                        readonly inputs: readonly [{
                            readonly indexed: true;
                            readonly internalType: "address";
                            readonly name: "_contract";
                            readonly type: "address";
                        }, {
                            readonly indexed: false;
                            readonly internalType: "uint256";
                            readonly name: "_value";
                            readonly type: "uint256";
                        }, {
                            readonly indexed: false;
                            readonly internalType: "bytes";
                            readonly name: "_data";
                            readonly type: "bytes";
                        }];
                        readonly name: "LogCall";
                        readonly type: "event";
                    }, {
                        readonly anonymous: false;
                        readonly inputs: readonly [{
                            readonly indexed: true;
                            readonly internalType: "address";
                            readonly name: "_from";
                            readonly type: "address";
                        }, {
                            readonly indexed: false;
                            readonly internalType: "uint256";
                            readonly name: "_amount";
                            readonly type: "uint256";
                        }];
                        readonly name: "LogReceivedEther";
                        readonly type: "event";
                    }, {
                        readonly anonymous: false;
                        readonly inputs: readonly [{
                            readonly indexed: true;
                            readonly internalType: "address";
                            readonly name: "implementation";
                            readonly type: "address";
                        }];
                        readonly name: "Upgraded";
                        readonly type: "event";
                    }, {
                        readonly inputs: readonly [{
                            readonly internalType: "address";
                            readonly name: "_owner";
                            readonly type: "address";
                        }];
                        readonly name: "__ECDSAWallet_init";
                        readonly outputs: readonly [];
                        readonly stateMutability: "nonpayable";
                        readonly type: "function";
                    }, {
                        readonly inputs: readonly [];
                        readonly name: "__SmartWallet_init";
                        readonly outputs: readonly [];
                        readonly stateMutability: "nonpayable";
                        readonly type: "function";
                    }, {
                        readonly inputs: readonly [{
                            readonly internalType: "uint256";
                            readonly name: "_chainID";
                            readonly type: "uint256";
                        }];
                        readonly name: "domainSeperator";
                        readonly outputs: readonly [{
                            readonly internalType: "bytes32";
                            readonly name: "";
                            readonly type: "bytes32";
                        }];
                        readonly stateMutability: "view";
                        readonly type: "function";
                    }, {
                        readonly inputs: readonly [{
                            readonly components: readonly [{
                                readonly internalType: "address";
                                readonly name: "to";
                                readonly type: "address";
                            }, {
                                readonly internalType: "uint256";
                                readonly name: "amount";
                                readonly type: "uint256";
                            }, {
                                readonly internalType: "bytes";
                                readonly name: "data";
                                readonly type: "bytes";
                            }];
                            readonly internalType: "struct IWallet.UserOp[]";
                            readonly name: "userOps";
                            readonly type: "tuple[]";
                        }, {
                            readonly internalType: "bytes";
                            readonly name: "_signature";
                            readonly type: "bytes";
                        }];
                        readonly name: "exec";
                        readonly outputs: readonly [];
                        readonly stateMutability: "nonpayable";
                        readonly type: "function";
                    }, {
                        readonly inputs: readonly [];
                        readonly name: "nonce";
                        readonly outputs: readonly [{
                            readonly internalType: "uint256";
                            readonly name: "";
                            readonly type: "uint256";
                        }];
                        readonly stateMutability: "view";
                        readonly type: "function";
                    }, {
                        readonly inputs: readonly [];
                        readonly name: "owner";
                        readonly outputs: readonly [{
                            readonly internalType: "address";
                            readonly name: "";
                            readonly type: "address";
                        }];
                        readonly stateMutability: "view";
                        readonly type: "function";
                    }, {
                        readonly inputs: readonly [];
                        readonly name: "proxiableUUID";
                        readonly outputs: readonly [{
                            readonly internalType: "bytes32";
                            readonly name: "";
                            readonly type: "bytes32";
                        }];
                        readonly stateMutability: "view";
                        readonly type: "function";
                    }, {
                        readonly inputs: readonly [{
                            readonly internalType: "address";
                            readonly name: "newImplementation";
                            readonly type: "address";
                        }];
                        readonly name: "upgradeTo";
                        readonly outputs: readonly [];
                        readonly stateMutability: "nonpayable";
                        readonly type: "function";
                    }, {
                        readonly inputs: readonly [{
                            readonly internalType: "address";
                            readonly name: "newImplementation";
                            readonly type: "address";
                        }, {
                            readonly internalType: "bytes";
                            readonly name: "data";
                            readonly type: "bytes";
                        }];
                        readonly name: "upgradeToAndCall";
                        readonly outputs: readonly [];
                        readonly stateMutability: "payable";
                        readonly type: "function";
                    }, {
                        readonly stateMutability: "payable";
                        readonly type: "receive";
                    }], "BeaconUpgraded", undefined>;
                    poll?: true | undefined;
                }) => import("viem").WatchContractEventReturnType;
                Initialized: (options: {
                    batch?: boolean | undefined;
                    pollingInterval?: number | undefined;
                    strict?: boolean | undefined;
                    onError?: ((error: Error) => void) | undefined;
                    onLogs: import("viem").WatchContractEventOnLogsFn<readonly [{
                        readonly anonymous: false;
                        readonly inputs: readonly [{
                            readonly indexed: false;
                            readonly internalType: "address";
                            readonly name: "previousAdmin";
                            readonly type: "address";
                        }, {
                            readonly indexed: false;
                            readonly internalType: "address";
                            readonly name: "newAdmin";
                            readonly type: "address";
                        }];
                        readonly name: "AdminChanged";
                        readonly type: "event";
                    }, {
                        readonly anonymous: false;
                        readonly inputs: readonly [{
                            readonly indexed: true;
                            readonly internalType: "address";
                            readonly name: "beacon";
                            readonly type: "address";
                        }];
                        readonly name: "BeaconUpgraded";
                        readonly type: "event";
                    }, {
                        readonly anonymous: false;
                        readonly inputs: readonly [{
                            readonly indexed: false;
                            readonly internalType: "uint8";
                            readonly name: "version";
                            readonly type: "uint8";
                        }];
                        readonly name: "Initialized";
                        readonly type: "event";
                    }, {
                        readonly anonymous: false;
                        readonly inputs: readonly [{
                            readonly indexed: true;
                            readonly internalType: "address";
                            readonly name: "_contract";
                            readonly type: "address";
                        }, {
                            readonly indexed: false;
                            readonly internalType: "uint256";
                            readonly name: "_value";
                            readonly type: "uint256";
                        }, {
                            readonly indexed: false;
                            readonly internalType: "bytes";
                            readonly name: "_data";
                            readonly type: "bytes";
                        }];
                        readonly name: "LogCall";
                        readonly type: "event";
                    }, {
                        readonly anonymous: false;
                        readonly inputs: readonly [{
                            readonly indexed: true;
                            readonly internalType: "address";
                            readonly name: "_from";
                            readonly type: "address";
                        }, {
                            readonly indexed: false;
                            readonly internalType: "uint256";
                            readonly name: "_amount";
                            readonly type: "uint256";
                        }];
                        readonly name: "LogReceivedEther";
                        readonly type: "event";
                    }, {
                        readonly anonymous: false;
                        readonly inputs: readonly [{
                            readonly indexed: true;
                            readonly internalType: "address";
                            readonly name: "implementation";
                            readonly type: "address";
                        }];
                        readonly name: "Upgraded";
                        readonly type: "event";
                    }, {
                        readonly inputs: readonly [{
                            readonly internalType: "address";
                            readonly name: "_owner";
                            readonly type: "address";
                        }];
                        readonly name: "__ECDSAWallet_init";
                        readonly outputs: readonly [];
                        readonly stateMutability: "nonpayable";
                        readonly type: "function";
                    }, {
                        readonly inputs: readonly [];
                        readonly name: "__SmartWallet_init";
                        readonly outputs: readonly [];
                        readonly stateMutability: "nonpayable";
                        readonly type: "function";
                    }, {
                        readonly inputs: readonly [{
                            readonly internalType: "uint256";
                            readonly name: "_chainID";
                            readonly type: "uint256";
                        }];
                        readonly name: "domainSeperator";
                        readonly outputs: readonly [{
                            readonly internalType: "bytes32";
                            readonly name: "";
                            readonly type: "bytes32";
                        }];
                        readonly stateMutability: "view";
                        readonly type: "function";
                    }, {
                        readonly inputs: readonly [{
                            readonly components: readonly [{
                                readonly internalType: "address";
                                readonly name: "to";
                                readonly type: "address";
                            }, {
                                readonly internalType: "uint256";
                                readonly name: "amount";
                                readonly type: "uint256";
                            }, {
                                readonly internalType: "bytes";
                                readonly name: "data";
                                readonly type: "bytes";
                            }];
                            readonly internalType: "struct IWallet.UserOp[]";
                            readonly name: "userOps";
                            readonly type: "tuple[]";
                        }, {
                            readonly internalType: "bytes";
                            readonly name: "_signature";
                            readonly type: "bytes";
                        }];
                        readonly name: "exec";
                        readonly outputs: readonly [];
                        readonly stateMutability: "nonpayable";
                        readonly type: "function";
                    }, {
                        readonly inputs: readonly [];
                        readonly name: "nonce";
                        readonly outputs: readonly [{
                            readonly internalType: "uint256";
                            readonly name: "";
                            readonly type: "uint256";
                        }];
                        readonly stateMutability: "view";
                        readonly type: "function";
                    }, {
                        readonly inputs: readonly [];
                        readonly name: "owner";
                        readonly outputs: readonly [{
                            readonly internalType: "address";
                            readonly name: "";
                            readonly type: "address";
                        }];
                        readonly stateMutability: "view";
                        readonly type: "function";
                    }, {
                        readonly inputs: readonly [];
                        readonly name: "proxiableUUID";
                        readonly outputs: readonly [{
                            readonly internalType: "bytes32";
                            readonly name: "";
                            readonly type: "bytes32";
                        }];
                        readonly stateMutability: "view";
                        readonly type: "function";
                    }, {
                        readonly inputs: readonly [{
                            readonly internalType: "address";
                            readonly name: "newImplementation";
                            readonly type: "address";
                        }];
                        readonly name: "upgradeTo";
                        readonly outputs: readonly [];
                        readonly stateMutability: "nonpayable";
                        readonly type: "function";
                    }, {
                        readonly inputs: readonly [{
                            readonly internalType: "address";
                            readonly name: "newImplementation";
                            readonly type: "address";
                        }, {
                            readonly internalType: "bytes";
                            readonly name: "data";
                            readonly type: "bytes";
                        }];
                        readonly name: "upgradeToAndCall";
                        readonly outputs: readonly [];
                        readonly stateMutability: "payable";
                        readonly type: "function";
                    }, {
                        readonly stateMutability: "payable";
                        readonly type: "receive";
                    }], "Initialized", undefined>;
                    poll?: true | undefined;
                }) => import("viem").WatchContractEventReturnType;
                LogCall: (args: {
                    _contract?: `0x${string}` | `0x${string}`[] | null | undefined;
                }, options: {
                    batch?: boolean | undefined;
                    pollingInterval?: number | undefined;
                    strict?: boolean | undefined;
                    onError?: ((error: Error) => void) | undefined;
                    onLogs: import("viem").WatchContractEventOnLogsFn<readonly [{
                        readonly anonymous: false;
                        readonly inputs: readonly [{
                            readonly indexed: false;
                            readonly internalType: "address";
                            readonly name: "previousAdmin";
                            readonly type: "address";
                        }, {
                            readonly indexed: false;
                            readonly internalType: "address";
                            readonly name: "newAdmin";
                            readonly type: "address";
                        }];
                        readonly name: "AdminChanged";
                        readonly type: "event";
                    }, {
                        readonly anonymous: false;
                        readonly inputs: readonly [{
                            readonly indexed: true;
                            readonly internalType: "address";
                            readonly name: "beacon";
                            readonly type: "address";
                        }];
                        readonly name: "BeaconUpgraded";
                        readonly type: "event";
                    }, {
                        readonly anonymous: false;
                        readonly inputs: readonly [{
                            readonly indexed: false;
                            readonly internalType: "uint8";
                            readonly name: "version";
                            readonly type: "uint8";
                        }];
                        readonly name: "Initialized";
                        readonly type: "event";
                    }, {
                        readonly anonymous: false;
                        readonly inputs: readonly [{
                            readonly indexed: true;
                            readonly internalType: "address";
                            readonly name: "_contract";
                            readonly type: "address";
                        }, {
                            readonly indexed: false;
                            readonly internalType: "uint256";
                            readonly name: "_value";
                            readonly type: "uint256";
                        }, {
                            readonly indexed: false;
                            readonly internalType: "bytes";
                            readonly name: "_data";
                            readonly type: "bytes";
                        }];
                        readonly name: "LogCall";
                        readonly type: "event";
                    }, {
                        readonly anonymous: false;
                        readonly inputs: readonly [{
                            readonly indexed: true;
                            readonly internalType: "address";
                            readonly name: "_from";
                            readonly type: "address";
                        }, {
                            readonly indexed: false;
                            readonly internalType: "uint256";
                            readonly name: "_amount";
                            readonly type: "uint256";
                        }];
                        readonly name: "LogReceivedEther";
                        readonly type: "event";
                    }, {
                        readonly anonymous: false;
                        readonly inputs: readonly [{
                            readonly indexed: true;
                            readonly internalType: "address";
                            readonly name: "implementation";
                            readonly type: "address";
                        }];
                        readonly name: "Upgraded";
                        readonly type: "event";
                    }, {
                        readonly inputs: readonly [{
                            readonly internalType: "address";
                            readonly name: "_owner";
                            readonly type: "address";
                        }];
                        readonly name: "__ECDSAWallet_init";
                        readonly outputs: readonly [];
                        readonly stateMutability: "nonpayable";
                        readonly type: "function";
                    }, {
                        readonly inputs: readonly [];
                        readonly name: "__SmartWallet_init";
                        readonly outputs: readonly [];
                        readonly stateMutability: "nonpayable";
                        readonly type: "function";
                    }, {
                        readonly inputs: readonly [{
                            readonly internalType: "uint256";
                            readonly name: "_chainID";
                            readonly type: "uint256";
                        }];
                        readonly name: "domainSeperator";
                        readonly outputs: readonly [{
                            readonly internalType: "bytes32";
                            readonly name: "";
                            readonly type: "bytes32";
                        }];
                        readonly stateMutability: "view";
                        readonly type: "function";
                    }, {
                        readonly inputs: readonly [{
                            readonly components: readonly [{
                                readonly internalType: "address";
                                readonly name: "to";
                                readonly type: "address";
                            }, {
                                readonly internalType: "uint256";
                                readonly name: "amount";
                                readonly type: "uint256";
                            }, {
                                readonly internalType: "bytes";
                                readonly name: "data";
                                readonly type: "bytes";
                            }];
                            readonly internalType: "struct IWallet.UserOp[]";
                            readonly name: "userOps";
                            readonly type: "tuple[]";
                        }, {
                            readonly internalType: "bytes";
                            readonly name: "_signature";
                            readonly type: "bytes";
                        }];
                        readonly name: "exec";
                        readonly outputs: readonly [];
                        readonly stateMutability: "nonpayable";
                        readonly type: "function";
                    }, {
                        readonly inputs: readonly [];
                        readonly name: "nonce";
                        readonly outputs: readonly [{
                            readonly internalType: "uint256";
                            readonly name: "";
                            readonly type: "uint256";
                        }];
                        readonly stateMutability: "view";
                        readonly type: "function";
                    }, {
                        readonly inputs: readonly [];
                        readonly name: "owner";
                        readonly outputs: readonly [{
                            readonly internalType: "address";
                            readonly name: "";
                            readonly type: "address";
                        }];
                        readonly stateMutability: "view";
                        readonly type: "function";
                    }, {
                        readonly inputs: readonly [];
                        readonly name: "proxiableUUID";
                        readonly outputs: readonly [{
                            readonly internalType: "bytes32";
                            readonly name: "";
                            readonly type: "bytes32";
                        }];
                        readonly stateMutability: "view";
                        readonly type: "function";
                    }, {
                        readonly inputs: readonly [{
                            readonly internalType: "address";
                            readonly name: "newImplementation";
                            readonly type: "address";
                        }];
                        readonly name: "upgradeTo";
                        readonly outputs: readonly [];
                        readonly stateMutability: "nonpayable";
                        readonly type: "function";
                    }, {
                        readonly inputs: readonly [{
                            readonly internalType: "address";
                            readonly name: "newImplementation";
                            readonly type: "address";
                        }, {
                            readonly internalType: "bytes";
                            readonly name: "data";
                            readonly type: "bytes";
                        }];
                        readonly name: "upgradeToAndCall";
                        readonly outputs: readonly [];
                        readonly stateMutability: "payable";
                        readonly type: "function";
                    }, {
                        readonly stateMutability: "payable";
                        readonly type: "receive";
                    }], "LogCall", undefined>;
                    poll?: true | undefined;
                }) => import("viem").WatchContractEventReturnType;
                LogReceivedEther: (args: {
                    _from?: `0x${string}` | `0x${string}`[] | null | undefined;
                }, options: {
                    batch?: boolean | undefined;
                    pollingInterval?: number | undefined;
                    strict?: boolean | undefined;
                    onError?: ((error: Error) => void) | undefined;
                    onLogs: import("viem").WatchContractEventOnLogsFn<readonly [{
                        readonly anonymous: false;
                        readonly inputs: readonly [{
                            readonly indexed: false;
                            readonly internalType: "address";
                            readonly name: "previousAdmin";
                            readonly type: "address";
                        }, {
                            readonly indexed: false;
                            readonly internalType: "address";
                            readonly name: "newAdmin";
                            readonly type: "address";
                        }];
                        readonly name: "AdminChanged";
                        readonly type: "event";
                    }, {
                        readonly anonymous: false;
                        readonly inputs: readonly [{
                            readonly indexed: true;
                            readonly internalType: "address";
                            readonly name: "beacon";
                            readonly type: "address";
                        }];
                        readonly name: "BeaconUpgraded";
                        readonly type: "event";
                    }, {
                        readonly anonymous: false;
                        readonly inputs: readonly [{
                            readonly indexed: false;
                            readonly internalType: "uint8";
                            readonly name: "version";
                            readonly type: "uint8";
                        }];
                        readonly name: "Initialized";
                        readonly type: "event";
                    }, {
                        readonly anonymous: false;
                        readonly inputs: readonly [{
                            readonly indexed: true;
                            readonly internalType: "address";
                            readonly name: "_contract";
                            readonly type: "address";
                        }, {
                            readonly indexed: false;
                            readonly internalType: "uint256";
                            readonly name: "_value";
                            readonly type: "uint256";
                        }, {
                            readonly indexed: false;
                            readonly internalType: "bytes";
                            readonly name: "_data";
                            readonly type: "bytes";
                        }];
                        readonly name: "LogCall";
                        readonly type: "event";
                    }, {
                        readonly anonymous: false;
                        readonly inputs: readonly [{
                            readonly indexed: true;
                            readonly internalType: "address";
                            readonly name: "_from";
                            readonly type: "address";
                        }, {
                            readonly indexed: false;
                            readonly internalType: "uint256";
                            readonly name: "_amount";
                            readonly type: "uint256";
                        }];
                        readonly name: "LogReceivedEther";
                        readonly type: "event";
                    }, {
                        readonly anonymous: false;
                        readonly inputs: readonly [{
                            readonly indexed: true;
                            readonly internalType: "address";
                            readonly name: "implementation";
                            readonly type: "address";
                        }];
                        readonly name: "Upgraded";
                        readonly type: "event";
                    }, {
                        readonly inputs: readonly [{
                            readonly internalType: "address";
                            readonly name: "_owner";
                            readonly type: "address";
                        }];
                        readonly name: "__ECDSAWallet_init";
                        readonly outputs: readonly [];
                        readonly stateMutability: "nonpayable";
                        readonly type: "function";
                    }, {
                        readonly inputs: readonly [];
                        readonly name: "__SmartWallet_init";
                        readonly outputs: readonly [];
                        readonly stateMutability: "nonpayable";
                        readonly type: "function";
                    }, {
                        readonly inputs: readonly [{
                            readonly internalType: "uint256";
                            readonly name: "_chainID";
                            readonly type: "uint256";
                        }];
                        readonly name: "domainSeperator";
                        readonly outputs: readonly [{
                            readonly internalType: "bytes32";
                            readonly name: "";
                            readonly type: "bytes32";
                        }];
                        readonly stateMutability: "view";
                        readonly type: "function";
                    }, {
                        readonly inputs: readonly [{
                            readonly components: readonly [{
                                readonly internalType: "address";
                                readonly name: "to";
                                readonly type: "address";
                            }, {
                                readonly internalType: "uint256";
                                readonly name: "amount";
                                readonly type: "uint256";
                            }, {
                                readonly internalType: "bytes";
                                readonly name: "data";
                                readonly type: "bytes";
                            }];
                            readonly internalType: "struct IWallet.UserOp[]";
                            readonly name: "userOps";
                            readonly type: "tuple[]";
                        }, {
                            readonly internalType: "bytes";
                            readonly name: "_signature";
                            readonly type: "bytes";
                        }];
                        readonly name: "exec";
                        readonly outputs: readonly [];
                        readonly stateMutability: "nonpayable";
                        readonly type: "function";
                    }, {
                        readonly inputs: readonly [];
                        readonly name: "nonce";
                        readonly outputs: readonly [{
                            readonly internalType: "uint256";
                            readonly name: "";
                            readonly type: "uint256";
                        }];
                        readonly stateMutability: "view";
                        readonly type: "function";
                    }, {
                        readonly inputs: readonly [];
                        readonly name: "owner";
                        readonly outputs: readonly [{
                            readonly internalType: "address";
                            readonly name: "";
                            readonly type: "address";
                        }];
                        readonly stateMutability: "view";
                        readonly type: "function";
                    }, {
                        readonly inputs: readonly [];
                        readonly name: "proxiableUUID";
                        readonly outputs: readonly [{
                            readonly internalType: "bytes32";
                            readonly name: "";
                            readonly type: "bytes32";
                        }];
                        readonly stateMutability: "view";
                        readonly type: "function";
                    }, {
                        readonly inputs: readonly [{
                            readonly internalType: "address";
                            readonly name: "newImplementation";
                            readonly type: "address";
                        }];
                        readonly name: "upgradeTo";
                        readonly outputs: readonly [];
                        readonly stateMutability: "nonpayable";
                        readonly type: "function";
                    }, {
                        readonly inputs: readonly [{
                            readonly internalType: "address";
                            readonly name: "newImplementation";
                            readonly type: "address";
                        }, {
                            readonly internalType: "bytes";
                            readonly name: "data";
                            readonly type: "bytes";
                        }];
                        readonly name: "upgradeToAndCall";
                        readonly outputs: readonly [];
                        readonly stateMutability: "payable";
                        readonly type: "function";
                    }, {
                        readonly stateMutability: "payable";
                        readonly type: "receive";
                    }], "LogReceivedEther", undefined>;
                    poll?: true | undefined;
                }) => import("viem").WatchContractEventReturnType;
                Upgraded: (args: {
                    implementation?: `0x${string}` | `0x${string}`[] | null | undefined;
                }, options: {
                    batch?: boolean | undefined;
                    pollingInterval?: number | undefined;
                    strict?: boolean | undefined;
                    onError?: ((error: Error) => void) | undefined;
                    onLogs: import("viem").WatchContractEventOnLogsFn<readonly [{
                        readonly anonymous: false;
                        readonly inputs: readonly [{
                            readonly indexed: false;
                            readonly internalType: "address";
                            readonly name: "previousAdmin";
                            readonly type: "address";
                        }, {
                            readonly indexed: false;
                            readonly internalType: "address";
                            readonly name: "newAdmin";
                            readonly type: "address";
                        }];
                        readonly name: "AdminChanged";
                        readonly type: "event";
                    }, {
                        readonly anonymous: false;
                        readonly inputs: readonly [{
                            readonly indexed: true;
                            readonly internalType: "address";
                            readonly name: "beacon";
                            readonly type: "address";
                        }];
                        readonly name: "BeaconUpgraded";
                        readonly type: "event";
                    }, {
                        readonly anonymous: false;
                        readonly inputs: readonly [{
                            readonly indexed: false;
                            readonly internalType: "uint8";
                            readonly name: "version";
                            readonly type: "uint8";
                        }];
                        readonly name: "Initialized";
                        readonly type: "event";
                    }, {
                        readonly anonymous: false;
                        readonly inputs: readonly [{
                            readonly indexed: true;
                            readonly internalType: "address";
                            readonly name: "_contract";
                            readonly type: "address";
                        }, {
                            readonly indexed: false;
                            readonly internalType: "uint256";
                            readonly name: "_value";
                            readonly type: "uint256";
                        }, {
                            readonly indexed: false;
                            readonly internalType: "bytes";
                            readonly name: "_data";
                            readonly type: "bytes";
                        }];
                        readonly name: "LogCall";
                        readonly type: "event";
                    }, {
                        readonly anonymous: false;
                        readonly inputs: readonly [{
                            readonly indexed: true;
                            readonly internalType: "address";
                            readonly name: "_from";
                            readonly type: "address";
                        }, {
                            readonly indexed: false;
                            readonly internalType: "uint256";
                            readonly name: "_amount";
                            readonly type: "uint256";
                        }];
                        readonly name: "LogReceivedEther";
                        readonly type: "event";
                    }, {
                        readonly anonymous: false;
                        readonly inputs: readonly [{
                            readonly indexed: true;
                            readonly internalType: "address";
                            readonly name: "implementation";
                            readonly type: "address";
                        }];
                        readonly name: "Upgraded";
                        readonly type: "event";
                    }, {
                        readonly inputs: readonly [{
                            readonly internalType: "address";
                            readonly name: "_owner";
                            readonly type: "address";
                        }];
                        readonly name: "__ECDSAWallet_init";
                        readonly outputs: readonly [];
                        readonly stateMutability: "nonpayable";
                        readonly type: "function";
                    }, {
                        readonly inputs: readonly [];
                        readonly name: "__SmartWallet_init";
                        readonly outputs: readonly [];
                        readonly stateMutability: "nonpayable";
                        readonly type: "function";
                    }, {
                        readonly inputs: readonly [{
                            readonly internalType: "uint256";
                            readonly name: "_chainID";
                            readonly type: "uint256";
                        }];
                        readonly name: "domainSeperator";
                        readonly outputs: readonly [{
                            readonly internalType: "bytes32";
                            readonly name: "";
                            readonly type: "bytes32";
                        }];
                        readonly stateMutability: "view";
                        readonly type: "function";
                    }, {
                        readonly inputs: readonly [{
                            readonly components: readonly [{
                                readonly internalType: "address";
                                readonly name: "to";
                                readonly type: "address";
                            }, {
                                readonly internalType: "uint256";
                                readonly name: "amount";
                                readonly type: "uint256";
                            }, {
                                readonly internalType: "bytes";
                                readonly name: "data";
                                readonly type: "bytes";
                            }];
                            readonly internalType: "struct IWallet.UserOp[]";
                            readonly name: "userOps";
                            readonly type: "tuple[]";
                        }, {
                            readonly internalType: "bytes";
                            readonly name: "_signature";
                            readonly type: "bytes";
                        }];
                        readonly name: "exec";
                        readonly outputs: readonly [];
                        readonly stateMutability: "nonpayable";
                        readonly type: "function";
                    }, {
                        readonly inputs: readonly [];
                        readonly name: "nonce";
                        readonly outputs: readonly [{
                            readonly internalType: "uint256";
                            readonly name: "";
                            readonly type: "uint256";
                        }];
                        readonly stateMutability: "view";
                        readonly type: "function";
                    }, {
                        readonly inputs: readonly [];
                        readonly name: "owner";
                        readonly outputs: readonly [{
                            readonly internalType: "address";
                            readonly name: "";
                            readonly type: "address";
                        }];
                        readonly stateMutability: "view";
                        readonly type: "function";
                    }, {
                        readonly inputs: readonly [];
                        readonly name: "proxiableUUID";
                        readonly outputs: readonly [{
                            readonly internalType: "bytes32";
                            readonly name: "";
                            readonly type: "bytes32";
                        }];
                        readonly stateMutability: "view";
                        readonly type: "function";
                    }, {
                        readonly inputs: readonly [{
                            readonly internalType: "address";
                            readonly name: "newImplementation";
                            readonly type: "address";
                        }];
                        readonly name: "upgradeTo";
                        readonly outputs: readonly [];
                        readonly stateMutability: "nonpayable";
                        readonly type: "function";
                    }, {
                        readonly inputs: readonly [{
                            readonly internalType: "address";
                            readonly name: "newImplementation";
                            readonly type: "address";
                        }, {
                            readonly internalType: "bytes";
                            readonly name: "data";
                            readonly type: "bytes";
                        }];
                        readonly name: "upgradeToAndCall";
                        readonly outputs: readonly [];
                        readonly stateMutability: "payable";
                        readonly type: "function";
                    }, {
                        readonly stateMutability: "payable";
                        readonly type: "receive";
                    }], "Upgraded", undefined>;
                    poll?: true | undefined;
                }) => import("viem").WatchContractEventReturnType;
            };
            write: {
                __ECDSAWallet_init: <TChainOverride_5 extends import("viem").Chain | undefined, Options extends import("viem").UnionOmit<import("viem").WriteContractParameters<readonly [{
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: false;
                        readonly internalType: "address";
                        readonly name: "previousAdmin";
                        readonly type: "address";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "address";
                        readonly name: "newAdmin";
                        readonly type: "address";
                    }];
                    readonly name: "AdminChanged";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "beacon";
                        readonly type: "address";
                    }];
                    readonly name: "BeaconUpgraded";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: false;
                        readonly internalType: "uint8";
                        readonly name: "version";
                        readonly type: "uint8";
                    }];
                    readonly name: "Initialized";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "_contract";
                        readonly type: "address";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "uint256";
                        readonly name: "_value";
                        readonly type: "uint256";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "bytes";
                        readonly name: "_data";
                        readonly type: "bytes";
                    }];
                    readonly name: "LogCall";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "_from";
                        readonly type: "address";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "uint256";
                        readonly name: "_amount";
                        readonly type: "uint256";
                    }];
                    readonly name: "LogReceivedEther";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "implementation";
                        readonly type: "address";
                    }];
                    readonly name: "Upgraded";
                    readonly type: "event";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "_owner";
                        readonly type: "address";
                    }];
                    readonly name: "__ECDSAWallet_init";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "__SmartWallet_init";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "uint256";
                        readonly name: "_chainID";
                        readonly type: "uint256";
                    }];
                    readonly name: "domainSeperator";
                    readonly outputs: readonly [{
                        readonly internalType: "bytes32";
                        readonly name: "";
                        readonly type: "bytes32";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly components: readonly [{
                            readonly internalType: "address";
                            readonly name: "to";
                            readonly type: "address";
                        }, {
                            readonly internalType: "uint256";
                            readonly name: "amount";
                            readonly type: "uint256";
                        }, {
                            readonly internalType: "bytes";
                            readonly name: "data";
                            readonly type: "bytes";
                        }];
                        readonly internalType: "struct IWallet.UserOp[]";
                        readonly name: "userOps";
                        readonly type: "tuple[]";
                    }, {
                        readonly internalType: "bytes";
                        readonly name: "_signature";
                        readonly type: "bytes";
                    }];
                    readonly name: "exec";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "nonce";
                    readonly outputs: readonly [{
                        readonly internalType: "uint256";
                        readonly name: "";
                        readonly type: "uint256";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "owner";
                    readonly outputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "";
                        readonly type: "address";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "proxiableUUID";
                    readonly outputs: readonly [{
                        readonly internalType: "bytes32";
                        readonly name: "";
                        readonly type: "bytes32";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "newImplementation";
                        readonly type: "address";
                    }];
                    readonly name: "upgradeTo";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "newImplementation";
                        readonly type: "address";
                    }, {
                        readonly internalType: "bytes";
                        readonly name: "data";
                        readonly type: "bytes";
                    }];
                    readonly name: "upgradeToAndCall";
                    readonly outputs: readonly [];
                    readonly stateMutability: "payable";
                    readonly type: "function";
                }, {
                    readonly stateMutability: "payable";
                    readonly type: "receive";
                }], "__ECDSAWallet_init", readonly [`0x${string}`], import("viem").Chain | undefined, undefined, TChainOverride_5>, "address" | "abi" | "args" | "functionName"> extends infer T_4 ? { [K in keyof T_4]: import("viem").UnionOmit<import("viem").WriteContractParameters<readonly [{
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: false;
                        readonly internalType: "address";
                        readonly name: "previousAdmin";
                        readonly type: "address";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "address";
                        readonly name: "newAdmin";
                        readonly type: "address";
                    }];
                    readonly name: "AdminChanged";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "beacon";
                        readonly type: "address";
                    }];
                    readonly name: "BeaconUpgraded";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: false;
                        readonly internalType: "uint8";
                        readonly name: "version";
                        readonly type: "uint8";
                    }];
                    readonly name: "Initialized";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "_contract";
                        readonly type: "address";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "uint256";
                        readonly name: "_value";
                        readonly type: "uint256";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "bytes";
                        readonly name: "_data";
                        readonly type: "bytes";
                    }];
                    readonly name: "LogCall";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "_from";
                        readonly type: "address";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "uint256";
                        readonly name: "_amount";
                        readonly type: "uint256";
                    }];
                    readonly name: "LogReceivedEther";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "implementation";
                        readonly type: "address";
                    }];
                    readonly name: "Upgraded";
                    readonly type: "event";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "_owner";
                        readonly type: "address";
                    }];
                    readonly name: "__ECDSAWallet_init";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "__SmartWallet_init";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "uint256";
                        readonly name: "_chainID";
                        readonly type: "uint256";
                    }];
                    readonly name: "domainSeperator";
                    readonly outputs: readonly [{
                        readonly internalType: "bytes32";
                        readonly name: "";
                        readonly type: "bytes32";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly components: readonly [{
                            readonly internalType: "address";
                            readonly name: "to";
                            readonly type: "address";
                        }, {
                            readonly internalType: "uint256";
                            readonly name: "amount";
                            readonly type: "uint256";
                        }, {
                            readonly internalType: "bytes";
                            readonly name: "data";
                            readonly type: "bytes";
                        }];
                        readonly internalType: "struct IWallet.UserOp[]";
                        readonly name: "userOps";
                        readonly type: "tuple[]";
                    }, {
                        readonly internalType: "bytes";
                        readonly name: "_signature";
                        readonly type: "bytes";
                    }];
                    readonly name: "exec";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "nonce";
                    readonly outputs: readonly [{
                        readonly internalType: "uint256";
                        readonly name: "";
                        readonly type: "uint256";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "owner";
                    readonly outputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "";
                        readonly type: "address";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "proxiableUUID";
                    readonly outputs: readonly [{
                        readonly internalType: "bytes32";
                        readonly name: "";
                        readonly type: "bytes32";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "newImplementation";
                        readonly type: "address";
                    }];
                    readonly name: "upgradeTo";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "newImplementation";
                        readonly type: "address";
                    }, {
                        readonly internalType: "bytes";
                        readonly name: "data";
                        readonly type: "bytes";
                    }];
                    readonly name: "upgradeToAndCall";
                    readonly outputs: readonly [];
                    readonly stateMutability: "payable";
                    readonly type: "function";
                }, {
                    readonly stateMutability: "payable";
                    readonly type: "receive";
                }], "__ECDSAWallet_init", readonly [`0x${string}`], import("viem").Chain | undefined, undefined, TChainOverride_5>, "address" | "abi" | "args" | "functionName">[K]; } : never>(args: readonly [`0x${string}`], options: Options) => Promise<`0x${string}`>;
                __SmartWallet_init: <TChainOverride_6 extends import("viem").Chain | undefined, Options_1 extends import("viem").UnionOmit<import("viem").WriteContractParameters<readonly [{
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: false;
                        readonly internalType: "address";
                        readonly name: "previousAdmin";
                        readonly type: "address";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "address";
                        readonly name: "newAdmin";
                        readonly type: "address";
                    }];
                    readonly name: "AdminChanged";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "beacon";
                        readonly type: "address";
                    }];
                    readonly name: "BeaconUpgraded";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: false;
                        readonly internalType: "uint8";
                        readonly name: "version";
                        readonly type: "uint8";
                    }];
                    readonly name: "Initialized";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "_contract";
                        readonly type: "address";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "uint256";
                        readonly name: "_value";
                        readonly type: "uint256";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "bytes";
                        readonly name: "_data";
                        readonly type: "bytes";
                    }];
                    readonly name: "LogCall";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "_from";
                        readonly type: "address";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "uint256";
                        readonly name: "_amount";
                        readonly type: "uint256";
                    }];
                    readonly name: "LogReceivedEther";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "implementation";
                        readonly type: "address";
                    }];
                    readonly name: "Upgraded";
                    readonly type: "event";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "_owner";
                        readonly type: "address";
                    }];
                    readonly name: "__ECDSAWallet_init";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "__SmartWallet_init";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "uint256";
                        readonly name: "_chainID";
                        readonly type: "uint256";
                    }];
                    readonly name: "domainSeperator";
                    readonly outputs: readonly [{
                        readonly internalType: "bytes32";
                        readonly name: "";
                        readonly type: "bytes32";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly components: readonly [{
                            readonly internalType: "address";
                            readonly name: "to";
                            readonly type: "address";
                        }, {
                            readonly internalType: "uint256";
                            readonly name: "amount";
                            readonly type: "uint256";
                        }, {
                            readonly internalType: "bytes";
                            readonly name: "data";
                            readonly type: "bytes";
                        }];
                        readonly internalType: "struct IWallet.UserOp[]";
                        readonly name: "userOps";
                        readonly type: "tuple[]";
                    }, {
                        readonly internalType: "bytes";
                        readonly name: "_signature";
                        readonly type: "bytes";
                    }];
                    readonly name: "exec";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "nonce";
                    readonly outputs: readonly [{
                        readonly internalType: "uint256";
                        readonly name: "";
                        readonly type: "uint256";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "owner";
                    readonly outputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "";
                        readonly type: "address";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "proxiableUUID";
                    readonly outputs: readonly [{
                        readonly internalType: "bytes32";
                        readonly name: "";
                        readonly type: "bytes32";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "newImplementation";
                        readonly type: "address";
                    }];
                    readonly name: "upgradeTo";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "newImplementation";
                        readonly type: "address";
                    }, {
                        readonly internalType: "bytes";
                        readonly name: "data";
                        readonly type: "bytes";
                    }];
                    readonly name: "upgradeToAndCall";
                    readonly outputs: readonly [];
                    readonly stateMutability: "payable";
                    readonly type: "function";
                }, {
                    readonly stateMutability: "payable";
                    readonly type: "receive";
                }], "__SmartWallet_init", readonly [], import("viem").Chain | undefined, undefined, TChainOverride_6>, "address" | "abi" | "args" | "functionName"> extends infer T_5 ? { [K_1 in keyof T_5]: import("viem").UnionOmit<import("viem").WriteContractParameters<readonly [{
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: false;
                        readonly internalType: "address";
                        readonly name: "previousAdmin";
                        readonly type: "address";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "address";
                        readonly name: "newAdmin";
                        readonly type: "address";
                    }];
                    readonly name: "AdminChanged";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "beacon";
                        readonly type: "address";
                    }];
                    readonly name: "BeaconUpgraded";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: false;
                        readonly internalType: "uint8";
                        readonly name: "version";
                        readonly type: "uint8";
                    }];
                    readonly name: "Initialized";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "_contract";
                        readonly type: "address";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "uint256";
                        readonly name: "_value";
                        readonly type: "uint256";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "bytes";
                        readonly name: "_data";
                        readonly type: "bytes";
                    }];
                    readonly name: "LogCall";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "_from";
                        readonly type: "address";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "uint256";
                        readonly name: "_amount";
                        readonly type: "uint256";
                    }];
                    readonly name: "LogReceivedEther";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "implementation";
                        readonly type: "address";
                    }];
                    readonly name: "Upgraded";
                    readonly type: "event";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "_owner";
                        readonly type: "address";
                    }];
                    readonly name: "__ECDSAWallet_init";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "__SmartWallet_init";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "uint256";
                        readonly name: "_chainID";
                        readonly type: "uint256";
                    }];
                    readonly name: "domainSeperator";
                    readonly outputs: readonly [{
                        readonly internalType: "bytes32";
                        readonly name: "";
                        readonly type: "bytes32";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly components: readonly [{
                            readonly internalType: "address";
                            readonly name: "to";
                            readonly type: "address";
                        }, {
                            readonly internalType: "uint256";
                            readonly name: "amount";
                            readonly type: "uint256";
                        }, {
                            readonly internalType: "bytes";
                            readonly name: "data";
                            readonly type: "bytes";
                        }];
                        readonly internalType: "struct IWallet.UserOp[]";
                        readonly name: "userOps";
                        readonly type: "tuple[]";
                    }, {
                        readonly internalType: "bytes";
                        readonly name: "_signature";
                        readonly type: "bytes";
                    }];
                    readonly name: "exec";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "nonce";
                    readonly outputs: readonly [{
                        readonly internalType: "uint256";
                        readonly name: "";
                        readonly type: "uint256";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "owner";
                    readonly outputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "";
                        readonly type: "address";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "proxiableUUID";
                    readonly outputs: readonly [{
                        readonly internalType: "bytes32";
                        readonly name: "";
                        readonly type: "bytes32";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "newImplementation";
                        readonly type: "address";
                    }];
                    readonly name: "upgradeTo";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "newImplementation";
                        readonly type: "address";
                    }, {
                        readonly internalType: "bytes";
                        readonly name: "data";
                        readonly type: "bytes";
                    }];
                    readonly name: "upgradeToAndCall";
                    readonly outputs: readonly [];
                    readonly stateMutability: "payable";
                    readonly type: "function";
                }, {
                    readonly stateMutability: "payable";
                    readonly type: "receive";
                }], "__SmartWallet_init", readonly [], import("viem").Chain | undefined, undefined, TChainOverride_6>, "address" | "abi" | "args" | "functionName">[K_1]; } : never>(options: Options_1) => Promise<`0x${string}`>;
                exec: <TChainOverride_7 extends import("viem").Chain | undefined, Options_2 extends import("viem").UnionOmit<import("viem").WriteContractParameters<readonly [{
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: false;
                        readonly internalType: "address";
                        readonly name: "previousAdmin";
                        readonly type: "address";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "address";
                        readonly name: "newAdmin";
                        readonly type: "address";
                    }];
                    readonly name: "AdminChanged";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "beacon";
                        readonly type: "address";
                    }];
                    readonly name: "BeaconUpgraded";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: false;
                        readonly internalType: "uint8";
                        readonly name: "version";
                        readonly type: "uint8";
                    }];
                    readonly name: "Initialized";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "_contract";
                        readonly type: "address";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "uint256";
                        readonly name: "_value";
                        readonly type: "uint256";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "bytes";
                        readonly name: "_data";
                        readonly type: "bytes";
                    }];
                    readonly name: "LogCall";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "_from";
                        readonly type: "address";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "uint256";
                        readonly name: "_amount";
                        readonly type: "uint256";
                    }];
                    readonly name: "LogReceivedEther";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "implementation";
                        readonly type: "address";
                    }];
                    readonly name: "Upgraded";
                    readonly type: "event";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "_owner";
                        readonly type: "address";
                    }];
                    readonly name: "__ECDSAWallet_init";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "__SmartWallet_init";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "uint256";
                        readonly name: "_chainID";
                        readonly type: "uint256";
                    }];
                    readonly name: "domainSeperator";
                    readonly outputs: readonly [{
                        readonly internalType: "bytes32";
                        readonly name: "";
                        readonly type: "bytes32";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly components: readonly [{
                            readonly internalType: "address";
                            readonly name: "to";
                            readonly type: "address";
                        }, {
                            readonly internalType: "uint256";
                            readonly name: "amount";
                            readonly type: "uint256";
                        }, {
                            readonly internalType: "bytes";
                            readonly name: "data";
                            readonly type: "bytes";
                        }];
                        readonly internalType: "struct IWallet.UserOp[]";
                        readonly name: "userOps";
                        readonly type: "tuple[]";
                    }, {
                        readonly internalType: "bytes";
                        readonly name: "_signature";
                        readonly type: "bytes";
                    }];
                    readonly name: "exec";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "nonce";
                    readonly outputs: readonly [{
                        readonly internalType: "uint256";
                        readonly name: "";
                        readonly type: "uint256";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "owner";
                    readonly outputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "";
                        readonly type: "address";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "proxiableUUID";
                    readonly outputs: readonly [{
                        readonly internalType: "bytes32";
                        readonly name: "";
                        readonly type: "bytes32";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "newImplementation";
                        readonly type: "address";
                    }];
                    readonly name: "upgradeTo";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "newImplementation";
                        readonly type: "address";
                    }, {
                        readonly internalType: "bytes";
                        readonly name: "data";
                        readonly type: "bytes";
                    }];
                    readonly name: "upgradeToAndCall";
                    readonly outputs: readonly [];
                    readonly stateMutability: "payable";
                    readonly type: "function";
                }, {
                    readonly stateMutability: "payable";
                    readonly type: "receive";
                }], "exec", readonly [readonly {
                    to: `0x${string}`;
                    amount: bigint;
                    data: `0x${string}`;
                }[], `0x${string}`], import("viem").Chain | undefined, undefined, TChainOverride_7>, "address" | "abi" | "args" | "functionName"> extends infer T_6 ? { [K_2 in keyof T_6]: import("viem").UnionOmit<import("viem").WriteContractParameters<readonly [{
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: false;
                        readonly internalType: "address";
                        readonly name: "previousAdmin";
                        readonly type: "address";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "address";
                        readonly name: "newAdmin";
                        readonly type: "address";
                    }];
                    readonly name: "AdminChanged";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "beacon";
                        readonly type: "address";
                    }];
                    readonly name: "BeaconUpgraded";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: false;
                        readonly internalType: "uint8";
                        readonly name: "version";
                        readonly type: "uint8";
                    }];
                    readonly name: "Initialized";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "_contract";
                        readonly type: "address";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "uint256";
                        readonly name: "_value";
                        readonly type: "uint256";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "bytes";
                        readonly name: "_data";
                        readonly type: "bytes";
                    }];
                    readonly name: "LogCall";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "_from";
                        readonly type: "address";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "uint256";
                        readonly name: "_amount";
                        readonly type: "uint256";
                    }];
                    readonly name: "LogReceivedEther";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "implementation";
                        readonly type: "address";
                    }];
                    readonly name: "Upgraded";
                    readonly type: "event";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "_owner";
                        readonly type: "address";
                    }];
                    readonly name: "__ECDSAWallet_init";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "__SmartWallet_init";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "uint256";
                        readonly name: "_chainID";
                        readonly type: "uint256";
                    }];
                    readonly name: "domainSeperator";
                    readonly outputs: readonly [{
                        readonly internalType: "bytes32";
                        readonly name: "";
                        readonly type: "bytes32";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly components: readonly [{
                            readonly internalType: "address";
                            readonly name: "to";
                            readonly type: "address";
                        }, {
                            readonly internalType: "uint256";
                            readonly name: "amount";
                            readonly type: "uint256";
                        }, {
                            readonly internalType: "bytes";
                            readonly name: "data";
                            readonly type: "bytes";
                        }];
                        readonly internalType: "struct IWallet.UserOp[]";
                        readonly name: "userOps";
                        readonly type: "tuple[]";
                    }, {
                        readonly internalType: "bytes";
                        readonly name: "_signature";
                        readonly type: "bytes";
                    }];
                    readonly name: "exec";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "nonce";
                    readonly outputs: readonly [{
                        readonly internalType: "uint256";
                        readonly name: "";
                        readonly type: "uint256";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "owner";
                    readonly outputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "";
                        readonly type: "address";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "proxiableUUID";
                    readonly outputs: readonly [{
                        readonly internalType: "bytes32";
                        readonly name: "";
                        readonly type: "bytes32";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "newImplementation";
                        readonly type: "address";
                    }];
                    readonly name: "upgradeTo";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "newImplementation";
                        readonly type: "address";
                    }, {
                        readonly internalType: "bytes";
                        readonly name: "data";
                        readonly type: "bytes";
                    }];
                    readonly name: "upgradeToAndCall";
                    readonly outputs: readonly [];
                    readonly stateMutability: "payable";
                    readonly type: "function";
                }, {
                    readonly stateMutability: "payable";
                    readonly type: "receive";
                }], "exec", readonly [readonly {
                    to: `0x${string}`;
                    amount: bigint;
                    data: `0x${string}`;
                }[], `0x${string}`], import("viem").Chain | undefined, undefined, TChainOverride_7>, "address" | "abi" | "args" | "functionName">[K_2]; } : never>(args: readonly [readonly {
                    to: `0x${string}`;
                    amount: bigint;
                    data: `0x${string}`;
                }[], `0x${string}`], options: Options_2) => Promise<`0x${string}`>;
                upgradeTo: <TChainOverride_8 extends import("viem").Chain | undefined, Options_3 extends import("viem").UnionOmit<import("viem").WriteContractParameters<readonly [{
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: false;
                        readonly internalType: "address";
                        readonly name: "previousAdmin";
                        readonly type: "address";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "address";
                        readonly name: "newAdmin";
                        readonly type: "address";
                    }];
                    readonly name: "AdminChanged";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "beacon";
                        readonly type: "address";
                    }];
                    readonly name: "BeaconUpgraded";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: false;
                        readonly internalType: "uint8";
                        readonly name: "version";
                        readonly type: "uint8";
                    }];
                    readonly name: "Initialized";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "_contract";
                        readonly type: "address";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "uint256";
                        readonly name: "_value";
                        readonly type: "uint256";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "bytes";
                        readonly name: "_data";
                        readonly type: "bytes";
                    }];
                    readonly name: "LogCall";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "_from";
                        readonly type: "address";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "uint256";
                        readonly name: "_amount";
                        readonly type: "uint256";
                    }];
                    readonly name: "LogReceivedEther";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "implementation";
                        readonly type: "address";
                    }];
                    readonly name: "Upgraded";
                    readonly type: "event";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "_owner";
                        readonly type: "address";
                    }];
                    readonly name: "__ECDSAWallet_init";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "__SmartWallet_init";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "uint256";
                        readonly name: "_chainID";
                        readonly type: "uint256";
                    }];
                    readonly name: "domainSeperator";
                    readonly outputs: readonly [{
                        readonly internalType: "bytes32";
                        readonly name: "";
                        readonly type: "bytes32";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly components: readonly [{
                            readonly internalType: "address";
                            readonly name: "to";
                            readonly type: "address";
                        }, {
                            readonly internalType: "uint256";
                            readonly name: "amount";
                            readonly type: "uint256";
                        }, {
                            readonly internalType: "bytes";
                            readonly name: "data";
                            readonly type: "bytes";
                        }];
                        readonly internalType: "struct IWallet.UserOp[]";
                        readonly name: "userOps";
                        readonly type: "tuple[]";
                    }, {
                        readonly internalType: "bytes";
                        readonly name: "_signature";
                        readonly type: "bytes";
                    }];
                    readonly name: "exec";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "nonce";
                    readonly outputs: readonly [{
                        readonly internalType: "uint256";
                        readonly name: "";
                        readonly type: "uint256";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "owner";
                    readonly outputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "";
                        readonly type: "address";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "proxiableUUID";
                    readonly outputs: readonly [{
                        readonly internalType: "bytes32";
                        readonly name: "";
                        readonly type: "bytes32";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "newImplementation";
                        readonly type: "address";
                    }];
                    readonly name: "upgradeTo";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "newImplementation";
                        readonly type: "address";
                    }, {
                        readonly internalType: "bytes";
                        readonly name: "data";
                        readonly type: "bytes";
                    }];
                    readonly name: "upgradeToAndCall";
                    readonly outputs: readonly [];
                    readonly stateMutability: "payable";
                    readonly type: "function";
                }, {
                    readonly stateMutability: "payable";
                    readonly type: "receive";
                }], "upgradeTo", readonly [`0x${string}`], import("viem").Chain | undefined, undefined, TChainOverride_8>, "address" | "abi" | "args" | "functionName"> extends infer T_7 ? { [K_3 in keyof T_7]: import("viem").UnionOmit<import("viem").WriteContractParameters<readonly [{
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: false;
                        readonly internalType: "address";
                        readonly name: "previousAdmin";
                        readonly type: "address";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "address";
                        readonly name: "newAdmin";
                        readonly type: "address";
                    }];
                    readonly name: "AdminChanged";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "beacon";
                        readonly type: "address";
                    }];
                    readonly name: "BeaconUpgraded";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: false;
                        readonly internalType: "uint8";
                        readonly name: "version";
                        readonly type: "uint8";
                    }];
                    readonly name: "Initialized";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "_contract";
                        readonly type: "address";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "uint256";
                        readonly name: "_value";
                        readonly type: "uint256";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "bytes";
                        readonly name: "_data";
                        readonly type: "bytes";
                    }];
                    readonly name: "LogCall";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "_from";
                        readonly type: "address";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "uint256";
                        readonly name: "_amount";
                        readonly type: "uint256";
                    }];
                    readonly name: "LogReceivedEther";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "implementation";
                        readonly type: "address";
                    }];
                    readonly name: "Upgraded";
                    readonly type: "event";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "_owner";
                        readonly type: "address";
                    }];
                    readonly name: "__ECDSAWallet_init";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "__SmartWallet_init";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "uint256";
                        readonly name: "_chainID";
                        readonly type: "uint256";
                    }];
                    readonly name: "domainSeperator";
                    readonly outputs: readonly [{
                        readonly internalType: "bytes32";
                        readonly name: "";
                        readonly type: "bytes32";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly components: readonly [{
                            readonly internalType: "address";
                            readonly name: "to";
                            readonly type: "address";
                        }, {
                            readonly internalType: "uint256";
                            readonly name: "amount";
                            readonly type: "uint256";
                        }, {
                            readonly internalType: "bytes";
                            readonly name: "data";
                            readonly type: "bytes";
                        }];
                        readonly internalType: "struct IWallet.UserOp[]";
                        readonly name: "userOps";
                        readonly type: "tuple[]";
                    }, {
                        readonly internalType: "bytes";
                        readonly name: "_signature";
                        readonly type: "bytes";
                    }];
                    readonly name: "exec";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "nonce";
                    readonly outputs: readonly [{
                        readonly internalType: "uint256";
                        readonly name: "";
                        readonly type: "uint256";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "owner";
                    readonly outputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "";
                        readonly type: "address";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "proxiableUUID";
                    readonly outputs: readonly [{
                        readonly internalType: "bytes32";
                        readonly name: "";
                        readonly type: "bytes32";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "newImplementation";
                        readonly type: "address";
                    }];
                    readonly name: "upgradeTo";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "newImplementation";
                        readonly type: "address";
                    }, {
                        readonly internalType: "bytes";
                        readonly name: "data";
                        readonly type: "bytes";
                    }];
                    readonly name: "upgradeToAndCall";
                    readonly outputs: readonly [];
                    readonly stateMutability: "payable";
                    readonly type: "function";
                }, {
                    readonly stateMutability: "payable";
                    readonly type: "receive";
                }], "upgradeTo", readonly [`0x${string}`], import("viem").Chain | undefined, undefined, TChainOverride_8>, "address" | "abi" | "args" | "functionName">[K_3]; } : never>(args: readonly [`0x${string}`], options: Options_3) => Promise<`0x${string}`>;
                upgradeToAndCall: <TChainOverride_9 extends import("viem").Chain | undefined, Options_4 extends import("viem").UnionOmit<import("viem").WriteContractParameters<readonly [{
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: false;
                        readonly internalType: "address";
                        readonly name: "previousAdmin";
                        readonly type: "address";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "address";
                        readonly name: "newAdmin";
                        readonly type: "address";
                    }];
                    readonly name: "AdminChanged";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "beacon";
                        readonly type: "address";
                    }];
                    readonly name: "BeaconUpgraded";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: false;
                        readonly internalType: "uint8";
                        readonly name: "version";
                        readonly type: "uint8";
                    }];
                    readonly name: "Initialized";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "_contract";
                        readonly type: "address";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "uint256";
                        readonly name: "_value";
                        readonly type: "uint256";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "bytes";
                        readonly name: "_data";
                        readonly type: "bytes";
                    }];
                    readonly name: "LogCall";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "_from";
                        readonly type: "address";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "uint256";
                        readonly name: "_amount";
                        readonly type: "uint256";
                    }];
                    readonly name: "LogReceivedEther";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "implementation";
                        readonly type: "address";
                    }];
                    readonly name: "Upgraded";
                    readonly type: "event";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "_owner";
                        readonly type: "address";
                    }];
                    readonly name: "__ECDSAWallet_init";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "__SmartWallet_init";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "uint256";
                        readonly name: "_chainID";
                        readonly type: "uint256";
                    }];
                    readonly name: "domainSeperator";
                    readonly outputs: readonly [{
                        readonly internalType: "bytes32";
                        readonly name: "";
                        readonly type: "bytes32";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly components: readonly [{
                            readonly internalType: "address";
                            readonly name: "to";
                            readonly type: "address";
                        }, {
                            readonly internalType: "uint256";
                            readonly name: "amount";
                            readonly type: "uint256";
                        }, {
                            readonly internalType: "bytes";
                            readonly name: "data";
                            readonly type: "bytes";
                        }];
                        readonly internalType: "struct IWallet.UserOp[]";
                        readonly name: "userOps";
                        readonly type: "tuple[]";
                    }, {
                        readonly internalType: "bytes";
                        readonly name: "_signature";
                        readonly type: "bytes";
                    }];
                    readonly name: "exec";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "nonce";
                    readonly outputs: readonly [{
                        readonly internalType: "uint256";
                        readonly name: "";
                        readonly type: "uint256";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "owner";
                    readonly outputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "";
                        readonly type: "address";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "proxiableUUID";
                    readonly outputs: readonly [{
                        readonly internalType: "bytes32";
                        readonly name: "";
                        readonly type: "bytes32";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "newImplementation";
                        readonly type: "address";
                    }];
                    readonly name: "upgradeTo";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "newImplementation";
                        readonly type: "address";
                    }, {
                        readonly internalType: "bytes";
                        readonly name: "data";
                        readonly type: "bytes";
                    }];
                    readonly name: "upgradeToAndCall";
                    readonly outputs: readonly [];
                    readonly stateMutability: "payable";
                    readonly type: "function";
                }, {
                    readonly stateMutability: "payable";
                    readonly type: "receive";
                }], "upgradeToAndCall", readonly [`0x${string}`, `0x${string}`], import("viem").Chain | undefined, undefined, TChainOverride_9>, "address" | "abi" | "args" | "functionName"> extends infer T_8 ? { [K_4 in keyof T_8]: import("viem").UnionOmit<import("viem").WriteContractParameters<readonly [{
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: false;
                        readonly internalType: "address";
                        readonly name: "previousAdmin";
                        readonly type: "address";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "address";
                        readonly name: "newAdmin";
                        readonly type: "address";
                    }];
                    readonly name: "AdminChanged";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "beacon";
                        readonly type: "address";
                    }];
                    readonly name: "BeaconUpgraded";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: false;
                        readonly internalType: "uint8";
                        readonly name: "version";
                        readonly type: "uint8";
                    }];
                    readonly name: "Initialized";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "_contract";
                        readonly type: "address";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "uint256";
                        readonly name: "_value";
                        readonly type: "uint256";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "bytes";
                        readonly name: "_data";
                        readonly type: "bytes";
                    }];
                    readonly name: "LogCall";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "_from";
                        readonly type: "address";
                    }, {
                        readonly indexed: false;
                        readonly internalType: "uint256";
                        readonly name: "_amount";
                        readonly type: "uint256";
                    }];
                    readonly name: "LogReceivedEther";
                    readonly type: "event";
                }, {
                    readonly anonymous: false;
                    readonly inputs: readonly [{
                        readonly indexed: true;
                        readonly internalType: "address";
                        readonly name: "implementation";
                        readonly type: "address";
                    }];
                    readonly name: "Upgraded";
                    readonly type: "event";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "_owner";
                        readonly type: "address";
                    }];
                    readonly name: "__ECDSAWallet_init";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "__SmartWallet_init";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "uint256";
                        readonly name: "_chainID";
                        readonly type: "uint256";
                    }];
                    readonly name: "domainSeperator";
                    readonly outputs: readonly [{
                        readonly internalType: "bytes32";
                        readonly name: "";
                        readonly type: "bytes32";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly components: readonly [{
                            readonly internalType: "address";
                            readonly name: "to";
                            readonly type: "address";
                        }, {
                            readonly internalType: "uint256";
                            readonly name: "amount";
                            readonly type: "uint256";
                        }, {
                            readonly internalType: "bytes";
                            readonly name: "data";
                            readonly type: "bytes";
                        }];
                        readonly internalType: "struct IWallet.UserOp[]";
                        readonly name: "userOps";
                        readonly type: "tuple[]";
                    }, {
                        readonly internalType: "bytes";
                        readonly name: "_signature";
                        readonly type: "bytes";
                    }];
                    readonly name: "exec";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "nonce";
                    readonly outputs: readonly [{
                        readonly internalType: "uint256";
                        readonly name: "";
                        readonly type: "uint256";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "owner";
                    readonly outputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "";
                        readonly type: "address";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [];
                    readonly name: "proxiableUUID";
                    readonly outputs: readonly [{
                        readonly internalType: "bytes32";
                        readonly name: "";
                        readonly type: "bytes32";
                    }];
                    readonly stateMutability: "view";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "newImplementation";
                        readonly type: "address";
                    }];
                    readonly name: "upgradeTo";
                    readonly outputs: readonly [];
                    readonly stateMutability: "nonpayable";
                    readonly type: "function";
                }, {
                    readonly inputs: readonly [{
                        readonly internalType: "address";
                        readonly name: "newImplementation";
                        readonly type: "address";
                    }, {
                        readonly internalType: "bytes";
                        readonly name: "data";
                        readonly type: "bytes";
                    }];
                    readonly name: "upgradeToAndCall";
                    readonly outputs: readonly [];
                    readonly stateMutability: "payable";
                    readonly type: "function";
                }, {
                    readonly stateMutability: "payable";
                    readonly type: "receive";
                }], "upgradeToAndCall", readonly [`0x${string}`, `0x${string}`], import("viem").Chain | undefined, undefined, TChainOverride_9>, "address" | "abi" | "args" | "functionName">[K_4]; } : never>(args: readonly [`0x${string}`, `0x${string}`], options: Options_4) => Promise<`0x${string}`>;
            };
            address: `0x${string}`;
            abi: readonly [{
                readonly anonymous: false;
                readonly inputs: readonly [{
                    readonly indexed: false;
                    readonly internalType: "address";
                    readonly name: "previousAdmin";
                    readonly type: "address";
                }, {
                    readonly indexed: false;
                    readonly internalType: "address";
                    readonly name: "newAdmin";
                    readonly type: "address";
                }];
                readonly name: "AdminChanged";
                readonly type: "event";
            }, {
                readonly anonymous: false;
                readonly inputs: readonly [{
                    readonly indexed: true;
                    readonly internalType: "address";
                    readonly name: "beacon";
                    readonly type: "address";
                }];
                readonly name: "BeaconUpgraded";
                readonly type: "event";
            }, {
                readonly anonymous: false;
                readonly inputs: readonly [{
                    readonly indexed: false;
                    readonly internalType: "uint8";
                    readonly name: "version";
                    readonly type: "uint8";
                }];
                readonly name: "Initialized";
                readonly type: "event";
            }, {
                readonly anonymous: false;
                readonly inputs: readonly [{
                    readonly indexed: true;
                    readonly internalType: "address";
                    readonly name: "_contract";
                    readonly type: "address";
                }, {
                    readonly indexed: false;
                    readonly internalType: "uint256";
                    readonly name: "_value";
                    readonly type: "uint256";
                }, {
                    readonly indexed: false;
                    readonly internalType: "bytes";
                    readonly name: "_data";
                    readonly type: "bytes";
                }];
                readonly name: "LogCall";
                readonly type: "event";
            }, {
                readonly anonymous: false;
                readonly inputs: readonly [{
                    readonly indexed: true;
                    readonly internalType: "address";
                    readonly name: "_from";
                    readonly type: "address";
                }, {
                    readonly indexed: false;
                    readonly internalType: "uint256";
                    readonly name: "_amount";
                    readonly type: "uint256";
                }];
                readonly name: "LogReceivedEther";
                readonly type: "event";
            }, {
                readonly anonymous: false;
                readonly inputs: readonly [{
                    readonly indexed: true;
                    readonly internalType: "address";
                    readonly name: "implementation";
                    readonly type: "address";
                }];
                readonly name: "Upgraded";
                readonly type: "event";
            }, {
                readonly inputs: readonly [{
                    readonly internalType: "address";
                    readonly name: "_owner";
                    readonly type: "address";
                }];
                readonly name: "__ECDSAWallet_init";
                readonly outputs: readonly [];
                readonly stateMutability: "nonpayable";
                readonly type: "function";
            }, {
                readonly inputs: readonly [];
                readonly name: "__SmartWallet_init";
                readonly outputs: readonly [];
                readonly stateMutability: "nonpayable";
                readonly type: "function";
            }, {
                readonly inputs: readonly [{
                    readonly internalType: "uint256";
                    readonly name: "_chainID";
                    readonly type: "uint256";
                }];
                readonly name: "domainSeperator";
                readonly outputs: readonly [{
                    readonly internalType: "bytes32";
                    readonly name: "";
                    readonly type: "bytes32";
                }];
                readonly stateMutability: "view";
                readonly type: "function";
            }, {
                readonly inputs: readonly [{
                    readonly components: readonly [{
                        readonly internalType: "address";
                        readonly name: "to";
                        readonly type: "address";
                    }, {
                        readonly internalType: "uint256";
                        readonly name: "amount";
                        readonly type: "uint256";
                    }, {
                        readonly internalType: "bytes";
                        readonly name: "data";
                        readonly type: "bytes";
                    }];
                    readonly internalType: "struct IWallet.UserOp[]";
                    readonly name: "userOps";
                    readonly type: "tuple[]";
                }, {
                    readonly internalType: "bytes";
                    readonly name: "_signature";
                    readonly type: "bytes";
                }];
                readonly name: "exec";
                readonly outputs: readonly [];
                readonly stateMutability: "nonpayable";
                readonly type: "function";
            }, {
                readonly inputs: readonly [];
                readonly name: "nonce";
                readonly outputs: readonly [{
                    readonly internalType: "uint256";
                    readonly name: "";
                    readonly type: "uint256";
                }];
                readonly stateMutability: "view";
                readonly type: "function";
            }, {
                readonly inputs: readonly [];
                readonly name: "owner";
                readonly outputs: readonly [{
                    readonly internalType: "address";
                    readonly name: "";
                    readonly type: "address";
                }];
                readonly stateMutability: "view";
                readonly type: "function";
            }, {
                readonly inputs: readonly [];
                readonly name: "proxiableUUID";
                readonly outputs: readonly [{
                    readonly internalType: "bytes32";
                    readonly name: "";
                    readonly type: "bytes32";
                }];
                readonly stateMutability: "view";
                readonly type: "function";
            }, {
                readonly inputs: readonly [{
                    readonly internalType: "address";
                    readonly name: "newImplementation";
                    readonly type: "address";
                }];
                readonly name: "upgradeTo";
                readonly outputs: readonly [];
                readonly stateMutability: "nonpayable";
                readonly type: "function";
            }, {
                readonly inputs: readonly [{
                    readonly internalType: "address";
                    readonly name: "newImplementation";
                    readonly type: "address";
                }, {
                    readonly internalType: "bytes";
                    readonly name: "data";
                    readonly type: "bytes";
                }];
                readonly name: "upgradeToAndCall";
                readonly outputs: readonly [];
                readonly stateMutability: "payable";
                readonly type: "function";
            }, {
                readonly stateMutability: "payable";
                readonly type: "receive";
            }];
        };
    }>;
}
//# sourceMappingURL=smartWalletRouter.d.ts.map