// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity ^0.8.0;
pragma experimental ABIEncoderV2;

import "./ECDSAWallet.sol";
import {SmartWalletHasher} from "./libraries/HasherLib.sol";
import "./interfaces/IWallet.sol";
import "hardhat/console.sol";
import "@openzeppelin/contracts-upgradeable/utils/cryptography/ECDSAUpgradeable.sol";
import {IERC1271} from "./interfaces/IERC1271.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import {ECDSAWalletView} from "./ECDSAWalletView.sol";
import {CALLER} from "./Call.sol";
import {ERC20} from "solmate/src/tokens/ERC20.sol";

contract WalletBridgeVerifier {
  bytes32 constant UPPER_BIT_MASK = (0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff);
  address public constant RELAYER = 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266;
  using ECDSAUpgradeable for bytes32;
  using SmartWalletHasher for IWallet.ECDSAExec;
  using SafeTransferLib for ERC20;

  enum Protocol {
    SWAP,
    TRASFER
  }
  CALLER caller;

  mapping(Protocol => uint32[3]) private selectorToFunction;
  mapping(address => mapping(address => uint256)) public userBalanceBedoreOps;
  mapping(nonce => bytes) public bridgeProofs;

  constructor(CALLER _caller) {
    caller = _caller;
    selectorToFunction[Protocol.SWAP] = [0x36c78516, 0x095ea7b3, 0xd3986f08];
  }

  function extractSelector(bytes memory _calldata) public pure returns (bytes4 selector) {
    assembly {
      selector := mload(add(_calldata, 0x20))
    }
  }

  // Function to verify external data
  // 3 main steps to validate data
  //1 - validate signer from signature
  //2 - valdate ecex data struct from datahash
  // 3 verify contrat state has been update for both partieds according to the wallet ops

  //1 SIG VALIDATION
  // - make sure msg.sender is same as walletOewner in ECDSAExex
  // - make sure decodedChainId is same as in ECDSAExec
  // - make sure recover yields same signer as msg.sender and hence wallet owner
  // - lastly double verify this againsy the emitted data from walletowners contract
  //   (owner(), dataHash, _signature, _walletExec.wallet, nonce());
  function verifyBridgeReq(bytes calldata _encodedWalletExec, bytes calldata _sig) external {
    IWallet.ECDSAExec memory _decodedWalletExec = abi.decode(_encodedWalletExec, (IWallet.ECDSAExec));
    ECDSAWallet _decodedWallet = ECDSAWallet(payable(msg.sender));

    IWallet.ECDSAExecValidationDetails memory _userValidationReslt = _decodedWallet.getUserValidatedData(_decodedWallet.nonce() - 1);
    ECDSAWallet _claimedWallet = ECDSAWallet(payable(_userValidationReslt.wallet));

    (uint256 _decodedSigChainID, bytes memory _decodedSignature) = abi.decode(_sig, (uint256, bytes));
    bytes32 _decodedDataHash = _decodedWallet.domainSeperator(_decodedSigChainID).toTypedDataHash(_decodedWalletExec.hash());
    address _decodedSigner = _decodedDataHash.recover(_decodedSignature);

    (uint256 _claimedSigChainID, bytes memory _claimedSignature) = abi.decode(_userValidationReslt.signature, (uint256, bytes));
    address _claimedSigner = _userValidationReslt.signer;
    bytes32 _claimedDataHash = _userValidationReslt.dataHash;

    _decodedWallet._verifyECDSAExecRequest(_decodedSignature, _decodedDataHash, _decodedSigner);
    _claimedWallet._verifyECDSAExecRequest(_claimedSignature, _claimedDataHash, _claimedSigner);

    bytes32 decodedHash = keccak256(abi.encode(_decodedSigner, _decodedSignature, _decodedSigChainID, _decodedDataHash));
    bytes32 claimedHash = keccak256(abi.encode(_claimedSigner, _claimedSignature, _claimedSigChainID, _claimedDataHash));

    require(decodedHash == claimedHash, "invalid decoded data");

    IWallet.UserOp[] memory userOperations = _decodedWalletExec.userOps;
    bytes[] memory selectors = new bytes[](userOperations.length);

    CALLER.IPTransfer memory transfer;
    CALLER.IPAllowance memory allowance;
    CALLER.IPSwap memory swap;

    for (uint i = 0; i < userOperations.length; i++) {
      bytes4 selector = extractSelector(userOperations[i].data);
      require(selectorToFunction[Protocol.SWAP][i] == uint32(selector), "selector doesnt match ivlaid scheme");

      if (selectorToFunction[Protocol.SWAP][0] == uint32(selector)) {
        transfer = caller.executeTransfer(userOperations[0].data);
      }
      if (selectorToFunction[Protocol.SWAP][1] == uint32(selector)) {
        allowance = caller.executeApprove(userOperations[1].data);
      }
      if (selectorToFunction[Protocol.SWAP][2] == uint32(selector)) {
        swap = caller.executeSwap(userOperations[2].data);
      }
    }

    address token1 = _decodedWalletExec.allowanceOp.details[1].token;
    uint256 userBalanceBeforeToken0 = userBalanceBedoreOps[_decodedSigner][transfer.token];
    uint256 userBalanceAfterToken0 = ERC20(transfer.token).balanceOf(_decodedSigner);

    uint256 walletBalanceAfterToken0 = ERC20(transfer.token).balanceOf(RELAYER);
    uint256 walletBalanceBeforeToken0 = userBalanceBedoreOps[RELAYER][transfer.token];

    uint256 amount = transfer.amount;
    uint256 feeAmount = userBalanceBeforeToken0 - (userBalanceAfterToken0 + amount);
    require(userBalanceAfterToken0 == userBalanceBeforeToken0 - (amount + feeAmount), "userBalanxces dont check out");
    require(walletBalanceAfterToken0 == walletBalanceBeforeToken0 + feeAmount, "wallet balanxes dont check out");

    (uint256 allowed, uint48 expiration, uint256 nonce) = _decodedWallet.allowance(_decodedSigner, transfer.token, _decodedWalletExec.wallet);
    require(transfer.from == _decodedSigner && transfer.to == _decodedWalletExec.wallet, "state doesnt match details");

    bytes memory verificationSig = abi.encode(_sig, address(this));
    bridgeProofs[_decodedWalletExec.nonce] = verificationSig;
  }

  function getBalance(address account, address token) external {
    uint256 balance = ERC20(token).balanceOf(account); // Reads balance relative to contract B's state
    userBalanceBedoreOps[account][token] = balance; // Store the balance in contract B's storage
  }
}
