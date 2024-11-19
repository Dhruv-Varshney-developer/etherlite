import React from "react";
import { Typography, Paper, Grid, Button, Box } from "@mui/material";

export const AssetsList = ({ assets }) => {
  return (
    <>
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
      <Box sx={{ textAlign: "center", mt: 2 }}>
        <Button
          variant="outlined"
          sx={{ color: "#ff6b00", borderColor: "#ff6b00" }}
        >
          + Add new asset
        </Button>
      </Box>
    </>
  );
};
