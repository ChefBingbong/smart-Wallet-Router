# Smart Wallet Router SDK

This SDK extends the PancakeSwap Universl and Swap routers for enbling users to execute batched transactions from an abstracted smart contract wallet contract. This enables users to make advanced trades on pancakeswap such as custom gas fee token trades.

### Batched transactions
The Smart Wallet is a smart contract router that the user can manage. the relayer of the wallet factory executes the users contract calls through signature bsed verification. 

### Witness transfers with Permit2
The smart wallet contract also integrates with permit2 to enable users to execute trades from their smart wallet through as if they were calling from their main E0A account. this means that u dont need to deposit tokens into your smart wallet and then trade from there.

Instead you execute the trade from you main EOA account and a transaction gets added into the batch which uses permit2 to do a transferFrom call from you E0A account to your smart wallet instance, before executing the rest of the trade

### Ecexute trades with custom gas token from any chain
This is possible by enbaling and implementing Signature based witness transfers with the witness being the smart wallet relaler private key. Combining all this together,  users can make trades where they dont pay gas in native currency, but rather they pay the gass fee in the equivilent amount of the base token in their trade and this fee gets sent to the smart wallet relayer, who in turns executes the trade on behalf of the user.

The smart wallet SDK also makes it possibles for users to pay transaction fees with currencies on other chains. in this scenario signtaures will be required, which maybe can be apprved

# Bridge And CrossChain Trade
In this context the relayer is designed to be a Protocol admin. For example if this SW were implemented to the Pancake protocol the relayer would be perhaps a private key owner with access to a lof of liquidity. Since the relayer executes our wallet ops. we can initiate logic for cross chain swaps that go through the relayers wallet on both chains. for example a swap of CAKE on bsc to USDT on ethereum would look like this. The user construct their trade and signs the messaage. Note that a wallet Exec Op has two operation types. userOps and bridgeOps. userOps are same chain transactions, where as bridgeOps are transactions created a signed on one chain, but meant for execution on another.

This is possible through domin seperator. the domain seperator is purposed to keep identical cntracts deployed on chains and perhaps at the same addresses speraate. So we can build into out EIP7612 signature the chainId we sign on and the chainId we want to operation to execute on. to do this we sign the initial data `eth_signTypedData` and encode a sigchainId on top of this.
```ts
 const signature = await account._signTypedData(domain, types, values);
  const sig = defaultAbiCoder.encode(
    ["uint256", "bytes"],
    [sigChainId, signature],
  );
```
this way when we go to verify our message in the execution function we can assert or require that the sigChains domain is used for the recovery instead of the current chains domain
```
bytes32 dataHash = domainSeperator(_decodedSigChainID).toTypedDataHash(_walletExec.hash());
```
this is why we encode the sigchain into the initial signatute, because it allows us to validate the user knows and is cifming to use whatever specified sig chain, passing a sig chain any other way would may be prons to spoofing. 

So when the usewr execs their op, userOps will execute frst on same chain. and after they execute, the usxers smart wallret will send a encoded call with the details of the inital wallet signed data aswell as their signature. then the neutral and seperate bridge verifier will run a designated protocol, designed to be ale to do operations on the data without the need for any input data to arrive at a solution, and it will make sure that they can recover both the same signature and same WalletExec typed data strict that was sent in. once is done the last thing to verify is that the stte on the users smart wallet is what it shoild be as derived from the wallet ops. so for our trade example. user shoukd have send swapped CAKE to USDT and sent that USDT tge the relayers ETH wallet. when these balances are verified, 

the bridge verifier encode the result of their verfication asdwell thei address together with the original data and sig and a will call a function on the relyers smart wallet setting this data in a mapping. Lastly when the usersOps finish on chain one, the relayer will proceed to query the balance to make it checks out and then will call that function to ccess the verified data. they will decode the result to access the bridger result and address and verofy that they data was sent by the brdgeverifier and if the result is positive the relayer will execute the users bridgeOps on chain 2 where they will swap eth USDT to CAKE and sendf this to the user.

tHE KEY THING here is USDT is the middle asset all bridges or cross chain trades will go through USDF, so that we can always have liqucity as its nmorte common to hold usdt that some nice altcoin
