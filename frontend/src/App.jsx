import { useEffect, useState } from "react";
import { ethers } from "ethers";

// ⚠️ Replace with your deployed contract addresses
const TOKEN_ADDRESS = "0xYourTokenAddressHere";
const PRESALE_ADDRESS = "0xYourPresaleAddressHere";

// ⚠️ Replace with your deployer (admin) wallet
const ADMIN_ADDRESS = "0xYourAdminWalletHere";

// ABI fragments (just the functions we need)
const PRESALE_ABI = [
  "function buyTokens(uint256 tokenAmount) public payable",
  "function tokenPrice() public view returns (uint256)",
  "function setTokenPrice(uint256 _newPrice) external",
  "function withdrawUnsoldTokens() external",
];

const TOKEN_ABI = [
  "function balanceOf(address) view returns (uint256)",
  "function decimals() view returns (uint8)"
];

function App() {
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const [presale, setPresale] = useState(null);
  const [token, setToken] = useState(null);
  const [price, setPrice] = useState("0");
  const [amount, setAmount] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  // Connect to MetaMask
  const connectWallet = async () => {
    if (window.ethereum) {
      const prov = new ethers.providers.Web3Provider(window.ethereum);
      await prov.send("eth_requestAccounts", []);
      const signer = prov.getSigner();
      const addr = await signer.getAddress();

      setAccount(addr);
      setProvider(prov);

      // Load contracts
      const presaleContract = new ethers.Contract(PRESALE_ADDRESS, PRESALE_ABI, signer);
      const tokenContract = new ethers.Contract(TOKEN_ADDRESS, TOKEN_ABI, signer);
      setPresale(presaleContract);
      setToken(tokenContract);

      // Check if admin
      if (addr.toLowerCase() === ADMIN_ADDRESS.toLowerCase()) {
        setIsAdmin(true);
      }
    }
  };

  // Load token price
  const loadPrice = async () => {
    if (presale) {
      const p = await presale.tokenPrice();
      setPrice(ethers.utils.formatEther(p));
    }
  };

  // Buy tokens
  const buy = async () => {
    if (!presale || !amount) return;
    const cost = ethers.utils.parseEther((parseFloat(price) * parseInt(amount)).toString());
    const tx = await presale.buyTokens(amount, { value: cost });
    await tx.wait();
    alert(`Bought ${amount} MTK!`);
  };

  // Admin: update price
  const updatePrice = async (newPrice) => {
    const tx = await presale.setTokenPrice(ethers.utils.parseEther(newPrice));
    await tx.wait();
    alert(`Token price updated to ${newPrice} ETH`);
    loadPrice();
  };

  // Admin: withdraw unsold tokens
  const withdrawTokens = async () => {
    const tx = await presale.withdrawUnsoldTokens();
    await tx.wait();
    alert("Unsold tokens withdrawn!");
  };

  useEffect(() => {
    if (presale) {
      loadPrice();
    }
  }, [presale]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>🚀 MTK Presale DApp</h1>
      {!account ? (
        <button onClick={connectWallet}>Connect MetaMask</button>
      ) : (
        <div>
          <p>Connected: {account}</p>
          <p>Price per token: {price} ETH</p>

          {/* Buy section */}
          <input
            type="number"
            placeholder="Amount of MTK"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <button onClick={buy}>Buy Tokens</button>

          {/* Admin panel */}
          {isAdmin && (
            <div style={{ marginTop: "20px", borderTop: "1px solid gray", paddingTop: "10px" }}>
              <h3>⚙️ Admin Panel</h3>
              <button onClick={() => updatePrice("0.002")}>Set Price to 0.002 ETH</button>
              <button onClick={withdrawTokens}>Withdraw Unsold Tokens</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
