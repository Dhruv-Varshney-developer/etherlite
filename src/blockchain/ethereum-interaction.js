import fetch from "node-fetch";

const alchemy_api_key = "_eey_DCxuKpdcJYnMuAWPiIrhbIsozOX";
const NETWORK = "sepolia"; // or 'mainnet', 'sepolia', etc.
const ALCHEMY_URL = `https://eth-${NETWORK}.g.alchemy.com/v2/${alchemy_api_key}`;

async function sendJsonRpcRequest(method, params) {
  const response = await fetch(ALCHEMY_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: 1,
      method,
      params,
    }),
  });

  const data = await response.json();
  if (data.error) {
    throw new Error(`JSON-RPC error: ${data.error.message}`);
  }
  return data.result;
}

export async function getAccountNonce(address) {
  return sendJsonRpcRequest("eth_getTransactionCount", [address, "latest"]);
}

export async function estimateGas(transaction) {
  return sendJsonRpcRequest("eth_estimateGas", [transaction]);
}

export async function getGasPrice() {
  return sendJsonRpcRequest("eth_gasPrice", []);
}

export async function getBalance(address) {
  const balance = await sendJsonRpcRequest("eth_getBalance", [
    address,
    "latest",
  ]);
  return balance;
}

