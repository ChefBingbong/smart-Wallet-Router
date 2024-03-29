//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.6;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "hardhat/console.sol";

contract SmartWalletV2 is UUPSUpgradeable, OwnableUpgradeable {
    event LogReceivedEther(address indexed _from, uint256 _amount);
    event LogCall(address indexed _contract, uint256 _value, bytes _data);

    receive() payable external {
        emit LogReceivedEther(_msgSender(), msg.value);
    }

    function __SmartWalletV2_init(address _owner) public initializer {
        __Ownable_init_unchained();
        __SmartWalletV2_init_unchained(_owner);
    }

    function __SmartWalletV2_init_unchained(address _owner) internal initializer {
        transferOwnership(_owner);
        if (address(this).balance > 0) {
            emit LogReceivedEther(_msgSender(), address(this).balance);
        }
    }

    function call(address _contract, bytes calldata _data) onlyOwner external {
        _call(_contract, 0, _data);
    }

    function callWithValue(address _contract, uint256 _value, bytes calldata _data) onlyOwner external {
        _call(_contract, _value, _data);
    }

    function multiCall(address[] calldata _contracts, bytes[] calldata _data) onlyOwner external {
      
        for (uint32 i = 0; i < _contracts.length; i++) {
            _call(_contracts[i], 0, _data[i]);
        }
    }

    function multiCallWithValues(address[] calldata _contracts, uint256[] calldata _values, bytes[] calldata _data) onlyOwner external {
        for (uint32 i = 0; i < _contracts.length; i++) {
            _call(_contracts[i], _values[i], _data[i]);
        }
    }

    function _call(address _contract, uint256 _value, bytes calldata _data) internal {
        (bool ok, bytes memory resp) = _contract.call{ value: _value }(_data);
        emit LogCall(_contract, _value, _data);
        require(ok, string(abi.encodePacked("SmartWalletV2: contract call failed ( ", string(resp),")")));
    }

    function _authorizeUpgrade(address) internal override onlyOwner {}
}
