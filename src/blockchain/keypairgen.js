const EC = require("elliptic").ec;
const { keccak256 } = require("js-sha3");
const fs = require("fs");

// Create a new instance of the elliptic curve
const ec = new EC("secp256k1");

// Load the word list
const wordList = fs
  .readFileSync("bip-39 words/english.txt", "utf-8")
  .trim()
  .split("\n");

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

function generateMnemonic() {
  let mnemonic = [];
  for (let i = 0; i < 12; i++) {
    // Generate a 12-word mnemonic
    const randomIndex = Math.floor(Math.random() * wordList.length);
    mnemonic.push(wordList[randomIndex]);
  }
  return mnemonic.join(" ");
}

// Example usage:
const privateKey = generatePrivateKey();
const publicKey = privateKeyToPublicKey(privateKey);
const address = publicKeyToAddress(publicKey);
const mnemonic = generateMnemonic();

console.log("Private Key:", privateKey);
console.log("Public Key:", publicKey);
console.log("Address:", address);
console.log("Mnemonic:", mnemonic);
