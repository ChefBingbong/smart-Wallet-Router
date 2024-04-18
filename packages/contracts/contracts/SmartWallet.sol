//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.6;
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "./interfaces/IWallet.sol";
import "./priceOracle/feesHelperLib.sol";
import "hardhat/console.sol";

import {ERC20} from "solmate/src/tokens/ERC20.sol";
import {SafeTransferLib} from "solmate/src/utils/SafeTransferLib.sol";
import {Allowance} from "./libraries/WalletAllowance.sol";
import {Permit2Lib} from "./libraries/WalletPermitHelper.sol";

abstract contract SmartWallet is UUPSUpgradeable, IWallet {
     using SafeTransferLib for ERC20;
     using Allowance for PackedAllowance;

     mapping(address => mapping(address => mapping(address => PackedAllowance))) public allowance;

     receive() external payable {
          emit LogReceivedEther(msg.sender, msg.value);
     }

     function __SmartWallet_init() public initializer {
          __SmartWallet_init_unchained();
     }

     function __SmartWallet_init_unchained() internal onlyInitializing {
          if (address(this).balance > 0) {
               emit LogReceivedEther(msg.sender, address(this).balance);
          }
     }

     function _verify(
          UserOp[] memory userOps,
          AllowanceOp memory allowanceOp,
          bytes memory _signature
     ) internal view virtual;

     function _incrementNonce() internal virtual;

     function nonce() public view virtual returns (uint256);

     function owner() public view virtual returns (address);

     function exec(
          UserOp[] calldata userOps,
          AllowanceOp calldata allowanceOp,
          bytes calldata _signature,
          address weth,
          address v2pancakeFactory,
          address v3pancakeFactory
     ) external {
          uint256 gasStart = gasleft();
          _verifyWalletExec(userOps, allowanceOp, _signature);
          _incrementNonce();

          for (uint32 i = 0; i < userOps.length; i++) {
               require(address(this).balance >= userOps[i].amount, "SmartWallet: insufficient base asset balance");
               _call(payable(userOps[i].to), userOps[i].amount, userOps[i].data);
          }

          if (block.chainid == 31337) return;
          address feeToken = allowanceOp.details[1].token;
          uint256 gasCostInNative = (250000 + gasStart - gasleft()) * 5 * 10 ** 9;
          uint256 gasCostInFeeAsset = PriceHelper.quoteGasPriceInFeeAsset(
               weth,
               feeToken,
               v2pancakeFactory,
               v3pancakeFactory,
               uint128(gasCostInNative)
          );

          _transfer(owner(), msg.sender, uint160(gasCostInFeeAsset), feeToken);
     }

     function execFomEoa(UserOp[] calldata userOps) external {
          require(msg.sender == owner(), "external exec can only be called by wallet owner");

          for (uint32 i = 0; i < userOps.length; i++) {
               require(address(this).balance >= userOps[i].amount, "SmartWallet: insufficient base asset balance");
               _call(payable(userOps[i].to), userOps[i].amount, userOps[i].data);
          }
     }

     function _call(address payable _contract, uint256 _value, bytes calldata _data) internal {
          (bool ok, bytes memory resp) = _contract.call{value: _value}(_data);

          emit LogCall(_contract, _value, _data);
          if (!ok) {
               assembly {
                    revert(add(resp, 32), mload(resp))
               }
          }
     }

     function _authorizeUpgrade(address) internal view override {
          require(msg.sender == address(this));
     }

     function approve(address token, address spender, uint160 amount, uint48 expiration) external {
          PackedAllowance storage allowed = allowance[msg.sender][token][spender];
          allowed.updateAmountAndExpiration(amount, expiration);
          emit Approval(msg.sender, token, spender, amount, expiration);
     }

     function _verifyWalletExec(
          UserOp[] memory userOps,
          AllowanceOp memory allowanceOp,
          bytes calldata signature
     ) internal {
          _verify(userOps, allowanceOp, signature);

          address spender = allowanceOp.spender;
          unchecked {
               uint256 length = allowanceOp.details.length;
               for (uint256 i = 0; i < length; ++i) {
                    if (allowanceOp.spender != address(0)) {
                         require(block.timestamp < allowanceOp.sigDeadline, "permit signature has expired");

                         uint48 nonce = allowanceOp.details[i].nonce;
                         address token = allowanceOp.details[i].token;
                         uint160 amount = allowanceOp.details[i].amount;
                         uint48 expiration = allowanceOp.details[i].expiration;

                         PackedAllowance storage allowed = allowance[owner()][token][allowanceOp.spender];

                         if (allowed.nonce != nonce) revert("nonve for allowance op is invalid");

                         allowed.updateAll(amount, expiration, nonce);
                         emit Permit(owner(), token, allowanceOp.spender, amount, expiration, nonce);
                    }
               }
          }
     }

     function transferFrom(address from, address to, uint160 amount, address token) external {
          _transfer(from, to, amount, token);
     }

     function _transfer(address from, address to, uint160 amount, address token) private {
          PackedAllowance storage allowed = allowance[from][token][msg.sender];

          if (block.timestamp > allowed.expiration) revert("transfer allowance has expired");

          uint256 maxAmount = allowed.amount;
          if (maxAmount != type(uint160).max) {
               if (amount > maxAmount) {
                    revert("failed to transfer, insufficient allowance");
               } else {
                    unchecked {
                         allowed.amount = uint160(maxAmount) - amount;
                    }
               }
          }
          ERC20(token).safeTransferFrom(from, to, amount);
     }
}
