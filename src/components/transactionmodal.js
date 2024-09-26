import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";

function TransactionModal({ open, onClose, type }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{type} Transaction</DialogTitle>
      <DialogContent>
        <TextField label="Address" fullWidth margin="normal" />
        <TextField label="Amount" fullWidth margin="normal" />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onClose} variant="contained" color="primary">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default TransactionModal;
