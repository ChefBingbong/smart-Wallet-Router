import { SmartRouter, SmartRouterTrade } from "@pancakeswap/smart-router";
import { PancakeSwapSmartWalletRouter } from "../smartWalletRouter";
import { CurrencyAmount, TradeType } from "@pancakeswap/swap-sdk-core";
import { BUSD_TESTNET, CAKE_TESTNET } from "@pancakeswap/tokens";
import { getPublicClient, getUserWalletClient, getWalletClient, userSigner } from "../provider/walletClient";
import { getViemClients } from "../provider/client";
import { ChainId, WNATIVE } from "@pancakeswap/sdk";
import { RouterTradeType } from "../encoder/buildOperation";
import { Routers } from "../encoder/buildOperation";
import { SmartWalletTradeOptions } from "../types/smartWallet";
import {
      AllowanceTransfer,
      Permit,
      SignatureTransfer,
      generatePermitTypedData,
      getPermit2Address,
} from "@pancakeswap/permit2-sdk";
import { getErc20Contract, getUserErc20Contract } from "./contracts";
import { Address, isHex, maxUint256 } from "viem";
import { bscTestnet } from "viem/chains";
import { Permit2Signature } from "@pancakeswap/universal-router-sdk";

const writePermit = async (
      chainId: ChainId,
      token: Address,
      spender: Address,
      account: Address,
      nonce: bigint | undefined,
): Promise<Permit2Signature> => {
      if (!chainId) throw new Error("PERMIT: missing chainId");
      if (!token) throw new Error("PERMIT: missing token");
      if (!spender) throw new Error("PERMIT: missing spender");
      if (!account) throw new Error("PERMIT: missing owner");
      if (nonce === undefined) throw new Error("PERMIT: missing nonce");

      const client = getUserWalletClient({ chainId });
      const permit: Permit = generatePermitTypedData(token, nonce, spender);
      const {
            domain,
            types,
            values: message,
      } = SignatureTransfer.getPermitData(permit, getPermit2Address(chainId), chainId);

      let signature = await client.signTypedData({
            account,
            domain,
            primaryType: "PermitTransferFrom",
            types,
            message,
      });

      // @hack: trust extension wallet doesn't prefix the signature with 0x
      signature = isHex(signature) ? signature : `0x${signature}`;

      return {
            ...permit,
            signature,
      };
};
async function main() {
      const cake = "0x8d008B313C1d6C7fE2982F62d32Da7507cF43551";
      const testSpender = "0x2f965Bf1B6ddC0f9f085272Bad99948Dd238e045";
      const client = getWalletClient({ chainId: 97 });
      const token = getUserErc20Contract(97, cake);

      const permit2Address = getPermit2Address(97);
      const ap = await token.write.approve([permit2Address, maxUint256], { chain: bscTestnet, account: userSigner });

      const { details, sigDeadLine, spender, signature } = await writePermit(
            97,
            cake,
            "0xa7C46C163Dd8625bA1458ed066eCE7b26A045Af5",
            userSigner.address,
            0n,
      );
      console.log(ap);
}
main();
