import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getEncryptedSeedFromLocalStorage } from "../security/storage";
import { decryptSeedPhrase } from "../security/encryption";
import {
  derivePublicAddressFromSeed,
  readPrivateKeyFromSeed,
} from "../blockchain/keypairgen";

export const useWalletSetup = (password) => {
  const [publicAddress, setPublicAddress] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const navigate = useNavigate();

  const encryptedSeed = getEncryptedSeedFromLocalStorage();
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
      if (!decryptedSeedPhrase) return;

      const address = await derivePublicAddressFromSeed(decryptedSeedPhrase);
      const derivedPrivateKey = readPrivateKeyFromSeed(decryptedSeedPhrase);

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
    };

    setupWallet();
  }, [decryptedSeedPhrase]);

  return { publicAddress, privateKey };
};
