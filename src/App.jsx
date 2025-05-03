import {
  ThirdwebProvider,
  ConnectWallet,
  useContract,
  useContractWrite,
  useAddress,
} from "@thirdweb-dev/react";
import { useState, useEffect } from "react";

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
        style={{
          padding: "10px 20px",
          backgroundColor: "#facc15",
          borderRadius: "8px",
          color: "#000",
        }}
      >
        {loading ? "Minting..." : "Mint WorldMint NFT"}
      </button>
    </div>
  );
}

function App() {
  const [metadata, setMetadata] = useState(null);

  useEffect(() => {
    fetch("/metadata-argentina.json")
      .then((res) => res.json())
      .then((data) => setMetadata(data));
  }, []);

  return (
    <ThirdwebProvider clientId={CLIENT_ID} activeChain="polygon">
      <div style={{ textAlign: "center", padding: 50 }}>
        <h1>🌍 WorldMint</h1>
        <p>Mint your global coin NFT.</p>
        <ConnectWallet />
        <MintSection />

        {metadata && (
          <div style={{ marginTop: 30 }}>
            <h2>{metadata.name}</h2>
            <img
              src={metadata.image}
              alt={metadata.name}
              width="300"
              style={{ borderRadius: "16px" }}
            />
            <p>{metadata.description}</p>
          </div>
        )}
      </div>
    </ThirdwebProvider>
  );
}

export default App;
