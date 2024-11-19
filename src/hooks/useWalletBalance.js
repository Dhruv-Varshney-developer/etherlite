import { useState, useEffect } from "react";
import { getBalance } from "../blockchain/ethereum-interaction";

export const useWalletBalance = (publicAddress, shouldFetch = false) => {
  const [balance, setBalance] = useState("");

  useEffect(() => {
    const fetchBalance = async () => {
      if (!publicAddress) {
        console.error("Public address is undefined or null");
        return;
      }
      try {
        const balanceWei = await getBalance(publicAddress);
        const balanceEth = parseInt(balanceWei, 16) / 1e18;
        setBalance(balanceEth.toFixed(4));
      } catch (error) {
        console.error("Error fetching balance:", error);
        setBalance("0");
      }
    };

    if (shouldFetch && publicAddress) {
      fetchBalance();
    }
  }, [shouldFetch, publicAddress]);

  return balance;
};
