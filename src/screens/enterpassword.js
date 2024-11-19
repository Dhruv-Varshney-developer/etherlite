import React, { useState } from "react";
import { Container, Typography, TextField, Button } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { decryptSeedPhrase } from "../security/encryption";
import {
  saveTempPassword,
  getEncryptedSeedFromLocalStorage,
} from "../security/storage";

const EnterPassword = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleUnlock = async () => {
    const encryptedSeed = getEncryptedSeedFromLocalStorage();
    console.log("Attempting unlock with seed:", !!encryptedSeed); // Log if seed exists

    if (encryptedSeed) {
      try {
        console.log("Attempting decryption...");
        const result = await decryptSeedPhrase(encryptedSeed, password);
        console.log("Decryption successful:", !!result);
        saveTempPassword(password);

        navigate("/portfolio");
      } catch (error) {
        console.error("Decryption error:", error);
        setError(true);
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
