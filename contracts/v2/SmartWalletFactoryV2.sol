//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.6;

import "@openzeppelin/contracts/proxy/ERC1967/ERC1967Proxy.sol";
import { SmartWalletV2 } from "./SmartWalletV2.sol";

contract SmartWalletFactoryV2 {
    mapping (address=>uint256) nonces;
    address walletImplementation;

    constructor (address _walletImplementation) {
        walletImplementation = _walletImplementation;
    }

    event WalletCreated(address indexed _wallet, address indexed _owner, uint256 _nonce);
    function createWallet(address _owner) external returns (SmartWalletV2) {
        ERC1967Proxy wallet_ = new ERC1967Proxy{salt: keccak256(abi.encode(_owner, nonces[_owner]))}(
            walletImplementation, 
            abi.encodeWithSelector(SmartWalletV2.__SmartWalletV2_init.selector, _owner)
        );
        emit WalletCreated(address(wallet_), _owner, nonces[_owner]);
        nonces[_owner]++;
        return SmartWalletV2(payable(wallet_));
    }

    function wallet(address _owner, uint256 _nonce) public view returns (address) {
        return address(uint160(uint(keccak256(
                abi.encodePacked(
                    bytes1(0xff), 
                    address(this), 
                    keccak256(abi.encode(_owner, _nonce)), 
                    keccak256(abi.encodePacked(
                            type(ERC1967Proxy).creationCode,
                            abi.encode(
                                walletImplementation, 
                                abi.encodeWithSelector(SmartWalletV2.__SmartWalletV2_init.selector, _owner)
                            ))
                ))))));
    }
}