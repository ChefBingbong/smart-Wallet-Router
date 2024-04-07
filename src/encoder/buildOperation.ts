import type { WalletOperationBuilder } from "./walletOperations";

export enum RouterTradeType {
      UniversalRouterTrade = "UniversalRouter",
      ClassicTrade = "SmartRouter",
      SmartWalletTrade = "DefaultTrade",
}

export enum Routers {
      UniversalRouter = "UniversalRouter",
      SmartOrderRouter = "SmartRouter",
}

// interface for entities that can be encoded as a Universal Router command
export interface Command {
      tradeType: keyof typeof RouterTradeType;
      encode(planner: WalletOperationBuilder): void;
}
