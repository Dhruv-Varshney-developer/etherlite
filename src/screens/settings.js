import React, { useState } from "react";
import {
  Container,
  Typography,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Grid,
} from "@mui/material";

function Settings() {
  const [language, setLanguage] = useState("English");
  const [currency, setCurrency] = useState("USD");
  const [network, setNetwork] = useState("Mainnet");

  const handleSave = () => {
    console.log("Saving settings:", { language, currency, network });
    // Implement actual settings save logic here
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ my: 4 }}>
        Settings
      </Typography>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>Language</InputLabel>
              <Select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                label="Language"
              >
                <MenuItem value="English">English</MenuItem>
                <MenuItem value="Spanish">Spanish</MenuItem>
                <MenuItem value="French">French</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>Currency</InputLabel>
              <Select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                label="Currency"
              >
                <MenuItem value="USD">US Dollar ($)</MenuItem>
                <MenuItem value="EUR">Euro (€)</MenuItem>
                <MenuItem value="GBP">British Pound (£)</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>Network</InputLabel>
              <Select
                value={network}
                onChange={(e) => setNetwork(e.target.value)}
                label="Network"
              >
                <MenuItem value="Mainnet">Mainnet</MenuItem>
                <MenuItem value="Testnet">Testnet</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
          sx={{ mt: 3 }}
        >
          Save Settings
        </Button>
      </Paper>
    </Container>
  );
}

export default Settings;
