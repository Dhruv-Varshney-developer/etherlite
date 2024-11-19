import React from "react";
import { Grid, Button } from "@mui/material";
import { motion } from "framer-motion";

export const ActionButtons = ({ onReceive, onSend }) => {
  return (
    <Grid container spacing={2} justifyContent="flex-start">
      <Grid item xs={6}>
        <motion.div whileHover={{ scale: 1.05 }}>
          <Button
            variant="contained"
            fullWidth
            sx={{ backgroundColor: "#ff6b00" }}
            onClick={onReceive}
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
            onClick={onSend}
          >
            Send
          </Button>
        </motion.div>
      </Grid>
    </Grid>
  );
};
