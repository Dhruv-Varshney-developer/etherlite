# EtherLite Crypto Wallet

## Project Overview
EtherLite is a cryptocurrency wallet developed from scratch, **without the use of any external libraries**. It provides a robust and user-friendly interface for managing Ethereum transactions and accounts.

## Key Features

### Wallet Management
- Ability to **create and import existing wallets** using private keys or mnemonic phrases.
- Secure storage of passwords using the browser's built-in **encryption capabilities**.

### Blockchain Interaction
- Implemented **node and data retrieval functions** for Ethereum interaction.
- Key pair generation and **address derivation** from public keys.
- **Mnemonic generation** using BIP-39 standards.

### Transaction Handling
- Raw transaction **creation, signing, and sending** executed manually without using external libraries.
- Functions for managing **account nonces** and estimating **gas requirements**.

### User Interface
- Developed a main wallet interface, including:
  - **Transaction creation and confirmation modals.**
  - **Portfolio screen** displaying live balance tracking.
- **Network selection dropdown** to switch between Ethereum networks seamlessly.

### Usability Enhancements
- Modals for sending and receiving transactions, with **clipboard copy functionality** for addresses.
- Custom RPC URL input for **additional network management**.


## Tech Stack

### Frontend
- **React**, Material UI, Framer Motion, and other libraries.

### Blockchain
- **BIP-39** for mnemonic generation.
- Crypto libraries like **Ethereumjs-util**.

### Cryptography
- Custom implementations for:
  - **Key pair generation.**
  - **Transaction signing.**

### Networks Supported
- **ETH Sepolia**
- **ETH Arbitrum Sepolia**
- **Polygon zkEVM**
- **Polygon amoy**
- **ETH Holesky**  

### Blockchain Node
- Powered by **Alchemy**.

