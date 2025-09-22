const hre = require("hardhat");

async function main() {
  const [buyer] = await hre.ethers.getSigners();

  // ⚠️ Replace this with your actual deployed Presale contract address
  const PRESALE_ADDRESS = "0xYourPresaleAddressHere";

  // Load the Presale contract
  const MTKPresale = await hre.ethers.getContractFactory("MTKPresale");
  const presale = MTKPresale.attach(PRESALE_ADDRESS);

  // Example: Buy 100 tokens
  const tokenAmount = hre.ethers.BigNumber.from("100");
  const tokenPrice = hre.ethers.utils.parseEther("0.001"); // must match your presale price
  const cost = tokenPrice.mul(tokenAmount);

  console.log(`🛒 Buying ${tokenAmount} MTK for ${hre.ethers.utils.formatEther(cost)} ETH...`);

  const tx = await presale.buyTokens(tokenAmount, { value: cost });
  await tx.wait();

  console.log("✅ Purchase successful!");
  console.log(`Buyer: ${buyer.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
