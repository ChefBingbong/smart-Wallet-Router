import { type Hex, type ChainFormatter } from "viem";
import type { ErrorType } from "viem/_types/errors/utils";
export type ExtractErrorType = ErrorType;
export declare function extract(value_: Record<string, unknown>, { format }: {
    format?: ChainFormatter["format"] | undefined;
}): Record<string, unknown>;
export declare function decodeFunctionSelector(data: Hex, abi: never): {
    args: readonly unknown[] | undefined;
    functionName: string;
} | undefined;
//# sourceMappingURL=extract.d.ts.map