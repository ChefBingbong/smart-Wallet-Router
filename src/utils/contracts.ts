import { Address, erc20Abi, getContract } from "viem";
import { Deployments } from "../constants/deploymentUtils";
import { ChainId } from "@pancakeswap/chains";
import { getPublicClient } from "../provider/walletClient";
import { smartWalletFactoryAbi as factoryAbi } from "../../abis/SmartWalletFactoryAbi";
import { smartWalletAbi as walletAbi } from "../../abis/SmartWalletAbi";

export const getSmartWalletFactory = (chainId: ChainId) => {
      const client = getPublicClient({ chainId });
      const address = Deployments[chainId].ECDSAWalletFactory;
      return getContract({ address, client, abi: factoryAbi });
};

export const getSmartWallet = (chainId: ChainId, address: Address) => {
      const client = getPublicClient({ chainId });
      return getContract({ address, client, abi: walletAbi });
};

export const getErc20Contract = (chainId: ChainId, address: Address) => {
      const client = getPublicClient({ chainId });
      return getContract({ address, client, abi: erc20Abi });
};
