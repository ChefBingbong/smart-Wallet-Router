//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.6;

import "./SmartWallet.sol";
import "@openzeppelin/contracts-upgradeable/utils/cryptography/ECDSAUpgradeable.sol";
import "hardhat/console.sol";
import {IERC1271} from "./interfaces/IERC1271.sol";
import {ERC20} from "solmate/src/tokens/ERC20.sol";
import {SafeTransferLib} from "solmate/src/utils/SafeTransferLib.sol";
import {Allowance} from "./libraries/WalletAllowance.sol";
import {Permit2Lib} from "./libraries/WalletPermitHelper.sol";

// ECDSA ERC1967 implementation contract for the Base samrt wallet Spec. this contract
// handles the EIP712 Data signtures and verification. aswell as adding extra custom Permit2
// funtionality to enable direct tranerring of assets from owners EOA to their smart wallet
// in one signature. This is idea for swap transactions. This impl also requires user pys
//rhe reylayer back the gas cost for exec execution. this functionality is implemented
// in the optional _walletExecCallback() func
contract ECDSAWallet is SmartWallet {
     using SafeTransferLib for ERC20;
     using Allowance for PackedAllowance;

     mapping(address => mapping(address => mapping(address => PackedAllowance))) public allowance;

     address public constant PancakeV2Factory = 0x6725F303b657a9451d8BA641348b6761A6CC7a17;
     address public constant PancakeV3Factory = 0x0BFbCF9fa4f9C56B0F40a671Ad40E0805A091865;

     using ECDSAUpgradeable for bytes32;

     struct ECDSAWalletState {
          address owner;
          uint96 nonce;
     }

     function __ECDSAWallet_init(address _owner) public initializer {
          __SmartWallet_init_unchained();
          __ECDSAWallet_init_unchained(_owner);
     }

     function __ECDSAWallet_init_unchained(address _owner) internal onlyInitializing {
          state().owner = _owner;
     }

     function domainSeperator(uint256 _chainID) public view returns (bytes32) {
          return keccak256(abi.encode(TYPE_HASH, HASHED_NAME, HASHED_VERSION, _chainID, address(this)));
     }

     function state() internal pure returns (ECDSAWalletState storage s) {
          bytes32 position = ECDSA_WALLET_STORAGE_POSITION;
          assembly {
               s.slot := position
          }
     }

     bytes32 constant UPPER_BIT_MASK = (0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff);
     bytes32 private constant ECDSA_WALLET_STORAGE_POSITION = keccak256("wallet.ecdsa.v1");
     bytes32 private constant HASHED_NAME = keccak256(bytes("ECDSAWallet"));
     bytes32 private constant HASHED_VERSION = keccak256(bytes("0.0.1"));

     bytes32 private constant TYPE_HASH =
          keccak256("EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)");

     bytes32 private constant UserOp_TYPE_HASH = keccak256("UserOp(address to,uint256 amount,bytes data)");

     bytes32 public constant AllowanceOpDetails_TYPE_HASH =
          keccak256("AllowanceOpDetails(address token,uint160 amount,uint48 expiration,uint48 nonce)");

     bytes32 public constant AllowanceOpBatch_TYPE_HASH =
          keccak256(
               "AllowanceOp(AllowanceOpDetails[] details,address spender,uint256 sigDeadline)AllowanceOpDetails(address token,uint160 amount,uint48 expiration,uint48 nonce)"
          );
     bytes32 private constant _TYPEHASH =
          keccak256(
               "ECDSAExec(AllowanceOp allowanceOp,UserOp[] userOps,uint256 nonce,uint256 chainID,uint256 sigChainID)AllowanceOp(AllowanceOpDetails[] details,address spender,uint256 sigDeadline)AllowanceOpDetails(address token,uint160 amount,uint48 expiration,uint48 nonce)UserOp(address to,uint256 amount,bytes data)"
          );

     // implemenation of base SW  spec
     function owner() public view virtual override returns (address) {
          return state().owner;
     }

     function nonce() public view virtual override returns (uint256) {
          return state().nonce;
     }

     function _incrementNonce() internal override {
          state().nonce++;
     }

     function _hashAllowanceDetails(AllowanceOpDetails memory details) private pure returns (bytes32) {
          return keccak256(abi.encode(AllowanceOpDetails_TYPE_HASH, details));
     }

     function _walletExecCallback(uint256 execGasUse, AllowanceOp memory allowanceOp, address weth) internal override {
          console.log(execGasUse, "exec gas");
          if (block.chainid == 31337) return;
          address feeToken = allowanceOp.details[1].token;
          uint256 gasCostInNative = (250000 + execGasUse - gasleft()) * 5 * 10 ** 9;
          uint256 gasCostInFeeAsset = PriceHelper.quoteGasPriceInFeeAsset(
               weth,
               feeToken,
               PancakeV2Factory,
               PancakeV3Factory,
               uint128(gasCostInNative)
          );

          _transfer(owner(), msg.sender, uint160(gasCostInFeeAsset), feeToken);
     }

     function _verify(
          UserOp[] memory _userOps,
          AllowanceOp memory allowanceOp,
          bytes memory _signature
     ) internal override {
          (uint256 _sigChainID, bytes memory _sig) = abi.decode(_signature, (uint256, bytes));
          bytes32 dataHash = domainSeperator(_sigChainID).toTypedDataHash(
               keccak256(
                    abi.encode(
                         _TYPEHASH,
                         hashAllownceOp(allowanceOp),
                         hashUserOps(_userOps),
                         nonce(),
                         block.chainid,
                         _sigChainID
                    )
               )
          );
          _verifySigner(_sig, dataHash, state().owner);
          _permitWalletForOwner(allowanceOp);
     }

     // extra custom functionality for this contract impl
     function hashUserOps(UserOp[] memory _userOps) internal pure returns (bytes32) {
          bytes32[] memory opHashes = new bytes32[](_userOps.length);
          for (uint i = 0; i < _userOps.length; i++) {
               opHashes[i] = keccak256(
                    abi.encode(UserOp_TYPE_HASH, _userOps[i].to, _userOps[i].amount, keccak256(_userOps[i].data))
               );
          }
          return keccak256(abi.encodePacked(opHashes));
     }

     function hashAllownceOp(AllowanceOp memory allowanceOps) internal pure returns (bytes32) {
          uint256 numPermits = allowanceOps.details.length;
          bytes32[] memory allowanceHashes = new bytes32[](numPermits);
          for (uint256 i = 0; i < numPermits; ++i) {
               allowanceHashes[i] = _hashAllowanceDetails(allowanceOps.details[i]);
          }
          return
               keccak256(
                    abi.encode(
                         AllowanceOpBatch_TYPE_HASH,
                         keccak256(abi.encodePacked(allowanceHashes)),
                         allowanceOps.spender,
                         allowanceOps.sigDeadline
                    )
               );
     }

     function _verifySigner(bytes memory signature, bytes32 hash, address claimedSigner) internal view {
          bytes32 r;
          bytes32 s;
          uint8 v;

          if (claimedSigner.code.length == 0) {
               if (signature.length == 65) {
                    (r, s) = abi.decode(signature, (bytes32, bytes32));
                    v = uint8(signature[64]);
               } else if (signature.length == 64) {
                    // EIP-2098
                    bytes32 vs;
                    (r, vs) = abi.decode(signature, (bytes32, bytes32));
                    s = vs & UPPER_BIT_MASK;
                    v = uint8(uint256(vs >> 255)) + 27;
               } else {
                    revert("Signature length is Invalid");
               }
               address signer = ecrecover(hash, v, r, s);

               if (signer == address(0)) revert("Invalid Signature");
               if (signer != claimedSigner) revert("Signer is not Smart Wallet Owner");
          } else {
               bytes4 magicValue = IERC1271(claimedSigner).isValidSignature(hash, signature);

               if (magicValue != IERC1271.isValidSignature.selector) revert("Signer is not a valid contract signer");
          }
     }

     function approve(address token, address spender, uint160 amount, uint48 expiration) external {
          require(msg.sender == owner(), "only wallet owner can grant allowances");

          PackedAllowance storage allowed = allowance[msg.sender][token][spender];
          allowed.updateAmountAndExpiration(amount, expiration);
          emit Approval(msg.sender, token, spender, amount, expiration);
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

     function _permitWalletForOwner(AllowanceOp memory allowanceOp) private {
          address _spender = allowanceOp.spender;
          unchecked {
               uint256 length = allowanceOp.details.length;
               for (uint256 i = 0; i < length; ++i) {
                    if (allowanceOp.spender != address(0)) {
                         require(block.timestamp < allowanceOp.sigDeadline, "permit signature has expired");

                         uint48 _nonce = allowanceOp.details[i].nonce;
                         address token = allowanceOp.details[i].token;
                         uint160 amount = allowanceOp.details[i].amount;
                         uint48 expiration = allowanceOp.details[i].expiration;

                         PackedAllowance storage allowed = allowance[owner()][token][_spender];

                         if (allowed.nonce != _nonce) revert("nonve for allowance op is invalid");

                         allowed.updateAll(amount, expiration, _nonce);
                         emit Permit(owner(), token, _spender, amount, expiration, _nonce);
                    }
               }
          }
     }
}
