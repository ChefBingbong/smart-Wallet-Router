import { randomBytes, createCipheriv, createDecipheriv } from "crypto";
import { ethers, utils } from "ethers";
import {
  publicKeyCreate,
  privateKeyVerify,
  publicKeyConvert,
  ecdh,
} from "secp256k1";
import elliptic from "elliptic";
import { keccak256 } from "ethers/lib/utils";
import BN from "bn.js";
import SM from "solidity-math";
import { toHex } from "viem";

// Generate key pair
const ec = new elliptic.ec("secp256k1");
// const key = ec.genKeyPair();
// console.log(key.getPrivate("hex"));

// Example Schnorr signature functions
function createSchnorrProof(secret: elliptic.ec.KeyPair, message: number) {
  // Compute public key
  // const out_pubkey = secret.getPublic();
  const publicKey = secret.getPublic();
  const out_pubkey = [publicKey.getX().toString(), publicKey.getY().toString()];
  console.log(new BN(secret.getPrivate().toString("hex"), 16));

  // // Generate random k
  const k = new BN(
    keccak256(
      ethers.utils.defaultAbiCoder.encode(
        ["uint256", "uint256"],
        [
          message,
          BigInt(
            `0x${"635b1ce8ddf5d21b60e346c7dbe26552c518d6ea48062b5585e53aeac5ee4461"}`,
          ),
        ],
      ),
    ).substring(2),
    16,
  );
  console.log("keyy", k.toString());
  // // Compute kG
  const kG = ec.g.mul(k);
  // console.log(kG.x.toString(), kG.y.toString());

  // // Compute e
  const e = new BN(
    keccak256(
      ethers.utils.defaultAbiCoder.encode(
        ["uint256", "uint256", "uint256", "uint256", "uint256"],
        [
          publicKey.getX().toString(),
          publicKey.getY().toString(),
          kG.x.toString(),
          kG.y.toString(),
          message,
        ],
      ),
    ).substring(2),
    16,
  );

  // // Compute s
  let s = new BN(secret.getPrivate().toString("hex"), 16)
    .mul(e)
    .mod(ec.curve.n)
    .add(k);
  // .mod(ec.curve.n);

  // const cc = s.mod(ec.curve.n);
  // console.log(s.toString());

  // .mod(ec.nh);

  console.log(ec.curve.n.toString(), "dd");
  console.log(kG.x.toString(), kG.y.toString(), "dd");

  console.log(e.toString(), "e", s.toString());

  return {
    out_pubkey: publicKey,
    s,
    e,
  };
}

function verifySchnorrProof(publicKey: any, message: number, s: BN, e: BN) {
  // Convert public key to elliptic curve point
  // const publicKey = ec
  //   .keyFromPublic({ x: pubkey[0], y: pubkey[1] })
  //   .getPublic();
  console.log([publicKey.getX().toString(), publicKey.getY().toString()]);
  // Compute sG
  const sG = ec.g.mul(s);

  const y = publicKey.mul(e).neg();
  // Compute R = sG + e * publicKey
  const R = sG.add(y);

  console.log(sG.x.toString(), sG.y.toString(), "ssss", s.toString());
  // console.log(ec.g.x.toString(16), ec.g.y.toString(16), "ssss");

  // // Compute e'
  const e2 = new BN(
    keccak256(
      ethers.utils.defaultAbiCoder.encode(
        ["uint256", "uint256", "uint256", "uint256", "uint256"],
        [
          publicKey.getX().toString(),
          publicKey.getY().toString(),
          R.x.toString(),
          R.y.toString(),
          message,
        ],
      ),
    ).substring(2),
    16,
  );

  console.log(sG.x.toString(), sG.y.toString(), "sd");

  console.log(e2.toString(), e.toString() === e2.toString());

  // // Verify if e' equals e
  // return e_prime === e;
}

// Example usage
const message = 373562;

// Create Schnorr proof
const proof = createSchnorrProof(
  ec.keyFromPrivate(
    "635b1ce8ddf5d21b60e346c7dbe26552c518d6ea48062b5585e53aeac5ee4461",
  ),
  message,
);
// console.log("Schnorr proof: e", proof.e.toString());
// console.log("Schnorr proof: e", proof.s);
// console.log("Schnorr proof: out", proof.out_pubkey);

// Verify Schnorr proof
const isVerified = verifySchnorrProof(
  proof.out_pubkey,
  message,
  proof.s,
  proof.e,
);
// console.log("Schnorr proof verified:", isVerified);

