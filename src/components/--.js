import React, { useState } from "react";
import {
  Typography,
  Paper,
  Button,
  Box,
  IconButton,
  Modal,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { motion } from "framer-motion";

const ReceiveModal = ({ open, onClose, publicAddress }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(publicAddress);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "#2C2C2C",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          outline: "none",
        }}
      >
        <IconButton
          sx={{ position: "absolute", top: 8, right: 8, color: "white" }}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
        <Typography variant="h5" gutterBottom sx={{ color: "white" }}>
          Receive
        </Typography>
        <Typography variant="subtitle1" gutterBottom sx={{ color: "white" }}>
          Your address
        </Typography>
        <Paper
          elevation={2}
          sx={{ p: 2, backgroundColor: "#1D1D1D", color: "#FFFFFF" }}
        >
          {publicAddress}
        </Paper>
        <motion.div whileHover={{ scale: 1.05 }}>
          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 2, backgroundColor: "#ff6b00" }}
            onClick={handleCopyAddress}
          >
            Copy Address
          </Button>
        </motion.div>
        {isCopied && (
          <Typography variant="caption" color="primary" align="center">
            Copied!
          </Typography>
        )}
      </Box>
    </Modal>
  );
};

export default ReceiveModal;
