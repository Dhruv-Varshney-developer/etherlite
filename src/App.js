import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { ThemeProvider, createTheme, CssBaseline, Box } from "@mui/material";
import Header from "./components/header";
import Portfolio from "./screens/portfolio";
import NFT from "./screens/nft";
import Trade from "./screens/trade";
import Transactions from "./screens/transactions";
import Settings from "./screens/settings";
import WalletScreen from "./screens/wallet";
import RecoveryPhraseScreen from "./screens/walletrecovery";
import NewWallet from "./screens/newwallet";
import Passcoderecovery from "./screens/passcoderecovery";
import Passcodenew from "./screens/passcodenew";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#ff6b00",
    },
  },
});

function App() {
  // Get the current location to conditionally render the header
  const location = useLocation();

  // Define the paths where you want to display the header
  const headerPaths = [
    "/portfolio",
    "/nft",
    "/trade",
    "/transactions",
    "/settings",
  ];

  // Check if the current path is in the headerPaths array
  const showHeader = headerPaths.includes(location.pathname);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
        {/* Conditionally render the Header */}
        {showHeader && (
          <Box>
            <Header />
          </Box>
        )}

        {/* Content */}
        <Box sx={{ flex: 1, display: "flex", marginTop: showHeader ? 15 : 0 }}>
          <Box sx={{ flexGrow: 1, padding: 2 }}>
            <Routes>
              <Route path="/" element={<WalletScreen />} />
              <Route path="/passcodenew" element={<Passcodenew />} />

              <Route path="/passcoderecovery" element={<Passcoderecovery />} />
              <Route path="/newwallet" element={<NewWallet />} />
              <Route path="/newwallet" element={<WalletScreen />} />
              <Route path="/recovery" element={<RecoveryPhraseScreen />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/nft" element={<NFT />} />
              <Route path="/trade" element={<Trade />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