// const secretKey = ethers.utils.hexlify(ethers.utils.randomBytes(32));
// console.log("Secret Key:", secretKey);
// const wallet = ethers.Wallet.createRandom();

// // Get the private key
// const privateKey = wallet.privateKey;

// console.log("Random Private Key:", privateKey);
// // Key generation
// function generateKeys() {
//   let privateKey: Buffer;
//   do {
//     privateKey = Buffer.from(randomBytes(32));
//   } while (!privateKeyVerify(privateKey));

//   const publicKey = Buffer.from(publicKeyCreate(privateKey, false));

//   return { privateKey, publicKey };
// }

// // Encryption
// function encrypt(publicKey: Uint8Array, message: Buffer) {
//   const ephemeralPrivateKey = Buffer.from(randomBytes(32));
//   const ephemeralPublicKey = publicKeyCreate(ephemeralPrivateKey, false);

//   const sharedSecret = ecdh(publicKey, ephemeralPrivateKey);

//   const iv = randomBytes(16);
//   const cipher = createCipheriv("aes-256-ctr", sharedSecret.slice(0, 32), iv);
//   const encryptedMessage = Buffer.concat([
//     cipher.update(message),
//     cipher.final(),
//   ]);
//   const ephemeralPublicKeyCompressed = publicKeyConvert(
//     ephemeralPublicKey,
//     false,
//   );

//   return {
//     iv,
//     ephemeralPublicKey: ephemeralPublicKey,
//     encryptedMessage,
//   };
// }

// // Decryption
// function decrypt(
//   privateKey: any,
//   { iv, ephemeralPublicKey, encryptedMessage }: any,
// ) {
//   const sharedSecret = ecdh(
//     publicKeyConvert(Buffer.from(ephemeralPublicKey), false),
//     privateKey,
//   );
//   const decipher = createDecipheriv(
//     "aes-256-ctr",
//     sharedSecret.slice(0, 32),
//     iv,
//   );
//   const decryptedMessage = Buffer.concat([
//     decipher.update(encryptedMessage),
//     decipher.final(),
//   ]);

//   return decryptedMessage;
// }

// // Demo
// console.log("Generating keys...");
// const { privateKey, publicKey } = generateKeys();
// console.log("Public key:", publicKey.toString("hex"));
// console.log("Private key:", privateKey.toString("hex"));

// const message = Buffer.from("Hello, ECIES!");

// console.log("\nEncrypting message...");
// const encryptedData = encrypt(publicKey, message);
// console.log(
//   "Encrypted message:",
//   encryptedData.encryptedMessage.toString("hex"),
// );
// console.log("IV:", encryptedData.iv.toString("hex"));
// console.log(
//   "Ephemeral public key:",
//   console.log(
//     "Ephemeral public key:",
//     Buffer.from(encryptedData.ephemeralPublicKey).toString("hex"),
//   ),
// );

// console.log("\nDecrypting message...");
// const decryptedMessage = decrypt(privateKey, encryptedData);
// console.log(
//   "Decrypted message:",
//   // encryptedData.toString("hex")
//   decryptedMessage.toString("hex"),
//   message.toString("hex"),
// );

// function calculateSharedSecret(privateKey: Buffer, publicKey: Buffer) {
//   // Calculate shared secret between two parties
//   const sharedSecret = ecdh(publicKey, privateKey);
//   return sharedSecret;
// }

// // Example usage for multiple parties
// function calculateSharedSecrets(privateKeys: Buffer[], publicKeys: Buffer[]) {
//   const sharedSecrets: Buffer[] = [];
//   for (let i = 0; i < privateKeys.length; i++) {
//     for (let j = i + 1; j < publicKeys.length; j++) {
//       const secret = Buffer.from(
//         calculateSharedSecret(privateKeys[i], publicKeys[j]),
//       );
//       sharedSecrets.push(secret);
//     }
//   }
//   return sharedSecrets;
// }

// // Example keys for demonstration
// const partyPrivateKeys: Buffer[] = [];
// const partyPublicKeys: Buffer[] = [];

// // Generate keys for each party
// for (let i = 0; i <= 2; i++) {
//   const { privateKey, publicKey } = generateKeys();
//   partyPrivateKeys.push(privateKey);
//   partyPublicKeys.push(publicKey);
// }

// // Calculate shared secrets between parties
// const sharedSecrets = calculateSharedSecrets(partyPrivateKeys, partyPublicKeys);
// console.log(sharedSecrets.length);
// console.log(sharedSecrets.forEach((x) => console.log(x.toString("hex"))));
