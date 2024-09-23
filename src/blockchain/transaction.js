import { keccak256 } from "js-sha3";
import { secp256k1 } from "secp256k1";

function createTransaction(nonce, gasPrice, gasLimit, toAddress, value) {
  return {
    nonce,
    gasPrice,
    gasLimit,
    to: toAddress,
    value,
    data: "0x", // Optional data field for smart contract interactions
  };
}

function signTransaction(transaction, privateKey) {
  const msgHash = keccak256(rlpEncode(transaction));
  const signature = ecdsaSign(msgHash, privateKey);
  return { ...transaction, signature };
}

function serializeTransaction(signedTransaction) {
  return rlpEncode([
    signedTransaction.nonce,
    signedTransaction.gasPrice,
    signedTransaction.gasLimit,
    signedTransaction.to,
    signedTransaction.value,
    signedTransaction.data,
    signedTransaction.signature.v,
    signedTransaction.signature.r,
    signedTransaction.signature.s,
  ]);
}

function rlpEncode(input) {
  if (typeof input === "string" && input.startsWith("0x")) {
    return rlpEncode(Buffer.from(input.slice(2), "hex"));
  }
  if (Buffer.isBuffer(input)) {
    if (input.length === 1 && input[0] < 128) {
      return input;
    }
    return Buffer.concat([encodeLength(input.length, 128), input]);
  }
  if (Array.isArray(input)) {
    const output = Buffer.concat(input.map(rlpEncode));
    return Buffer.concat([encodeLength(output.length, 192), output]);
  }
  if (typeof input === "number") {
    const hex = input.toString(16);
    return rlpEncode(Buffer.from(hex.length % 2 ? "0" + hex : hex, "hex"));
  }
  throw new Error("Invalid input type for RLP encoding");
}

function encodeLength(len, offset) {
  if (len < 56) {
    return Buffer.from([len + offset]);
  }
  const hexLength = len.toString(16);
  const firstByte = offset + 55 + hexLength.length / 2;
  return Buffer.concat([
    Buffer.from([firstByte]),
    Buffer.from(hexLength, "hex"),
  ]);
}

function ecdsaSign(msgHash, privateKey) {
  const sigObj = secp256k1.ecdsaSign(
    Buffer.from(msgHash, "hex"),
    Buffer.from(privateKey, "hex")
  );
  return {
    r: sigObj.signature.slice(0, 32).toString("hex"),
    s: sigObj.signature.slice(32, 64).toString("hex"),
    v: sigObj.recid + 27,
  };
}
