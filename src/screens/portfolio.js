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
import {
  derivePublicAddressFromSeed,
  readPrivateKeyFromSeed,
} from "../blockchain/keypairgen";
import { getBalance } from "../blockchain/ethereum-interaction";
import { useLocation,useNavigate } from "react-router-dom";
import ReceiveModal from "../components/receivemodal";
import SendModal from "../components/sendmodal";
import NetworkDropdown from "../components/networks";
import { setNetworkUrl } from "../blockchain/ethereum-interaction";

const Portfolio = () => {
  const [publicAddress, setPublicAddress] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [balance, setBalance] = useState(0);
  const [assets, setAssets] = useState([]);
  const [isCopied, setIsCopied] = useState(false);
  const [isReceiveModalOpen, setReceiveModalOpen] = useState(false);
  const [isSendModalOpen, setSendModalOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const password = location.state?.password;

  const encryptedSeed = getEncryptedSeedFromLocalStorage();

  const decryptedSeedPhrase = decryptSeedPhrase(encryptedSeed, password);
  console.log("decrypted seed phrase:" + decryptedSeedPhrase);
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
    const fetchAssets = async () => {
      const address = await derivePublicAddressFromSeed(decryptedSeedPhrase); // Implement derivePublicAddressFromSeed
      const privatekey = readPrivateKeyFromSeed(decryptedSeedPhrase);
      console.log("derived public address:" + address);
      console.log("private key" + privatekey);
      if (
        !address ||
        typeof address !== "string" ||
        !address.startsWith("0x")
      ) {
        console.error("Invalid derived address:", address);
        return;
      }

      setPublicAddress(address);
      setPrivateKey(privatekey);

      const ethBalance = await getBalance(address); // Fetch ETH balance
      console.log("ethbalance:" + ethBalance);
      setBalance(parseInt(ethBalance, 16) / 1e18);

      setAssets([
        {
          name: "Ethereum",
          symbol: "ETH",
          price: 3000,
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

  const handleNetworkChange = (baseurl) => {
    setNetworkUrl(baseurl);
  };

  return (
    <Container>
      {/* Total Portfolio Section */}
      <Paper
        elevation={3}
        sx={{ p: 3, mb: 3, backgroundColor: "#1D1D1D", color: "#FFFFFF" }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between", // Space between portfolio value and dropdown
            alignItems: "center", // Align items vertically centered
          }}
        >
          {/* Left side: Portfolio value and public address */}
          <Box>
            <Typography variant="h5">Total portfolio value</Typography>
            <Typography variant="h3">${(balance * 1600).toFixed(2)}</Typography>
            {/* Public Address Display */}
            <Typography variant="subtitle1" sx={{ mt: 2 }}>
              Main Wallet: {publicAddress.slice(0, 6)}...
              {publicAddress.slice(-4)}
              <IconButton
                onClick={handleCopyAddress}
                sx={{ ml: 1, color: "primary.main" }}
              >
                <ContentCopyIcon />
              </IconButton>
              {isCopied && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Typography variant="caption" color="primary">
                    Copied!
                  </Typography>
                </motion.div>
              )}
            </Typography>
          </Box>
          {/* Right side: Dropdown to select network */}
          <Box>
            <NetworkDropdown onNetworkChange={handleNetworkChange} />
          </Box>
        </Box>
      </Paper>

      {/* Buttons (Receive, Send) */}
      <Grid container spacing={2} justifyContent="flex-start">
        <Grid item xs={6}>
          <motion.div whileHover={{ scale: 1.05 }}>
            <Button
              variant="contained"
              fullWidth
              sx={{ backgroundColor: "#ff6b00" }}
              onClick={() => setReceiveModalOpen(true)}
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
              onClick={() => setSendModalOpen(true)}
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
      {/* Modals */}
      <ReceiveModal
        open={isReceiveModalOpen}
        onClose={() => setReceiveModalOpen(false)}
        publicAddress={publicAddress}
      />
      <SendModal
        open={isSendModalOpen}
        onClose={() => setSendModalOpen(false)}
        publicAddress={publicAddress}
        privateKey={privateKey}
      />
    </Container>
  );
};

export default Portfolio;
