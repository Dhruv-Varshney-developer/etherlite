import React, { useState } from "react";
import { Container } from "@mui/material";
import { useLocation } from "react-router-dom";
import { setNetworkUrl } from "../blockchain/ethereum-interaction";
import { useWalletSetup } from "../hooks/useWalletSetup";
import { useAssets } from "../hooks/useAssets";
import { PortfolioHeader } from "../components/portfolioHeader";
import { ActionButtons } from "../components/actionButtons";
import { AssetsList } from "../components/assetsList";
import ReceiveModal from "../components/receiveModal";
import SendModal from "../components/sendModal";

const Portfolio = () => {
  const [isReceiveModalOpen, setReceiveModalOpen] = useState(false);
  const [isSendModalOpen, setSendModalOpen] = useState(false);

  const location = useLocation();
  const password = location.state?.password;

  const { publicAddress, privateKey } = useWalletSetup(password);
  const { balance, assets, refreshAssets } = useAssets(publicAddress);

  const handleNetworkChange = (baseurl) => {
    setNetworkUrl(baseurl);
    refreshAssets();
  };

  const handleReceiveModalClose = () => {
    setReceiveModalOpen(false);
    refreshAssets(); // Refresh assets when receive modal is closed
  };

  const handleSendModalClose = () => {
    setSendModalOpen(false);
    refreshAssets(); // Refresh assets when send modal is closed
  };

  return (
    <Container>
      <PortfolioHeader
        balance={balance}
        publicAddress={publicAddress}
        onNetworkChange={handleNetworkChange}
      />

      <ActionButtons
        onReceive={() => setReceiveModalOpen(true)}
        onSend={() => setSendModalOpen(true)}
      />

      <AssetsList assets={assets} />

      <ReceiveModal
        open={isReceiveModalOpen}
        onClose={handleReceiveModalClose}
        publicAddress={publicAddress}
      />
      <SendModal
        open={isSendModalOpen}
        onClose={handleSendModalClose}
        publicAddress={publicAddress}
        privateKey={privateKey}
      />
    </Container>
  );
};

export default Portfolio;
