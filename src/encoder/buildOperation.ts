import type { WalletOperationBuilder } from "./walletOperations";

export enum RouterTradeType {
      DefaultTrade = "DefaultTrade",
      CustomFeeCurrencyTrade = "CustomFeeCurrencyTrade",
}

// interface for entities that can be encoded as a Universal Router command
export interface Command {
      tradeType: keyof typeof RouterTradeType;
      encode(planner: WalletOperationBuilder): void;
}
