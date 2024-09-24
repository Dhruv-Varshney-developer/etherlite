const { secp256k1 } = require("secp256k1");
const { keccak256 } = require("js-sha3");
const fs = require("fs");
const crypto = require("crypto-browserify");

// Load the word list
const wordList = fs
  .readFileSync("bip-39 words/english.txt", "utf-8")
  .trim()
  .split("\n");

// Function to generate a random private key
function generatePrivateKey() {
  const randomBytes = crypto.randomBytes(32); // 32 bytes = 256 bits
  return randomBytes.toString("hex");
}

function privateKeyToPublicKey(privateKey) {
  const privKeyBuffer = Buffer.from(privateKey, "hex");
  const publicKey = secp256k1.publicKeyCreate(privKeyBuffer);
  return publicKey.toString("hex");
}

function publicKeyToAddress(publicKey) {
  const keccakHash = keccak256(Buffer.from(publicKey.slice(2), "hex"));
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
