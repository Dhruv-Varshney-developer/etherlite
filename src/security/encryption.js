import CryptoJS from 'crypto-js';

/**
 * Encrypts a seed phrase with a given password.
 * @param {string} seedPhrase - The seed phrase to encrypt.
 * @param {string} password - The password used for encryption.
 * @returns {string} - The encrypted seed phrase.
 */
export const encryptSeedPhrase = (seedPhrase, password) => {
  return CryptoJS.AES.encrypt(seedPhrase, password).toString();
};

/**
 * Decrypts the encrypted seed phrase using the password.
 * @param {string} encryptedSeed - The encrypted seed phrase.
 * @param {string} password - The password used for decryption.
 * @returns {string} - The decrypted seed phrase.
 */
export const decryptSeedPhrase = (encryptedSeed, password) => {
  const bytes = CryptoJS.AES.decrypt(encryptedSeed, password);
  return bytes.toString(CryptoJS.enc.Utf8);
};
