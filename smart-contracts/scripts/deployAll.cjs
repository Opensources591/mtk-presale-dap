const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);

  // 1. Deploy Token
  const Token = await hre.ethers.getContractFactory("MTKToken");
  const token = await Token.deploy(1000000); // 1,000,000 supply
  await token.deployed();
  console.log("MTKToken deployed to:", token.address);

  // 2. Deploy Presale
  const Presale = await hre.ethers.getContractFactory("MTKPresale");
  const presale = await Presale.deploy(
    token.address,
    hre.ethers.parseEther("0.01") // 0.01 ETH per token
  );
  await presale.deployed();
  console.log("MTKPresale deployed to:", presale.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
