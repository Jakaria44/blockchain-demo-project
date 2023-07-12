import { useContract, useContractRead } from "@thirdweb-dev/react";
import { ethers } from "ethers";

export default function CandidateList() {
  const { contract } = useContract("0xACDEC1C5e5c54F39cc0823B8Df33139cEfb7aB19");
  const { data, isLoading } = useContractRead(contract, "candidateList", [0]);

  
  return (
    <div>
        <h1>Candidate List</h1>
        {isLoading && <p>Loading...</p>}
       
        {!isLoading  && (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Vote Count</th>
              </tr>
            </thead>
            <tbody>
              {data.map((candidate, index) => (
                <tr key={index}>
                  <td>{ethers.utils.parseBytes32String(candidate)}</td>
                  <td>{}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
    </div>
  )
}