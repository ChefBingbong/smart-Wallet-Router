import hre from "hardhat";
import { defaultAbiCoder } from "@ethersproject/abi";
import type { PopulatedTransaction } from "ethers";
import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { Address, Hex } from "viem";

export interface UserOp {
     to: Address;
     amount: bigint;
     data: Address;
}

export interface Transaction {
     userOps: UserOp[];
     chainID: number;
     signature: string;
}

//Meta Transactions
export const sign = async (userOps: UserOp[], nonce: bigint, account: SignerWithAddress, verifyingContract: string) => {
     const domain = {
          name: "ECDSAWallet",
          version: "0.0.1",
          chainId: hre.network.config.chainId,
          verifyingContract,
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
          nonce,
          chainID: hre.network.config.chainId,
          sigChainID: hre.network.config.chainId,
     };

     console.log(hre.network.config.chainId);

     const signature = await account._signTypedData(domain, types, values);
     const sig = defaultAbiCoder.encode(["uint256", "bytes"], [hre.network.config.chainId, signature]);
     const txn = {
          userOps,
          chainID: hre.network.config.chainId,
          signature: sig,
     };
     return {
          values,
          sig,
          txn,
     };
};
