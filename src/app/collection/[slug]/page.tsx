"use client"

import React from "react";
import { VirtuosoGrid } from "react-virtuoso";
import { QueryFunction, QueryFunctionContext, useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import NFTCard from "@/components/nft-card";
import { useCart } from "@/hooks/use-cart";
import { Loader } from "lucide-react";
import { NFT } from "@/types";

interface APIResponse {
  nfts: NFT[];
  next: string | null;
}

type QueryKey = ["nfts", string];

const fetchNFTs: QueryFunction<APIResponse, QueryKey, string> = async ({
  pageParam,
  queryKey,
}: QueryFunctionContext<QueryKey, string>) => {
  const [_, collectionSlug] = queryKey;
  const response = await axios.get(`https://api.opensea.io/api/v2/collection/${collectionSlug}/nfts`, {
    params: {
      limit: 50,
      next: pageParam,
    },
    headers: {
      "X-API-KEY": "a61df3d92b424f67a4996a6620fdc0c6",
    },
  });
  return response.data;
};

const NFTPage = ({ params }: { params: { slug: string } }) => {
  const collectionSlug = params.slug;
  const { cart, addToCart, removeFromCart } = useCart();

  const handleCartClick = (nft: NFT) => {
    const inCart = cart.some(
      (item: { collection: string, identifier: string }) =>
        `${nft.collection}-${nft.identifier}` === `${item.collection}-${item.identifier}`
    );
    if (inCart) {
      removeFromCart.mutate(`${nft.cartId}`);
    } else {
      addToCart.mutate({ ...nft });
    }
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["nfts", collectionSlug] as const,
    queryFn: fetchNFTs,
    initialPageParam: "",
    getNextPageParam: (lastPage) => lastPage.next,
  });

  const loadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const allNFTs = data ? data.pages.flatMap((page) => page.nfts) : [];

  if (status === "pending") return (
    <div data-testid="loader" className="flex items-center justify-center h-screen">
      <Loader className="h-12 w-12 animate-spin text-primary" />
    </div>
  );
  if (status === "error") return (
    <div className="flex items-center justify-center h-screen">
      <h1 className="">Error fetching collections.</h1>
    </div>
  );

  return (
    <div className="flex flex-col pt-12 h-screen" style={{ height: "calc(100vh-60px)" }}>
      <VirtuosoGrid
        data-testid="virtuoso-grid"
        style={{ height: "100%", width: "100%" }}
        totalCount={allNFTs.length}
        overscan={50}
        endReached={loadMore}
        itemContent={(index) => {
          const nft = allNFTs[index];
          if (!nft) return null;
          return (
            <NFTCard
              key={`${nft.collection}-${nft.identifier}`}
              index={index}
              nft={nft}
              inCart={cart.some(
                (item: { collection: string, identifier: string }) =>
                  `${nft.collection}-${nft.identifier}` === `${item.collection}-${item.identifier}`
              )}
              handleCartClick={() => handleCartClick(nft)}
            />
          );
        }}
        listClassName="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-12"
      />
    </div>
  );
};

export default NFTPage;
