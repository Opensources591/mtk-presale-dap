const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("🚀 Deploying contracts with:", deployer.address);
  console.log("💰 Account balance:", (await deployer.getBalance()).toString());

  // 1️⃣ Deploy MTKToken
  const MTKToken = await hre.ethers.getContractFactory("MTKToken");
  const token = await MTKToken.deploy(hre.ethers.utils.parseEther("1000000")); // 1,000,000 MTK
  await token.deployed();
  console.log("✅ MTKToken deployed at:", token.address);

  // 2️⃣ Deploy MTKPresale
  const MTKPresale = await hre.ethers.getContractFactory("MTKPresale");
  const presale = await MTKPresale.deploy(token.address, hre.ethers.utils.parseEther("0.001")); 
  await presale.deployed();
  console.log("✅ MTKPresale deployed at:", presale.address);

  // 3️⃣ Transfer tokens to presale contract
  const tx = await token.transfer(presale.address, hre.ethers.utils.parseEther("500000")); // 50% supply
  await tx.wait();
  console.log("📤 Sent 500,000 MTK to Presale contract");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
