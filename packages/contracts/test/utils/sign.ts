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

export interface AllowanceOp {
     details: {
          token: Address;
          amount: bigint;
          expiration: bigint;
          nonce: bigint;
     }[];
     spender: Address;
     sigDeadline: bigint;
}

export interface Transaction {
     userOps: UserOp[];
     chainID: number;
     signature: string;
}

//Meta Transactions
export const sign = async (
     userOps: UserOp[],
     allowanceOp: AllowanceOp,
     nonce: bigint,
     account: SignerWithAddress | Signer,
     verifyingContract: string,
) => {
     const domain = {
          name: "ECDSAWallet",
          version: "0.0.1",
          chainId: 31337,
          verifyingContract,
     };

     const types = {
          AllowanceOp: [
               { name: "details", type: "AllowanceOpDetails[]" },
               { name: "spender", type: "address" },
               { name: "sigDeadline", type: "uint256" },
          ],
          AllowanceOpDetails: [
               { name: "token", type: "address" },
               { name: "amount", type: "uint160" },
               { name: "expiration", type: "uint48" },
               { name: "nonce", type: "uint48" },
          ],
          UserOp: [
               { name: "to", type: "address" },
               { name: "amount", type: "uint256" },
               { name: "data", type: "bytes" },
          ],
          ECDSAExec: [
               { name: "allowanceOp", type: "AllowanceOp" },
               { name: "userOps", type: "UserOp[]" },
               { name: "nonce", type: "uint256" },
               { name: "chainID", type: "uint256" },
               { name: "sigChainID", type: "uint256" },
          ],
     };
     const values = {
          allowanceOp: allowanceOp,
          userOps: userOps,
          nonce,
          chainID: 31337,
          sigChainID: 31337,
     };

     console.log(31337);

     const signature = await account._signTypedData(domain, types, values);
     const sig = defaultAbiCoder.encode(["uint256", "bytes"], [31337, signature]);
     const txn = {
          allowanceOp: allowanceOp,
          userOps,
          chainID: 31337,
          signature: sig,
     };
     return {
          values,
          sig,
          txn,
     };
};
