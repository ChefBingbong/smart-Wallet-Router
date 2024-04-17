// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

library ContractAddresses {
     address public constant WETH_ETH = 0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c; // WETH on Binance Smart Chain
     address public constant PANCAKE_V3_FACTORY_ETH = 0x0BFbCF9fa4f9C56B0F40a671Ad40E0805A091865; // USDT on Binance Smart Chain

     address public constant WETH_BSC = 0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c; // WETH on Binance Smart Chain
     address public constant PANCAKE_V3_FACTORY_BSC = 0x0BFbCF9fa4f9C56B0F40a671Ad40E0805A091865; // USDT on Binance Smart Chain

     function getContractAddresses(uint256 chainId) internal pure returns (address[2] memory) {
          address[2] memory addresses;

          if (chainId == 1) {
               // Ethereum Mainnet
               addresses[0] = WETH_ETH; // WETH
               addresses[1] = PANCAKE_V3_FACTORY_ETH; // USDT
          } else if (chainId == 97) {
               // Binance Smart Chain Mainnet
               addresses[0] = WETH_BSC; // WETH
               addresses[1] = PANCAKE_V3_FACTORY_BSC; // USDT
          } else {
               revert("Chain ID not supported");
          }

          return addresses;
     }
}
