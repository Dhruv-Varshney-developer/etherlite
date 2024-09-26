import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider, createTheme, CssBaseline, Box } from "@mui/material";
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
        <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
          {/* Header */}
          <Box>
            <Header />
          </Box>

          {/* Content */}
          <Box sx={{ flex: 1, display: "flex", marginTop: 15 }}>
            <Box sx={{ flexGrow: 1, padding: 2 }}>
              <Routes>
                <Route path="/" element={<Portfolio />} />
                <Route path="/nft" element={<NFT />} />
                <Route path="/trade" element={<Trade />} />
                <Route path="/transactions" element={<Transactions />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </Box>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
