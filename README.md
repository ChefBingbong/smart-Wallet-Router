# Smart Wallet Router SDK

This SDK extends the PancakeSwap Universl and Swap routers for enbling users to execute batched transactions from an abstracted smart contract wallet contract. This enables users to make advanced trades on pancakeswap such as custom gas fee token trades.

The Smart Wallet Router is a contrct router that the user can manage. the relayer of the wallet factory executes users wallet contract calls through signature bsed verification. The wallet router also integrates with permit2 to enable users to execute trdes from there smart wallet through their EOA acccount by enbaling Signature based witness transfers with the witness being the smart wallet relaler private key. Combining all this together lets users make trades where they dont py gas in native currency, but rather they pay the gass fee in the equivilent amount of the base token in their trade and this fee gets sent to the smart wallet relayer, who in turns executes the trade on behalf of the user.

The smart wallet SDK also makes it possibles for users to pay transaction fees with currencies on other chains. in this scenario signtaures will be required, which maybe can be apprved, but.
