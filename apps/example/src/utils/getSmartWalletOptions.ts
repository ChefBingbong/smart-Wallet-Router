import type { ChainId } from "@pancakeswap/chains";
import {
  Percent
} from "@pancakeswap/swap-sdk-core";
import {
  RouterTradeType,
  Routers,
  type SmartWalletTradeOptions,
} from "@smart-wallet/smart-router-sdk";
import type { Address } from "viem";

export const getSmartWalletOptions = (
  address: Address,
  isUsingPermit2: boolean,
  allowance: {

      allowance: bigint;
      needsApproval: boolean;
      permitNonce: bigint;
    },
  smartWalletDetails: never,
  chainId: ChainId,
): SmartWalletTradeOptions => {
  return {
    account: address,
    chainId,
    smartWalletDetails: smartWalletDetails,
    SmartWalletTradeType: RouterTradeType.SmartWalletTradeWithPermit2,
    router: Routers.SmartOrderRouter,
    isUsingPermit2: isUsingPermit2,
    hasApprovedPermit2: !allowance.needsApproval,
    hasApprovedRelayer: !allowance.needsApproval,
    allowance,
    walletPermitOptions: undefined,
    underlyingTradeOptions: {
      recipient: address,
      slippageTolerance: new Percent(1),
    },
  };
};
