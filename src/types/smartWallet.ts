import { ChainId } from "@pancakeswap/chains";
import { PancakeSwapOptions } from "@pancakeswap/universal-router-sdk";
import { Address, Hex } from "viem";
import { Routers } from "../encoder/buildOperation";
import { SmartRouterTrade } from "@pancakeswap/smart-router";
import { TradeType } from "@pancakeswap/swap-sdk-core";
import { RouterTradeType } from "../encoder/buildOperation";
import { MethodParameters } from "@pancakeswap/v3-sdk";

export interface BaseTradeOptions<TOps> {
      account: Address;
      chainId: ChainId;
      router: Routers;
      underlyingTradeOptions: TOps;
}

export interface ClassicTradeOptions<TOps> extends BaseTradeOptions<TOps> {
      router: Routers;
}

export interface SmartWalletTradeOptions extends BaseTradeOptions<PancakeSwapOptions> {
      requiresExternalApproval: boolean;
      smartWalletDetails: { address: Address; nonce: bigint };
      SmartWalletTradeType: RouterTradeType;
      router: Routers;
      feeOptions?: FeeResponse;
}

export type UserOp = {
      readonly to: Address;
      readonly amount: bigint;
      readonly data: Hex;
};

export type SwapCall = MethodParameters & { address: Address };

export type ExecuteTradeCallback = {
      signCallback: (args?: any) => Promise<Address>;
      walletOperations: UserOp[];
      account: Address;
      chainId: ChainId;
};

export type FeeResponse = {
      gasEstimate: bigint;
      gasCostInQuoteToken: number;
      gasCostInBaseToken: number;
      gasCostInUSD: number;
};

export type SmartWalletGasParams = { userOps: UserOp[]; trade: SmartRouterTrade<TradeType>; chainId: ChainId };
export type SmartWalletDetails = { address: Address; nonce: bigint };
