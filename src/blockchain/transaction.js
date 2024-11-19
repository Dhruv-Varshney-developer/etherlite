import { rlp, ecsign, keccak256, toBuffer, bufferToHex } from "ethereumjs-util";
//import { hexToUint8Array } from "./usefulFunctions";
import { Wallet } from "ethers";
import { getCurrentChainId } from "./ethereum-interaction";

export function createTransaction(nonce, gasPrice, gasLimit, toAddress, value) {
  return {
    nonce,
    gasPrice,
    gasLimit,
    to: toAddress,
    value,
    data: "0x",
    chainId: getCurrentChainId(),
  };
}

export function signedTransaction(transaction, privateKey) {
  try {
    const privateKeyBuffer = toBuffer(privateKey);

    // Create RLP encoding of the transaction without signature
    const txData = [
      toBuffer(transaction.nonce),
      toBuffer(transaction.gasPrice),
      toBuffer(transaction.gasLimit),
      toBuffer(transaction.to),
      toBuffer(transaction.value),
      toBuffer(transaction.data),
      toBuffer(transaction.chainId),
      toBuffer("0x"), // r
      toBuffer("0x"), // s
    ];

    const rlpEncoded = rlp.encode(txData);
    const msgHash = keccak256(rlpEncoded);

    // Sign the transaction
    const sig = ecsign(msgHash, privateKeyBuffer);

    // Calculate v value
    const v = sig.v + (transaction.chainId * 2 + 35);

    // Serialize the signed transaction
    const serializedTransaction = rlp.encode([
      toBuffer(transaction.nonce),
      toBuffer(transaction.gasPrice),
      toBuffer(transaction.gasLimit),
      toBuffer(transaction.to),
      toBuffer(transaction.value),
      toBuffer(transaction.data),
      toBuffer(v),
      toBuffer(sig.r),
      toBuffer(sig.s),
    ]);

    return bufferToHex(serializedTransaction);
  } catch (error) {
    console.error("Error signing and serializing transaction:", error);
    throw error;
  }
}

// This function will sign the transaction using ethers.js instead of manual signing
export async function signingviaethers(transaction, privateKey) {
  try {
    // Initialize the wallet instance using the provided private key
    const wallet = new Wallet(privateKey);

    // Construct the transaction object with all necessary fields
    const tx = {
      nonce: transaction.nonce,
      gasPrice: transaction.gasPrice,
      gasLimit: transaction.gasLimit,
      to: transaction.to,
      value: transaction.value,
      data: transaction.data,
      chainId: transaction.chainId,
    };

    // Sign the transaction using ethers.js
    const signedTx = await wallet.signTransaction(tx);
    console.log("Signed transaction with ethers.js:", signedTx);

    return signedTx;
  } catch (error) {
    console.error("Error signing transaction via ethers:", error);
    throw error;
  }
}
