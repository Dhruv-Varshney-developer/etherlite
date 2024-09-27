import fetch from "node-fetch";
/*import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name of the current module
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Construct the path to the .env file
const envPath = path.resolve(__dirname, '../../.env');

// Load environment variables from the specified path
dotenv.config({ path: envPath });

const alchemy_api_key= process.env.alchemy_api_key;

*/
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
  const ethBalance = parseInt(balance, 16) / 1e18;
  return ethBalance;
}

