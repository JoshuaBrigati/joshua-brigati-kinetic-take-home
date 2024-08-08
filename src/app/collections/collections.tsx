import React from "react";
import { VirtuosoGrid } from "react-virtuoso";
import { QueryFunctionContext, useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { Collection } from "@/types";
import CollectionCard from "@/components/collection-card";
import { Loader } from "lucide-react";

interface APIResponse {
  collections: Collection[];
  next: string;
}

const fetchCollections = async ({ pageParam = "" }: QueryFunctionContext): Promise<APIResponse> => {
  const response = await axios.get("https://api.opensea.io/api/v2/collections", {
    params: {
      chain_identifier: "ethereum",
      order_by: "market_cap",
      limit: 50,
      next: pageParam,
    },
    headers: {
      "X-API-KEY": "a61df3d92b424f67a4996a6620fdc0c6",
    },
  });
  return response.data;
};

const CollectionGrid: React.FC = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery<APIResponse, Error>({
    queryKey: ["collections"],
    queryFn: fetchCollections,
    initialPageParam: "",
    getNextPageParam: (lastPage) => lastPage.next,
  });

  const loadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const allCollections = data ? data.pages.flatMap((page) => page.collections) : [];

  if (status === "pending") return (
    <div className="flex items-center justify-center h-screen">
      <Loader className="h-12 w-12 animate-spin text-primary" />
    </div>
  );
  if (status === "error") return (
    <div className="flex items-center justify-center h-screen">
      <h1 className="">Error fetching collections.</h1>
    </div>
  );

  return (
    <VirtuosoGrid
      style={{ height: "100%", width: "100%" }}
      totalCount={allCollections.length}
      overscan={50}
      endReached={loadMore}
      itemContent={(index) => {
        const collection = allCollections[index];
        return collection ? <CollectionCard collection={collection} /> : null;
      }}
      listClassName="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-12"
    />
  );
};

export default CollectionGrid;