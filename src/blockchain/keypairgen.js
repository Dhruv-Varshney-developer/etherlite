import { secp256k1 } from "secp256k1";
import { keccak256 } from "js-sha3";

function privateKeyToPublicKey(privateKey) {
  const curve = secp256k1; // Use the secp256k1 curve
  const privKeyBuffer = Buffer.from(privateKey, "hex");
  const publicKey = curve.getPublicKey(privKeyBuffer);
  return publicKey.toString("hex");
}

function publicKeyToAddress(publicKey) {
  const keccakHash = keccak256(publicKey);
  return "0x" + keccakHash.slice(-40); // Take last 20 bytes (40 hex characters)
}

const wordList = ["abandon", "ability", "able"]; // Add all BIP39 words

function generateMnemonic() {
  let mnemonic = [];
  for (let i = 0; i < 12; i++) {
    // Generate a 12-word mnemonic
    const randomIndex = Math.floor(Math.random() * wordList.length);
    mnemonic.push(wordList[randomIndex]);
  }
  return mnemonic.join(" ");
}
