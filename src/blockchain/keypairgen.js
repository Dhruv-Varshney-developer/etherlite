import hdkey from 'hdkey'; // HDKey for deriving keys
import { toBuffer, bufferToHex, toChecksumAddress } from 'ethjs-util'; // Ethjs utilities
import { mnemonicToSeed } from './mnemonic';


// Function to derive a private key using BIP-32 path (m/44'/60'/0'/0/0)
export const derivePrivateKeyFromSeed = (mnemonic) => {
  const seed = mnemonicToSeed(mnemonic); // Generate seed from mnemonic
  const masterKey = hdkey.fromMasterSeed(seed); // Create HDKey from seed
  const childKey = masterKey.derive("m/44'/60'/0'/0/0"); // Derive child key
  const privateKey = bufferToHex(childKey.privateKey); // Convert to hex
  return privateKey; // Return private key
};

// Function to convert a private key to a public key
export const privateKeyToPublicKey = (privateKey) => {
  const publicKey = bufferToHex(toBuffer(privateKey)); // Convert private key to buffer and then to hex
  return publicKey; // Return public key
};

// Function to convert a public key to an Ethereum address
export const publicKeyToAddress = (publicKey) => {
  const address = toChecksumAddress(publicKey.slice(2)); // Convert public key to Ethereum address
  return address; // Return Ethereum address
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
