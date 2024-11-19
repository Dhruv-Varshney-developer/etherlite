import React from "react";
import { TextField, Box } from "@mui/material";

export const PasscodeForm = ({
  newPassword,
  repeatPassword,
  setNewPassword,
  setRepeatPassword,
}) => (
  <Box
    component="div"
    sx={{
      backgroundColor: "background.paper",
      padding: "24px",
      borderRadius: "8px",
      marginBottom: "24px",
    }}
  >
    <TextField
      variant="outlined"
      fullWidth
      margin="normal"
      label="New Password"
      type="password"
      value={newPassword}
      onChange={(e) => setNewPassword(e.target.value)}
    />
    <TextField
      variant="outlined"
      fullWidth
      margin="normal"
      label="Repeat Password"
      type="password"
      value={repeatPassword}
      onChange={(e) => setRepeatPassword(e.target.value)}
    />
  </Box>
);
