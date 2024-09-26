import * as bip39 from "bip39";

export const generateMnemonicPhrase = () => {
  return bip39.generateMnemonic();
};

export const mnemonicToSeed = (mnemonic) => {
  return bip39.mnemonicToSeedSync(mnemonic);
};

