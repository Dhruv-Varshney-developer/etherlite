import React from "react";
import { Typography, Button, Box } from "@mui/material";
import { motion } from "framer-motion";

export const ConfirmationDialog = ({
  transactionDetails,
  publicAddress,
  onConfirm,
  onBack,
  newBalance,
}) => {
  return (
    <>
      <Typography variant="h5" gutterBottom sx={{ color: "white" }}>
        Confirm Transaction
      </Typography>
      <Box sx={{ mt: 2, color: "white" }}>
        <Typography variant="body1">
          Amount: {transactionDetails.amount} ETH
        </Typography>
        <Typography variant="body1">
          To: {transactionDetails.recipientAddress}
        </Typography>
        <Typography variant="body1">From: {publicAddress}</Typography>
        <Typography variant="body2">
          Estimated Gas Fee: {transactionDetails.estimatedGasFee} ETH
        </Typography>
        <Typography variant="body2">
          Account Nonce: {transactionDetails.accountNonce}
        </Typography>
        <Typography variant="body2">New Balance: {newBalance} ETH</Typography>
      </Box>
      <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
        <motion.div whileHover={{ scale: 1.05 }}>
          <Button
            variant="outlined"
            onClick={onBack}
            sx={{ color: "white", borderColor: "white" }}
          >
            Back
          </Button>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }}>
          <Button
            variant="contained"
            onClick={onConfirm}
            sx={{ backgroundColor: "#ff6b00" }}
          >
            Confirm
          </Button>
        </motion.div>
      </Box>
    </>
  );
};
