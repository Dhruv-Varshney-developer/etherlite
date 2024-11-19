import { useState } from "react";
import { getBlockGasLimit } from "../blockchain/ethereum-interaction";
import { createTransaction, signingviaethers } from "../blockchain/transaction";
import { sendTransaction } from "../blockchain/ethereum-interaction";

export const useTransactionConfirmation = () => {
  const [isLoading, setIsLoading] = useState(false);

  const confirmAndSendTransaction = async (transactionDetails, privateKey) => {
    setIsLoading(true);

    try {
      const latestBlockGasLimit = await getBlockGasLimit();
      const estimatedGas = parseInt(transactionDetails.estimatedGas, 16);
      const gasLimit = Math.min(
        latestBlockGasLimit,
        Math.ceil(estimatedGas * 1.2)
      );
      const gasLimitHex = "0x" + gasLimit.toString(16);

      const transaction = createTransaction(
        "0x" + transactionDetails.accountNonce.toString(16),
        transactionDetails.gasPrice,
        gasLimitHex,
        transactionDetails.recipientAddress,
        transactionDetails.amountInHex
      );

      const signedTx = await signingviaethers(transaction, privateKey);
      const txHash = await sendTransaction(signedTx);

      return txHash;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    confirmAndSendTransaction,
  };
};
