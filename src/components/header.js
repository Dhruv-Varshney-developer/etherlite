import React from "react";
import { AppBar, Toolbar, Button } from "@mui/material";
import { Link } from "react-router-dom";
import EtherliteLogo from "../assets/etherlite-logo.png";

function Header() {
  return (
    <AppBar position="fixed">
      <Toolbar
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <img
          src={EtherliteLogo}
          alt="Etherlite Logo"
          style={{ height: 100, marginRight: 16 }}
        />
        <div style={{ display: "flex", gap: "16px" }}>
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
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
