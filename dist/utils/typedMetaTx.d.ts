import type { BigNumber, Wallet } from "ethers";
import { Address } from "viem";
import { UserOp } from "../types/smartWallet";
import { TypedSmartWalletData } from "../types/eip712";
export declare const signTypedTx: (userOps: UserOp[], signer: Wallet, smartWalletAddress: Address, nonce: number | BigNumber, chainID: number, signatureChainID: number) => Promise<string>;
export declare const typedMetaTx: (userOps: UserOp[], nonce: bigint, smartWalletAddress: Address, chainId: number) => TypedSmartWalletData;
//# sourceMappingURL=typedMetaTx.d.ts.map