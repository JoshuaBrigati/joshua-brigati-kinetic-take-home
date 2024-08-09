"use client"

import CollectionGrid from "./collections"; 

export default function CollectionsPage() {
  return (
    <div
      className="flex flex-col pt-24 h-screen w-full max-w-[1280px] xl:mx-auto"
      style={{ height: "calc(100vh-60px)" }}
    >
      <CollectionGrid />
    </div>
  );
}