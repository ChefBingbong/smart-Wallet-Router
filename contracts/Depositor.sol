// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts-upgradeable/metatx/ERC2771ContextUpgradeable.sol";
import "hardhat/console.sol";
import "@openzeppelin/contracts/metatx/MinimalForwarder.sol";
import "@openzeppelin/contracts/metatx/ERC2771Context.sol";


contract Depositor is ERC2771Context {
  address owner;
  mapping(address => mapping(address => uint256)) public accountBalances;

  constructor(MinimalForwarder forwarder)
    ERC2771Context(address(forwarder)) {
  }

  function depositTokens(uint256 amount, address recipient, address symbol) external {
    accountBalances[recipient][symbol] += amount;
    uint256 allowance = ERC20(symbol).allowance(_msgSender(), address(this));
    ERC20(symbol).approve(address(this), amount);
    // console.log("allowance", _msgSender(), _msgSender());
    ERC20(symbol).transferFrom(recipient, address(this), amount);
  }

    function depositTokensToForwarder(uint256 amount, address tokenAddress, address recipient, address forwarder) external {
    // accountBalances[_msgSender()][symbol] += amount;
    console.log('deoo', recipient, address(this));
      ERC20(tokenAddress).transferFrom(recipient, address(this), amount);
      // ERC20(tokenAddress).transfer(forwarder, amount);
  }

  function withdrawTokens(uint256 amount, address recipient, address from, address symbol) external {
    require(accountBalances[from][symbol] >= amount, 'Insufficent funds');

    accountBalances[recipient][symbol] -= amount;
    ERC20(symbol).transfer(recipient, amount);
  }

  function getMsgSenders() public view returns (address[2] memory) {
      address[2] memory msgSenders = [_msgSender(), msg.sender];
      return msgSenders;
  }

    function _msgSender()
        internal
        view
        override(ERC2771Context)
        returns (address)
    {
        return ERC2771Context._msgSender();
    }
}