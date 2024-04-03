import { PopulatedTransaction } from "ethers"
import { SwapCall } from "../../src/smartWalletRouter"

export const formatUserOp = (tx: PopulatedTransaction) => {
      return {
            to: tx.to,
            amount: '0',
            data: tx.data,
      }
}

export const formatUserOpSwapCall = (tx: SwapCall) => {
      return {
            to: tx.address,
            amount: tx.value,
            data: tx.calldata,
      }
}