import { ConnectWallet, metamaskWallet } from "@thirdweb-dev/react";

import {ethers} from 'ethers';
import { useContract, useContractRead } from "@thirdweb-dev/react";
import { useEffect } from "react";

const Home = () => {
  

  const { contract } = useContract("0xACDEC1C5e5c54F39cc0823B8Df33139cEfb7aB19");
  const { data, isLoading } = useContractRead(contract, "getWinner");
  const clicked= ()=>{
    console.log(ethers.utils.parseBytes32String(data));
  }
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
      <button onClick={clicked}>Connect</button>
      
    </div>
  );
};

export default Home;
