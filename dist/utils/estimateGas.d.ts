import { ChainId, Currency, Price, Token } from "@pancakeswap/sdk";
export declare function getUsdGasToken(chainId: ChainId): Token | null;
export declare function getNativeWrappedToken(chainId: ChainId): Token | null;
export declare const getTokenPriceByNumber: (baseCurrency: Currency, quoteCurrency: Currency, price: number) => Price<import("@pancakeswap/sdk").NativeCurrency | Token, import("@pancakeswap/sdk").NativeCurrency | Token> | undefined;
//# sourceMappingURL=estimateGas.d.ts.map