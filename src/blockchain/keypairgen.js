import hdkey from "hdkey"; // HDKey for deriving keys
import { bufferToHex, privateToPublic, publicToAddress } from "ethereumjs-util"; 
import { mnemonicToSeed } from "./mnemonic";

// Function to derive a private key using BIP-32 path (m/44'/60'/0'/0/0)
export const derivePrivateKeyFromSeed = (mnemonic) => {
  const seed = mnemonicToSeed(mnemonic); // Generate seed from mnemonic
  const masterKey = hdkey.fromMasterSeed(seed); // Create HDKey from seed
  const childKey = masterKey.derive("m/44'/60'/0'/0/0"); // Derive child key
  const privateKey = childKey.privateKey; // No need to convert to string, keep as Buffer
  return privateKey; // Return private key as Buffer
};

// Function to convert a private key to a public key
export const privateKeyToPublicKey = (privateKey) => {
  const publicKey = privateToPublic(privateKey); // Use ethereumjs-util to convert
  return publicKey; // Return public key as Buffer
};

// Function to convert a public key to an Ethereum address
export const publicKeyToAddress = (publicKey) => {
  const address = publicToAddress(publicKey); // Get the address as a Buffer
  return bufferToHex(address); // Convert Buffer to hex string and return
};

// Derive the public address from the seed
export const derivePublicAddressFromSeed = (mnemonic) => {
  // Step 1: Derive the private key from the seed
  const privateKey = derivePrivateKeyFromSeed(mnemonic);

  // Step 2: Convert the private key to a public key
  const publicKey = privateKeyToPublicKey(privateKey);

  // Step 3: Convert the public key to an Ethereum address
  const address = publicKeyToAddress(publicKey);

  // Return the derived Ethereum address
  return address;
};
