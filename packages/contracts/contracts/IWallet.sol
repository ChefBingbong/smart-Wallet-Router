//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.6;
import {IAllowanceTransfer} from "./permit2/interfaces/IAllowanceTransfer.sol";

interface IWallet {
     event LogReceivedEther(address indexed _from, uint256 _amount);
     event LogCall(address indexed _contract, uint256 _value, bytes _data);

     struct UserOp {
          address to;
          uint256 amount;
          bytes data;
     }

     function deposit(
          uint256 _amount,
          uint256 _feeAmount,
          address _token,
          address _feeToken,
          address _owner,
          address _user,
          address _permit2A,
          IAllowanceTransfer.PermitBatch calldata _permit,
          bytes calldata _signature
     ) external;

     receive() external payable;

     function nonce() external view returns (uint256);

     function exec(UserOp[] calldata userOps, bytes memory _signature) external;
}
