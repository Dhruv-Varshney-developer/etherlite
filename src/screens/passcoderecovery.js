import React, { useState } from "react";
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Link,
} from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { saveEncryptedSeedToLocalStorage } from "../security/storage";
import { encryptSeedPhrase } from "../security/encryption";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#ff6b00",
    },
    background: {
      default: "#121212",
      paper: "#1D1D1D",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#AAAAAA",
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
    h5: {
      fontWeight: 500,
    },
    button: {
      textTransform: "none",
    },
  },
});

const buttonVariants = {
  hover: {
    scale: 1.1,
    transition: {
      duration: 0.3,
      yoyo: Infinity,
    },
  },
};

function Passcoderecovery() {
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
      // Encrypt seed phrase and save to local storage
      console.log("original seedphrase:" + seedPhrase);
      const encryptedSeed = encryptSeedPhrase(seedPhrase, newPassword);
      console.log("Original seed phrase:", seedPhrase);
      console.log("Encrypted seed phrase:", encryptedSeed);
      saveEncryptedSeedToLocalStorage(encryptedSeed);

      console.log("Seed phrase encrypted and stored successfully!");
      navigate("/portfolio", { state: { password: newPassword } }); // navigate to the next screen
    } else {
      alert("Passwords do not match or are empty.");
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container maxWidth="sm" style={{ marginTop: "50px" }}>
        <Typography
          variant="h5"
          color="textPrimary"
          align="center"
          gutterBottom
        >
          Set a passcode for your wallet
        </Typography>

        <Box
          component="div"
          sx={{
            backgroundColor: darkTheme.palette.background.paper,
            padding: "24px",
            borderRadius: "8px",
            marginBottom: "24px",
          }}
        >
          <TextField
            variant="outlined"
            fullWidth
            margin="normal"
            label="New Password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <TextField
            variant="outlined"
            fullWidth
            margin="normal"
            label="Repeat Password"
            type="password"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
          />
        </Box>

        <Box display="flex" justifyContent="space-between">
          <motion.div variants={buttonVariants} whileHover="hover">
            <Button variant="text" color="primary" onClick={handleBack}>
              BACK
            </Button>
          </motion.div>
          <motion.div variants={buttonVariants} whileHover="hover">
            <Button
              variant="contained"
              color="primary"
              onClick={handleContinue}
            >
              CONTINUE
            </Button>
          </motion.div>
        </Box>

        <Typography
          variant="body2"
          color="textSecondary"
          align="center"
          style={{ marginTop: "24px" }}
        >
          Need a new wallet?{" "}
          <Link href="/newwallet" color="primary">
            Create it here
          </Link>
        </Typography>
      </Container>
    </ThemeProvider>
  );
}

export default Passcoderecovery;
