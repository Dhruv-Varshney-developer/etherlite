import fetch from "node-fetch";
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name of the current module
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Construct the path to the .env file
const envPath = path.resolve(__dirname, '../../.env');

// Load environment variables from the specified path
dotenv.config({ path: envPath });

const alchemy_api_key= process.env.alchemy_api_key;
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

async function getAccountNonce(address) {
  return sendJsonRpcRequest("eth_getTransactionCount", [address, "latest"]);
}

async function estimateGas(transaction) {
  return sendJsonRpcRequest("eth_estimateGas", [transaction]);
}

async function getGasPrice() {
  return sendJsonRpcRequest("eth_gasPrice", []);
}

async function getBalance(address) {
  return sendJsonRpcRequest("eth_getBalance", [address, "latest"]);
}

// Example usage
async function main() {
  try {
    const testAddress = "0xc5728a34c89e353ab21a06048010a3db37a460ef"; // Replace with your test address

    console.log("Getting account nonce...");
    const nonce = await getAccountNonce(testAddress);
    console.log("Nonce:", parseInt(nonce, 16));

    console.log("\nEstimating gas for a simple transfer...");
    const gasEstimate = await estimateGas({
      to: "0x1234567890123456789012345678901234567890",
      value: "0x1", // 1 wei
    });
    console.log("Estimated gas:", parseInt(gasEstimate, 16));

    console.log("\nGetting current gas price...");
    const gasPrice = await getGasPrice();
    console.log("Gas price:", parseInt(gasPrice, 16), "wei");

    console.log("\nChecking balance...");
    const balance = await getBalance(testAddress);
    console.log("Balance:", parseInt(balance, 16), "wei");
  } catch (error) {
    console.error("Error:", error.message);
  }
}

main();
