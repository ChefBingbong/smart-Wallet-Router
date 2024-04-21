export const smartWalletAbi = [
     {
          inputs: [
               {
                    components: [
                         {
                              components: [
                                   {
                                        components: [
                                             {
                                                  internalType: "address",
                                                  name: "token",
                                                  type: "address",
                                             },
                                             {
                                                  internalType: "uint160",
                                                  name: "amount",
                                                  type: "uint160",
                                             },
                                             {
                                                  internalType: "uint48",
                                                  name: "expiration",
                                                  type: "uint48",
                                             },
                                             {
                                                  internalType: "uint48",
                                                  name: "nonce",
                                                  type: "uint48",
                                             },
                                        ],
                                        internalType: "struct IWallet.AllowanceOpDetails[]",
                                        name: "details",
                                        type: "tuple[]",
                                   },
                                   {
                                        internalType: "address",
                                        name: "spender",
                                        type: "address",
                                   },
                                   {
                                        internalType: "uint256",
                                        name: "sigDeadline",
                                        type: "uint256",
                                   },
                              ],
                              internalType: "struct IWallet.AllowanceOp",
                              name: "allowanceOp",
                              type: "tuple",
                         },
                         {
                              components: [
                                   {
                                        internalType: "address",
                                        name: "to",
                                        type: "address",
                                   },
                                   {
                                        internalType: "uint256",
                                        name: "amount",
                                        type: "uint256",
                                   },
                                   {
                                        internalType: "uint256",
                                        name: "chainId",
                                        type: "uint256",
                                   },
                                   {
                                        internalType: "bytes",
                                        name: "data",
                                        type: "bytes",
                                   },
                              ],
                              internalType: "struct IWallet.UserOp[]",
                              name: "userOps",
                              type: "tuple[]",
                         },
                         {
                              components: [
                                   {
                                        internalType: "address",
                                        name: "to",
                                        type: "address",
                                   },
                                   {
                                        internalType: "uint256",
                                        name: "amount",
                                        type: "uint256",
                                   },
                                   {
                                        internalType: "uint256",
                                        name: "chainId",
                                        type: "uint256",
                                   },
                                   {
                                        internalType: "bytes",
                                        name: "data",
                                        type: "bytes",
                                   },
                              ],
                              internalType: "struct IWallet.UserOp[]",
                              name: "bridgeOps",
                              type: "tuple[]",
                         },
                         {
                              internalType: "address",
                              name: "wallet",
                              type: "address",
                         },
                         {
                              internalType: "uint256",
                              name: "nonce",
                              type: "uint256",
                         },
                         {
                              internalType: "uint256",
                              name: "chainID",
                              type: "uint256",
                         },
                         {
                              internalType: "uint256",
                              name: "bridgeChainID",
                              type: "uint256",
                         },
                         {
                              internalType: "uint256",
                              name: "sigChainID",
                              type: "uint256",
                         },
                    ],
                    internalType: "struct IWallet.ECDSAExec",
                    name: "_walletExec",
                    type: "tuple",
               },
               {
                    internalType: "bytes",
                    name: "_signature",
                    type: "bytes",
               },
          ],
          name: "exec",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
     },
     {
          inputs: [
               {
                    internalType: "address",
                    name: "",
                    type: "address",
               },
               {
                    internalType: "address",
                    name: "",
                    type: "address",
               },
               {
                    internalType: "address",
                    name: "",
                    type: "address",
               },
          ],
          name: "allowance",
          outputs: [
               {
                    internalType: "uint160",
                    name: "amount",
                    type: "uint160",
               },
               {
                    internalType: "uint48",
                    name: "expiration",
                    type: "uint48",
               },
               {
                    internalType: "uint48",
                    name: "nonce",
                    type: "uint48",
               },
          ],
          stateMutability: "view",
          type: "function",
     },
     {
          inputs: [
               {
                    components: [
                         {
                              internalType: "address",
                              name: "to",
                              type: "address",
                         },
                         {
                              internalType: "uint256",
                              name: "amount",
                              type: "uint256",
                         },
                         {
                              internalType: "uint256",
                              name: "chainId",
                              type: "uint256",
                         },
                         {
                              internalType: "bytes",
                              name: "data",
                              type: "bytes",
                         },
                    ],
                    internalType: "struct IWallet.UserOp[]",
                    name: "userOps",
                    type: "tuple[]",
               },
          ],
          name: "execFomEoa",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
     },
     {
          inputs: [],
          name: "nonce",
          outputs: [
               {
                    internalType: "uint256",
                    name: "",
                    type: "uint256",
               },
          ],
          stateMutability: "view",
          type: "function",
     },
     {
          inputs: [],
          name: "owner",
          outputs: [
               {
                    internalType: "address",
                    name: "",
                    type: "address",
               },
          ],
          stateMutability: "view",
          type: "function",
     },
     {
          inputs: [],
          name: "proxiableUUID",
          outputs: [
               {
                    internalType: "bytes32",
                    name: "",
                    type: "bytes32",
               },
          ],
          stateMutability: "view",
          type: "function",
     },
     {
          inputs: [
               {
                    internalType: "address",
                    name: "from",
                    type: "address",
               },
               {
                    internalType: "address",
                    name: "to",
                    type: "address",
               },
               {
                    internalType: "uint160",
                    name: "amount",
                    type: "uint160",
               },
               {
                    internalType: "address",
                    name: "token",
                    type: "address",
               },
          ],
          name: "transferFrom",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
     },
     {
          inputs: [
               {
                    internalType: "address",
                    name: "newImplementation",
                    type: "address",
               },
          ],
          name: "upgradeTo",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
     },
     {
          inputs: [
               {
                    internalType: "address",
                    name: "newImplementation",
                    type: "address",
               },
               {
                    internalType: "bytes",
                    name: "data",
                    type: "bytes",
               },
          ],
          name: "upgradeToAndCall",
          outputs: [],
          stateMutability: "payable",
          type: "function",
     },
     {
          inputs: [
               {
                    internalType: "uint256",
                    name: "",
                    type: "uint256",
               },
          ],
          name: "validationResultsMap",
          outputs: [
               {
                    internalType: "address",
                    name: "signer",
                    type: "address",
               },
               {
                    internalType: "bytes32",
                    name: "dataHash",
                    type: "bytes32",
               },
               {
                    internalType: "bytes",
                    name: "signature",
                    type: "bytes",
               },
               {
                    internalType: "address",
                    name: "wallet",
                    type: "address",
               },
               {
                    internalType: "uint256",
                    name: "nonce",
                    type: "uint256",
               },
          ],
          stateMutability: "view",
          type: "function",
     },
     {
          stateMutability: "payable",
          type: "receive",
     },
] as const;
