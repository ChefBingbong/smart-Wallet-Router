import type { PermitTransferFrom, PermitTransferFromData, Witness } from "@pancakeswap/permit2-sdk";
import { SignatureTransfer, getPermit2Address } from "@pancakeswap/permit2-sdk";
import type { BigintIsh } from "@pancakeswap/sdk";
import { ChainId } from "@pancakeswap/sdk";
import type { Address } from "viem";

export const PERMIT_SIG_EXPIRATION = 1800000; // 30 min

export interface PermitWithWithWitness {
      permit: PermitTransferFrom;
      witness: Witness;
}

export const toDeadline = (expiration: number): number => {
      return Math.floor((Date.now() + expiration) / 1000);
};

export const generatePermitTransferFromTypedData = (
      token: Address,
      amount: bigint,
      spender: Address,
      _witness: Address,
      nonce: BigintIsh,
): PermitWithWithWitness => {
      const permit: PermitTransferFrom = {
            permitted: {
                  token: token as string,
                  amount,
            },
            spender,
            nonce: nonce.toString(),
            deadline: toDeadline(PERMIT_SIG_EXPIRATION).toString(),
      };

      const witness: Witness = {
            witnessTypeName: "Witness",
            witnessType: { Witness: [{ name: "SmartWallet Relayer", type: "address" }] },
            witness: { user: _witness },
      };

      return { permit, witness };
};

export const permit2TpedData = async (
      chainId: ChainId,
      token: Address,
      spender: Address,
      account: Address,
      witness: Address,
      amount: bigint,
      nonce: bigint | undefined,
): Promise<PermitTransferFromData & PermitWithWithWitness> => {
      if (!chainId) throw new Error("PERMIT: missing chainId");
      if (!token) throw new Error("PERMIT: missing token");
      if (!spender) throw new Error("PERMIT: missing spender");
      if (!account) throw new Error("PERMIT: missing owner");
      if (!token) throw new Error("PERMIT: missing token");

      if (nonce === undefined) throw new Error("PERMIT: missing nonce");

      const permit = generatePermitTransferFromTypedData(token, amount, spender, witness, nonce);
      const {
            domain,
            types,
            values: message,
      } = SignatureTransfer.getPermitData(permit.permit, getPermit2Address(chainId), chainId, permit.witness);

      return {
            ...permit,
            domain,
            types,
            primaryType: "PermitTransferFrom",
            values: message,
      };
};
