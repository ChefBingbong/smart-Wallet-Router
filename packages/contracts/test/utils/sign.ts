import { defaultAbiCoder } from "@ethersproject/abi";
import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import type { Signer, Wallet } from "ethers";

import type { Address } from "viem";

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

export const sign = async (
  userOps: UserOp[],
  bridgeOps: UserOp[],

  allowanceOp: AllowanceOp,
  nonce: bigint,
  account: SignerWithAddress | Signer,
  chainId: number,
  bridgeChainID: number,

  verifyingContract: string,
) => {
  const domain = {
    name: "ECDSAWallet",
    version: "0.0.1",
    chainId: chainId,
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
      { name: "chainId", type: "uint256" },
      { name: "data", type: "bytes" },
    ],
    ECDSAExec: [
      { name: "allowanceOp", type: "AllowanceOp" },
      { name: "userOps", type: "UserOp[]" },
      { name: "bridgeOps", type: "UserOp[]" },
      { name: "nonce", type: "uint256" },
      { name: "chainID", type: "uint256" },
      { name: "bridgeChainID", type: "uint256" },
      { name: "sigChainID", type: "uint256" },
    ],
  };
  const values = {
    allowanceOp: allowanceOp,
    userOps: userOps,
    bridgeOps,
    nonce,
    chainID: chainId,
    bridgeChainID: bridgeChainID,
    sigChainID: chainId,
  };

  const signature = await account._signTypedData(domain, types, values);
  const sig = defaultAbiCoder.encode(
    ["uint256", "bytes"],
    [chainId, signature],
  );

  return { signature: sig };
};
