import { defaultAbiCoder } from "@ethersproject/abi";
import type { BigNumber, Wallet } from "ethers";
import { Address } from "viem";
import { UserOp } from "../types/smartWallet";
import { TypedSmartWalletData } from "../types/eip712";

export const signTypedTx = async (
      userOps: UserOp[],
      signer: Wallet,
      smartWalletAddress: Address,
      nonce: number | BigNumber,
      chainID: number,
      signatureChainID: number,
) => {
      const domain = {
            name: "ECDSAWallet",
            version: "0.0.1",
            chainId: signatureChainID,
            verifyingContract: smartWalletAddress,
      };

      const types = {
            UserOp: [
                  { name: "to", type: "address" },
                  { name: "amount", type: "uint256" },
                  { name: "data", type: "bytes" },
            ],
            ECDSAExec: [
                  { name: "userOps", type: "UserOp[]" },
                  { name: "nonce", type: "uint256" },
                  { name: "chainID", type: "uint256" },
                  { name: "sigChainID", type: "uint256" },
            ],
      };

      const value = {
            userOps: userOps,
            nonce: nonce,
            chainID: chainID,
            sigChainID: signatureChainID,
      };

      const signature = await signer._signTypedData(domain, types, value);
      const signatureEncoded = defaultAbiCoder.encode(["uint256", "bytes"], [signatureChainID, signature]);

      return signatureEncoded;
};

export const typedMetaTx = (
      userOps: UserOp[],
      nonce: bigint,
      smartWalletAddress: Address,
      chainId: number,
): TypedSmartWalletData => {
      const domain = {
            name: "ECDSAWallet",
            version: "0.0.1",
            chainId: chainId,
            verifyingContract: smartWalletAddress,
      };

      const types = {
            UserOp: [
                  { name: "to", type: "address" },
                  { name: "amount", type: "uint256" },
                  { name: "data", type: "bytes" },
            ],
            ECDSAExec: [
                  { name: "userOps", type: "UserOp[]" },
                  { name: "nonce", type: "uint256" },
                  { name: "chainID", type: "uint256" },
                  { name: "sigChainID", type: "uint256" },
            ],
      };
      const values = {
            userOps: userOps,
            nonce: nonce,
            chainID: chainId,
            sigChainID: chainId,
      };

      return { domain, types, values };
};
