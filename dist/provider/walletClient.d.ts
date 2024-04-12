import type { ChainId } from "@pancakeswap/chains";
import { type PublicClient, type Chain, type Client } from "viem";
export declare const userSigner: import("viem").PrivateKeyAccount;
export declare const signer: import("viem").PrivateKeyAccount;
export declare const getUserWalletClient: ({ chainId }: {
    chainId: ChainId;
}) => {
    account: import("viem").Account | undefined;
    batch?: {
        multicall?: boolean | {
            batchSize?: number | undefined;
            wait?: number | undefined;
        } | undefined;
    } | undefined;
    cacheTime: number;
    ccipRead?: false | {
        request?: ((parameters: import("viem").CcipRequestParameters) => Promise<`0x${string}`>) | undefined;
    } | undefined;
    chain: Chain | undefined;
    key: string;
    name: string;
    pollingInterval: number;
    request: import("viem").EIP1193RequestFn<import("viem").WalletRpcSchema>;
    transport: import("viem").TransportConfig<string, import("viem").EIP1193RequestFn> & Record<string, any>;
    type: string;
    uid: string;
    addChain: (args: import("viem").AddChainParameters) => Promise<void>;
    deployContract: <const abi extends import("viem").Abi | readonly unknown[], chainOverride extends Chain | undefined>(args: import("viem").DeployContractParameters<abi, Chain | undefined, import("viem").Account | undefined, chainOverride>) => Promise<`0x${string}`>;
    getAddresses: () => Promise<import("viem").GetAddressesReturnType>;
    getChainId: () => Promise<number>;
    getPermissions: () => Promise<import("viem").GetPermissionsReturnType>;
    prepareTransactionRequest: <const TRequest extends import("viem").PrepareTransactionRequestRequest<Chain | undefined, TChainOverride>, TChainOverride extends Chain | undefined = undefined, TAccountOverride extends `0x${string}` | import("viem").Account | undefined = undefined>(args: import("viem").PrepareTransactionRequestParameters<Chain | undefined, import("viem").Account | undefined, TChainOverride, TAccountOverride, TRequest>) => Promise<import("viem").UnionRequiredBy<Extract<import("viem").UnionOmit<import("viem").ExtractChainFormatterParameters<import("viem").DeriveChain<Chain, TChainOverride>, "transactionRequest", import("viem").TransactionRequest>, "from"> & (import("viem").DeriveChain<Chain, TChainOverride> extends infer T_12 ? T_12 extends import("viem").DeriveChain<Chain, TChainOverride> ? T_12 extends Chain ? {
        chain: T_12;
    } : {
        chain?: undefined;
    } : never : never) & (import("viem").DeriveAccount<import("viem").Account | undefined, TAccountOverride> extends infer T_13 ? T_13 extends import("viem").DeriveAccount<import("viem").Account | undefined, TAccountOverride> ? T_13 extends import("viem").Account ? {
        account: T_13;
        from: `0x${string}`;
    } : {
        account?: undefined;
        from?: undefined;
    } : never : never), import("viem").IsNever<((TRequest["type"] extends string ? TRequest["type"] : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)> extends "legacy" ? unknown : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)>) extends infer T_14 ? T_14 extends (TRequest["type"] extends string ? TRequest["type"] : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)> extends "legacy" ? unknown : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)>) ? T_14 extends "legacy" ? import("viem").TransactionRequestLegacy : never : never : never) | ((TRequest["type"] extends string ? TRequest["type"] : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)> extends "legacy" ? unknown : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)>) extends infer T_15 ? T_15 extends (TRequest["type"] extends string ? TRequest["type"] : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)> extends "legacy" ? unknown : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)>) ? T_15 extends "eip1559" ? import("viem").TransactionRequestEIP1559 : never : never : never) | ((TRequest["type"] extends string ? TRequest["type"] : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)> extends "legacy" ? unknown : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)>) extends infer T_16 ? T_16 extends (TRequest["type"] extends string ? TRequest["type"] : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)> extends "legacy" ? unknown : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)>) ? T_16 extends "eip2930" ? import("viem").TransactionRequestEIP2930 : never : never : never) | ((TRequest["type"] extends string ? TRequest["type"] : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)> extends "legacy" ? unknown : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)>) extends infer T_17 ? T_17 extends (TRequest["type"] extends string ? TRequest["type"] : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)> extends "legacy" ? unknown : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)>) ? T_17 extends "eip4844" ? import("viem").TransactionRequestEIP4844 : never : never : never)> extends true ? unknown : import("viem").ExactPartial<((TRequest["type"] extends string ? TRequest["type"] : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)> extends "legacy" ? unknown : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)>) extends infer T_18 ? T_18 extends (TRequest["type"] extends string ? TRequest["type"] : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)> extends "legacy" ? unknown : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)>) ? T_18 extends "legacy" ? import("viem").TransactionRequestLegacy : never : never : never) | ((TRequest["type"] extends string ? TRequest["type"] : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)> extends "legacy" ? unknown : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)>) extends infer T_19 ? T_19 extends (TRequest["type"] extends string ? TRequest["type"] : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)> extends "legacy" ? unknown : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)>) ? T_19 extends "eip1559" ? import("viem").TransactionRequestEIP1559 : never : never : never) | ((TRequest["type"] extends string ? TRequest["type"] : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)> extends "legacy" ? unknown : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)>) extends infer T_20 ? T_20 extends (TRequest["type"] extends string ? TRequest["type"] : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)> extends "legacy" ? unknown : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)>) ? T_20 extends "eip2930" ? import("viem").TransactionRequestEIP2930 : never : never : never) | ((TRequest["type"] extends string ? TRequest["type"] : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)> extends "legacy" ? unknown : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)>) extends infer T_21 ? T_21 extends (TRequest["type"] extends string ? TRequest["type"] : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)> extends "legacy" ? unknown : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)>) ? T_21 extends "eip4844" ? import("viem").TransactionRequestEIP4844 : never : never : never)>> & {
        chainId?: number | undefined;
    }, (TRequest["parameters"] extends import("viem").PrepareTransactionRequestParameterType[] ? TRequest["parameters"][number] : import("viem").PrepareTransactionRequestParameterType) extends infer T_22 ? T_22 extends (TRequest["parameters"] extends import("viem").PrepareTransactionRequestParameterType[] ? TRequest["parameters"][number] : import("viem").PrepareTransactionRequestParameterType) ? T_22 extends "fees" ? "gasPrice" | "maxFeePerGas" | "maxPriorityFeePerGas" : T_22 : never : never> & (unknown extends TRequest["kzg"] ? {} : Pick<TRequest, "kzg">) extends infer T ? { [K in keyof T]: (import("viem").UnionRequiredBy<Extract<import("viem").UnionOmit<import("viem").ExtractChainFormatterParameters<import("viem").DeriveChain<Chain, TChainOverride>, "transactionRequest", import("viem").TransactionRequest>, "from"> & (import("viem").DeriveChain<Chain, TChainOverride> extends infer T_1 ? T_1 extends import("viem").DeriveChain<Chain, TChainOverride> ? T_1 extends Chain ? {
        chain: T_1;
    } : {
        chain?: undefined;
    } : never : never) & (import("viem").DeriveAccount<import("viem").Account | undefined, TAccountOverride> extends infer T_2 ? T_2 extends import("viem").DeriveAccount<import("viem").Account | undefined, TAccountOverride> ? T_2 extends import("viem").Account ? {
        account: T_2;
        from: `0x${string}`;
    } : {
        account?: undefined;
        from?: undefined;
    } : never : never), import("viem").IsNever<((TRequest["type"] extends string ? TRequest["type"] : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)> extends "legacy" ? unknown : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)>) extends infer T_3 ? T_3 extends (TRequest["type"] extends string ? TRequest["type"] : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)> extends "legacy" ? unknown : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)>) ? T_3 extends "legacy" ? import("viem").TransactionRequestLegacy : never : never : never) | ((TRequest["type"] extends string ? TRequest["type"] : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)> extends "legacy" ? unknown : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)>) extends infer T_4 ? T_4 extends (TRequest["type"] extends string ? TRequest["type"] : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)> extends "legacy" ? unknown : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)>) ? T_4 extends "eip1559" ? import("viem").TransactionRequestEIP1559 : never : never : never) | ((TRequest["type"] extends string ? TRequest["type"] : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)> extends "legacy" ? unknown : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)>) extends infer T_5 ? T_5 extends (TRequest["type"] extends string ? TRequest["type"] : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)> extends "legacy" ? unknown : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)>) ? T_5 extends "eip2930" ? import("viem").TransactionRequestEIP2930 : never : never : never) | ((TRequest["type"] extends string ? TRequest["type"] : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)> extends "legacy" ? unknown : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)>) extends infer T_6 ? T_6 extends (TRequest["type"] extends string ? TRequest["type"] : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)> extends "legacy" ? unknown : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)>) ? T_6 extends "eip4844" ? import("viem").TransactionRequestEIP4844 : never : never : never)> extends true ? unknown : import("viem").ExactPartial<((TRequest["type"] extends string ? TRequest["type"] : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)> extends "legacy" ? unknown : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)>) extends infer T_7 ? T_7 extends (TRequest["type"] extends string ? TRequest["type"] : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)> extends "legacy" ? unknown : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)>) ? T_7 extends "legacy" ? import("viem").TransactionRequestLegacy : never : never : never) | ((TRequest["type"] extends string ? TRequest["type"] : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)> extends "legacy" ? unknown : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)>) extends infer T_8 ? T_8 extends (TRequest["type"] extends string ? TRequest["type"] : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)> extends "legacy" ? unknown : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)>) ? T_8 extends "eip1559" ? import("viem").TransactionRequestEIP1559 : never : never : never) | ((TRequest["type"] extends string ? TRequest["type"] : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)> extends "legacy" ? unknown : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)>) extends infer T_9 ? T_9 extends (TRequest["type"] extends string ? TRequest["type"] : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)> extends "legacy" ? unknown : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)>) ? T_9 extends "eip2930" ? import("viem").TransactionRequestEIP2930 : never : never : never) | ((TRequest["type"] extends string ? TRequest["type"] : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)> extends "legacy" ? unknown : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)>) extends infer T_10 ? T_10 extends (TRequest["type"] extends string ? TRequest["type"] : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)> extends "legacy" ? unknown : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)>) ? T_10 extends "eip4844" ? import("viem").TransactionRequestEIP4844 : never : never : never)>> & {
        chainId?: number | undefined;
    }, (TRequest["parameters"] extends import("viem").PrepareTransactionRequestParameterType[] ? TRequest["parameters"][number] : import("viem").PrepareTransactionRequestParameterType) extends infer T_11 ? T_11 extends (TRequest["parameters"] extends import("viem").PrepareTransactionRequestParameterType[] ? TRequest["parameters"][number] : import("viem").PrepareTransactionRequestParameterType) ? T_11 extends "fees" ? "gasPrice" | "maxFeePerGas" | "maxPriorityFeePerGas" : T_11 : never : never> & (unknown extends TRequest["kzg"] ? {} : Pick<TRequest, "kzg">))[K]; } : never>;
    requestAddresses: () => Promise<import("viem").RequestAddressesReturnType>;
    requestPermissions: (args: {
        [x: string]: Record<string, any>;
        eth_accounts: Record<string, any>;
    }) => Promise<import("viem").RequestPermissionsReturnType>;
    sendRawTransaction: (args: import("viem").SendRawTransactionParameters) => Promise<`0x${string}`>;
    sendTransaction: <const TRequest_1 extends import("viem").SendTransactionRequest<Chain | undefined, TChainOverride_1>, TChainOverride_1 extends Chain | undefined = undefined>(args: import("viem").SendTransactionParameters<Chain | undefined, import("viem").Account | undefined, TChainOverride_1, TRequest_1>) => Promise<`0x${string}`>;
    signMessage: (args: import("viem").SignMessageParameters<import("viem").Account | undefined>) => Promise<`0x${string}`>;
    signTransaction: <TChainOverride_2 extends Chain | undefined>(args: import("viem").SignTransactionParameters<Chain | undefined, import("viem").Account | undefined, TChainOverride_2>) => Promise<`0x02${string}` | `0x01${string}` | `0x03${string}` | import("viem").TransactionSerializedLegacy>;
    signTypedData: <const TTypedData extends {
        [x: string]: readonly import("viem").TypedDataParameter[];
        [x: `address[${string}]`]: undefined;
        [x: `bool[${string}]`]: undefined;
        [x: `string[${string}]`]: undefined;
        [x: `bytes[${string}]`]: undefined;
        [x: `int[${string}]`]: undefined;
        [x: `uint[${string}]`]: undefined;
        [x: `function[${string}]`]: undefined;
        [x: `uint8[${string}]`]: undefined;
        [x: `uint256[${string}]`]: undefined;
        [x: `bytes32[${string}]`]: undefined;
        [x: `bytes2[${string}]`]: undefined;
        [x: `bytes1[${string}]`]: undefined;
        [x: `bytes3[${string}]`]: undefined;
        [x: `bytes16[${string}]`]: undefined;
        [x: `bytes22[${string}]`]: undefined;
        [x: `bytes4[${string}]`]: undefined;
        [x: `bytes5[${string}]`]: undefined;
        [x: `bytes6[${string}]`]: undefined;
        [x: `bytes7[${string}]`]: undefined;
        [x: `bytes8[${string}]`]: undefined;
        [x: `bytes9[${string}]`]: undefined;
        [x: `bytes10[${string}]`]: undefined;
        [x: `bytes11[${string}]`]: undefined;
        [x: `bytes12[${string}]`]: undefined;
        [x: `bytes13[${string}]`]: undefined;
        [x: `bytes14[${string}]`]: undefined;
        [x: `bytes15[${string}]`]: undefined;
        [x: `bytes17[${string}]`]: undefined;
        [x: `bytes18[${string}]`]: undefined;
        [x: `bytes19[${string}]`]: undefined;
        [x: `bytes20[${string}]`]: undefined;
        [x: `bytes21[${string}]`]: undefined;
        [x: `bytes23[${string}]`]: undefined;
        [x: `bytes24[${string}]`]: undefined;
        [x: `bytes25[${string}]`]: undefined;
        [x: `bytes26[${string}]`]: undefined;
        [x: `bytes27[${string}]`]: undefined;
        [x: `bytes28[${string}]`]: undefined;
        [x: `bytes29[${string}]`]: undefined;
        [x: `bytes30[${string}]`]: undefined;
        [x: `bytes31[${string}]`]: undefined;
        [x: `int16[${string}]`]: undefined;
        [x: `int8[${string}]`]: undefined;
        [x: `int24[${string}]`]: undefined;
        [x: `int32[${string}]`]: undefined;
        [x: `int40[${string}]`]: undefined;
        [x: `int48[${string}]`]: undefined;
        [x: `int56[${string}]`]: undefined;
        [x: `int64[${string}]`]: undefined;
        [x: `int72[${string}]`]: undefined;
        [x: `int80[${string}]`]: undefined;
        [x: `int88[${string}]`]: undefined;
        [x: `int96[${string}]`]: undefined;
        [x: `int104[${string}]`]: undefined;
        [x: `int112[${string}]`]: undefined;
        [x: `int120[${string}]`]: undefined;
        [x: `int128[${string}]`]: undefined;
        [x: `int136[${string}]`]: undefined;
        [x: `int144[${string}]`]: undefined;
        [x: `int152[${string}]`]: undefined;
        [x: `int160[${string}]`]: undefined;
        [x: `int168[${string}]`]: undefined;
        [x: `int176[${string}]`]: undefined;
        [x: `int184[${string}]`]: undefined;
        [x: `int192[${string}]`]: undefined;
        [x: `int200[${string}]`]: undefined;
        [x: `int208[${string}]`]: undefined;
        [x: `int216[${string}]`]: undefined;
        [x: `int224[${string}]`]: undefined;
        [x: `int232[${string}]`]: undefined;
        [x: `int240[${string}]`]: undefined;
        [x: `int248[${string}]`]: undefined;
        [x: `int256[${string}]`]: undefined;
        [x: `uint16[${string}]`]: undefined;
        [x: `uint24[${string}]`]: undefined;
        [x: `uint32[${string}]`]: undefined;
        [x: `uint40[${string}]`]: undefined;
        [x: `uint48[${string}]`]: undefined;
        [x: `uint56[${string}]`]: undefined;
        [x: `uint64[${string}]`]: undefined;
        [x: `uint72[${string}]`]: undefined;
        [x: `uint80[${string}]`]: undefined;
        [x: `uint88[${string}]`]: undefined;
        [x: `uint96[${string}]`]: undefined;
        [x: `uint104[${string}]`]: undefined;
        [x: `uint112[${string}]`]: undefined;
        [x: `uint120[${string}]`]: undefined;
        [x: `uint128[${string}]`]: undefined;
        [x: `uint136[${string}]`]: undefined;
        [x: `uint144[${string}]`]: undefined;
        [x: `uint152[${string}]`]: undefined;
        [x: `uint160[${string}]`]: undefined;
        [x: `uint168[${string}]`]: undefined;
        [x: `uint176[${string}]`]: undefined;
        [x: `uint184[${string}]`]: undefined;
        [x: `uint192[${string}]`]: undefined;
        [x: `uint200[${string}]`]: undefined;
        [x: `uint208[${string}]`]: undefined;
        [x: `uint216[${string}]`]: undefined;
        [x: `uint224[${string}]`]: undefined;
        [x: `uint232[${string}]`]: undefined;
        [x: `uint240[${string}]`]: undefined;
        [x: `uint248[${string}]`]: undefined;
        string?: undefined;
        address?: undefined;
        uint8?: undefined;
        uint256?: undefined;
        bytes?: undefined;
        bytes32?: undefined;
        bool?: undefined;
        bytes2?: undefined;
        bytes1?: undefined;
        bytes3?: undefined;
        bytes16?: undefined;
        bytes22?: undefined;
        bytes4?: undefined;
        bytes5?: undefined;
        bytes6?: undefined;
        bytes7?: undefined;
        bytes8?: undefined;
        bytes9?: undefined;
        bytes10?: undefined;
        bytes11?: undefined;
        bytes12?: undefined;
        bytes13?: undefined;
        bytes14?: undefined;
        bytes15?: undefined;
        bytes17?: undefined;
        bytes18?: undefined;
        bytes19?: undefined;
        bytes20?: undefined;
        bytes21?: undefined;
        bytes23?: undefined;
        bytes24?: undefined;
        bytes25?: undefined;
        bytes26?: undefined;
        bytes27?: undefined;
        bytes28?: undefined;
        bytes29?: undefined;
        bytes30?: undefined;
        bytes31?: undefined;
        int16?: undefined;
        int8?: undefined;
        int24?: undefined;
        int32?: undefined;
        int40?: undefined;
        int48?: undefined;
        int56?: undefined;
        int64?: undefined;
        int72?: undefined;
        int80?: undefined;
        int88?: undefined;
        int96?: undefined;
        int104?: undefined;
        int112?: undefined;
        int120?: undefined;
        int128?: undefined;
        int136?: undefined;
        int144?: undefined;
        int152?: undefined;
        int160?: undefined;
        int168?: undefined;
        int176?: undefined;
        int184?: undefined;
        int192?: undefined;
        int200?: undefined;
        int208?: undefined;
        int216?: undefined;
        int224?: undefined;
        int232?: undefined;
        int240?: undefined;
        int248?: undefined;
        int256?: undefined;
        uint16?: undefined;
        uint24?: undefined;
        uint32?: undefined;
        uint40?: undefined;
        uint48?: undefined;
        uint56?: undefined;
        uint64?: undefined;
        uint72?: undefined;
        uint80?: undefined;
        uint88?: undefined;
        uint96?: undefined;
        uint104?: undefined;
        uint112?: undefined;
        uint120?: undefined;
        uint128?: undefined;
        uint136?: undefined;
        uint144?: undefined;
        uint152?: undefined;
        uint160?: undefined;
        uint168?: undefined;
        uint176?: undefined;
        uint184?: undefined;
        uint192?: undefined;
        uint200?: undefined;
        uint208?: undefined;
        uint216?: undefined;
        uint224?: undefined;
        uint232?: undefined;
        uint240?: undefined;
        uint248?: undefined;
    } | {
        [key: string]: unknown;
    }, TPrimaryType extends string>(args: import("viem").SignTypedDataParameters<TTypedData, TPrimaryType, import("viem").Account | undefined>) => Promise<`0x${string}`>;
    switchChain: (args: import("viem").SwitchChainParameters) => Promise<void>;
    watchAsset: (args: import("viem").WatchAssetParams) => Promise<boolean>;
    writeContract: <const abi_1 extends import("viem").Abi | readonly unknown[], functionName extends import("viem").ContractFunctionName<abi_1, "nonpayable" | "payable">, args extends import("viem").ContractFunctionArgs<abi_1, "nonpayable" | "payable", functionName>, TChainOverride_3 extends Chain | undefined = undefined>(args: import("viem").WriteContractParameters<abi_1, functionName, args, Chain | undefined, import("viem").Account | undefined, TChainOverride_3>) => Promise<`0x${string}`>;
    extend: <const client extends {
        [x: string]: unknown;
        account?: undefined;
        batch?: undefined;
        cacheTime?: undefined;
        ccipRead?: undefined;
        chain?: undefined;
        key?: undefined;
        name?: undefined;
        pollingInterval?: undefined;
        request?: undefined;
        transport?: undefined;
        type?: undefined;
        uid?: undefined;
    } & import("viem").ExactPartial<Pick<import("viem").PublicActions<import("viem").Transport, Chain | undefined, import("viem").Account | undefined>, "call" | "createContractEventFilter" | "createEventFilter" | "estimateContractGas" | "estimateGas" | "getBlock" | "getBlockNumber" | "getChainId" | "getContractEvents" | "getEnsText" | "getFilterChanges" | "getGasPrice" | "getLogs" | "getTransaction" | "getTransactionCount" | "getTransactionReceipt" | "prepareTransactionRequest" | "readContract" | "sendRawTransaction" | "simulateContract" | "uninstallFilter" | "watchBlockNumber" | "watchContractEvent"> & Pick<import("viem").WalletActions<Chain | undefined, import("viem").Account | undefined>, "sendTransaction" | "writeContract">>>(fn: (client: Client<import("viem").Transport, Chain | undefined, import("viem").Account | undefined, import("viem").WalletRpcSchema, import("viem").WalletActions<Chain | undefined, import("viem").Account | undefined>>) => client) => Client<import("viem").Transport, Chain | undefined, import("viem").Account | undefined, import("viem").WalletRpcSchema, { [K_1 in keyof client]: client[K_1]; } & import("viem").WalletActions<Chain | undefined, import("viem").Account | undefined>>;
};
export declare const getPublicClient: ({ chainId }: {
    chainId: ChainId;
}) => {
    account: undefined;
    batch?: {
        multicall?: boolean | {
            batchSize?: number | undefined;
            wait?: number | undefined;
        } | undefined;
    } | undefined;
    cacheTime: number;
    ccipRead?: false | {
        request?: ((parameters: import("viem").CcipRequestParameters) => Promise<`0x${string}`>) | undefined;
    } | undefined;
    chain: Chain | undefined;
    key: string;
    name: string;
    pollingInterval: number;
    request: import("viem").EIP1193RequestFn<import("viem").PublicRpcSchema>;
    transport: import("viem").TransportConfig<string, import("viem").EIP1193RequestFn> & Record<string, any>;
    type: string;
    uid: string;
    call: (parameters: import("viem").CallParameters<Chain | undefined>) => Promise<import("viem").CallReturnType>;
    createBlockFilter: () => Promise<{
        id: `0x${string}`;
        request: import("viem").EIP1193RequestFn<readonly [{
            Method: "eth_getFilterChanges";
            Parameters: [filterId: `0x${string}`];
            ReturnType: `0x${string}`[] | import("viem").RpcLog[];
        }, {
            Method: "eth_getFilterLogs";
            Parameters: [filterId: `0x${string}`];
            ReturnType: import("viem").RpcLog[];
        }, {
            Method: "eth_uninstallFilter";
            Parameters: [filterId: `0x${string}`];
            ReturnType: boolean;
        }]>;
        type: "block";
    }>;
    createContractEventFilter: <const TAbi extends import("viem").Abi | readonly unknown[], TEventName extends import("viem").ContractEventName<TAbi> | undefined, TArgs extends import("viem").MaybeExtractEventArgsFromAbi<TAbi, TEventName> | undefined, TStrict extends boolean | undefined = undefined, TFromBlock extends bigint | import("viem").BlockTag | undefined = undefined, TToBlock extends bigint | import("viem").BlockTag | undefined = undefined>(args: import("viem").CreateContractEventFilterParameters<TAbi, TEventName, TArgs, TStrict, TFromBlock, TToBlock>) => Promise<import("viem").CreateContractEventFilterReturnType<TAbi, TEventName, TArgs, TStrict, TFromBlock, TToBlock>>;
    createEventFilter: <const TAbiEvent extends import("viem").AbiEvent | undefined = undefined, const TAbiEvents extends readonly unknown[] | readonly import("viem").AbiEvent[] | undefined = TAbiEvent extends import("viem").AbiEvent ? [TAbiEvent] : undefined, TStrict_1 extends boolean | undefined = undefined, TFromBlock_1 extends bigint | import("viem").BlockTag | undefined = undefined, TToBlock_1 extends bigint | import("viem").BlockTag | undefined = undefined, _EventName extends string | undefined = import("viem").MaybeAbiEventName<TAbiEvent>, _Args extends import("viem").MaybeExtractEventArgsFromAbi<TAbiEvents, _EventName> | undefined = undefined>(args?: import("viem").CreateEventFilterParameters<TAbiEvent, TAbiEvents, TStrict_1, TFromBlock_1, TToBlock_1, _EventName, _Args> | undefined) => Promise<import("viem").Filter<"event", TAbiEvents, _EventName, _Args, TStrict_1, TFromBlock_1, TToBlock_1> extends infer T ? { [K in keyof T]: import("viem").Filter<"event", TAbiEvents, _EventName, _Args, TStrict_1, TFromBlock_1, TToBlock_1>[K]; } : never>;
    createPendingTransactionFilter: () => Promise<{
        id: `0x${string}`;
        request: import("viem").EIP1193RequestFn<readonly [{
            Method: "eth_getFilterChanges";
            Parameters: [filterId: `0x${string}`];
            ReturnType: `0x${string}`[] | import("viem").RpcLog[];
        }, {
            Method: "eth_getFilterLogs";
            Parameters: [filterId: `0x${string}`];
            ReturnType: import("viem").RpcLog[];
        }, {
            Method: "eth_uninstallFilter";
            Parameters: [filterId: `0x${string}`];
            ReturnType: boolean;
        }]>;
        type: "transaction";
    }>;
    estimateContractGas: <TChain extends Chain | undefined, const abi extends import("viem").Abi | readonly unknown[], functionName extends import("viem").ContractFunctionName<abi, "nonpayable" | "payable">, args extends import("viem").ContractFunctionArgs<abi, "nonpayable" | "payable", functionName>>(args: import("viem").EstimateContractGasParameters<abi, functionName, args, TChain>) => Promise<bigint>;
    estimateGas: (args: import("viem").EstimateGasParameters<Chain | undefined>) => Promise<bigint>;
    getBalance: (args: import("viem").GetBalanceParameters) => Promise<bigint>;
    getBlobBaseFee: () => Promise<bigint>;
    getBlock: <TIncludeTransactions extends boolean = false, TBlockTag extends import("viem").BlockTag = "latest">(args?: import("viem").GetBlockParameters<TIncludeTransactions, TBlockTag> | undefined) => Promise<{
        number: TBlockTag extends "pending" ? null : bigint;
        nonce: TBlockTag extends "pending" ? null : `0x${string}`;
        hash: TBlockTag extends "pending" ? null : `0x${string}`;
        logsBloom: TBlockTag extends "pending" ? null : `0x${string}`;
        baseFeePerGas: bigint | null;
        blobGasUsed: bigint;
        difficulty: bigint;
        excessBlobGas: bigint;
        extraData: `0x${string}`;
        gasLimit: bigint;
        gasUsed: bigint;
        miner: `0x${string}`;
        mixHash: `0x${string}`;
        parentHash: `0x${string}`;
        receiptsRoot: `0x${string}`;
        sealFields: `0x${string}`[];
        sha3Uncles: `0x${string}`;
        size: bigint;
        stateRoot: `0x${string}`;
        timestamp: bigint;
        totalDifficulty: bigint | null;
        transactionsRoot: `0x${string}`;
        uncles: `0x${string}`[];
        withdrawals?: import("viem").Withdrawal[] | undefined;
        withdrawalsRoot?: `0x${string}` | undefined;
        transactions: TIncludeTransactions extends true ? ({
            to: `0x${string}` | null;
            nonce: number;
            type: "legacy";
            r: `0x${string}`;
            s: `0x${string}`;
            from: `0x${string}`;
            value: bigint;
            gas: bigint;
            v: bigint;
            yParity?: undefined;
            gasPrice: bigint;
            maxFeePerBlobGas?: undefined;
            maxFeePerGas?: undefined;
            maxPriorityFeePerGas?: undefined;
            blobVersionedHashes?: undefined;
            accessList?: undefined;
            chainId?: number | undefined;
            hash: `0x${string}`;
            input: `0x${string}`;
            typeHex: `0x${string}` | null;
            blockHash: (TBlockTag extends "pending" ? true : false) extends infer T_1 ? T_1 extends (TBlockTag extends "pending" ? true : false) ? T_1 extends true ? null : `0x${string}` : never : never;
            blockNumber: (TBlockTag extends "pending" ? true : false) extends infer T_2 ? T_2 extends (TBlockTag extends "pending" ? true : false) ? T_2 extends true ? null : bigint : never : never;
            transactionIndex: (TBlockTag extends "pending" ? true : false) extends infer T_3 ? T_3 extends (TBlockTag extends "pending" ? true : false) ? T_3 extends true ? null : number : never : never;
        } | {
            to: `0x${string}` | null;
            nonce: number;
            type: "eip2930";
            r: `0x${string}`;
            s: `0x${string}`;
            from: `0x${string}`;
            value: bigint;
            gas: bigint;
            v: bigint;
            yParity: number;
            gasPrice: bigint;
            maxFeePerBlobGas?: undefined;
            maxFeePerGas?: undefined;
            maxPriorityFeePerGas?: undefined;
            blobVersionedHashes?: undefined;
            accessList: import("viem").AccessList;
            chainId: number;
            hash: `0x${string}`;
            input: `0x${string}`;
            typeHex: `0x${string}` | null;
            blockHash: (TBlockTag extends "pending" ? true : false) extends infer T_4 ? T_4 extends (TBlockTag extends "pending" ? true : false) ? T_4 extends true ? null : `0x${string}` : never : never;
            blockNumber: (TBlockTag extends "pending" ? true : false) extends infer T_5 ? T_5 extends (TBlockTag extends "pending" ? true : false) ? T_5 extends true ? null : bigint : never : never;
            transactionIndex: (TBlockTag extends "pending" ? true : false) extends infer T_6 ? T_6 extends (TBlockTag extends "pending" ? true : false) ? T_6 extends true ? null : number : never : never;
        } | {
            to: `0x${string}` | null;
            nonce: number;
            type: "eip1559";
            r: `0x${string}`;
            s: `0x${string}`;
            from: `0x${string}`;
            value: bigint;
            gas: bigint;
            v: bigint;
            yParity: number;
            gasPrice?: undefined;
            maxFeePerBlobGas?: undefined;
            maxFeePerGas: bigint;
            maxPriorityFeePerGas: bigint;
            blobVersionedHashes?: undefined;
            accessList: import("viem").AccessList;
            chainId: number;
            hash: `0x${string}`;
            input: `0x${string}`;
            typeHex: `0x${string}` | null;
            blockHash: (TBlockTag extends "pending" ? true : false) extends infer T_7 ? T_7 extends (TBlockTag extends "pending" ? true : false) ? T_7 extends true ? null : `0x${string}` : never : never;
            blockNumber: (TBlockTag extends "pending" ? true : false) extends infer T_8 ? T_8 extends (TBlockTag extends "pending" ? true : false) ? T_8 extends true ? null : bigint : never : never;
            transactionIndex: (TBlockTag extends "pending" ? true : false) extends infer T_9 ? T_9 extends (TBlockTag extends "pending" ? true : false) ? T_9 extends true ? null : number : never : never;
        } | {
            to: `0x${string}` | null;
            nonce: number;
            type: "eip4844";
            r: `0x${string}`;
            s: `0x${string}`;
            from: `0x${string}`;
            value: bigint;
            gas: bigint;
            v: bigint;
            yParity: number;
            gasPrice?: undefined;
            maxFeePerBlobGas: bigint;
            maxFeePerGas: bigint;
            maxPriorityFeePerGas: bigint;
            blobVersionedHashes: `0x${string}`[];
            accessList: import("viem").AccessList;
            chainId: number;
            hash: `0x${string}`;
            input: `0x${string}`;
            typeHex: `0x${string}` | null;
            blockHash: (TBlockTag extends "pending" ? true : false) extends infer T_10 ? T_10 extends (TBlockTag extends "pending" ? true : false) ? T_10 extends true ? null : `0x${string}` : never : never;
            blockNumber: (TBlockTag extends "pending" ? true : false) extends infer T_11 ? T_11 extends (TBlockTag extends "pending" ? true : false) ? T_11 extends true ? null : bigint : never : never;
            transactionIndex: (TBlockTag extends "pending" ? true : false) extends infer T_12 ? T_12 extends (TBlockTag extends "pending" ? true : false) ? T_12 extends true ? null : number : never : never;
        })[] : `0x${string}`[];
    }>;
    getBlockNumber: (args?: import("viem").GetBlockNumberParameters | undefined) => Promise<bigint>;
    getBlockTransactionCount: (args?: import("viem").GetBlockTransactionCountParameters | undefined) => Promise<number>;
    getBytecode: (args: import("viem").GetBytecodeParameters) => Promise<import("viem").GetBytecodeReturnType>;
    getChainId: () => Promise<number>;
    getContractEvents: <const abi_1 extends import("viem").Abi | readonly unknown[], eventName extends import("viem").ContractEventName<abi_1> | undefined = undefined, strict extends boolean | undefined = undefined, fromBlock extends bigint | import("viem").BlockTag | undefined = undefined, toBlock extends bigint | import("viem").BlockTag | undefined = undefined>(args: import("viem").GetContractEventsParameters<abi_1, eventName, strict, fromBlock, toBlock>) => Promise<import("viem").GetContractEventsReturnType<abi_1, eventName, strict, fromBlock, toBlock>>;
    getEnsAddress: (args: {
        blockNumber?: bigint | undefined;
        blockTag?: import("viem").BlockTag | undefined;
        coinType?: number | undefined;
        gatewayUrls?: string[] | undefined;
        name: string;
        strict?: boolean | undefined;
        universalResolverAddress?: `0x${string}` | undefined;
    }) => Promise<import("viem").GetEnsAddressReturnType>;
    getEnsAvatar: (args: {
        name: string;
        blockNumber?: bigint | undefined;
        blockTag?: import("viem").BlockTag | undefined;
        gatewayUrls?: string[] | undefined;
        strict?: boolean | undefined;
        universalResolverAddress?: `0x${string}` | undefined;
        assetGatewayUrls?: import("viem").AssetGatewayUrls | undefined;
    }) => Promise<import("viem").GetEnsAvatarReturnType>;
    getEnsName: (args: {
        blockNumber?: bigint | undefined;
        blockTag?: import("viem").BlockTag | undefined;
        address: `0x${string}`;
        gatewayUrls?: string[] | undefined;
        strict?: boolean | undefined;
        universalResolverAddress?: `0x${string}` | undefined;
    }) => Promise<import("viem").GetEnsNameReturnType>;
    getEnsResolver: (args: {
        blockNumber?: bigint | undefined;
        blockTag?: import("viem").BlockTag | undefined;
        name: string;
        universalResolverAddress?: `0x${string}` | undefined;
    }) => Promise<`0x${string}`>;
    getEnsText: (args: {
        blockNumber?: bigint | undefined;
        blockTag?: import("viem").BlockTag | undefined;
        name: string;
        gatewayUrls?: string[] | undefined;
        key: string;
        strict?: boolean | undefined;
        universalResolverAddress?: `0x${string}` | undefined;
    }) => Promise<import("viem").GetEnsTextReturnType>;
    getFeeHistory: (args: import("viem").GetFeeHistoryParameters) => Promise<import("viem").GetFeeHistoryReturnType>;
    estimateFeesPerGas: <TChainOverride extends Chain | undefined = undefined, TType extends import("viem").FeeValuesType = "eip1559">(args?: import("viem").EstimateFeesPerGasParameters<Chain | undefined, TChainOverride, TType> | undefined) => Promise<import("viem").EstimateFeesPerGasReturnType>;
    getFilterChanges: <TFilterType extends import("viem").FilterType, const TAbi_1 extends import("viem").Abi | readonly unknown[] | undefined, TEventName_1 extends string | undefined, TStrict_2 extends boolean | undefined = undefined, TFromBlock_2 extends bigint | import("viem").BlockTag | undefined = undefined, TToBlock_2 extends bigint | import("viem").BlockTag | undefined = undefined>(args: import("viem").GetFilterChangesParameters<TFilterType, TAbi_1, TEventName_1, TStrict_2, TFromBlock_2, TToBlock_2>) => Promise<import("viem").GetFilterChangesReturnType<TFilterType, TAbi_1, TEventName_1, TStrict_2, TFromBlock_2, TToBlock_2>>;
    getFilterLogs: <const TAbi_2 extends import("viem").Abi | readonly unknown[] | undefined, TEventName_2 extends string | undefined, TStrict_3 extends boolean | undefined = undefined, TFromBlock_3 extends bigint | import("viem").BlockTag | undefined = undefined, TToBlock_3 extends bigint | import("viem").BlockTag | undefined = undefined>(args: import("viem").GetFilterLogsParameters<TAbi_2, TEventName_2, TStrict_3, TFromBlock_3, TToBlock_3>) => Promise<import("viem").GetFilterLogsReturnType<TAbi_2, TEventName_2, TStrict_3, TFromBlock_3, TToBlock_3>>;
    getGasPrice: () => Promise<bigint>;
    getLogs: <const TAbiEvent_1 extends import("viem").AbiEvent | undefined = undefined, const TAbiEvents_1 extends readonly unknown[] | readonly import("viem").AbiEvent[] | undefined = TAbiEvent_1 extends import("viem").AbiEvent ? [TAbiEvent_1] : undefined, TStrict_4 extends boolean | undefined = undefined, TFromBlock_4 extends bigint | import("viem").BlockTag | undefined = undefined, TToBlock_4 extends bigint | import("viem").BlockTag | undefined = undefined>(args?: import("viem").GetLogsParameters<TAbiEvent_1, TAbiEvents_1, TStrict_4, TFromBlock_4, TToBlock_4> | undefined) => Promise<import("viem").GetLogsReturnType<TAbiEvent_1, TAbiEvents_1, TStrict_4, TFromBlock_4, TToBlock_4>>;
    getProof: (args: import("viem").GetProofParameters) => Promise<import("viem").GetProofReturnType>;
    estimateMaxPriorityFeePerGas: <TChainOverride_1 extends Chain | undefined = undefined>(args?: {
        chain: TChainOverride_1 | null;
    } | undefined) => Promise<bigint>;
    getStorageAt: (args: import("viem").GetStorageAtParameters) => Promise<import("viem").GetStorageAtReturnType>;
    getTransaction: <TBlockTag_1 extends import("viem").BlockTag = "latest">(args: import("viem").GetTransactionParameters<TBlockTag_1>) => Promise<{
        to: `0x${string}` | null;
        nonce: number;
        type: "legacy";
        r: `0x${string}`;
        s: `0x${string}`;
        from: `0x${string}`;
        value: bigint;
        gas: bigint;
        v: bigint;
        yParity?: undefined;
        gasPrice: bigint;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: undefined;
        maxPriorityFeePerGas?: undefined;
        blobVersionedHashes?: undefined;
        accessList?: undefined;
        chainId?: number | undefined;
        hash: `0x${string}`;
        input: `0x${string}`;
        typeHex: `0x${string}` | null;
        blockHash: (TBlockTag_1 extends "pending" ? true : false) extends infer T_13 ? T_13 extends (TBlockTag_1 extends "pending" ? true : false) ? T_13 extends true ? null : `0x${string}` : never : never;
        blockNumber: (TBlockTag_1 extends "pending" ? true : false) extends infer T_14 ? T_14 extends (TBlockTag_1 extends "pending" ? true : false) ? T_14 extends true ? null : bigint : never : never;
        transactionIndex: (TBlockTag_1 extends "pending" ? true : false) extends infer T_15 ? T_15 extends (TBlockTag_1 extends "pending" ? true : false) ? T_15 extends true ? null : number : never : never;
    } | {
        to: `0x${string}` | null;
        nonce: number;
        type: "eip2930";
        r: `0x${string}`;
        s: `0x${string}`;
        from: `0x${string}`;
        value: bigint;
        gas: bigint;
        v: bigint;
        yParity: number;
        gasPrice: bigint;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: undefined;
        maxPriorityFeePerGas?: undefined;
        blobVersionedHashes?: undefined;
        accessList: import("viem").AccessList;
        chainId: number;
        hash: `0x${string}`;
        input: `0x${string}`;
        typeHex: `0x${string}` | null;
        blockHash: (TBlockTag_1 extends "pending" ? true : false) extends infer T_16 ? T_16 extends (TBlockTag_1 extends "pending" ? true : false) ? T_16 extends true ? null : `0x${string}` : never : never;
        blockNumber: (TBlockTag_1 extends "pending" ? true : false) extends infer T_17 ? T_17 extends (TBlockTag_1 extends "pending" ? true : false) ? T_17 extends true ? null : bigint : never : never;
        transactionIndex: (TBlockTag_1 extends "pending" ? true : false) extends infer T_18 ? T_18 extends (TBlockTag_1 extends "pending" ? true : false) ? T_18 extends true ? null : number : never : never;
    } | {
        to: `0x${string}` | null;
        nonce: number;
        type: "eip1559";
        r: `0x${string}`;
        s: `0x${string}`;
        from: `0x${string}`;
        value: bigint;
        gas: bigint;
        v: bigint;
        yParity: number;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas: bigint;
        maxPriorityFeePerGas: bigint;
        blobVersionedHashes?: undefined;
        accessList: import("viem").AccessList;
        chainId: number;
        hash: `0x${string}`;
        input: `0x${string}`;
        typeHex: `0x${string}` | null;
        blockHash: (TBlockTag_1 extends "pending" ? true : false) extends infer T_19 ? T_19 extends (TBlockTag_1 extends "pending" ? true : false) ? T_19 extends true ? null : `0x${string}` : never : never;
        blockNumber: (TBlockTag_1 extends "pending" ? true : false) extends infer T_20 ? T_20 extends (TBlockTag_1 extends "pending" ? true : false) ? T_20 extends true ? null : bigint : never : never;
        transactionIndex: (TBlockTag_1 extends "pending" ? true : false) extends infer T_21 ? T_21 extends (TBlockTag_1 extends "pending" ? true : false) ? T_21 extends true ? null : number : never : never;
    } | {
        to: `0x${string}` | null;
        nonce: number;
        type: "eip4844";
        r: `0x${string}`;
        s: `0x${string}`;
        from: `0x${string}`;
        value: bigint;
        gas: bigint;
        v: bigint;
        yParity: number;
        gasPrice?: undefined;
        maxFeePerBlobGas: bigint;
        maxFeePerGas: bigint;
        maxPriorityFeePerGas: bigint;
        blobVersionedHashes: `0x${string}`[];
        accessList: import("viem").AccessList;
        chainId: number;
        hash: `0x${string}`;
        input: `0x${string}`;
        typeHex: `0x${string}` | null;
        blockHash: (TBlockTag_1 extends "pending" ? true : false) extends infer T_22 ? T_22 extends (TBlockTag_1 extends "pending" ? true : false) ? T_22 extends true ? null : `0x${string}` : never : never;
        blockNumber: (TBlockTag_1 extends "pending" ? true : false) extends infer T_23 ? T_23 extends (TBlockTag_1 extends "pending" ? true : false) ? T_23 extends true ? null : bigint : never : never;
        transactionIndex: (TBlockTag_1 extends "pending" ? true : false) extends infer T_24 ? T_24 extends (TBlockTag_1 extends "pending" ? true : false) ? T_24 extends true ? null : number : never : never;
    }>;
    getTransactionConfirmations: (args: import("viem").GetTransactionConfirmationsParameters<Chain | undefined>) => Promise<bigint>;
    getTransactionCount: (args: import("viem").GetTransactionCountParameters) => Promise<number>;
    getTransactionReceipt: (args: import("viem").GetTransactionReceiptParameters) => Promise<import("viem").TransactionReceipt>;
    multicall: <const contracts extends readonly unknown[], allowFailure extends boolean = true>(args: import("viem").MulticallParameters<contracts, allowFailure>) => Promise<import("viem").MulticallReturnType<contracts, allowFailure>>;
    prepareTransactionRequest: <const TRequest extends import("viem").PrepareTransactionRequestRequest<Chain | undefined, TChainOverride_2>, TChainOverride_2 extends Chain | undefined = undefined, TAccountOverride extends `0x${string}` | import("viem").Account | undefined = undefined>(args: import("viem").PrepareTransactionRequestParameters<Chain | undefined, import("viem").Account | undefined, TChainOverride_2, TAccountOverride, TRequest>) => Promise<import("viem").UnionRequiredBy<Extract<import("viem").UnionOmit<import("viem").ExtractChainFormatterParameters<import("viem").DeriveChain<Chain, TChainOverride_2>, "transactionRequest", import("viem").TransactionRequest>, "from"> & (import("viem").DeriveChain<Chain, TChainOverride_2> extends infer T_37 ? T_37 extends import("viem").DeriveChain<Chain, TChainOverride_2> ? T_37 extends Chain ? {
        chain: T_37;
    } : {
        chain?: undefined;
    } : never : never) & (import("viem").DeriveAccount<import("viem").Account | undefined, TAccountOverride> extends infer T_38 ? T_38 extends import("viem").DeriveAccount<import("viem").Account | undefined, TAccountOverride> ? T_38 extends import("viem").Account ? {
        account: T_38;
        from: `0x${string}`;
    } : {
        account?: undefined;
        from?: undefined;
    } : never : never), import("viem").IsNever<((TRequest["type"] extends string ? TRequest["type"] : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)> extends "legacy" ? unknown : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)>) extends infer T_39 ? T_39 extends (TRequest["type"] extends string ? TRequest["type"] : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)> extends "legacy" ? unknown : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)>) ? T_39 extends "legacy" ? import("viem").TransactionRequestLegacy : never : never : never) | ((TRequest["type"] extends string ? TRequest["type"] : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)> extends "legacy" ? unknown : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)>) extends infer T_40 ? T_40 extends (TRequest["type"] extends string ? TRequest["type"] : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)> extends "legacy" ? unknown : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)>) ? T_40 extends "eip1559" ? import("viem").TransactionRequestEIP1559 : never : never : never) | ((TRequest["type"] extends string ? TRequest["type"] : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)> extends "legacy" ? unknown : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)>) extends infer T_41 ? T_41 extends (TRequest["type"] extends string ? TRequest["type"] : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)> extends "legacy" ? unknown : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)>) ? T_41 extends "eip2930" ? import("viem").TransactionRequestEIP2930 : never : never : never) | ((TRequest["type"] extends string ? TRequest["type"] : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)> extends "legacy" ? unknown : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)>) extends infer T_42 ? T_42 extends (TRequest["type"] extends string ? TRequest["type"] : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)> extends "legacy" ? unknown : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)>) ? T_42 extends "eip4844" ? import("viem").TransactionRequestEIP4844 : never : never : never)> extends true ? unknown : import("viem").ExactPartial<((TRequest["type"] extends string ? TRequest["type"] : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)> extends "legacy" ? unknown : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)>) extends infer T_43 ? T_43 extends (TRequest["type"] extends string ? TRequest["type"] : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)> extends "legacy" ? unknown : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)>) ? T_43 extends "legacy" ? import("viem").TransactionRequestLegacy : never : never : never) | ((TRequest["type"] extends string ? TRequest["type"] : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)> extends "legacy" ? unknown : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)>) extends infer T_44 ? T_44 extends (TRequest["type"] extends string ? TRequest["type"] : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)> extends "legacy" ? unknown : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)>) ? T_44 extends "eip1559" ? import("viem").TransactionRequestEIP1559 : never : never : never) | ((TRequest["type"] extends string ? TRequest["type"] : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)> extends "legacy" ? unknown : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)>) extends infer T_45 ? T_45 extends (TRequest["type"] extends string ? TRequest["type"] : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)> extends "legacy" ? unknown : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)>) ? T_45 extends "eip2930" ? import("viem").TransactionRequestEIP2930 : never : never : never) | ((TRequest["type"] extends string ? TRequest["type"] : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)> extends "legacy" ? unknown : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)>) extends infer T_46 ? T_46 extends (TRequest["type"] extends string ? TRequest["type"] : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)> extends "legacy" ? unknown : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)>) ? T_46 extends "eip4844" ? import("viem").TransactionRequestEIP4844 : never : never : never)>> & {
        chainId?: number | undefined;
    }, (TRequest["parameters"] extends import("viem").PrepareTransactionRequestParameterType[] ? TRequest["parameters"][number] : import("viem").PrepareTransactionRequestParameterType) extends infer T_47 ? T_47 extends (TRequest["parameters"] extends import("viem").PrepareTransactionRequestParameterType[] ? TRequest["parameters"][number] : import("viem").PrepareTransactionRequestParameterType) ? T_47 extends "fees" ? "gasPrice" | "maxFeePerGas" | "maxPriorityFeePerGas" : T_47 : never : never> & (unknown extends TRequest["kzg"] ? {} : Pick<TRequest, "kzg">) extends infer T_25 ? { [K_1 in keyof T_25]: (import("viem").UnionRequiredBy<Extract<import("viem").UnionOmit<import("viem").ExtractChainFormatterParameters<import("viem").DeriveChain<Chain, TChainOverride_2>, "transactionRequest", import("viem").TransactionRequest>, "from"> & (import("viem").DeriveChain<Chain, TChainOverride_2> extends infer T_26 ? T_26 extends import("viem").DeriveChain<Chain, TChainOverride_2> ? T_26 extends Chain ? {
        chain: T_26;
    } : {
        chain?: undefined;
    } : never : never) & (import("viem").DeriveAccount<import("viem").Account | undefined, TAccountOverride> extends infer T_27 ? T_27 extends import("viem").DeriveAccount<import("viem").Account | undefined, TAccountOverride> ? T_27 extends import("viem").Account ? {
        account: T_27;
        from: `0x${string}`;
    } : {
        account?: undefined;
        from?: undefined;
    } : never : never), import("viem").IsNever<((TRequest["type"] extends string ? TRequest["type"] : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)> extends "legacy" ? unknown : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)>) extends infer T_28 ? T_28 extends (TRequest["type"] extends string ? TRequest["type"] : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)> extends "legacy" ? unknown : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)>) ? T_28 extends "legacy" ? import("viem").TransactionRequestLegacy : never : never : never) | ((TRequest["type"] extends string ? TRequest["type"] : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)> extends "legacy" ? unknown : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)>) extends infer T_29 ? T_29 extends (TRequest["type"] extends string ? TRequest["type"] : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)> extends "legacy" ? unknown : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)>) ? T_29 extends "eip1559" ? import("viem").TransactionRequestEIP1559 : never : never : never) | ((TRequest["type"] extends string ? TRequest["type"] : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)> extends "legacy" ? unknown : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)>) extends infer T_30 ? T_30 extends (TRequest["type"] extends string ? TRequest["type"] : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)> extends "legacy" ? unknown : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)>) ? T_30 extends "eip2930" ? import("viem").TransactionRequestEIP2930 : never : never : never) | ((TRequest["type"] extends string ? TRequest["type"] : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)> extends "legacy" ? unknown : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)>) extends infer T_31 ? T_31 extends (TRequest["type"] extends string ? TRequest["type"] : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)> extends "legacy" ? unknown : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)>) ? T_31 extends "eip4844" ? import("viem").TransactionRequestEIP4844 : never : never : never)> extends true ? unknown : import("viem").ExactPartial<((TRequest["type"] extends string ? TRequest["type"] : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)> extends "legacy" ? unknown : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)>) extends infer T_32 ? T_32 extends (TRequest["type"] extends string ? TRequest["type"] : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)> extends "legacy" ? unknown : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)>) ? T_32 extends "legacy" ? import("viem").TransactionRequestLegacy : never : never : never) | ((TRequest["type"] extends string ? TRequest["type"] : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)> extends "legacy" ? unknown : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)>) extends infer T_33 ? T_33 extends (TRequest["type"] extends string ? TRequest["type"] : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)> extends "legacy" ? unknown : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)>) ? T_33 extends "eip1559" ? import("viem").TransactionRequestEIP1559 : never : never : never) | ((TRequest["type"] extends string ? TRequest["type"] : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)> extends "legacy" ? unknown : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)>) extends infer T_34 ? T_34 extends (TRequest["type"] extends string ? TRequest["type"] : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)> extends "legacy" ? unknown : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)>) ? T_34 extends "eip2930" ? import("viem").TransactionRequestEIP2930 : never : never : never) | ((TRequest["type"] extends string ? TRequest["type"] : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)> extends "legacy" ? unknown : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)>) extends infer T_35 ? T_35 extends (TRequest["type"] extends string ? TRequest["type"] : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)> extends "legacy" ? unknown : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)>) ? T_35 extends "eip4844" ? import("viem").TransactionRequestEIP4844 : never : never : never)>> & {
        chainId?: number | undefined;
    }, (TRequest["parameters"] extends import("viem").PrepareTransactionRequestParameterType[] ? TRequest["parameters"][number] : import("viem").PrepareTransactionRequestParameterType) extends infer T_36 ? T_36 extends (TRequest["parameters"] extends import("viem").PrepareTransactionRequestParameterType[] ? TRequest["parameters"][number] : import("viem").PrepareTransactionRequestParameterType) ? T_36 extends "fees" ? "gasPrice" | "maxFeePerGas" | "maxPriorityFeePerGas" : T_36 : never : never> & (unknown extends TRequest["kzg"] ? {} : Pick<TRequest, "kzg">))[K_1]; } : never>;
    readContract: <const abi_2 extends import("viem").Abi | readonly unknown[], functionName_1 extends import("viem").ContractFunctionName<abi_2, "view" | "pure">, args_1 extends import("viem").ContractFunctionArgs<abi_2, "view" | "pure", functionName_1>>(args: import("viem").ReadContractParameters<abi_2, functionName_1, args>) => Promise<import("viem").ReadContractReturnType<abi_2, functionName_1, args>>;
    sendRawTransaction: (args: import("viem").SendRawTransactionParameters) => Promise<`0x${string}`>;
    simulateContract: <const abi_3 extends import("viem").Abi | readonly unknown[], functionName_2 extends import("viem").ContractFunctionName<abi_3, "nonpayable" | "payable">, args_2 extends import("viem").ContractFunctionArgs<abi_3, "nonpayable" | "payable", functionName_2>, chainOverride extends Chain | undefined, accountOverride extends `0x${string}` | import("viem").Account | undefined = undefined>(args: import("viem").SimulateContractParameters<abi_3, functionName_2, args_2, Chain | undefined, chainOverride, accountOverride>) => Promise<import("viem").SimulateContractReturnType<abi_3, functionName_2, args_2, Chain | undefined, import("viem").Account | undefined, chainOverride, accountOverride>>;
    verifyMessage: (args: import("viem").VerifyMessageActionParameters) => Promise<boolean>;
    verifyTypedData: (args: import("viem").VerifyTypedDataActionParameters) => Promise<boolean>;
    uninstallFilter: (args: import("viem").UninstallFilterParameters) => Promise<boolean>;
    waitForTransactionReceipt: (args: import("viem").WaitForTransactionReceiptParameters<Chain | undefined>) => Promise<import("viem").TransactionReceipt>;
    watchBlockNumber: (args: import("viem").WatchBlockNumberParameters) => import("viem").WatchBlockNumberReturnType;
    watchBlocks: <TIncludeTransactions_1 extends boolean = false, TBlockTag_2 extends import("viem").BlockTag = "latest">(args: import("viem").WatchBlocksParameters<import("viem").Transport, Chain | undefined, TIncludeTransactions_1, TBlockTag_2>) => import("viem").WatchBlocksReturnType;
    watchContractEvent: <const TAbi_3 extends import("viem").Abi | readonly unknown[], TEventName_3 extends import("viem").ContractEventName<TAbi_3>, TStrict_5 extends boolean | undefined = undefined>(args: import("viem").WatchContractEventParameters<TAbi_3, TEventName_3, TStrict_5, import("viem").Transport>) => import("viem").WatchContractEventReturnType;
    watchEvent: <const TAbiEvent_2 extends import("viem").AbiEvent | undefined = undefined, const TAbiEvents_2 extends readonly unknown[] | readonly import("viem").AbiEvent[] | undefined = TAbiEvent_2 extends import("viem").AbiEvent ? [TAbiEvent_2] : undefined, TStrict_6 extends boolean | undefined = undefined>(args: import("viem").WatchEventParameters<TAbiEvent_2, TAbiEvents_2, TStrict_6, import("viem").Transport>) => import("viem").WatchEventReturnType;
    watchPendingTransactions: (args: import("viem").WatchPendingTransactionsParameters<import("viem").Transport>) => import("viem").WatchPendingTransactionsReturnType;
    extend: <const client extends {
        [x: string]: unknown;
        account?: undefined;
        batch?: undefined;
        cacheTime?: undefined;
        ccipRead?: undefined;
        chain?: undefined;
        key?: undefined;
        name?: undefined;
        pollingInterval?: undefined;
        request?: undefined;
        transport?: undefined;
        type?: undefined;
        uid?: undefined;
    } & import("viem").ExactPartial<Pick<import("viem").PublicActions<import("viem").Transport, Chain | undefined, undefined>, "call" | "createContractEventFilter" | "createEventFilter" | "estimateContractGas" | "estimateGas" | "getBlock" | "getBlockNumber" | "getChainId" | "getContractEvents" | "getEnsText" | "getFilterChanges" | "getGasPrice" | "getLogs" | "getTransaction" | "getTransactionCount" | "getTransactionReceipt" | "prepareTransactionRequest" | "readContract" | "sendRawTransaction" | "simulateContract" | "uninstallFilter" | "watchBlockNumber" | "watchContractEvent"> & Pick<import("viem").WalletActions<Chain | undefined, undefined>, "sendTransaction" | "writeContract">>>(fn: (client: Client<import("viem").Transport, Chain | undefined, undefined, import("viem").PublicRpcSchema, import("viem").PublicActions<import("viem").Transport, Chain | undefined>>) => client) => Client<import("viem").Transport, Chain | undefined, undefined, import("viem").PublicRpcSchema, { [K_2 in keyof client]: client[K_2]; } & import("viem").PublicActions<import("viem").Transport, Chain | undefined>>;
};
export type Provider = ({ chainId }: {
    chainId: ChainId;
}) => PublicClient;
export declare const getWalletClient: ({ chainId }: {
    chainId: ChainId;
}) => {
    account: import("viem").Account | undefined;
    batch?: {
        multicall?: boolean | {
            batchSize?: number | undefined;
            wait?: number | undefined;
        } | undefined;
    } | undefined;
    cacheTime: number;
    ccipRead?: false | {
        request?: ((parameters: import("viem").CcipRequestParameters) => Promise<`0x${string}`>) | undefined;
    } | undefined;
    chain: Chain | undefined;
    key: string;
    name: string;
    pollingInterval: number;
    request: import("viem").EIP1193RequestFn<import("viem").WalletRpcSchema>;
    transport: import("viem").TransportConfig<string, import("viem").EIP1193RequestFn> & Record<string, any>;
    type: string;
    uid: string;
    addChain: (args: import("viem").AddChainParameters) => Promise<void>;
    deployContract: <const abi extends import("viem").Abi | readonly unknown[], chainOverride extends Chain | undefined>(args: import("viem").DeployContractParameters<abi, Chain | undefined, import("viem").Account | undefined, chainOverride>) => Promise<`0x${string}`>;
    getAddresses: () => Promise<import("viem").GetAddressesReturnType>;
    getChainId: () => Promise<number>;
    getPermissions: () => Promise<import("viem").GetPermissionsReturnType>;
    prepareTransactionRequest: <const TRequest extends import("viem").PrepareTransactionRequestRequest<Chain | undefined, TChainOverride>, TChainOverride extends Chain | undefined = undefined, TAccountOverride extends `0x${string}` | import("viem").Account | undefined = undefined>(args: import("viem").PrepareTransactionRequestParameters<Chain | undefined, import("viem").Account | undefined, TChainOverride, TAccountOverride, TRequest>) => Promise<import("viem").UnionRequiredBy<Extract<import("viem").UnionOmit<import("viem").ExtractChainFormatterParameters<import("viem").DeriveChain<Chain, TChainOverride>, "transactionRequest", import("viem").TransactionRequest>, "from"> & (import("viem").DeriveChain<Chain, TChainOverride> extends infer T_12 ? T_12 extends import("viem").DeriveChain<Chain, TChainOverride> ? T_12 extends Chain ? {
        chain: T_12;
    } : {
        chain?: undefined;
    } : never : never) & (import("viem").DeriveAccount<import("viem").Account | undefined, TAccountOverride> extends infer T_13 ? T_13 extends import("viem").DeriveAccount<import("viem").Account | undefined, TAccountOverride> ? T_13 extends import("viem").Account ? {
        account: T_13;
        from: `0x${string}`;
    } : {
        account?: undefined;
        from?: undefined;
    } : never : never), import("viem").IsNever<((TRequest["type"] extends string ? TRequest["type"] : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)> extends "legacy" ? unknown : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)>) extends infer T_14 ? T_14 extends (TRequest["type"] extends string ? TRequest["type"] : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)> extends "legacy" ? unknown : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)>) ? T_14 extends "legacy" ? import("viem").TransactionRequestLegacy : never : never : never) | ((TRequest["type"] extends string ? TRequest["type"] : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)> extends "legacy" ? unknown : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)>) extends infer T_15 ? T_15 extends (TRequest["type"] extends string ? TRequest["type"] : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)> extends "legacy" ? unknown : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)>) ? T_15 extends "eip1559" ? import("viem").TransactionRequestEIP1559 : never : never : never) | ((TRequest["type"] extends string ? TRequest["type"] : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)> extends "legacy" ? unknown : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)>) extends infer T_16 ? T_16 extends (TRequest["type"] extends string ? TRequest["type"] : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)> extends "legacy" ? unknown : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)>) ? T_16 extends "eip2930" ? import("viem").TransactionRequestEIP2930 : never : never : never) | ((TRequest["type"] extends string ? TRequest["type"] : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)> extends "legacy" ? unknown : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)>) extends infer T_17 ? T_17 extends (TRequest["type"] extends string ? TRequest["type"] : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)> extends "legacy" ? unknown : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)>) ? T_17 extends "eip4844" ? import("viem").TransactionRequestEIP4844 : never : never : never)> extends true ? unknown : import("viem").ExactPartial<((TRequest["type"] extends string ? TRequest["type"] : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)> extends "legacy" ? unknown : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)>) extends infer T_18 ? T_18 extends (TRequest["type"] extends string ? TRequest["type"] : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)> extends "legacy" ? unknown : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)>) ? T_18 extends "legacy" ? import("viem").TransactionRequestLegacy : never : never : never) | ((TRequest["type"] extends string ? TRequest["type"] : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)> extends "legacy" ? unknown : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)>) extends infer T_19 ? T_19 extends (TRequest["type"] extends string ? TRequest["type"] : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)> extends "legacy" ? unknown : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)>) ? T_19 extends "eip1559" ? import("viem").TransactionRequestEIP1559 : never : never : never) | ((TRequest["type"] extends string ? TRequest["type"] : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)> extends "legacy" ? unknown : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)>) extends infer T_20 ? T_20 extends (TRequest["type"] extends string ? TRequest["type"] : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)> extends "legacy" ? unknown : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)>) ? T_20 extends "eip2930" ? import("viem").TransactionRequestEIP2930 : never : never : never) | ((TRequest["type"] extends string ? TRequest["type"] : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)> extends "legacy" ? unknown : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)>) extends infer T_21 ? T_21 extends (TRequest["type"] extends string ? TRequest["type"] : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)> extends "legacy" ? unknown : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)>) ? T_21 extends "eip4844" ? import("viem").TransactionRequestEIP4844 : never : never : never)>> & {
        chainId?: number | undefined;
    }, (TRequest["parameters"] extends import("viem").PrepareTransactionRequestParameterType[] ? TRequest["parameters"][number] : import("viem").PrepareTransactionRequestParameterType) extends infer T_22 ? T_22 extends (TRequest["parameters"] extends import("viem").PrepareTransactionRequestParameterType[] ? TRequest["parameters"][number] : import("viem").PrepareTransactionRequestParameterType) ? T_22 extends "fees" ? "gasPrice" | "maxFeePerGas" | "maxPriorityFeePerGas" : T_22 : never : never> & (unknown extends TRequest["kzg"] ? {} : Pick<TRequest, "kzg">) extends infer T ? { [K in keyof T]: (import("viem").UnionRequiredBy<Extract<import("viem").UnionOmit<import("viem").ExtractChainFormatterParameters<import("viem").DeriveChain<Chain, TChainOverride>, "transactionRequest", import("viem").TransactionRequest>, "from"> & (import("viem").DeriveChain<Chain, TChainOverride> extends infer T_1 ? T_1 extends import("viem").DeriveChain<Chain, TChainOverride> ? T_1 extends Chain ? {
        chain: T_1;
    } : {
        chain?: undefined;
    } : never : never) & (import("viem").DeriveAccount<import("viem").Account | undefined, TAccountOverride> extends infer T_2 ? T_2 extends import("viem").DeriveAccount<import("viem").Account | undefined, TAccountOverride> ? T_2 extends import("viem").Account ? {
        account: T_2;
        from: `0x${string}`;
    } : {
        account?: undefined;
        from?: undefined;
    } : never : never), import("viem").IsNever<((TRequest["type"] extends string ? TRequest["type"] : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)> extends "legacy" ? unknown : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)>) extends infer T_3 ? T_3 extends (TRequest["type"] extends string ? TRequest["type"] : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)> extends "legacy" ? unknown : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)>) ? T_3 extends "legacy" ? import("viem").TransactionRequestLegacy : never : never : never) | ((TRequest["type"] extends string ? TRequest["type"] : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)> extends "legacy" ? unknown : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)>) extends infer T_4 ? T_4 extends (TRequest["type"] extends string ? TRequest["type"] : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)> extends "legacy" ? unknown : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)>) ? T_4 extends "eip1559" ? import("viem").TransactionRequestEIP1559 : never : never : never) | ((TRequest["type"] extends string ? TRequest["type"] : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)> extends "legacy" ? unknown : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)>) extends infer T_5 ? T_5 extends (TRequest["type"] extends string ? TRequest["type"] : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)> extends "legacy" ? unknown : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)>) ? T_5 extends "eip2930" ? import("viem").TransactionRequestEIP2930 : never : never : never) | ((TRequest["type"] extends string ? TRequest["type"] : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)> extends "legacy" ? unknown : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)>) extends infer T_6 ? T_6 extends (TRequest["type"] extends string ? TRequest["type"] : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)> extends "legacy" ? unknown : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)>) ? T_6 extends "eip4844" ? import("viem").TransactionRequestEIP4844 : never : never : never)> extends true ? unknown : import("viem").ExactPartial<((TRequest["type"] extends string ? TRequest["type"] : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)> extends "legacy" ? unknown : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)>) extends infer T_7 ? T_7 extends (TRequest["type"] extends string ? TRequest["type"] : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)> extends "legacy" ? unknown : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)>) ? T_7 extends "legacy" ? import("viem").TransactionRequestLegacy : never : never : never) | ((TRequest["type"] extends string ? TRequest["type"] : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)> extends "legacy" ? unknown : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)>) extends infer T_8 ? T_8 extends (TRequest["type"] extends string ? TRequest["type"] : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)> extends "legacy" ? unknown : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)>) ? T_8 extends "eip1559" ? import("viem").TransactionRequestEIP1559 : never : never : never) | ((TRequest["type"] extends string ? TRequest["type"] : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)> extends "legacy" ? unknown : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)>) extends infer T_9 ? T_9 extends (TRequest["type"] extends string ? TRequest["type"] : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)> extends "legacy" ? unknown : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)>) ? T_9 extends "eip2930" ? import("viem").TransactionRequestEIP2930 : never : never : never) | ((TRequest["type"] extends string ? TRequest["type"] : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)> extends "legacy" ? unknown : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)>) extends infer T_10 ? T_10 extends (TRequest["type"] extends string ? TRequest["type"] : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)> extends "legacy" ? unknown : import("viem").GetTransactionType<TRequest, (TRequest extends ({
        accessList?: undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").FeeValuesLegacy) | import("viem").Opaque<import("viem").TransactionSerializableLegacy, TRequest> | import("viem").Opaque<import("viem").TransactionRequestLegacy, TRequest> ? "legacy" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: undefined;
        maxFeePerBlobGas?: undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined;
    } & (import("viem").OneOf<{
        maxFeePerGas: bigint;
    } | {
        maxPriorityFeePerGas: bigint;
    }, import("viem").FeeValuesEIP1559> & {
        accessList?: import("viem").AccessList | undefined;
    })) | import("viem").Opaque<import("viem").TransactionSerializableEIP1559, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP1559, TRequest> ? "eip1559" : never) | (TRequest extends ({
        accessList?: import("viem").AccessList | undefined;
        blobs?: undefined;
        blobVersionedHashes?: undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined;
    } & import("viem").ExactPartial<import("viem").FeeValuesLegacy> & {
        accessList: import("viem").AccessList | undefined;
    }) | import("viem").Opaque<import("viem").TransactionSerializableEIP2930, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP2930, TRequest> ? "eip2930" : never) | (TRequest extends ({
        accessList?: undefined;
        blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    } & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
        blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
    } | {
        blobVersionedHashes: readonly `0x${string}`[] | undefined;
    } | {
        sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
    }, import("viem").TransactionSerializableEIP4844>)) | import("viem").Opaque<import("viem").TransactionSerializableEIP4844, TRequest> | import("viem").Opaque<import("viem").TransactionRequestEIP4844, TRequest> ? "eip4844" : never) | (TRequest["type"] extends string ? TRequest["type"] : never)>) ? T_10 extends "eip4844" ? import("viem").TransactionRequestEIP4844 : never : never : never)>> & {
        chainId?: number | undefined;
    }, (TRequest["parameters"] extends import("viem").PrepareTransactionRequestParameterType[] ? TRequest["parameters"][number] : import("viem").PrepareTransactionRequestParameterType) extends infer T_11 ? T_11 extends (TRequest["parameters"] extends import("viem").PrepareTransactionRequestParameterType[] ? TRequest["parameters"][number] : import("viem").PrepareTransactionRequestParameterType) ? T_11 extends "fees" ? "gasPrice" | "maxFeePerGas" | "maxPriorityFeePerGas" : T_11 : never : never> & (unknown extends TRequest["kzg"] ? {} : Pick<TRequest, "kzg">))[K]; } : never>;
    requestAddresses: () => Promise<import("viem").RequestAddressesReturnType>;
    requestPermissions: (args: {
        [x: string]: Record<string, any>;
        eth_accounts: Record<string, any>;
    }) => Promise<import("viem").RequestPermissionsReturnType>;
    sendRawTransaction: (args: import("viem").SendRawTransactionParameters) => Promise<`0x${string}`>;
    sendTransaction: <const TRequest_1 extends import("viem").SendTransactionRequest<Chain | undefined, TChainOverride_1>, TChainOverride_1 extends Chain | undefined = undefined>(args: import("viem").SendTransactionParameters<Chain | undefined, import("viem").Account | undefined, TChainOverride_1, TRequest_1>) => Promise<`0x${string}`>;
    signMessage: (args: import("viem").SignMessageParameters<import("viem").Account | undefined>) => Promise<`0x${string}`>;
    signTransaction: <TChainOverride_2 extends Chain | undefined>(args: import("viem").SignTransactionParameters<Chain | undefined, import("viem").Account | undefined, TChainOverride_2>) => Promise<`0x02${string}` | `0x01${string}` | `0x03${string}` | import("viem").TransactionSerializedLegacy>;
    signTypedData: <const TTypedData extends {
        [x: string]: readonly import("viem").TypedDataParameter[];
        [x: `address[${string}]`]: undefined;
        [x: `bool[${string}]`]: undefined;
        [x: `string[${string}]`]: undefined;
        [x: `bytes[${string}]`]: undefined;
        [x: `int[${string}]`]: undefined;
        [x: `uint[${string}]`]: undefined;
        [x: `function[${string}]`]: undefined;
        [x: `uint8[${string}]`]: undefined;
        [x: `uint256[${string}]`]: undefined;
        [x: `bytes32[${string}]`]: undefined;
        [x: `bytes2[${string}]`]: undefined;
        [x: `bytes1[${string}]`]: undefined;
        [x: `bytes3[${string}]`]: undefined;
        [x: `bytes16[${string}]`]: undefined;
        [x: `bytes22[${string}]`]: undefined;
        [x: `bytes4[${string}]`]: undefined;
        [x: `bytes5[${string}]`]: undefined;
        [x: `bytes6[${string}]`]: undefined;
        [x: `bytes7[${string}]`]: undefined;
        [x: `bytes8[${string}]`]: undefined;
        [x: `bytes9[${string}]`]: undefined;
        [x: `bytes10[${string}]`]: undefined;
        [x: `bytes11[${string}]`]: undefined;
        [x: `bytes12[${string}]`]: undefined;
        [x: `bytes13[${string}]`]: undefined;
        [x: `bytes14[${string}]`]: undefined;
        [x: `bytes15[${string}]`]: undefined;
        [x: `bytes17[${string}]`]: undefined;
        [x: `bytes18[${string}]`]: undefined;
        [x: `bytes19[${string}]`]: undefined;
        [x: `bytes20[${string}]`]: undefined;
        [x: `bytes21[${string}]`]: undefined;
        [x: `bytes23[${string}]`]: undefined;
        [x: `bytes24[${string}]`]: undefined;
        [x: `bytes25[${string}]`]: undefined;
        [x: `bytes26[${string}]`]: undefined;
        [x: `bytes27[${string}]`]: undefined;
        [x: `bytes28[${string}]`]: undefined;
        [x: `bytes29[${string}]`]: undefined;
        [x: `bytes30[${string}]`]: undefined;
        [x: `bytes31[${string}]`]: undefined;
        [x: `int16[${string}]`]: undefined;
        [x: `int8[${string}]`]: undefined;
        [x: `int24[${string}]`]: undefined;
        [x: `int32[${string}]`]: undefined;
        [x: `int40[${string}]`]: undefined;
        [x: `int48[${string}]`]: undefined;
        [x: `int56[${string}]`]: undefined;
        [x: `int64[${string}]`]: undefined;
        [x: `int72[${string}]`]: undefined;
        [x: `int80[${string}]`]: undefined;
        [x: `int88[${string}]`]: undefined;
        [x: `int96[${string}]`]: undefined;
        [x: `int104[${string}]`]: undefined;
        [x: `int112[${string}]`]: undefined;
        [x: `int120[${string}]`]: undefined;
        [x: `int128[${string}]`]: undefined;
        [x: `int136[${string}]`]: undefined;
        [x: `int144[${string}]`]: undefined;
        [x: `int152[${string}]`]: undefined;
        [x: `int160[${string}]`]: undefined;
        [x: `int168[${string}]`]: undefined;
        [x: `int176[${string}]`]: undefined;
        [x: `int184[${string}]`]: undefined;
        [x: `int192[${string}]`]: undefined;
        [x: `int200[${string}]`]: undefined;
        [x: `int208[${string}]`]: undefined;
        [x: `int216[${string}]`]: undefined;
        [x: `int224[${string}]`]: undefined;
        [x: `int232[${string}]`]: undefined;
        [x: `int240[${string}]`]: undefined;
        [x: `int248[${string}]`]: undefined;
        [x: `int256[${string}]`]: undefined;
        [x: `uint16[${string}]`]: undefined;
        [x: `uint24[${string}]`]: undefined;
        [x: `uint32[${string}]`]: undefined;
        [x: `uint40[${string}]`]: undefined;
        [x: `uint48[${string}]`]: undefined;
        [x: `uint56[${string}]`]: undefined;
        [x: `uint64[${string}]`]: undefined;
        [x: `uint72[${string}]`]: undefined;
        [x: `uint80[${string}]`]: undefined;
        [x: `uint88[${string}]`]: undefined;
        [x: `uint96[${string}]`]: undefined;
        [x: `uint104[${string}]`]: undefined;
        [x: `uint112[${string}]`]: undefined;
        [x: `uint120[${string}]`]: undefined;
        [x: `uint128[${string}]`]: undefined;
        [x: `uint136[${string}]`]: undefined;
        [x: `uint144[${string}]`]: undefined;
        [x: `uint152[${string}]`]: undefined;
        [x: `uint160[${string}]`]: undefined;
        [x: `uint168[${string}]`]: undefined;
        [x: `uint176[${string}]`]: undefined;
        [x: `uint184[${string}]`]: undefined;
        [x: `uint192[${string}]`]: undefined;
        [x: `uint200[${string}]`]: undefined;
        [x: `uint208[${string}]`]: undefined;
        [x: `uint216[${string}]`]: undefined;
        [x: `uint224[${string}]`]: undefined;
        [x: `uint232[${string}]`]: undefined;
        [x: `uint240[${string}]`]: undefined;
        [x: `uint248[${string}]`]: undefined;
        string?: undefined;
        address?: undefined;
        uint8?: undefined;
        uint256?: undefined;
        bytes?: undefined;
        bytes32?: undefined;
        bool?: undefined;
        bytes2?: undefined;
        bytes1?: undefined;
        bytes3?: undefined;
        bytes16?: undefined;
        bytes22?: undefined;
        bytes4?: undefined;
        bytes5?: undefined;
        bytes6?: undefined;
        bytes7?: undefined;
        bytes8?: undefined;
        bytes9?: undefined;
        bytes10?: undefined;
        bytes11?: undefined;
        bytes12?: undefined;
        bytes13?: undefined;
        bytes14?: undefined;
        bytes15?: undefined;
        bytes17?: undefined;
        bytes18?: undefined;
        bytes19?: undefined;
        bytes20?: undefined;
        bytes21?: undefined;
        bytes23?: undefined;
        bytes24?: undefined;
        bytes25?: undefined;
        bytes26?: undefined;
        bytes27?: undefined;
        bytes28?: undefined;
        bytes29?: undefined;
        bytes30?: undefined;
        bytes31?: undefined;
        int16?: undefined;
        int8?: undefined;
        int24?: undefined;
        int32?: undefined;
        int40?: undefined;
        int48?: undefined;
        int56?: undefined;
        int64?: undefined;
        int72?: undefined;
        int80?: undefined;
        int88?: undefined;
        int96?: undefined;
        int104?: undefined;
        int112?: undefined;
        int120?: undefined;
        int128?: undefined;
        int136?: undefined;
        int144?: undefined;
        int152?: undefined;
        int160?: undefined;
        int168?: undefined;
        int176?: undefined;
        int184?: undefined;
        int192?: undefined;
        int200?: undefined;
        int208?: undefined;
        int216?: undefined;
        int224?: undefined;
        int232?: undefined;
        int240?: undefined;
        int248?: undefined;
        int256?: undefined;
        uint16?: undefined;
        uint24?: undefined;
        uint32?: undefined;
        uint40?: undefined;
        uint48?: undefined;
        uint56?: undefined;
        uint64?: undefined;
        uint72?: undefined;
        uint80?: undefined;
        uint88?: undefined;
        uint96?: undefined;
        uint104?: undefined;
        uint112?: undefined;
        uint120?: undefined;
        uint128?: undefined;
        uint136?: undefined;
        uint144?: undefined;
        uint152?: undefined;
        uint160?: undefined;
        uint168?: undefined;
        uint176?: undefined;
        uint184?: undefined;
        uint192?: undefined;
        uint200?: undefined;
        uint208?: undefined;
        uint216?: undefined;
        uint224?: undefined;
        uint232?: undefined;
        uint240?: undefined;
        uint248?: undefined;
    } | {
        [key: string]: unknown;
    }, TPrimaryType extends string>(args: import("viem").SignTypedDataParameters<TTypedData, TPrimaryType, import("viem").Account | undefined>) => Promise<`0x${string}`>;
    switchChain: (args: import("viem").SwitchChainParameters) => Promise<void>;
    watchAsset: (args: import("viem").WatchAssetParams) => Promise<boolean>;
    writeContract: <const abi_1 extends import("viem").Abi | readonly unknown[], functionName extends import("viem").ContractFunctionName<abi_1, "nonpayable" | "payable">, args extends import("viem").ContractFunctionArgs<abi_1, "nonpayable" | "payable", functionName>, TChainOverride_3 extends Chain | undefined = undefined>(args: import("viem").WriteContractParameters<abi_1, functionName, args, Chain | undefined, import("viem").Account | undefined, TChainOverride_3>) => Promise<`0x${string}`>;
    extend: <const client extends {
        [x: string]: unknown;
        account?: undefined;
        batch?: undefined;
        cacheTime?: undefined;
        ccipRead?: undefined;
        chain?: undefined;
        key?: undefined;
        name?: undefined;
        pollingInterval?: undefined;
        request?: undefined;
        transport?: undefined;
        type?: undefined;
        uid?: undefined;
    } & import("viem").ExactPartial<Pick<import("viem").PublicActions<import("viem").Transport, Chain | undefined, import("viem").Account | undefined>, "call" | "createContractEventFilter" | "createEventFilter" | "estimateContractGas" | "estimateGas" | "getBlock" | "getBlockNumber" | "getChainId" | "getContractEvents" | "getEnsText" | "getFilterChanges" | "getGasPrice" | "getLogs" | "getTransaction" | "getTransactionCount" | "getTransactionReceipt" | "prepareTransactionRequest" | "readContract" | "sendRawTransaction" | "simulateContract" | "uninstallFilter" | "watchBlockNumber" | "watchContractEvent"> & Pick<import("viem").WalletActions<Chain | undefined, import("viem").Account | undefined>, "sendTransaction" | "writeContract">>>(fn: (client: Client<import("viem").Transport, Chain | undefined, import("viem").Account | undefined, import("viem").WalletRpcSchema, import("viem").WalletActions<Chain | undefined, import("viem").Account | undefined>>) => client) => Client<import("viem").Transport, Chain | undefined, import("viem").Account | undefined, import("viem").WalletRpcSchema, { [K_1 in keyof client]: client[K_1]; } & import("viem").WalletActions<Chain | undefined, import("viem").Account | undefined>>;
};
//# sourceMappingURL=walletClient.d.ts.map