import { randomBytes, createCipheriv, createDecipheriv } from "crypto";
import { ethers } from "ethers";
import {
  publicKeyCreate,
  privateKeyVerify,
  publicKeyConvert,
  ecdh,
} from "secp256k1";

// Key generation
function generateKeys() {
  let privateKey: Buffer;
  do {
    privateKey = Buffer.from(randomBytes(32));
  } while (!privateKeyVerify(privateKey));

  const publicKey = Buffer.from(publicKeyCreate(privateKey, false));

  return { privateKey, publicKey };
}

// Encryption
function encrypt(publicKey: Uint8Array, message: Buffer) {
  const ephemeralPrivateKey = Buffer.from(randomBytes(32));
  const ephemeralPublicKey = publicKeyCreate(ephemeralPrivateKey, false);

  const sharedSecret = ecdh(publicKey, ephemeralPrivateKey);

  const iv = randomBytes(16);
  const cipher = createCipheriv("aes-256-ctr", sharedSecret.slice(0, 32), iv);
  const encryptedMessage = Buffer.concat([
    cipher.update(message),
    cipher.final(),
  ]);
  const ephemeralPublicKeyCompressed = publicKeyConvert(
    ephemeralPublicKey,
    false,
  );

  return {
    iv,
    ephemeralPublicKey: ephemeralPublicKey,
    encryptedMessage,
  };
}

// Decryption
function decrypt(
  privateKey: any,
  { iv, ephemeralPublicKey, encryptedMessage }: any,
) {
  const sharedSecret = ecdh(
    publicKeyConvert(Buffer.from(ephemeralPublicKey), false),
    privateKey,
  );
  const decipher = createDecipheriv(
    "aes-256-ctr",
    sharedSecret.slice(0, 32),
    iv,
  );
  const decryptedMessage = Buffer.concat([
    decipher.update(encryptedMessage),
    decipher.final(),
  ]);

  return decryptedMessage;
}

// Demo
console.log("Generating keys...");
const { privateKey, publicKey } = generateKeys();
console.log("Public key:", publicKey.toString("hex"));
console.log("Private key:", privateKey.toString("hex"));

const message = Buffer.from("Hello, ECIES!");

console.log("\nEncrypting message...");
const encryptedData = encrypt(publicKey, message);
console.log(
  "Encrypted message:",
  encryptedData.encryptedMessage.toString("hex"),
);
console.log("IV:", encryptedData.iv.toString("hex"));
console.log(
  "Ephemeral public key:",
  console.log(
    "Ephemeral public key:",
    Buffer.from(encryptedData.ephemeralPublicKey).toString("hex"),
  ),
);

console.log("\nDecrypting message...");
const decryptedMessage = decrypt(privateKey, encryptedData);
console.log(
  "Decrypted message:",
  decryptedMessage.toString("hex"),
  message.toString("hex"),
);

function calculateSharedSecret(privateKey: Buffer, publicKey: Buffer) {
  // Calculate shared secret between two parties
  const sharedSecret = ecdh(publicKey, privateKey);
  return sharedSecret;
}

// Example usage for multiple parties
function calculateSharedSecrets(privateKeys: Buffer[], publicKeys: Buffer[]) {
  const sharedSecrets: Buffer[] = [];
  for (let i = 0; i < privateKeys.length; i++) {
    for (let j = i + 1; j < publicKeys.length; j++) {
      const secret = Buffer.from(
        calculateSharedSecret(privateKeys[i], publicKeys[j]),
      );
      sharedSecrets.push(secret);
    }
  }
  return sharedSecrets;
}

// Example keys for demonstration
const partyPrivateKeys: Buffer[] = [];
const partyPublicKeys: Buffer[] = [];

// Generate keys for each party
for (let i = 0; i <= 2; i++) {
  const { privateKey, publicKey } = generateKeys();
  partyPrivateKeys.push(privateKey);
  partyPublicKeys.push(publicKey);
}

// Calculate shared secrets between parties
const sharedSecrets = calculateSharedSecrets(partyPrivateKeys, partyPublicKeys);
console.log(sharedSecrets.length);
console.log(sharedSecrets.forEach((x) => console.log(x.toString("hex"))));

function writeBigUInt64BE(
  value: bigint,
  buffer: Uint8Array,
  offset: number,
): void {
  const bigUint64Array = new BigUint64Array(buffer.buffer);
  bigUint64Array[offset / 8] = value;
}

function splitPublicKey(publicKey: Buffer): [Uint8Array, Uint8Array] {
  // The first byte of the public key determines whether it's compressed or uncompressed
  const isCompressed = publicKey[0] !== 0x04;

  // Extract the X and Y coordinates based on whether the key is compressed or uncompressed
  let xCoord: Uint8Array;
  let yCoord: Uint8Array;

  if (isCompressed) {
    // Compressed public key format: 0x02/0x03 (prefix) + X-coordinate (32 bytes)
    xCoord = publicKey.slice(1);
    // Y-coordinate can be calculated from X-coordinate (compressed key)
    const x = BigInt(`0x${Buffer.from(xCoord.toString(), "hex")}`);
    const a = BigInt("0");
    const b = BigInt("7");
    const p = BigInt(
      "0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFC2F",
    );
    const ySquared = (x ** 3n + a * x + b) % p;
    let y = ySquared ** ((p + 1n) / 4n) % p;
    if (BigInt(publicKey[0] & 0x01) !== (y & 0x01n)) {
      y = p - y; // Choose the opposite parity to match the prefix
    }
    yCoord = Buffer.alloc(32);
    writeBigUInt64BE(y, yCoord, 0);
  } else {
    // Uncompressed public key format: 0x04 (prefix) + X-coordinate (32 bytes) + Y-coordinate (32 bytes)
    xCoord = publicKey.slice(1, 33);
    yCoord = publicKey.slice(33);
  }

  return [xCoord, yCoord];
}

// Example usage
const publicKeyBuffer = Buffer.from(
  "04fdac9ff9cbe234dddfe6dc41c6be7857e6d4f3ed2099a8010adebe7b1e74ef157224830428471cd4623f4007c5a6ca031aee70e91455d54333eeabbc0571d168",
  "hex",
);
const [xCoord, yCoord] = splitPublicKey(publicKeyBuffer);
console.log("X-coordinate:", new BigUint64Array(xCoord.buffer, 32, 2));
console.log("Y-coordinate:", new BigUint64Array(yCoord.buffer, 0, 32));
console.log(
  [Buffer.from(xCoord).toString("hex"), Buffer.from(yCoord).toString("hex")],
  ethers.utils.formatBytes32String("0"),
);
