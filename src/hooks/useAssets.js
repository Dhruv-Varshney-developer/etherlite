import { useState, useEffect, useCallback } from "react";
import { getBalance } from "../blockchain/ethereum-interaction";

export const useAssets = (publicAddress) => {
  const [balance, setBalance] = useState(0);
  const [assets, setAssets] = useState([]);

  const fetchAssets = useCallback(async () => {
    if (!publicAddress) return;

    try {
      const ethBalance = await getBalance(publicAddress);
      const balanceInEth = parseInt(ethBalance, 16) / 1e18;
      setBalance(balanceInEth);

      setAssets([
        {
          name: "Ethereum",
          symbol: "ETH",
          price: 3000,
          value: balanceInEth,
          amount: balanceInEth,
        },
      ]);
    } catch (error) {
      console.error("Error fetching assets:", error);
      setBalance(0);
      setAssets([]);
    }
  }, [publicAddress]);

  useEffect(() => {
    fetchAssets();
  }, [publicAddress, fetchAssets]);

  return { balance, assets, refreshAssets: fetchAssets };
};
