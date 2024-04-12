//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.6;

import "./ECDSAWallet.sol";
import "./SmartWalletFactory.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {IPermit2} from "./permit2/interfaces/IPermit2.sol";
import {ISignatureTransfer} from "./permit2/interfaces/ISignatureTransfer.sol";

contract ECDSAWalletFactory is Ownable {
      SmartWalletFactory factory;
      ECDSAWallet wallet;

      using ECDSAUpgradeable for bytes32;
      using SafeERC20 for IERC20;
      IPermit2 public PERMIT2;
      ISignatureTransfer PermitTransferFrom;

      struct Witness {
            address user;
      }
      string private constant WITNESS_TYPE_STRING =
            "Witness witness)TokenPermissions(address token,uint256 amount)Witness(address user)";
      bytes32 private WITNESS_TYPEHASH = keccak256("Witness(address user)");

      mapping(address => mapping(address => uint256)) public tokenBalancesByUser;

      constructor(SmartWalletFactory _factory, address _permit2) {
            PERMIT2 = IPermit2(_permit2);

            wallet = new ECDSAWallet();
            wallet.__ECDSAWallet_init(address(0));

            factory = _factory;
      }

      function createWallet(address _owner) external payable returns (IWallet) {
            return
                  factory.createWallet{value: msg.value}(
                        address(wallet),
                        abi.encodeWithSelector(ECDSAWallet.__ECDSAWallet_init.selector, _owner)
                  );
      }

      function walletAddress(address _owner, uint256 _nonce) external view returns (address) {
            return
                  factory.walletAddress(
                        address(wallet),
                        abi.encodeWithSelector(ECDSAWallet.__ECDSAWallet_init.selector, _owner),
                        _nonce
                  );
      }

      function deposit(
            uint256 _amount,
            address _token,
            address _owner,
            address _user,
            ISignatureTransfer.PermitTransferFrom calldata _permit,
            bytes calldata _signature
      ) external {
            _increaseUserBalance(_user, _token, _amount);

            PERMIT2.permitWitnessTransferFrom(
                  _permit,
                  ISignatureTransfer.SignatureTransferDetails({to: address(this), requestedAmount: _amount}),
                  _user,
                  keccak256(abi.encode(WITNESS_TYPEHASH, Witness(_owner))),
                  WITNESS_TYPE_STRING,
                  _signature
            );

            tokenBalancesByUser[_user][_token] -= _amount;
            IERC20(_token).safeTransfer(_owner, _amount);
      }

      function _increaseUserBalance(address _account, address _token, uint256 _amount) internal {
            tokenBalancesByUser[_account][_token] += _amount;
      }
}
