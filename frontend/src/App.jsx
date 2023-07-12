import React, { useState , useEffect} from "react";
import {
  useContract,
  useContractRead,
  useContractWrite,
  Web3Button,
} from "@thirdweb-dev/react";
// import { Sepolia } from "@thirdweb-dev/chains";
// import { ThirdwebSDK } from "@thirdweb-dev/sdk/evm";

// const sdk = new ThirdwebSDK(Sepolia);
// const contractt = await sdk.getContract("0x26F06Cecd813C8515ED0f19dce0A3f333335fF02");
import { ethers } from "ethers";

import Home from "./components/home";
const App = () => {
  const [voting_error, setVotingError] =useState({
    error: false,
    message: "vote this",
  });
  const { contract } = useContract(
    "0x26F06Cecd813C8515ED0f19dce0A3f333335fF02"
  );
  
  const [selectedValue, setSelectedValue] =useState("");
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };
  const { data, isLoading, error1 } = useContractRead(
    contract,
    "getCandidateList"
  );
  useEffect(() => {
    if (!isLoading) {
      setSelectedValue(data[0]);
    }
  }, [isLoading, data]);
  const { mutateAsync: voteForCandidate, isLoadingVote } = useContractWrite(
    contract,
    "voteForCandidate"
  );
  
  const submitForm = async (event) => {
    event.preventDefault();
  
    try {
      const data = await voteForCandidate({
        args: [selectedValue],
      });
      console.log("contract call successs", data);
    } catch (err) {
      // const errorMessage = err.message.split("Reason:")[1]?.trim();
      // setVotingError({error:true,message:errorMessage});
      // // console.log( message);
      // console.error(err.message);
      console.log(err) ;
    } 
  };

  return (
    <div>
      <Home />
      {isLoading && <p>Loading...</p>}
      {!isLoading && (
        <form >
          <select onChange={handleChange} >
            {data.map((item, index) => (
              <option value={item} key={index}>
                {item}
              </option>
            ))}
          </select>
          <button type="submit" onClick={ submitForm}>Vote</button>
          
        </form>
      )}
      {voting_error.error && <p>{voting_error.message}</p>}
    </div>
  );
};

export default App;
