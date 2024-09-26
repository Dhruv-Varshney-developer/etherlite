import React, { useState } from 'react';
import { Container, Typography, Paper, TextField, Button, Select, MenuItem, Grid } from '@mui/material';

function Trade() {
  const [fromCurrency, setFromCurrency] = useState('SOL');
  const [toCurrency, setToCurrency] = useState('USDC');
  const [amount, setAmount] = useState('');

  const handleTrade = () => {
    console.log(`Trading ${amount} ${fromCurrency} to ${toCurrency}`);
    // Implement actual trade logic here
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ my: 4 }}>Trade</Typography>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6">From</Typography>
            <Select
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
              fullWidth
            >
              <MenuItem value="SOL">SOL</MenuItem>
              <MenuItem value="USDC">USDC</MenuItem>
              <MenuItem value="SEND">SEND</MenuItem>
            </Select>
            <TextField
              label="Amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              fullWidth
              sx={{ mt: 2 }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6">To</Typography>
            <Select
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
              fullWidth
            >
              <MenuItem value="SOL">SOL</MenuItem>
              <MenuItem value="USDC">USDC</MenuItem>
              <MenuItem value="SEND">SEND</MenuItem>
            </Select>
            <TextField
              label="Estimated Amount"
              type="number"
              value={amount} // This should be calculated based on exchange rate
              disabled
              fullWidth
              sx={{ mt: 2 }}
            />
          </Grid>
        </Grid>
        <Button variant="contained" color="primary" onClick={handleTrade} sx={{ mt: 3 }}>
          Trade
        </Button>
      </Paper>
    </Container>
  );
}

export default Trade;
