import { useState } from "react";
import { ethers } from "ethers";
import {
  validateAddressOnSepolia,
  getGasPrice,
  estimateGas,
  getAccountNonce,
} from "../blockchain/ethereum-interaction";

export const useTransactionPreparation = (publicAddress) => {
  const [isLoading, setIsLoading] = useState(false);
  const [transactionDetails, setTransactionDetails] = useState(null);

  const prepareTransaction = async (recipientAddress, amount) => {
    setIsLoading(true);

    try {
      const isValid = await validateAddressOnSepolia(recipientAddress);
      if (!isValid) {
        throw new Error("Invalid recipient address");
      }

      const gasPrice = await getGasPrice();
      const gasPriceGwei = parseInt(gasPrice, 16) / 1e9;
      const amountInWei = ethers.parseEther(amount);
      const amountInHex = "0x" + amountInWei.toString(16);

      const estimatedGas = await estimateGas({
        to: recipientAddress,
        from: publicAddress,
        value: amountInHex,
      });

      const gasFeeEth = (parseInt(estimatedGas, 16) * gasPriceGwei) / 1e9;
      const nonce = await getAccountNonce(publicAddress);

      const details = {
        amount,
        recipientAddress,
        estimatedGasFee: gasFeeEth.toFixed(6),
        estimatedGas,
        gasPriceGwei,
        gasPrice,
        gasFeeEth,
        amountInWei,
        amountInHex,
        accountNonce: parseInt(nonce, 16),
      };

      setTransactionDetails(details);
      return details;
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    transactionDetails,
    prepareTransaction,
  };
};
