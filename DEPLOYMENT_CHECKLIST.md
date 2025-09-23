# 🚀 MTK Presale DApp – Sepolia Testing & Go/No-Go Checklist

## 1️⃣ Smart Contracts
- [ ] Deploy MTK Token contract on Sepolia
- [ ] Deploy Presale contract on Sepolia
- [ ] Verify contracts on Sepolia Etherscan
- [ ] Test minting & token transfers
- [ ] Test pausing/unpausing presale
- [ ] Confirm no hardcoded Sepolia addresses in contracts

## 2️⃣ Frontend
- [ ] Update `.env` with Sepolia contract addresses
- [ ] Connect MetaMask on Sepolia
- [ ] Open Codespaces public URL (port 5177) in browser
- [ ] Confirm wallet address displays correctly
- [ ] Confirm token balance updates after buying

## 3️⃣ Buy Tokens
- [ ] Buy small amount with Sepolia ETH
- [ ] Transaction confirmed in MetaMask
- [ ] Transaction appears on Sepolia Etherscan
- [ ] Balance updates in frontend

## 4️⃣ Admin Functions
- [ ] Connect as admin wallet
- [ ] Test pausing sale
- [ ] Test unpausing sale
- [ ] Test changing presale rate/cap (if available)

## 5️⃣ Error Handling
- [ ] Try buying with 0 ETH → shows error
- [ ] Try buying more than cap → shows error
- [ ] Test when sale is paused → transaction blocked
- [ ] Disconnect wallet → app handles it gracefully

## 6️⃣ Final Checks
- [ ] All functions ✅ on Sepolia
- [ ] No console errors in frontend
- [ ] Contracts + frontend behave as expected
- [ ] Ready to mark **Go** for mainnet deployment
