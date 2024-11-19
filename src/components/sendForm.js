import React, { useState } from 'react';
import { TextField, Typography, Button, CircularProgress } from '@mui/material';
import { motion } from 'framer-motion';

export const SendForm = ({ balance, onSend, isLoading }) => {
  const [recipientAddress, setRecipientAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [isAddressValid, setIsAddressValid] = useState(false);

  const handleSendClick = () => {
    onSend(recipientAddress, amount);
  };

  return (
    <>
      <Typography variant="h5" gutterBottom sx={{ color: "white" }}>
        Send
      </Typography>
      <TextField
        label="Recipient Address"
        variant="outlined"
        fullWidth
        sx={{ mt: 2, backgroundColor: "#1D1D1D", color: "#FFFFFF" }}
        value={recipientAddress}
        onChange={(e) => {
          setRecipientAddress(e.target.value);
          setIsAddressValid(e.target.value.length === 42);
        }}
      />
      <TextField
        label="Amount (ETH)"
        variant="outlined"
        fullWidth
        type="number"
        sx={{ mt: 2, backgroundColor: "#1D1D1D", color: "#FFFFFF" }}
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <Typography variant="body2" sx={{ mt: 1, color: "white" }}>
        Balance: {balance} ETH
      </Typography>
      <motion.div whileHover={{ scale: 1.05 }}>
        <Button
          variant="contained"
          fullWidth
          sx={{
            mt: 2,
            backgroundColor: isAddressValid && amount > 0 ? "#ff6b00" : "grey",
            pointerEvents: isAddressValid && amount > 0 ? "auto" : "none",
          }}
          onClick={handleSendClick}
          disabled={isLoading}
        >
          {isLoading ? <CircularProgress size={24} /> : "Send"}
        </Button>
      </motion.div>
    </>
  );
};