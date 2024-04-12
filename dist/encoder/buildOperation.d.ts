import type { WalletOperationBuilder } from "./walletOperations";
export declare enum RouterTradeType {
    UniversalRouterTrade = "UniversalRouter",
    ClassicTrade = "SmartRouter",
    SmartWalletTrade = "SmartWalletTrade"
}
export declare enum Routers {
    UniversalRouter = "UniversalRouter",
    SmartOrderRouter = "SmartRouter"
}
export interface Command {
    tradeType: RouterTradeType;
    encode(planner: WalletOperationBuilder): void;
}
//# sourceMappingURL=buildOperation.d.ts.map