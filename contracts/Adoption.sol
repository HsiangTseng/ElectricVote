pragma solidity ^0.4.4;

contract Adoption {
  address voter;
  mapping (address => int) tickets;
  mapping (uint => int) total;
  address[16] public adopters;
  function Adoption(){
    voter = msg.sender;
  }
  // Adopting a pet
  function adopt(uint petId) public returns (uint) {
    require(petId >= 0 && petId <= 15);
    adopters[petId] = msg.sender;
    //tickets[msg.sender] -= 60;
    //total[petId] = 0;
    return petId;
  }

  // ABC
  function getToto() public returns (address[16]) {
    return adopters;
    }

  // Retrieving the adopters
  function getAdopters() public returns (address[16]) {
    return adopters;
    }
}
