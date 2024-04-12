import type { ChainId } from "@pancakeswap/chains";
import {
  Percent,
  type Currency,
  type CurrencyAmount,
} from "@pancakeswap/swap-sdk-core";
import type { PancakeSwapOptions } from "@pancakeswap/universal-router-sdk";
import type { Address } from "viem";

export interface BaseTradeOptions<TOps> {
  account: Address;
  chainId: ChainId;
  router: string;
  underlyingTradeOptions: TOps;
}

export interface ClassicTradeOptions<TOps> extends BaseTradeOptions<TOps> {
  router: string;
}

export interface SmartWalletTradeOptions
  extends BaseTradeOptions<PancakeSwapOptions> {
  hasApprovedPermit2: boolean;
  hasApprovedRelayer: boolean;
  fees?: {
    feeTokenAddress: Address;
    feeAmount: CurrencyAmount<Currency>;
  };
  isUsingPermit2: boolean;
  walletPermitOptions?: never;
  smartWalletDetails: { address: Address; nonce: bigint };
  SmartWalletTradeType: string;
  router: string;
}

export const getSmartWalletOptions = (
  address: Address,
  isUsingPermit2: boolean,
  allowance: {
    permit2Allowances: {
      allowance: bigint;
      needsApproval: boolean;
    };
    smartWalletAllowances: {
      allowance: bigint;
      needsApproval: boolean;
    };
  },
  smartWalletDetails: never,
  chainId: ChainId,
  fees: never,
): SmartWalletTradeOptions => {
  return {
    account: address,
    chainId,
    smartWalletDetails: smartWalletDetails,
    SmartWalletTradeType: "SmartWalletTrade",
    router: "SmartRouter",
    fees,
    isUsingPermit2: isUsingPermit2,
    hasApprovedPermit2: allowance.permit2Allowances.needsApproval,
    hasApprovedRelayer: allowance.smartWalletAllowances.needsApproval,
    walletPermitOptions: undefined,
    underlyingTradeOptions: {
      recipient: address,
      slippageTolerance: new Percent(1),
    },
  };
};
