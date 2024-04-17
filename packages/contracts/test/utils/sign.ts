import hre from "hardhat";
import { defaultAbiCoder } from "@ethersproject/abi";
import type { PopulatedTransaction, Signer } from "ethers";
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
export const sign = async (
     userOps: UserOp[],
     nonce: bigint,
     account: SignerWithAddress | Signer,
     verifyingContract: string,
) => {
     const domain = {
          name: "ECDSAWallet",
          version: "0.0.1",
          chainId: 97,
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
          chainID: 97,
          sigChainID: 97,
     };

     console.log(97);

     const signature = await account._signTypedData(domain, types, values);
     const sig = defaultAbiCoder.encode(["uint256", "bytes"], [97, signature]);
     const txn = {
          userOps,
          chainID: 97,
          signature: sig,
     };
     return {
          values,
          sig,
          txn,
     };
};
