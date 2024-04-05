import type { AbiParametersToPrimitiveTypes } from "abitype";
import { encodeAbiParameters, parseAbiItem, toFunctionSelector, type Address, type Hex } from "viem";
import type { UserOp } from "../../test/utils/sign";
import { SwapCall } from "../smartWalletRouter2";

export type ABIType = typeof ABI_PARAMETER;
export type OperationUsed = keyof typeof ABI_PARAMETER;
export type ABIParametersType<TOperationType extends OperationUsed> = AbiParametersToPrimitiveTypes<
      ABIType[TOperationType]["inputs"]
>;

export enum OperationType {
      EXEC = "EXEC",
      CREATE_WALLET = "CREATE_WALLET",
      TRANSFER = "TRANSFER",
      TRANSFER_FROM = "TRANSFER_FROM",
      APPROVE = "APPROVE",
}

export const ABI_PARAMETER = {
      // samrt wallet ops
      [OperationType.CREATE_WALLET]: parseAbiItem("function createWallet(address _owner)"),
      [OperationType.EXEC]: parseAbiItem([
            "function exec(UserOp[] calldata userOps, bytes calldata _signature)",
            "struct UserOp { address to; uint256 amount; bytes data; }",
      ]),

      // ERC20 ops
      [OperationType.TRANSFER]: parseAbiItem("function transfer(address to, uint256 amount)"),
      [OperationType.TRANSFER_FROM]: parseAbiItem("function transferFrom(address from, address to, uint256 amount)"),
      [OperationType.APPROVE]: parseAbiItem("function approve(address spender, uint256 amount)"),
};

export class WalletOperationBuilder {
      userOps: UserOp[];
      externalUserOps: any[];

      constructor() {
            this.userOps = [];
            this.externalUserOps = [];
      }

      addUserOperation<TOperationType extends OperationUsed>(
            type: TOperationType,
            parameters: ABIParametersType<TOperationType>,
            contract: Address,
            value: bigint = 0n,
      ): void {
            const { encodedSelector, encodedInput } = encodeOperation(type, parameters);
            const operationCalldata = encodedSelector.concat(encodedInput.substring(2)) as Hex;
            const userOperation = { to: contract, amount: value, data: operationCalldata };
            this.userOps.push(userOperation);
      }

      addExternalUserOperation<TOperationType extends OperationUsed>(
            type: TOperationType,
            parameters: ABIParametersType<TOperationType>,
            contract: Address,
            value: Hex = "0x00",
      ): void {
            const { encodedSelector, encodedInput } = encodeOperation(type, parameters);
            const operationCalldata = encodedSelector.concat(encodedInput.substring(2)) as Hex;
            const userOperation = { to: contract, value: value, data: operationCalldata };
            this.externalUserOps.push(userOperation);
      }

      addUserOperationFromCall = (calls: SwapCall[]): void => {
            calls.forEach((call: SwapCall) => {
                  const { address, value, calldata } = call;
                  const userOperation = { to: address, amount: BigInt(value), data: calldata };
                  this.userOps.push(userOperation);
            });
      };
}

export type WalletOperation = {
      encodedInput: Hex;
      encodedSelector: Hex;
};

export function encodeOperation<TOperationType extends OperationUsed>(
      type: TOperationType,
      parameters: ABIParametersType<TOperationType>,
): WalletOperation {
      const operationAbiItem = ABI_PARAMETER[type];
      const encodedSelector = toFunctionSelector(operationAbiItem);
      const encodedInput = encodeAbiParameters(operationAbiItem.inputs, parameters as any);
      return { encodedSelector, encodedInput };
}
