import { useContract, useContractRead } from "@thirdweb-dev/react";
import { ethers } from "ethers";

export default function CandidateList() {
  const { contract } = useContract(
    "0x5A34F8dF70bBa6bbED9e736aa6883Ff2ff324Ed2"
  );
  const { data, isLoading, error1 } = useContractRead(
    contract,
    "getCandidateList"
  );

  return (
    <div>
      <h1>Voting system</h1>
      <h2>Candidate List</h2>
      {isLoading && <p>Loading...</p>}
      {error1 && <p>error1...</p>}
      {!isLoading && (
        <div>
          <p>Names</p>
          <ul >
            {data.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
