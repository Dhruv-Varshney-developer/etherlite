import React, { useState } from "react";
import { Container, Typography, Paper, Grid, Button } from "@mui/material";

function Portfolio() {
  const [balance, setBalance] = useState(402.64);
  const [assets, setAssets] = useState([
    { name: "Solana", symbol: "SOL", price: 151.05, value: 45.99, amount: 0.3 },
    {
      name: "USD Coin",
      symbol: "USDC",
      price: 1.0,
      value: 349.98,
      amount: 350,
    },
    { name: "Send", symbol: "SEND", price: 0.0044, value: 6.67, amount: 1500 },
  ]);

  return (
    <Container>
      <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
        <Typography variant="h4">Total portfolio value</Typography>
        <Typography variant="h3">${balance.toFixed(2)}</Typography>
      </Paper>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Button variant="contained" fullWidth>
            Buy
          </Button>
        </Grid>
        <Grid item xs={12} md={4}>
          <Button variant="contained" fullWidth>
            Receive
          </Button>
        </Grid>
        <Grid item xs={12} md={4}>
          <Button variant="contained" fullWidth>
            Send
          </Button>
        </Grid>
      </Grid>
      <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
        Assets
      </Typography>
      {assets.map((asset) => (
        <Paper key={asset.symbol} elevation={2} sx={{ p: 2, mb: 2 }}>
          <Grid container alignItems="center">
            <Grid item xs={3}>
              <Typography variant="subtitle1">{asset.name}</Typography>
              <Typography variant="body2">{asset.symbol}</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography>${asset.price.toFixed(2)}</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography>${asset.value.toFixed(2)}</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography>{asset.amount}</Typography>
            </Grid>
          </Grid>
        </Paper>
      ))}
    </Container>
  );
}

export default Portfolio;
