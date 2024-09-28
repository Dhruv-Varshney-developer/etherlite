import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Paper,
  Grid,
  Button,
  Box,
  IconButton,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { motion } from "framer-motion";

import { decryptSeedPhrase } from "../security/encryption";
import { getEncryptedSeedFromLocalStorage } from "../security/storage";
import { derivePublicAddressFromSeed } from "../blockchain/keypairgen";
import { getBalance } from "../blockchain/ethereum-interaction";
import { useNavigate, useLocation } from "react-router-dom";

const Portfolio = () => {
  const [publicAddress, setPublicAddress] = useState("");
  const [balance, setBalance] = useState(0);
  const [assets, setAssets] = useState([]);
  const [isCopied, setIsCopied] = useState(false);
  const navigate = useNavigate();

  const location = useLocation();
  const password = location.state?.password;
  console.log("password:" + password);

  const encryptedSeed = getEncryptedSeedFromLocalStorage();
  console.log("Encrypted seed from local storage:", encryptedSeed);
  console.log("Password used for decryption:", password);
  const decryptedSeedPhrase = decryptSeedPhrase(encryptedSeed, password);
  console.log("decrypted seed phrase:" + decryptedSeedPhrase);
  useEffect(() => {
    const verifyAndRedirect = async () => {
        const decryptedSeedPhrase = await decryptSeedPhrase(encryptedSeed, password);
        if (!decryptedSeedPhrase) {
            navigate("/");
        } else if (!password) {
            navigate("/enter-password");
        }
    };

    verifyAndRedirect();
}, [encryptedSeed, password, navigate]);

  useEffect(() => {
    const fetchAssets = async () => {
      const address = await derivePublicAddressFromSeed(decryptedSeedPhrase); // Implement derivePublicAddressFromSeed
      console.log("address:" + address);

      setPublicAddress(address);

      const ethBalance = await getBalance(address); // Fetch ETH balance
      console.log("ethbalance:" + ethBalance);
      setBalance(parseInt(ethBalance, 16) / 1e18);

      // Mock assets array for now, use Alchemy API to fetch real data later
      setAssets([
        {
          name: "Ethereum",
          symbol: "ETH",
          price: 1600,
          value: balance,
          amount: balance,
        },
      ]);
    };

    if (password) {
      fetchAssets();
    }
  }, [balance, decryptedSeedPhrase, password]);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(publicAddress);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
  };

  return (
    <Container>
      {/* Total Portfolio Section */}
      <Paper
        elevation={3}
        sx={{ p: 3, mb: 3, backgroundColor: "#1D1D1D", color: "#FFFFFF" }}
      >
        <Typography variant="h5">Total portfolio value</Typography>
        <Typography variant="h3">${(balance * 1600).toFixed(2)}</Typography>
        {/* Public Address Display */}
        <Typography variant="subtitle1" sx={{ mt: 2 }}>
          Main Wallet: {publicAddress.slice(0, 6)}...{publicAddress.slice(-4)}
          <IconButton
            onClick={handleCopyAddress}
            sx={{ ml: 1, color: "primary.main" }}
          >
            <ContentCopyIcon />
          </IconButton>
          {isCopied && (
            <Typography variant="caption" color="primary">
              Copied!
            </Typography>
          )}
        </Typography>
      </Paper>

      {/* Buttons (Receive, Send) */}
      <Grid container spacing={2} justifyContent="flex-start">
        <Grid item xs={6}>
          <motion.div whileHover={{ scale: 1.05 }}>
            <Button
              variant="contained"
              fullWidth
              sx={{ backgroundColor: "#ff6b00" }}
            >
              Receive
            </Button>
          </motion.div>
        </Grid>
        <Grid item xs={6}>
          <motion.div whileHover={{ scale: 1.05 }}>
            <Button
              variant="contained"
              fullWidth
              sx={{ backgroundColor: "#ff6b00" }}
            >
              Send
            </Button>
          </motion.div>
        </Grid>
      </Grid>

      {/* Asset List */}
      <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
        Assets
      </Typography>
      {assets.map((asset) => (
        <Paper
          key={asset.symbol}
          elevation={2}
          sx={{ p: 2, mb: 2, backgroundColor: "#2C2C2C", color: "#FFFFFF" }}
        >
          <Grid container alignItems="center">
            <Grid item xs={3}>
              <Typography variant="subtitle1">{asset.name}</Typography>
              <Typography variant="body2">{asset.symbol}</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography>${asset.price.toFixed(2)}</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography>
                ${(asset.price * asset.amount).toFixed(2)}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography>{asset.amount}</Typography>
            </Grid>
          </Grid>
        </Paper>
      ))}

      {/* Add New Asset Button */}
      <Box sx={{ textAlign: "center", mt: 2 }}>
        <Button
          variant="outlined"
          sx={{ color: "#ff6b00", borderColor: "#ff6b00" }}
        >
          + Add new asset
        </Button>
      </Box>
    </Container>
  );
};

export default Portfolio;
