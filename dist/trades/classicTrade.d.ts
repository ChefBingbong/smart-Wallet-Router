import type { ChainId, TradeType } from "@pancakeswap/sdk";
import { type SmartRouterTrade } from "@pancakeswap/smart-router";
import { type Address } from "viem";
import { RouterTradeType, Routers, type Command } from "../encoder/buildOperation";
import { type WalletOperationBuilder } from "../encoder/walletOperations";
import type { SmartWalletTradeOptions } from "../types/smartWallet";
export declare const RouterRecipientByTrade: {
    [router in Routers]: (chain: ChainId) => Address;
};
export declare class ClasicTrade implements Command {
    trade: SmartRouterTrade<TradeType>;
    options: SmartWalletTradeOptions;
    readonly tradeType: RouterTradeType;
    constructor(trade: SmartRouterTrade<TradeType>, options: SmartWalletTradeOptions);
    encode(planner: WalletOperationBuilder): void;
    private addMandatoryOperations;
}
//# sourceMappingURL=classicTrade.d.ts.map