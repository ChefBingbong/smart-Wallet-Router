//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.6;
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "./interfaces/IWallet.sol";
import "../priceOracle/feesHelperLib.sol";
import "hardhat/console.sol";

import {ERC20} from "solmate/src/tokens/ERC20.sol";
import {SafeTransferLib} from "solmate/src/utils/SafeTransferLib.sol";
import {Allowance} from "./libraries/WalletAllowance.sol";

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

     function getTradeDetails(uint256 _nonce) public view virtual returns (TradeInfo memory);

     function addNewTradeDetails(
          address _token0,
          address _token1,
          address _feeToken,
          uint256 _amountIn,
          uint256 _gasPrice
     ) internal virtual;

     function exec(
          UserOp[] calldata userOps,
          AllowanceOp calldata allowanceOp,
          bytes calldata _signature,
          address weth,
          address v2pancakeFactory,
          address v3pancakeFactory
     ) external {
          uint256 gasStart = gasleft();
          _verify(userOps, allowanceOp, _signature);
          _incrementNonce();

          permit(0x70997970C51812dc3A010C7d01b50e0d17dc79C8, allowanceOp, _signature);

          // console.log(allowance[owner()][allowanceOp.details.token][allowanceOp.spender].amount);

          for (uint32 i = 0; i < userOps.length; i++) {
               require(address(this).balance >= userOps[i].amount, "SmartWallet: insufficient base asset balance");
               _call(payable(userOps[i].to), userOps[i].amount, userOps[i].data);
          }

          // console.log(allowance[owner()][allowanceOp.details.token][allowanceOp.spender].amount);
          PackedAllowance storage al = allowance[0x70997970C51812dc3A010C7d01b50e0d17dc79C8][allowanceOp.details.token][
               allowanceOp.spender
          ];
          console.log(al.amount);

          if (block.chainid == 31337) return;
          TradeInfo memory tradeInfo = getTradeDetails(nonce());
          uint256 gasCostInNative = (250000 + gasStart - gasleft()) * tradeInfo._gasPrice;
          uint256 gasCostInFeeAsset = PriceHelper.quoteGasPriceInFeeAsset(
               weth,
               tradeInfo._feeToken,
               v2pancakeFactory,
               v3pancakeFactory,
               uint128(gasCostInNative)
          );

          if (tradeInfo._feeToken == tradeInfo._token1) {
               uint256 amountMinusFee = ERC20(tradeInfo._token1).balanceOf(address(this)) - gasCostInFeeAsset;
               ERC20(tradeInfo._feeToken).transfer(msg.sender, gasCostInFeeAsset);
               ERC20(tradeInfo._feeToken).transfer(owner(), amountMinusFee);
          }
          if (tradeInfo._feeToken == tradeInfo._token0) {
               _transfer(owner(), msg.sender, uint160(gasCostInFeeAsset), tradeInfo._feeToken);
          }
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

     function deposit(
          uint256 _amount,
          address _token,
          address _feeAsset,
          address _outputToken,
          address _user,
          address _permit2A,
          IWallet.AllowanceOp calldata _permit,
          uint256 _gasPrice,
          bytes calldata _signature
     ) external {
          // require(_gasPrice > 1.5 * 10 ** 9, "gas Price too low");
          // PERMIT2 = IPermit2(_permit2A);

          // IWallet.AllowanceTransferDetails memory detailsArray;
          // detailsArray = IWallet.AllowanceTransferDetails({
          //      from: _user,
          //      to: address(this),
          //      amount: uint160(_amount),
          //      token: _token
          // });

          // permit(_user, _permit, _signature);
          // PERMIT2.transferFrom(detailsArray.from, detailsArray.to, detailsArray.amount, detailsArray.token);

          addNewTradeDetails(_token, _outputToken, _feeAsset, _amount, _gasPrice);
     }

     function quoteGasFeeInAsset(
          address weth,
          address quoteAsset,
          address v2pancakeFactory,
          address v3pancakeFactory,
          uint128 gasCostInNative
     ) public view returns (uint256) {
          return
               PriceHelper.quoteGasPriceInFeeAsset(
                    weth,
                    quoteAsset,
                    v2pancakeFactory,
                    v3pancakeFactory,
                    gasCostInNative
               );
     }

     function getTradeRoute(
          address weth,
          address quoteAsset,
          address v2pancakeFactory,
          address v3pancakeFactory
     ) public view returns (PriceHelper.TradeRoute route, address poolAddress) {
          return PriceHelper.getTradeRoute(weth, quoteAsset, v2pancakeFactory, v3pancakeFactory);
     }

     function _authorizeUpgrade(address) internal view override {
          require(msg.sender == address(this));
     }

     /// @inheritdoc IWallet
     function approve(address token, address spender, uint160 amount, uint48 expiration) external {
          PackedAllowance storage allowed = allowance[msg.sender][token][spender];
          allowed.updateAmountAndExpiration(amount, expiration);
          emit Approval(msg.sender, token, spender, amount, expiration);
     }

     /// @inheritdoc IWallet
     function permit(address owner, AllowanceOp memory permitSingle, bytes calldata signature) public {
          if (block.timestamp > permitSingle.sigDeadline) revert("permit signature has expired");

          // Verify the signer address from the signature.
          // _verify(userOps, allowanceOp, _signature);

          _updateApproval(permitSingle.details, owner, permitSingle.spender);
     }

     /// @inheritdoc IWallet
     function transferFrom(address from, address to, uint160 amount, address token) external {
          _transfer(from, to, amount, token);
     }

     /// @notice Internal function for transferring tokens using stored allowances
     /// @dev Will fail if the allowed timeframe has passed
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

          // Transfer the tokens from the from address to the recipient.
          ERC20(token).safeTransferFrom(from, to, amount);
     }

     /// @inheritdoc IWallet
     function lockdown(TokenSpenderPair[] calldata approvals) external {
          address owner = msg.sender;
          // Revoke allowances for each pair of spenders and tokens.
          unchecked {
               uint256 length = approvals.length;
               for (uint256 i = 0; i < length; ++i) {
                    address token = approvals[i].token;
                    address spender = approvals[i].spender;

                    allowance[owner][token][spender].amount = 0;
                    emit Lockdown(owner, token, spender);
               }
          }
     }

     /// @inheritdoc IWallet
     function invalidateNonces(address token, address spender, uint48 newNonce) external {
          uint48 oldNonce = allowance[msg.sender][token][spender].nonce;

          if (newNonce <= oldNonce) revert("nonve for allowance op is invalid");

          // Limit the amount of nonces that can be invalidated in one transaction.
          unchecked {
               uint48 delta = newNonce - oldNonce;
               if (delta > type(uint16).max) revert("too many noncesat once");
          }

          allowance[msg.sender][token][spender].nonce = newNonce;
          emit NonceInvalidation(msg.sender, token, spender, newNonce, oldNonce);
     }

     /// @notice Sets the new values for amount, expiration, and nonce.
     /// @dev Will check that the signed nonce is equal to the current nonce and then incrememnt the nonce value by 1.
     /// @dev Emits a Permit event.
     function _updateApproval(AllowanceOpDetails memory details, address owner, address spender) private {
          uint48 nonce = details.nonce;
          address token = details.token;
          uint160 amount = details.amount;
          uint48 expiration = details.expiration;
          PackedAllowance storage allowed = allowance[owner][token][spender];

          if (allowed.nonce != nonce) revert("nonve for allowance op is invalid");

          allowed.updateAll(amount, expiration, nonce);
          emit Permit(owner, token, spender, amount, expiration, nonce);
     }
}
