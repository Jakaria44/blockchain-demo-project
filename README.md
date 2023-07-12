# blockchain-demo-project: Voting System

This repository contains a voting system implemented using Solidity and React. The system allows users to vote for candidates and retrieve the candidate list as well as the winner.

## Setup

### Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)

### Installation

1. Create a new project using the `thirdweb` CLI:

   ```shell
   npx thirdweb@latest create --contract
    ```
2. Install the dotenv package:
    ```shell
   npm install dotenv
    ```
3. Create a `.env` file in the web3 directory and add the following line, replacing `<key from metamask>` with your private key from MetaMask:
    ```dotenv
   PRIVATE_KEY = <key from metamask>
    ```
4. Make sure to add .env to your .gitignore file.

5. Edit the hardhat.config.js file as follows:
    ```javascript
    require("@matterlabs/hardhat-zksync-solc");

    /** @type import('hardhat/config').HardhatUserConfig */
    module.exports = {
    zksolc: {
        version: "1.3.9",
        compilerSource: "binary",
        defaultNetwork : "sepolia",
        networks: {
        hardhat: {},
        sepolia : {
            url : "https://rpc.sepolia.dev",
            accounts : [`0x${process.env.PRIVATE_KEY}`],
        }
        },
        settings: {
        optimizer: {
            enabled: true,
        },
        },
    },
    networks: {
        zksync_testnet: {
        url: "https://zksync2-testnet.zksync.dev",
        ethNetwork: "goerli",
        chainId: 280,
        zksync: true,
        },
        zksync_mainnet: {
        url: "https://zksync2-mainnet.zksync.io/",
        ethNetwork: "mainnet",
        chainId: 324,
        zksync: true,
        },
    },
    paths: {
        artifacts: "./artifacts-zk",
        cache: "./cache-zk",
        sources: "./contracts",
        tests: "./test",
    },
    solidity: {
        version: "0.8.17",
        settings: {
        optimizer: {
            enabled: true,
            runs: 200,
        },
        },
    },
    };

    
    ```
6. Deploy the contract:
    ```shell
    npm run deploy

    ```
## Frontend Setup
1.  Open the specified URL in your browser and connect MetaMask using your private key.

2. To build the frontend, navigate to the build option.

3. In the build option, you will find the necessary code to connect with the contract.

4. In a terminal, navigate to your desired directory and create a new project using the thirdweb CLI:
    ```shell
    npx thirdweb create --app
    ```
5. Install the @thirdweb-dev/chains package:
    ```shell
    npm install @thirdweb-dev/chains
    ```
    - For the sepolia network, use the following settings:

        -RPC URL: sepolia.rpc.thirdweb.com
        -Chain ID: 11155111

6. Modify `main.jsx` as : 
    ```jsx
        import React from "react";
        import { createRoot } from "react-dom/client";
        import App from "./App";
        import {
        ThirdwebProvider,
        metamaskWallet,
        coinbaseWallet,
        walletConnect,
        } from "@thirdweb-dev/react";
        import { Sepolia } from "@thirdweb-dev/chains";
        // This is the chain your dApp will work on.
        // Change this to the chain your app is built for.
        // You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.

        const container = document.getElementById("root");
        const root = createRoot(container);
        root.render(
        <React.StrictMode>
            <ThirdwebProvider
            activeChain={Sepolia}
            supportedWallets={[metamaskWallet(), coinbaseWallet(), walletConnect()]}
            >
            <App />
            </ThirdwebProvider>
        </React.StrictMode>
        );

    ```

    For more information on setting up the connection, refer to the [ThirdWebProvider documentation](https://portal.thirdweb.com/react/react.thirdwebprovider#usage).
