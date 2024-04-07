import { Permit2Signature } from "@pancakeswap/universal-router-sdk";
import { ApproveProtocol, Permit2TransferFrom } from "../encoder/permit2Operations";
import { PermitSig } from "../trades/permitSmartWallet";

export type Permite2Operations = {
      approval?: ApproveProtocol | undefined;
      permit2Permit?: Permit2Signature | undefined;
      permit2TransferFrom?: Permit2TransferFrom | undefined;
};

export type SmartWalletPermitOptions = Permite2Operations & {
      permit2TransferFromWitness: PermitSig;
};

export type UniversalRouterPermitOptions = Permite2Operations;
