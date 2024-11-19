import React, { useState } from "react";
import { Paper, Typography, Box, IconButton } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { motion } from "framer-motion";
import NetworkDropdown from "./networks";

export const PortfolioHeader = ({
  balance,
  publicAddress,
  onNetworkChange,
}) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(publicAddress);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <Paper
      elevation={3}
      sx={{ p: 3, mb: 3, backgroundColor: "#1D1D1D", color: "#FFFFFF" }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography variant="h5">Total portfolio value</Typography>
          <Typography variant="h3">${(balance * 1600).toFixed(2)}</Typography>
          <Typography variant="subtitle1" sx={{ mt: 2 }}>
            Main Wallet: {publicAddress.slice(0, 6)}...{publicAddress.slice(-4)}
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
        <Box>
          <NetworkDropdown onNetworkChange={onNetworkChange} />
        </Box>
      </Box>
    </Paper>
  );
};
