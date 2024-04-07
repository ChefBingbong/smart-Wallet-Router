import { BigintIsh, Token } from "@pancakeswap/sdk";
import { PermitSingle } from "../allowanceTransfer";
import { MaxAllowanceTransferAmount, PERMIT_EXPIRATION, PERMIT_SIG_EXPIRATION } from "../constants";
import { PermitTransferFrom, Witness } from "@pancakeswap/permit2-sdk";
import { Address } from "viem";

// @TODO: remove this type, use `PermitSingle` only
export interface Permit extends PermitSingle {
      sigDeadline: string;
}

export interface PermitSig {
      permit: PermitTransferFrom;
      witness: Witness;
}

export const toDeadline = (expiration: number): number => {
      return Math.floor((Date.now() + expiration) / 1000);
};

export const generatePermitTypedData = (token: Token, nonce: BigintIsh, spender: string): Permit => {
      return {
            details: {
                  token: token.address,
                  amount: MaxAllowanceTransferAmount.toString(),
                  expiration: toDeadline(PERMIT_EXPIRATION).toString(),
                  nonce: nonce.toString(),
            },
            spender,
            sigDeadline: toDeadline(PERMIT_SIG_EXPIRATION).toString(),
      };
};

export const generatePermitTransferFromTypedData = (
      token: Token,
      amount: bigint,
      nonce: BigintIsh,
      spender: Address,
      _witness: Address,
): PermitSig => {
      const permit: PermitTransferFrom = {
            permitted: {
                  token: token.address,
                  amount: amount,
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
