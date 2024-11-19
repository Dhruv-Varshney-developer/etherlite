import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getEncryptedSeedFromLocalStorage,
  getTempPassword,
} from "../security/storage";
import { decryptSeedPhrase } from "../security/encryption";
import {
  derivePublicAddressFromSeed,
  readPrivateKeyFromSeed,
} from "../blockchain/keypairgen";

export const useWalletSetup = () => {
  const [publicAddress, setPublicAddress] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const navigate = useNavigate();

  const encryptedSeed = getEncryptedSeedFromLocalStorage();
  const password = getTempPassword();

  const decryptedSeedPhrase = password
    ? decryptSeedPhrase(encryptedSeed, password)
    : null;

  useEffect(() => {
    const verifyAndRedirect = async () => {
      if (!encryptedSeed) {
        navigate("/");
      } else if (!password) {
        navigate("/enter-password");
      }
    };

    verifyAndRedirect();
  }, [encryptedSeed, password, navigate]);

  useEffect(() => {
    const setupWallet = async () => {
      if (!decryptedSeedPhrase) {
        console.log("No decrypted seed phrase available");
        return;
      }

      console.log("Setting up wallet with decrypted seed");
      try {
        const address = await derivePublicAddressFromSeed(decryptedSeedPhrase);
        console.log("Derived address success:", !!address);

        const derivedPrivateKey = readPrivateKeyFromSeed(decryptedSeedPhrase);
        console.log("Derived private key success:", !!derivedPrivateKey);

        if (
          !address ||
          typeof address !== "string" ||
          !address.startsWith("0x")
        ) {
          console.error("Invalid derived address:", address);
          return;
        }

        setPublicAddress(address);
        setPrivateKey(derivedPrivateKey);
      } catch (err) {
        console.error("Wallet setup error:", err);
      }
    };

    setupWallet();
  }, [decryptedSeedPhrase]);

  return { publicAddress, privateKey };
};
