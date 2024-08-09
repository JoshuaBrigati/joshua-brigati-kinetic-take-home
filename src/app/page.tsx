"use client"

import Slider from "@/components/mock-data-components/mock-collections-slider";
import MockDataNFTs from "@/components/mock-data-components/mock-data-nfts";

export default function Home() {
  return (
    <div className="flex flex-col gap-20 pt-24 h-screen max-w-[1280px] xl:mx-auto" style={{ height: "calc(100vh-60px)" }}>
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold px-12">Collections</h1>
        <Slider />
      </div>
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold px-12">Quick add NFTs</h1>
        <MockDataNFTs />
      </div>
    </div>
  );
}
