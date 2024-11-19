import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { encryptSeedPhrase } from "../security/encryption";
import { saveEncryptedSeedToLocalStorage } from "../security/storage";

export const usePasscodeSetup = () => {
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const seedPhrase = location.state?.seedPhrase;

  const handleBack = () => {
    navigate(-1);
  };

  const handleContinue = () => {
    if (newPassword === repeatPassword && newPassword.length > 0) {
      const encryptedSeed = encryptSeedPhrase(seedPhrase, newPassword);
      saveEncryptedSeedToLocalStorage(encryptedSeed);
      navigate("/portfolio", { state: { password: newPassword } });
    } else {
      alert("Passwords do not match or are empty.");
    }
  };

  return {
    newPassword,
    setNewPassword,
    repeatPassword,
    setRepeatPassword,
    handleBack,
    handleContinue,
  };
};
