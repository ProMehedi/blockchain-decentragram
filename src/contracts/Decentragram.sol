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

  // Events
  event ImageCreated(uint indexed id, string hash, string description, uint tipAmount, address payable author);
  event ImageTipped(uint indexed id, string hash, string description, uint tipAmount, address payable author);

  // Upload Images
  function uploadImage(string memory _hash, string memory _description) public {
    require(bytes(_description).length> 0);
    require(bytes(_hash).length > 0);
    require(msg.sender != address(0));

    imageCount++;
    images[imageCount] = Image(imageCount, _hash, _description, 0, payable(msg.sender));

    emit ImageCreated(imageCount, _hash, _description, 0, payable(msg.sender));
  }

  // Tip Images
  function tipImageOwner(uint _id) public payable {
    require(_id > 0 && _id <= imageCount);

    Image memory _image = images[_id];
    _image.author.transfer(msg.value);
    _image.tipAmount += msg.value;
    images[_id] = _image;

    emit ImageTipped(_id, _image.hash, _image.description, _image.tipAmount, _image.author);
  }  
}