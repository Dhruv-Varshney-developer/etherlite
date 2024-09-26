import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import Header from "./components/header";
import Portfolio from "./screens/portfolio";
import NFT from "./screens/nft";
import Trade from "./screens/trade";
import Transactions from "./screens/transactions";
import Settings from "./screens/settings";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#ff6b00",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Router>
        <Header />
        
        <Routes>
          <Route exact path="/" element={<Portfolio />} />
          <Route path="/nft" element={<NFT />} />
          <Route path="/trade" element={<Trade />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
