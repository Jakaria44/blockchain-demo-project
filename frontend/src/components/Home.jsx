import { ConnectWallet, metamaskWallet } from "@thirdweb-dev/react";

import {ethers} from 'ethers';
import { useContract, useContractRead } from "@thirdweb-dev/react";
import { useEffect } from "react";

const Home = () => {

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
      
    </div>
  );
};

export default Home;
