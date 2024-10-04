import fetch from "node-fetch";

const alchemy_api_key = "_eey_DCxuKpdcJYnMuAWPiIrhbIsozOX";
const NETWORK = "sepolia"; // or 'mainnet', 'sepolia', etc.
let ALCHEMY_URL = `https://eth-${NETWORK}.g.alchemy.com/v2/${alchemy_api_key}`;


// Function to update the ALCHEMY_URL based on dropdown selection
export function setNetworkUrl(baseurl) {
  ALCHEMY_URL = baseurl + alchemy_api_key;
}
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

// Function to check if an address is valid on Sepolia by checking its balance or transaction count
export async function validateAddressOnSepolia(address) {
  try {
    // Try to fetch the transaction count for the address
    const transactionCount = await sendJsonRpcRequest("eth_getTransactionCount", [address, "latest"]);

    // If a transaction count is returned, the address exists and is valid
    if (transactionCount) {
      return true; // Address is valid
    }

    // If no transaction count, the address is likely invalid (although this would rarely happen)
    return false;
  } catch (error) {
    console.error(`Error validating address ${address} on Sepolia:`, error);
    return false; // Invalid address or request failed
  }
}

export async function sendTransaction(serializedtransaction) {
  return sendJsonRpcRequest("eth_sendRawTransaction", [serializedtransaction]);
}

export const getBlockGasLimit = async () => {
  const latestBlock = await sendJsonRpcRequest(
   "eth_getBlockByNumber",
  ["latest", false],
  );
  return parseInt(latestBlock.gasLimit, 16);
};
