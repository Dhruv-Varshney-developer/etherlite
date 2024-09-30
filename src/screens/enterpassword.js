import React, { useState } from "react";
import { Container, Typography, TextField, Button } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { decryptSeedPhrase } from "../security/encryption";
import { getEncryptedSeedFromLocalStorage } from "../security/storage";

const EnterPassword = ({ onPasswordSubmit }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleUnlock = async () => {
    const encryptedSeed = getEncryptedSeedFromLocalStorage();
    if (encryptedSeed) {
      try {
        // Attempt to decrypt seed phrase with entered password
        await decryptSeedPhrase(encryptedSeed, password);
        onPasswordSubmit(password); // Update password state and allow user to proceed
        navigate("/portfolio"); // Redirect to portfolio
      } catch (error) {
        setError(true); // Show error if decryption fails
      }
    }
  };

  return (
    <Container sx={{ textAlign: "center", mt: 8 }}>
      <Typography variant="h5" sx={{ mb: 4 }}>
        Enter Password
      </Typography>
      <TextField
        label="Password"
        type="password"
        variant="outlined"
        fullWidth
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={error}
        helperText={error ? "Incorrect password. Try again." : ""}
        sx={{ backgroundColor: "#1D1D1D", color: "#FFFFFF", mb: 4 }}
      />
      <motion.div whileHover={{ scale: 1.05 }}>
        <Button
          variant="contained"
          onClick={handleUnlock}
          sx={{ backgroundColor: "#ff6b00", color: "#fff" }}
          fullWidth
        >
          Unlock
        </Button>
      </motion.div>
    </Container>
  );
};

export default EnterPassword;
