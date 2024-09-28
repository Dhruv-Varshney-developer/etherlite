import React, { useState } from "react";
import {
  Button,
  TextField,
  Grid,
  Typography,
  Box,
  createTheme,
  ThemeProvider,
  CssBaseline,
  Container,
  Link,
} from "@mui/material";
import { motion } from "framer-motion"; // For animation effects
import { useNavigate } from "react-router-dom"; // For navigation
import { getBalance } from "../blockchain/ethereum-interaction";
import { derivePublicAddressFromSeed } from "../blockchain/keypairgen";
// Custom dark theme
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

// Animation for hover effect on buttons
const buttonVariants = {
  hover: {
    scale: 1.1,
    transition: {
      duration: 0.3,
      yoyo: Infinity,
    },
  },
};

function RecoveryPhraseScreen() {
  const [recoveryPhrase, setRecoveryPhrase] = useState(Array(12).fill(""));
  const navigate = useNavigate(); // useNavigate hook for navigation

  // Handles input change for the recovery phrases
  const handleInputChange = (index, value) => {
    const newPhrases = [...recoveryPhrase];
    newPhrases[index] = value;
    setRecoveryPhrase(newPhrases);
  };

  // Handles file upload for recovery phrases
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target.result;
        const phrases = text.split(" ").slice(0, 12);
        setRecoveryPhrase(phrases);
      };
      reader.readAsText(file);
    }
  };

  const checkIfAccountIsActive = async (mnemonic) => {
    const derivedAddress = derivePublicAddressFromSeed(mnemonic);

    try {
      const balance = await getBalance(derivedAddress);
      const ethBalance = parseInt(balance, 16) / 1e18;

      if (ethBalance > 0) {
        return true; // Active account
      } else {
        // Optionally, check transaction history here
        return false; // No balance, consider account inactive
      }
    } catch (error) {
      console.error("Error checking account status:", error);
      return false;
    }
  };

  const handleContinue = async () => {
    const mnemonic = recoveryPhrase.join(" ");

    const isActive = await checkIfAccountIsActive(mnemonic);

    if (!isActive) {
      alert(
        "The entered mnemonic does not correspond to an active Ethereum account."
      );
    } else {
      // Proceed with recovery
      navigate("/passcoderecovery",{ state: { seedPhrase: mnemonic } });
    }
  };

  // Go back to the previous screen
  const handleBack = () => {
    navigate(-1); // Goes back one step in history
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
          Enter your recovery phrase.
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          align="center"
          gutterBottom
        >
          Your recovery phrase is the key to the wallet.
        </Typography>

        {/* Recovery Phrase Input Grid */}
        <Box
          component="div"
          sx={{
            backgroundColor: darkTheme.palette.background.paper,
            padding: "24px",
            borderRadius: "8px",
            marginBottom: "24px",
            textAlign: "center",
          }}
        >
          <Box display="flex" justifyContent="space-between" mb={2}>
            {/* Removed the 24 recovery phrase option */}
            <Typography color="primary" variant="button">
              12
            </Typography>
            <Button
              variant="text"
              color="primary"
              component="label"
              style={{ textTransform: "none", fontSize: "16px" }}
            >
              Upload
              <input
                type="file"
                hidden
                accept=".txt"
                onChange={handleFileUpload}
              />
            </Button>
          </Box>

          {/* Input fields for recovery phrase */}
          <Grid container spacing={2}>
            {recoveryPhrase.map((phrase, index) => (
              <Grid item xs={6} sm={4} key={index}>
                <motion.div variants={buttonVariants} whileHover="hover">
                  <TextField
                    variant="outlined"
                    value={phrase}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                    placeholder={(index + 1).toString()}
                    fullWidth
                    inputProps={{ style: { color: "white" } }} // Input text color white
                  />
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Back and Continue buttons */}
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

        {/* Link to create new wallet */}
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

export default RecoveryPhraseScreen;
