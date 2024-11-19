import React, { useState } from 'react';
import { Box, IconButton, Modal } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { SendForm } from './sendForm';
import { ConfirmationDialog } from './confirmationdialog';
import { useWalletBalance } from '../hooks/useWalletBalance';
import { useTransactionPreparation } from '../hooks/useTransactionPreparation';
import { useTransactionConfirmation } from '../hooks/useTransactionConfirmation';

const SendModal = ({ open, onClose, publicAddress, privateKey }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const balance = useWalletBalance(publicAddress, open);
  const { isLoading: isPreparing, transactionDetails, prepareTransaction } = useTransactionPreparation(publicAddress);
  const { isLoading: isConfirming, confirmAndSendTransaction } = useTransactionConfirmation();

  const handleSend = async (recipientAddress, amount) => {
    try {
      await prepareTransaction(recipientAddress, amount);
      setShowConfirmation(true);
    } catch (error) {
      console.error("Error preparing transaction:", error);
      alert("Error preparing transaction. Please try again.");
    }
  };

  const handleConfirm = async () => {
    try {
      const txHash = await confirmAndSendTransaction(transactionDetails, privateKey);
      alert(`Transaction sent successfully! Tx Hash: ${txHash}`);
      onClose();
    } catch (error) {
      console.error("Error confirming transaction:", error);
      alert("Error sending the transaction. Please try again.");
    }
  };

  const handleBack = () => setShowConfirmation(false);

  const newBalance = transactionDetails 
    ? (parseFloat(balance) - parseFloat(transactionDetails.amount) - transactionDetails.gasFeeEth).toFixed(4)
    : balance;

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
          <SendForm 
            balance={balance}
            onSend={handleSend}
            isLoading={isPreparing}
          />
        ) : (
          <ConfirmationDialog
            transactionDetails={transactionDetails}
            publicAddress={publicAddress}
            onConfirm={handleConfirm}
            onBack={handleBack}
            newBalance={newBalance}
          />
        )}
      </Box>
    </Modal>
  );
};

export default SendModal;