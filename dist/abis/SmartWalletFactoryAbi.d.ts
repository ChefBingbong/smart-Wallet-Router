export declare const smartWalletFactoryAbi: readonly [{
    readonly inputs: readonly [{
        readonly internalType: "contract SmartWalletFactory";
        readonly name: "_factory";
        readonly type: "address";
    }];
    readonly stateMutability: "nonpayable";
    readonly type: "constructor";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "_owner";
        readonly type: "address";
    }];
    readonly name: "createWallet";
    readonly outputs: readonly [{
        readonly internalType: "contract IWallet";
        readonly name: "";
        readonly type: "address";
    }];
    readonly stateMutability: "payable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "_owner";
        readonly type: "address";
    }, {
        readonly internalType: "uint256";
        readonly name: "_nonce";
        readonly type: "uint256";
    }];
    readonly name: "walletAddress";
    readonly outputs: readonly [{
        readonly internalType: "address";
        readonly name: "";
        readonly type: "address";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}];
//# sourceMappingURL=SmartWalletFactoryAbi.d.ts.map