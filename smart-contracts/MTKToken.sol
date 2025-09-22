// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Import OpenZeppelin ERC20 implementation
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MTKToken is ERC20, Ownable {
    constructor(uint256 initialSupply) ERC20("MTK Token", "MTK") {
        // Mint the total supply to the deployer's address
        _mint(msg.sender, initialSupply);
    }
}
