pragma solidity ^0.4.16;

contract Vote {
  struct Candidate {
    uint voteCount;
  }
  
  Candidate[] public candidates;
  
  function Vote() public {
    for (uint i = 0; i < 3; ++i) {
      candidates.push(Candidate({ voteCount: 0 }));
    }
  }
  
  function getCurrentVote(uint candidateIndex) public constant returns (uint) {
    return candidates[candidateIndex].voteCount;
  }
  
  function voteCandidate(uint candidateIndex) public {
    candidates[candidateIndex].voteCount += 1;
  }
}