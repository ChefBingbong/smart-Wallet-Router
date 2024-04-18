//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.6;
// pragma experimental ABIEncoderV2;

import "./SmartWallet.sol";
import "@openzeppelin/contracts-upgradeable/utils/cryptography/ECDSAUpgradeable.sol";
import "hardhat/console.sol";
import {IERC1271} from "./interfaces/IERC1271.sol";

contract ECDSAWallet is SmartWallet {
     using ECDSAUpgradeable for bytes32;

     struct ECDSAWalletState {
          address owner;
          uint96 nonce;
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

     function domainSeperator(uint256 _chainID) public view returns (bytes32) {
          return keccak256(abi.encode(TYPE_HASH, HASHED_NAME, HASHED_VERSION, _chainID, address(this)));
     }

     function __ECDSAWallet_init(address _owner) public initializer {
          __SmartWallet_init_unchained();
          __ECDSAWallet_init_unchained(_owner);
     }

     function __ECDSAWallet_init_unchained(address _owner) internal onlyInitializing {
          state().owner = _owner;
     }

     function state() internal pure returns (ECDSAWalletState storage s) {
          bytes32 position = ECDSA_WALLET_STORAGE_POSITION;
          assembly {
               s.slot := position
          }
     }

     function owner() public view virtual override returns (address) {
          return state().owner;
     }

     function nonce() public view virtual override returns (uint256) {
          return state().nonce;
     }

     function _incrementNonce() internal override {
          state().nonce++;
     }

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

     function _hashAllowanceDetails(AllowanceOpDetails memory details) private pure returns (bytes32) {
          return keccak256(abi.encode(AllowanceOpDetails_TYPE_HASH, details));
     }

     function _verify(
          UserOp[] memory _userOps,
          AllowanceOp memory allowanceOp,
          bytes memory _signature
     ) internal view override {
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
     }

     function _verifySigner(bytes memory signature, bytes32 hash, address claimedSigner) private view {
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
}
