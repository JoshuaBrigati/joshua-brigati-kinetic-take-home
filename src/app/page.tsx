"use client"

import { useState } from "react";
import NFTGrid from "./nft-grid";
import { cn } from "@/lib/utils";
import CollectionGrid from "./collections";

export default function Home() {
  return (
    <div className="container mx-auto p-4 flex flex-col h-screen">
      <CollectionGrid />
      {/* <NFTGrid /> */}
    </div>
  );
}
