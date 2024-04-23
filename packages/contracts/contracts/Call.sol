pragma solidity ^0.8.0;
import "hardhat/console.sol";

contract CALLER {
  struct IPTransfer {
    address from;
    address to;
    uint160 amount;
    address token;
  }
  struct IPAllowance {
    address spender;
    uint256 amount;
  }
  struct IPSwap {
    uint256 amount;
    address reciever;
  }

  function executeTransfer(bytes calldata msgData) public pure returns (IPTransfer memory) {
    (address from, address to, uint160 amount, address token) = abi.decode(msgData[4:], (address, address, uint160, address));
    return IPTransfer(from, to, amount, token);
  }

  function executeTransfer2(bytes calldata msgData) public pure returns (address from, address to, uint160 amount, address token) {
    return abi.decode(msgData[4:], (address, address, uint160, address));
  }

  function executeSwap(bytes calldata msgData) public pure returns (IPSwap memory) {
    (uint256 amount, address reciever) = abi.decode(msgData[4:], (uint256, address));
    return IPSwap(amount, reciever);
  }

  function executeApprove(bytes calldata msgData) public pure returns (IPAllowance memory) {
    (address spender, uint256 amount) = abi.decode(msgData[4:], (address, uint256));
    return IPAllowance(spender, amount);
  }
}
