const { keccak256 } = require("js-sha3");
const EC = require("elliptic");
const ec = new EC.ec("secp256k1");

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
    if (input === 0) {
      return Buffer.from([]);
    }
    const hex = input.toString(16);
    return rlpEncode(Buffer.from(hex.length % 2 ? "0" + hex : hex, "hex"));
  }
  if (typeof input === "string") {
    if (input.length === 0) {
      return Buffer.from([]);
    }
    return rlpEncode(Buffer.from(input));
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
  const key = ec.keyFromPrivate(privateKey, "hex");
  const signature = key.sign(Buffer.from(msgHash, "hex"));
  return {
    r: signature.r.toString("hex").padStart(64, "0"),
    s: signature.s.toString("hex").padStart(64, "0"),
    v: signature.recoveryParam + 27,
  };
}

// Test functions
function testCreateTransaction() {
  const tx = createTransaction(
    1,
    "20000000000",
    "21000",
    "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    "1000000000000000000"
  );
  console.log(
    "Create Transaction Test:",
    tx.nonce === 1 &&
      tx.gasPrice === "20000000000" &&
      tx.gasLimit === "21000" &&
      tx.to === "0x742d35Cc6634C0532925a3b844Bc454e4438f44e" &&
      tx.value === "1000000000000000000" &&
      tx.data === "0x"
  );
}

function testSignTransaction() {
  const tx = createTransaction(
    1,
    "20000000000",
    "21000",
    "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    "1000000000000000000"
  );
  const privateKey =
    "e331b6d69882b4cb4ea581d88e0b604039a3de5967688d3dcffdd2270c0fd109";
  const signedTx = signTransaction(tx, privateKey);
  console.log(
    "Sign Transaction Test:",
    signedTx.signature &&
      signedTx.signature.r &&
      signedTx.signature.s &&
      signedTx.signature.v
  );
}

function testSerializeTransaction() {
  const tx = createTransaction(
    1,
    "20000000000",
    "21000",
    "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    "1000000000000000000"
  );
  const privateKey =
    "e331b6d69882b4cb4ea581d88e0b604039a3de5967688d3dcffdd2270c0fd109";
  const signedTx = signTransaction(tx, privateKey);
  const serializedTx = serializeTransaction(signedTx);
  console.log("Serialize Transaction Test:", Buffer.isBuffer(serializedTx));
}

function testRlpEncode() {
  const input = [1, 2, 3];
  const encoded = rlpEncode(input);
  console.log("RLP Encode Test:", Buffer.isBuffer(encoded));
}

function testEcdsaSign() {
  const msgHash = "0x" + "1".repeat(64);
  const privateKey =
    "e331b6d69882b4cb4ea581d88e0b604039a3de5967688d3dcffdd2270c0fd109";
  const signature = ecdsaSign(msgHash, privateKey);
  console.log(
    "ECDSA Sign Test:",
    signature.r &&
      signature.r.length === 64 &&
      signature.s &&
      signature.s.length === 64 &&
      (signature.v === 27 || signature.v === 28)
  );
}

// Run all tests
function runAllTests() {
  testCreateTransaction();
  testSignTransaction();
  testSerializeTransaction();
  testRlpEncode();
  testEcdsaSign();
}

runAllTests();

module.exports = {
  createTransaction,
  signTransaction,
  serializeTransaction,
  rlpEncode,
  ecdsaSign,
};
