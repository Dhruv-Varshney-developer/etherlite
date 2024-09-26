import React from "react";
import { Select, MenuItem } from "@mui/material";

function NetworkSelector() {
  const [network, setNetwork] = React.useState("mainnet");

  const handleChange = (event) => {
    setNetwork(event.target.value);
  };

  return (
    <Select value={network} onChange={handleChange}>
      <MenuItem value="mainnet">Mainnet</MenuItem>
      <MenuItem value="testnet">Testnet</MenuItem>
    </Select>
  );
}

export default NetworkSelector;
