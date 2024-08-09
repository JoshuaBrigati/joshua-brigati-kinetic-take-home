"use client"

import CollectionGrid from "./collections"; 

export default function CollectionsPage() {
  return (
    <div className="flex flex-col pt-24 h-screen" style={{ height: "calc(100vh-60px)" }}>
      <CollectionGrid />
    </div>
  );
}