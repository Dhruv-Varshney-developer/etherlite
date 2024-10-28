import { rlp, ecsign, keccak256, toBuffer,bufferToHex } from "ethereumjs-util";
import { hexToUint8Array } from "./usefulFunctions";
import { Wallet } from "ethers";

export function createTransaction(nonce, gasPrice, gasLimit, toAddress, value) {
  return {
    nonce,
    gasPrice,
    gasLimit,
    to: toAddress,
    value,
    data: "0x",
    chainId: 11155111,
  };
}

export function signedTransaction(transaction, privateKey) {
  const privateKeyBuffer = toBuffer(privateKey);
  
  // Prepare the array for RLP encoding (omit chainId)
  const txArray = [
    transaction.nonce,
    transaction.gasPrice,
    transaction.gasLimit,
    transaction.to,
    transaction.value,
    transaction.data,
    // "0x" + transaction.chainId.toString(16), // Omit this for legacy transactions
  ];
  
  const rlpEncoded = rlp.encode(txArray);
  const msgHash = keccak256(rlpEncoded);
  
  // Sign the transaction
  const { v, r, s } = ecsign(msgHash, privateKeyBuffer);

  // Re-encode the transaction with the signature (omit chainId)
  const signedTxArray = [
    transaction.nonce,
    transaction.gasPrice,
    transaction.gasLimit,
    transaction.to,
    transaction.value,
    transaction.data,
    bufferToHex(r),
    bufferToHex(s),
    // Calculate the v value correctly
    bufferToHex((v % 2) + 27) // Ensure v is in the right format
  ];

  return "0x" + rlp.encode(signedTxArray).toString("hex");
}



// This function will sign the transaction using ethers.js instead of manual signing
export async function checksigningviaethers(transaction, privateKey) {
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
