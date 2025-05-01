import { ThirdwebProvider, ConnectWallet, useContract, useContractWrite, useAddress } from "@thirdweb-dev/react";
import { useState } from "react";

const CONTRACT_ADDRESS = "SEU_CONTRATO_ADDRESS_AQUI";
const CLIENT_ID = "SEU_CLIENT_ID_AQUI";

function MintSection() {
  const address = useAddress();
  const { contract } = useContract(CONTRACT_ADDRESS);
  const { mutateAsync: mintTo } = useContractWrite(contract, "mintTo");
  const [loading, setLoading] = useState(false);

  const handleMint = async () => {
    if (!address) return alert("Connect your wallet first.");
    setLoading(true);
    try {
      const tx = await mintTo({ args: [address] });
      alert("NFT minted!");
    } catch (e) {
      console.error(e);
      alert("Minting failed.");
    }
    setLoading(false);
  };

  return (
    <div style={{ marginTop: 20 }}>
      <button
        onClick={handleMint}
        disabled={loading}
        style={{ padding: '10px 20px', backgroundColor: '#facc15', borderRadius: '8px', color: '#000' }}
      >
        {loading ? "Minting..." : "Mint Sun Peso – Argentina"}
      </button>
    </div>
  );
}

function App() {
  return (
    <ThirdwebProvider clientId={CLIENT_ID} activeChain="polygon">
      <div style={{ textAlign: "center", padding: 50 }}>
        <h1>🌍 WorldMint</h1>
        <p>Mint collectible NFT coins from every country.</p>
        <ConnectWallet />
        <MintSection />
      </div>
    </ThirdwebProvider>
  );
}

export default App;