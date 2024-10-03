import React, { useState } from "react";
import { MenuItem, Select, FormControl, Typography } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useTheme } from "@mui/material/styles";
import CheckIcon from "@mui/icons-material/Check";

// List of network base URLs (without the API key)
const networks = [
  {
    name: "Ethereum Sepolia Testnet",
    baseUrl: "https://eth-sepolia.g.alchemy.com/v2/",
  },
  {
    name: "Ethereum Holesky Testnet",
    baseUrl: "https://eth-holesky.g.alchemy.com/v2/",
  },
  {
    name: "Polygon Amoy Testnet",
    baseUrl: "https://polygon-amoy.g.alchemy.com/v2/",
  },
  {
    name: "Polygon ZKEVM Cardona Testnet",
    baseUrl: "https://polygonzkevm-cardona.g.alchemy.com/v2/",
  },
  {
    name: "Arbitrum Sepolia Testnet",
    baseUrl: "https://arb-sepolia.g.alchemy.com/v2/",
  },
];

const NetworkDropdown = ({ onNetworkChange }) => {
  const [selectedNetwork, setSelectedNetwork] = useState(networks[0].baseUrl); // Default to Sepolia
  const theme = useTheme();

  const handleChange = (event) => {
    const newNetwork = event.target.value;
    setSelectedNetwork(newNetwork);

    onNetworkChange(newNetwork);
  };

  return (
    <FormControl fullWidth variant="outlined">
      <Select
        value={selectedNetwork}
        onChange={handleChange}
        IconComponent={ArrowDropDownIcon}
        displayEmpty
        sx={{
          backgroundColor: "#2d2d2d",
          color: "white",
          borderRadius: 1,
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#444",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#666",
          },
          "& .MuiSvgIcon-root": {
            color: "#fff",
          },
        }}
        renderValue={(selected) => {
          const selectedNetwork = networks.find(
            (network) => network.baseUrl === selected
          );
          return (
            <Typography
              sx={{
                color: "white",
                fontWeight: "bold",
              }}
            >
              {selectedNetwork?.name}
            </Typography>
          );
        }}
      >
        {networks.map((network) => (
          <MenuItem key={network.baseUrl} value={network.baseUrl}>
            <Typography>{network.name}</Typography>
            {network.baseUrl === selectedNetwork && (
              <CheckIcon
                sx={{
                  marginLeft: "auto",
                  color: theme.palette.primary.main,
                }}
              />
            )}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default NetworkDropdown;
