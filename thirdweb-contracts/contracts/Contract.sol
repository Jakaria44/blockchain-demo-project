// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Contract {

  // Mapping from candidate name to vote count.
  mapping(string => uint256) public votesReceived;

  // List of candidates.
  string[] public candidateList;
  address[] public votersList;

  constructor(string[] memory candidateNames) public {
    candidateList = candidateNames;
  }


  function getCandidateList() public view returns (string[] memory ){
    return candidateList;
  }

  // Returns the total votes a candidate has received so far.
  function totalVotesFor(string memory candidate) view public returns (uint256) {
    require(validCandidate(candidate));
    return votesReceived[candidate];
  }

  // Increments the vote count for the specified candidate. This is equivalent to casting a vote.
  function voteForCandidate(string memory candidate) public {
    require(validCandidate(candidate), "Invalid candidate");
    require(validVoter(msg.sender), "Invalid voter");
    votersList.push( msg.sender );
    votesReceived[candidate] += 1;
  }
  // Returns true if the voter is a valid voter.
  function validVoter(address _voter) public view returns (bool) {
    for(uint i = 0; i<votersList.length; i++){
      if(votersList[i] == _voter){
        return false;
      }
    }
    return true;
  }

  // Returns true if the specified candidate is a valid candidate.
  // function validCandidate(string memory candidate) view public returns (bool) {
  //   string[] memory _candidateList = candidateList;
  //   for (uint i = 0; i < candidateList.length; i++) {
  //     if (_candidateList[i] === candidate) {
  //       return true;
  //     }
  //   }
  //   return false;
  // }
  function validCandidate(string memory candidate) public view returns (bool) {
    for (uint256 i = 0; i < candidateList.length; i++) {
        if (keccak256(abi.encodePacked(candidateList[i])) == keccak256(abi.encodePacked(candidate))) {
            return true;
        }
    }
    return false;
}


  // Returns the winner of the election.
  function getWinner() public view returns (string memory) {
    uint256 maxVotes = 0;
    string memory winner = "";
    for (uint i = 0; i < candidateList.length; i++) {
      uint256 votes = votesReceived[candidateList[i]];
      if (votes > maxVotes) {
        maxVotes = votes;
        winner = candidateList[i];
      }
    }
    return winner;
  }
}
