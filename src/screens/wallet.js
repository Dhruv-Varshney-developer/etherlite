import React from "react";
import {
  Button,
  Typography,
  createTheme,
  ThemeProvider,
  CssBaseline,
  Container,
  Grid,
  IconButton,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline"; // Placeholder wallet icon for new wallet
import RestoreIcon from "@mui/icons-material/Restore"; // Placeholder wallet icon for recovery
import { motion } from "framer-motion"; // For animation effects
import { useNavigate } from "react-router-dom"; // Updated from useHistory to useNavigate

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

function WalletScreen() {
  const navigate = useNavigate(); // Updated to useNavigate

  // Navigate to recovery phrase screen
  const handleNavigateToRecovery = () => {
    navigate("/recovery");
  };

  // Navigate to create a new wallet screen (you can adjust this route as needed)
  const handleNavigateToNewWallet = () => {
    navigate("/newwallet");
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container
        maxWidth="md"
        style={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center", // Center vertically
          alignItems: "center",
        }}
      >
        <Grid
          container
          spacing={6} // Added more spacing between the items
          justifyContent="center"
          alignItems="center" // Ensure both sections are center-aligned
        >
          {/* Create New Wallet Section */}
          <Grid item xs={12} sm={6} style={{ textAlign: "center" }}>
            <IconButton color="primary" size="large">
              <AddCircleOutlineIcon style={{ fontSize: 80 }} />
            </IconButton>
            <Typography variant="h6" color="textPrimary">
              Create a new wallet
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              Get started with the Ethereum blockchain within minutes.
            </Typography>
            <motion.div variants={buttonVariants} whileHover="hover">
              <Button
                variant="contained"
                color="primary"
                size="large"
                fullWidth
                style={{ marginTop: "16px" }}
                onClick={handleNavigateToNewWallet} // Navigate to new wallet screen
              >
                I NEED A NEW WALLET
              </Button>
            </motion.div>
          </Grid>

          {/* Restore Existing Wallet Section */}
          <Grid item xs={12} sm={6} style={{ textAlign: "center" }}>
            <IconButton color="primary" size="large">
              <RestoreIcon style={{ fontSize: 80 }} />
            </IconButton>
            <Typography variant="h6" color="textPrimary">
              Already have your Recovery Phrase?
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              Restore your existing wallet in two easy steps.
            </Typography>
            <motion.div variants={buttonVariants} whileHover="hover">
              <Button
                variant="contained"
                color="primary"
                size="large"
                fullWidth
                style={{ marginTop: "16px" }}
                onClick={handleNavigateToRecovery} // Navigate to recovery screen
              >
                I ALREADY HAVE A WALLET
              </Button>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

export default WalletScreen;
