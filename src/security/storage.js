const SEED_STORAGE_KEY = 'encryptedSeed';

/**
 * Saves the encrypted seed phrase to local storage.
 * @param {string} encryptedSeed - The encrypted seed phrase.
 */
export const saveEncryptedSeedToLocalStorage = (encryptedSeed) => {
  localStorage.setItem(SEED_STORAGE_KEY, encryptedSeed);
};

/**
 * Retrieves the encrypted seed phrase from local storage.
 * @returns {string|null} - The encrypted seed phrase, or null if not found.
 */
export const getEncryptedSeedFromLocalStorage = () => {
  return localStorage.getItem(SEED_STORAGE_KEY);
};
