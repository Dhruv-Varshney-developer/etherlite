const EC = require("elliptic").ec;
const { keccak256 } = require("js-sha3");

// Create a new instance of the elliptic curve
const ec = new EC("secp256k1");

// Function to generate a random private key
function generatePrivateKey() {
  const key = ec.genKeyPair();
  return key.getPrivate("hex");
}

function privateKeyToPublicKey(privateKey) {
  const key = ec.keyFromPrivate(privateKey, "hex");
  return key.getPublic("hex");
}

function publicKeyToAddress(publicKey) {
  // Remove the '04' prefix if it exists (uncompressed public key format)
  const pubKeyWithoutPrefix = publicKey.startsWith("04")
    ? publicKey.slice(2)
    : publicKey;
  const keccakHash = keccak256(Buffer.from(pubKeyWithoutPrefix, "hex"));
  return "0x" + keccakHash.slice(-40); // Take last 20 bytes (40 hex characters)
}

// Example usage:
const privateKey = generatePrivateKey();
const publicKey = privateKeyToPublicKey(privateKey);
const address = publicKeyToAddress(publicKey);

console.log("Private Key:", privateKey);
console.log("Public Key:", publicKey);
console.log("Address:", address);
