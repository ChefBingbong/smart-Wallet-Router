import { BaseError } from "viem";
export type AccountNotFoundErrorType = AccountNotFoundError & {
    name: "AccountNotFoundError";
};
export declare class AccountNotFoundError extends BaseError {
    name: string;
    constructor({ docsPath }?: {
        docsPath?: string;
    });
}
//# sourceMappingURL=error.d.ts.map