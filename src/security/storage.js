const SEED_STORAGE_KEY = "encryptedSeed";
const PASSWORD_STORAGE_KEY = "tempPassword";

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

export const saveTempPassword = (password) => {
  localStorage.setItem(PASSWORD_STORAGE_KEY, password);
};

export const getTempPassword = () => {
  return localStorage.getItem(PASSWORD_STORAGE_KEY);
};

export const clearTempPassword = () => {
  localStorage.removeItem(PASSWORD_STORAGE_KEY);
};
