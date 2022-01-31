// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC777/ERC777.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";

contract Mindu is ERC777, Ownable {
  constructor(uint256 initialSupply, address[] memory defaultOperators)
    ERC777("Mindu Token", "MINDU", defaultOperators)
  {
    _mint(msg.sender, initialSupply, "", "");
  }
}
