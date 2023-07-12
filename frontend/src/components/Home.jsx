import { ConnectWallet, metamaskWallet } from "@thirdweb-dev/react";

import {ethers} from 'ethers';
import { useContract, useContractRead } from "@thirdweb-dev/react";
import { useEffect } from "react";

const Home = () => {
  

  const { contract } = useContract("0x5A34F8dF70bBa6bbED9e736aa6883Ff2ff324Ed2");
  const { data, isLoading } = useContractRead(contract, "getWinner");
  const clicked= ()=>{
    console.log(data);
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
