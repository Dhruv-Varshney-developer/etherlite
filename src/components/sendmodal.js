import React, { useState, useEffect } from "react";
import {
  Typography,
  Button,
  Box,
  IconButton,
  Modal,
  TextField,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { motion } from "framer-motion";
import {
  validateAddressOnSepolia,
  getBalance,
  estimateGas,
  getGasPrice,
  getAccountNonce,
  getBlockGasLimit,
} from "../blockchain/ethereum-interaction";

import {
  createTransaction,
  signedTransaction,
  signingviaethers,
} from "../blockchain/transaction";

import { sendTransaction } from "../blockchain/ethereum-interaction";
import { ethers, Transaction } from "ethers";
const SendModal = ({ open, onClose, publicAddress, privateKey }) => {
  const [recipientAddress, setRecipientAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [balance, setBalance] = useState("");
  const [isAddressValid, setIsAddressValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [transactionDetails, setTransactionDetails] = useState(null);

  useEffect(() => {
    const fetchBalance = async () => {
      if (!publicAddress) {
        console.error("Public address is undefined or null");
        return;
      }
      try {
        console.log("Fetching balance for address:", publicAddress);
        const balanceWei = await getBalance(publicAddress);
        console.log("Received balance:", balanceWei);
        const balanceEth = parseInt(balanceWei, 16) / 1e18;
        setBalance(balanceEth.toFixed(4));
      } catch (error) {
        console.error("Error fetching balance:", error);
        setBalance("0");
      }
    };

    if (open && publicAddress) {
      fetchBalance();
    }
  }, [open, publicAddress]);

  const handleSend = async () => {
    setIsLoading(true);
    const isValid = await validateAddressOnSepolia(recipientAddress);
    if (!isValid) {
      alert(
        "The public address you entered couldn't be detected. You might lose your funds."
      );
      setIsLoading(false);
      return;
    }

    try {
      const gasPrice = await getGasPrice();
      const gasPriceGwei = parseInt(gasPrice, 16) / 1e9;
      const amountInWei = ethers.parseEther(amount);
      const amountInHex = "0x" + amountInWei.toString(16);

      const estimatedGas = await estimateGas({
        to: recipientAddress,
        from: publicAddress,
        value: amountInHex,
      });
      const gasFeeEth = (parseInt(estimatedGas, 16) * gasPriceGwei) / 1e9;
      const nonce = await getAccountNonce(publicAddress);

      setTransactionDetails({
        amount,
        recipientAddress,
        estimatedGasFee: gasFeeEth.toFixed(6),
        estimatedGas,
        gasPriceGwei,
        gasPrice,
        gasFeeEth,
        amountInWei,
        amountInHex,
        accountNonce: parseInt(nonce, 16),
        newBalance: (
          parseFloat(balance) -
          parseFloat(amount) -
          gasFeeEth
        ).toFixed(4),
      });

      setShowConfirmation(true);
    } catch (error) {
      console.error("Error preparing transaction:", error);
      alert("Error preparing transaction. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirm = async () => {
    setIsLoading(true);
    console.log("Transaction Details:", transactionDetails);

    try {
      const latestBlockGasLimit = await getBlockGasLimit();

      console.log("latestBlockGasLimit:" + latestBlockGasLimit); // Fetch latest block gas limit

      const estimatedGas = parseInt(transactionDetails.estimatedGas, 16);

      const gasLimit = Math.min(
        latestBlockGasLimit,
        Math.ceil(estimatedGas * 1.2)
      );

      console.log("Gas Limit:", gasLimit);
      const gasLimitHex = "0x" + gasLimit.toString(16);
      console.log("Gas Limit Hex:", gasLimitHex);

      // Build the transaction manually using  createTransaction method
      const transaction = createTransaction(
        "0x" + transactionDetails.accountNonce.toString(16),
        transactionDetails.gasPrice,
        gasLimitHex,

        transactionDetails.recipientAddress,
        transactionDetails.amountInHex
      );
      console.log("Transaction:", transaction);
      console.log("privateKey:", privateKey);
      /*
      // Sign the transaction
      const signedTx = signedTransaction(transaction, privateKey);
      console.log("Signed Transaction:", signedTx);

      console.log(Transaction.from(signedTx));
      */

      // Sign the transaction using ethers.js instead of the manual signing
      const signedTx = await signingviaethers(transaction, privateKey);
      console.log("Signed Transaction (ethers.js):", signedTx);

      // Send the raw transaction
      const txHash = await sendTransaction(signedTx);

      // Notify the user of the transaction hash
      alert(`Transaction sent successfully! Tx Hash: ${txHash}`);
      console.log(`Transaction sent successfully! Tx Hash: ${txHash}`);

      // Close the modal
      onClose();
    } catch (error) {
      console.error("Error confirming transaction:", error);
      alert("Error sending the transaction. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    setShowConfirmation(false);
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
        {!showConfirmation ? (
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
                  backgroundColor:
                    isAddressValid && amount > 0 ? "#ff6b00" : "grey",
                  pointerEvents: isAddressValid && amount > 0 ? "auto" : "none",
                }}
                onClick={handleSend}
                disabled={isLoading}
              >
                {isLoading ? <CircularProgress size={24} /> : "Send"}
              </Button>
            </motion.div>
          </>
        ) : (
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
              <Typography variant="body2">
                New Balance: {transactionDetails.newBalance} ETH
              </Typography>
            </Box>
            <Box
              sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}
            >
              <motion.div whileHover={{ scale: 1.05 }}>
                <Button
                  variant="outlined"
                  onClick={handleBack}
                  sx={{ color: "white", borderColor: "white" }}
                >
                  Back
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }}>
                <Button
                  variant="contained"
                  onClick={handleConfirm}
                  sx={{ backgroundColor: "#ff6b00" }}
                >
                  Confirm
                </Button>
              </motion.div>
            </Box>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default SendModal;
