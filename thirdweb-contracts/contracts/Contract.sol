// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Contract {

  // Mapping from candidate name to vote count.
  mapping(bytes32 => uint256) public votesReceived;

  // List of candidates.
  bytes32[] public candidateList;

  constructor(bytes32[] memory candidateNames) public {
    candidateList = candidateNames;
  }

  // Returns the total votes a candidate has received so far.
  function totalVotesFor(bytes32 candidate) view public returns (uint256) {
    require(validCandidate(candidate));
    return votesReceived[candidate];
  }

  // Increments the vote count for the specified candidate. This is equivalent to casting a vote.
  function voteForCandidate(bytes32 candidate) public {
    require(validCandidate(candidate));
    votesReceived[candidate] += 1;
  }

  // Returns true if the specified candidate is a valid candidate.
  function validCandidate(bytes32 candidate) view public returns (bool) {
    for (uint i = 0; i < candidateList.length; i++) {
      if (candidateList[i] == candidate) {
        return true;
      }
    }
    return false;
  }

  // Returns the winner of the election.
  function getWinner() public view returns (bytes32) {
    uint256 maxVotes = 0;
    bytes32 winner = "";
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
