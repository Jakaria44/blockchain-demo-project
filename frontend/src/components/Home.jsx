import { ConnectWallet, metamaskWallet } from "@thirdweb-dev/react";

import {ethers} from 'ethers';
import { useContract, useContractRead } from "@thirdweb-dev/react";
import { useEffect } from "react";

// import { Sepolia } from "@thirdweb-dev/chains";
// import { ThirdwebSDK } from "@thirdweb-dev/sdk/evm";

// const sdk = new ThirdwebSDK(Sepolia);
// const contract = await sdk.getContract("0xACDEC1C5e5c54F39cc0823B8Df33139cEfb7aB19");
const Home = () => {
  

  const { contract } = useContract("0xACDEC1C5e5c54F39cc0823B8Df33139cEfb7aB19");
  const { data, isLoading } = useContractRead(contract, "getWinner");
  useEffect(()=>{
    console.log(data);
  }, [isLoading]);
  return (
    <div>
      <ConnectWallet
        dropdownPosition={{
          side: "right", // "top" | "bottom" | "left" | "right";
          align: "center", // "start" | "center" | "end";
        }}
        theme="dark"
        btnTitle="Connect Wallet"
      />
      {/* <Web3Button
        contractAddress="0xACDEC1C5e5c54F39cc0823B8Df33139cEfb7aB19"
        action={() => {
          handleClick();
        }}
        onSuccess={(result) => alert("Success!")}
      >
        contract
      </Web3Button> */}
      
    </div>
  );
};

export default Home;
