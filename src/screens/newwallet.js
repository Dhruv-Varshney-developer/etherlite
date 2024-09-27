import React, { useEffect, useState } from "react";
import {
  Button,
  Typography,
  Box,
  Grid,
  Container,
  Link,
  IconButton,
} from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { generateMnemonicPhrase } from "../blockchain/mnemonic";
// Animations
const buttonVariants = {
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.3,
      yoyo: Infinity,
    },
  },
};

const NewWalletScreen = () => {
  const [mnemonic, setMnemonic] = useState([]);
  const navigate = useNavigate();

  // Generate mnemonic on component mount
  useEffect(() => {
    const mnemonicWords = generateMnemonicPhrase().split(" ");
    setMnemonic(mnemonicWords);
  }, []);

  // Copy to clipboard function
  const handleCopy = () => {
    navigator.clipboard.writeText(mnemonic.join(" "));
    alert("Mnemonic phrase copied to clipboard!");
  };

  // Download mnemonic function
  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([mnemonic.join(" ")], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "recovery-phrase.txt";
    document.body.appendChild(element);
    element.click();
  };

  // Handle Back navigation
  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  const handleRecoveryPhraseSaved = () => {
    navigate("/passcodenew");
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Box textAlign="center">
        <Typography variant="h5" color="textPrimary" gutterBottom>
          Write down your Recovery Phrase
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          You will need it on the next step
        </Typography>

        <Box
          sx={{
            backgroundColor: "#1D1D1D",
            borderRadius: "8px",
            padding: "24px",
            marginBottom: "24px",
          }}
        >
          {/* Display Mnemonic Words */}
          <Grid container spacing={2}>
            {mnemonic.map((word, index) => (
              <Grid item xs={4} key={index}>
                <Typography
                  variant="body1"
                  color="textPrimary"
                  textAlign="center"
                >
                  {index + 1}. {word}
                </Typography>
              </Grid>
            ))}
          </Grid>

          <Box mt={2} display="flex" justifyContent="space-between">
            <motion.div variants={buttonVariants} whileHover="hover">
              <IconButton onClick={handleCopy} color="primary">
                <ContentCopyIcon /> Copy
              </IconButton>
            </motion.div>

            <motion.div variants={buttonVariants} whileHover="hover">
              <IconButton onClick={handleDownload} color="primary">
                <FileDownloadIcon /> Download
              </IconButton>
            </motion.div>
          </Box>
        </Box>

        {/* Back and Confirm Buttons */}
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
              onClick={handleRecoveryPhraseSaved}
            >
              I SAVED MY RECOVERY PHRASE
            </Button>
          </motion.div>
        </Box>

        {/* Access It Here Link */}
        <Typography
          variant="body2"
          color="textSecondary"
          align="center"
          sx={{ marginTop: "24px" }}
        >
          Already have a wallet?{" "}
          <Link href="/recovery" color="primary">
            Access it here
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default NewWalletScreen;
