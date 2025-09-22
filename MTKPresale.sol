// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MTKPresale is Ownable {
    IERC20 public token;
    uint256 public tokenPrice; // in wei per token
    address payable public wallet; // ETH receiver

    event TokensPurchased(address indexed buyer, uint256 amount, uint256 cost);

    constructor(address _token, uint256 _tokenPrice, address payable _wallet) {
        require(_token != address(0), "Invalid token address");
        require(_wallet != address(0), "Invalid wallet address");
        require(_tokenPrice > 0, "Price must be > 0");

        token = IERC20(_token);
        tokenPrice = _tokenPrice;
        wallet = _wallet;
    }

    // Users send ETH to buy MTK
    function buyTokens(uint256 tokenAmount) public payable {
        uint256 cost = tokenAmount * tokenPrice;
        require(msg.value == cost, "Incorrect ETH sent");
        require(token.balanceOf(address(this)) >= tokenAmount, "Not enough tokens in presale");

        // Transfer tokens to buyer
        token.transfer(msg.sender, tokenAmount);

        // Forward ETH to your wallet
        wallet.transfer(msg.value);

        emit TokensPurchased(msg.sender, tokenAmount, cost);
    }

    // Owner can update price if needed
    function setTokenPrice(uint256 _newPrice) external onlyOwner {
        require(_newPrice > 0, "Price must be > 0");
        tokenPrice = _newPrice;
    }

    // Emergency: withdraw unsold tokens
    function withdrawUnsoldTokens() external onlyOwner {
        uint256 balance = token.balanceOf(address(this));
        require(balance > 0, "No tokens to withdraw");
        token.transfer(owner(), balance);
    }
}
