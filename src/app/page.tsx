"use client"

import NFTGrid from "./nft-grid";

export default function Home() {
  return (
    <div className="container mx-auto p-4 flex flex-col h-screen">
      <h1 className="text-3xl font-bold mb-4">NFT Collection</h1>
      <NFTGrid />
    </div>
  );
}
