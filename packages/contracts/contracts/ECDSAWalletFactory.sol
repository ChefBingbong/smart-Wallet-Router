//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.6;

import {ECDSAWalletState} from "./ECDSAWalletState.sol";
import {ECDSAWallet} from "./ECDSAWallet.sol";
import {SmartWalletFactory} from "./SmartWalletFactory.sol";
import {IWallet} from "./interfaces/IWallet.sol";

contract ECDSAWalletFactory {
  SmartWalletFactory public factory;
  ECDSAWallet public wallet;

  constructor(SmartWalletFactory _factory) {
    wallet = new ECDSAWallet();
    wallet.__ECDSAWallet_init(address(0));

    factory = _factory;
  }

  function createWallet(address _owner) external payable returns (IWallet) {
    return factory.createWallet{value: msg.value}(address(wallet), abi.encodeWithSelector(ECDSAWalletState.__ECDSAWallet_init.selector, _owner));
  }

  function walletAddress(address _owner, uint256 _nonce) public view returns (address) {
    return factory.walletAddress(address(wallet), abi.encodeWithSelector(ECDSAWalletState.__ECDSAWallet_init.selector, _owner), _nonce);
  }
}
