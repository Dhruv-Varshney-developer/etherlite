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
import { useNavigate } from "react-router-dom";
import { encryptSeedPhrase } from "../security/encryption";
import { saveEncryptedSeedToLocalStorage } from "../security/storage";

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

function Passcodenew({seedPhrase}) {
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const handleContinue = () => {
    if (newPassword === repeatPassword && newPassword.length > 0) {
        // Encrypt seed phrase and save to local storage
        const encryptedSeed = encryptSeedPhrase(seedPhrase, newPassword);
        saveEncryptedSeedToLocalStorage(encryptedSeed);
        
        console.log('Seed phrase encrypted and stored successfully!');
        navigate('/portfolio'); // navigate to the next screen
      } else {
        alert('Passwords do not match or are empty.');
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
          Already have a wallet?{" "}
          <Link href="/recovery" color="primary">
            Access it here
          </Link>
        </Typography>
      </Container>
    </ThemeProvider>
  );
}

export default Passcodenew;
