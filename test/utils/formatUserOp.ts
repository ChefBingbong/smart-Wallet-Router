import { SimulateContractReturnType } from "viem";
import { SwapCall } from "../../src/smartWalletRouter"

export const formatUserOp = (tx: SimulateContractReturnType['request']) => {
      return {
            to: t.,
            amount: '0',
            data: tx.blobs,
      }
}

export const formatUserOpSwapCall = (tx: SwapCall) => {
      return {
            to: tx.address,
            amount: tx.value,
            data: tx.calldata,
      }
}