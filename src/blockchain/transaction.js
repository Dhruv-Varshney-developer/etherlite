import { rlp, ecsign, keccak256 } from "ethereumjs-util";
import { hexToUint8Array } from "./usefulFunctions";

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

export function signTransaction(transaction, privateKey) {
  const privateKeyArray = hexToUint8Array(privateKey);
  const txArray = [
    transaction.nonce,
    transaction.gasPrice,
    transaction.gasLimit,
    transaction.to,
    transaction.value,
    transaction.data,
  ];
  const rlpEncoded = rlpEncode(txArray);
  const msgHash = keccak256(rlpEncoded);
  const { v, r, s } = ecsign(msgHash, privateKeyArray, transaction.chainId);
  return { ...transaction, v, r, s };
}

export function serializeTransaction(signedTransaction) {
  return rlpEncode([
    signedTransaction.nonce,
    signedTransaction.gasPrice,
    signedTransaction.gasLimit,
    signedTransaction.to,
    signedTransaction.value,
    signedTransaction.data,
    signedTransaction.v,
    signedTransaction.r,
    signedTransaction.s,
  ]);
}

export function rlpEncode(input) {
  return rlp.encode(input);
}
