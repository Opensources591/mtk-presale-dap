const hre = require("hardhat");

// ✅ Set your parameters here
const TOTAL_SUPPLY = "1000000";   // Total MTK tokens
const PRESALE_SUPPLY = "500000";  // Amount sent to presale
const TOKEN_PRICE_ETH = "0.001";  // Price per token in ETH
const WALLET = process.env.RECEIVER_WALLET; // Your MetaMask address (from .env)

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("🚀 Deploying contracts with:", deployer.address);
  console.log("💰 Account balance:", (await deployer.getBalance()).toString());

  // 1️⃣ Deploy MTKToken
  const MTKToken = await hre.ethers.getContractFactory("MTKToken");
  const token = await MTKToken.deploy(
    hre.ethers.utils.parseUnits(TOTAL_SUPPLY, 18)
  );
  await token.deployed();
  console.log("✅ MTKToken deployed at:", token.address);

  // 2️⃣ Deploy MTKPresale
  const MTKPresale = await hre.ethers.getContractFactory("MTKPresale");
  const presale = await MTKPresale.deploy(
    token.address,
    hre.ethers.utils.parseEther(TOKEN_PRICE_ETH),
    WALLET
  );
  await presale.deployed();
  console.log("✅ MTKPresale deployed at:", presale.address);

  // 3️⃣ Transfer tokens to presale contract
  const tx = await token.transfer(
    presale.address,
    hre.ethers.utils.parseUnits(PRESALE_SUPPLY, 18)
  );
  await tx.wait();
  console.log(`📤 Sent ${PRESALE_SUPPLY} MTK to Presale contract`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
