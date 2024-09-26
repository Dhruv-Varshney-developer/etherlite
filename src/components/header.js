import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import EtherliteLogo from "../assets/etherlite-logo.png";

function Header() {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <img
          src={EtherliteLogo}
          alt="Etherlite Logo"
          style={{ height: 40, marginRight: 16 }}
        />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Etherlite
        </Typography>
        <Button color="inherit" component={Link} to="/">
          Portfolio
        </Button>
        <Button color="inherit" component={Link} to="/nft">
          NFT
        </Button>
        <Button color="inherit" component={Link} to="/trade">
          Trade
        </Button>
        <Button color="inherit" component={Link} to="/transactions">
          Transactions
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
