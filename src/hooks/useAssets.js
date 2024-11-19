import { useState, useEffect } from "react";
import { getBalance } from "../blockchain/ethereum-interaction";

export const useAssets = (publicAddress) => {
  const [balance, setBalance] = useState(0);
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    const fetchAssets = async () => {
      if (!publicAddress) return;

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
    };

    fetchAssets();
  }, [publicAddress]);

  return { balance, assets };
};
