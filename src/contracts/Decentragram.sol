// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Decentragram {
  // Variables
  string public name = "Decentragram";
  mapping(uint => Image) public images;
  uint public imageCount = 0;

  // Structs
  struct Image {
    uint id;
    string hash;
    string description;
    uint tipAmount;
    address payable author;
  }

  // Upload Images
  function uploadImage(string memory _hash, string memory _description) public {
    imageCount++;
    images[imageCount] = Image(imageCount, _hash, _description, 0, payable(msg.sender));
  }
  
}