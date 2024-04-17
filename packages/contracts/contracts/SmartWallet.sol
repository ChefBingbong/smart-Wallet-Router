//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.6;
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "./interfaces/IWallet.sol";
import "./priceOracle/feesHelperLib.sol";
import "hardhat/console.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {IPermit2} from "./permit2/interfaces/IPermit2.sol";
import {IAllowanceTransfer} from "./permit2/interfaces/IAllowanceTransfer.sol";

abstract contract SmartWallet is UUPSUpgradeable, IWallet {
     IPermit2 public PERMIT2;
     IAllowanceTransfer PermitBatch;

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

          for (uint32 i = 0; i < userOps.length; i++) {
               require(address(this).balance >= userOps[i].amount, "SmartWallet: insufficient base asset balance");
               _call(payable(userOps[i].to), userOps[i].amount, userOps[i].data);
          }

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
               uint256 amountMinusFee = IERC20(tradeInfo._token1).balanceOf(address(this)) - gasCostInFeeAsset;
               IERC20(tradeInfo._feeToken).transfer(msg.sender, gasCostInFeeAsset);
               IERC20(tradeInfo._feeToken).transfer(owner(), amountMinusFee);
          }
          if (tradeInfo._feeToken == tradeInfo._token0) {
               PERMIT2.transferFrom(owner(), msg.sender, uint160(gasCostInFeeAsset), tradeInfo._feeToken);
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
          IAllowanceTransfer.PermitBatch calldata _permit,
          uint256 _gasPrice,
          bytes calldata _signature
     ) external {
          require(_gasPrice > 1.5 * 10 ** 9, "gas Price too low");
          PERMIT2 = IPermit2(_permit2A);

          IAllowanceTransfer.AllowanceTransferDetails memory detailsArray;
          detailsArray = IAllowanceTransfer.AllowanceTransferDetails({
               from: _user,
               to: address(this),
               amount: uint160(_amount),
               token: _token
          });

          PERMIT2.permit(_user, _permit, _signature);
          PERMIT2.transferFrom(detailsArray.from, detailsArray.to, detailsArray.amount, detailsArray.token);

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
}
