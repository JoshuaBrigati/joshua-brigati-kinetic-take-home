"use client"

import React from 'react';
import { VirtuosoGrid } from 'react-virtuoso';
import { QueryFunction, QueryFunctionContext, useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import NFTCard from '@/components/nft-card';
import { useCart } from '@/hooks/use-cart';

interface NFT {
  cartId: number
  collection: string
  contract: string
  description: string | null
  display_animation_url: string | null
  display_image_url: string | null
  identifier: string
  image_url: string | null
  is_disabled: boolean
  is_nsfw: boolean
  metadata_url: string | null
  name: string | null
  opensea_url: string | null
  token_standard: string | null
  updated_at: string
}

interface APIResponse {
  nfts: NFT[];
  next: string | null;
}

type QueryKey = ['nfts', string];

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
      'X-API-KEY': 'a61df3d92b424f67a4996a6620fdc0c6',
    },
  });
  return response.data;
};

const NFTPage = ({ params }: { params: { slug: string } }) => {
  const collectionSlug = params.slug;
  const { cart, addToCart, removeFromCart } = useCart();

  const handleCartClick = (nft: NFT) => {
    const inCart = cart.some((item: { collection: string, identifier: string }) => `${nft.collection}-${nft.identifier}` === `${item.collection}-${item.identifier}`);
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
    queryKey: ['nfts', collectionSlug] as const,
    queryFn: fetchNFTs,
    initialPageParam: '',
    getNextPageParam: (lastPage) => lastPage.next,
  });

  const loadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const allNFTs = data ? data.pages.flatMap((page) => page.nfts) : [];

  if (status === 'pending') return <div>Loading...</div>;
  if (status === 'error') return <div>Error fetching NFTs</div>;

  return (
    <div className="container mx-auto p-4 flex flex-col h-screen">
      <VirtuosoGrid
        style={{ height: '100%', width: '100%' }}
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
              inCart={cart.some((item: { collection: string, identifier: string }) => `${nft.collection}-${nft.identifier}` === `${item.collection}-${item.identifier}`)}
              handleCartClick={() => handleCartClick(nft)}
            />
          );
        }}
        listClassName="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
      />
    </div>
  );
};

export default NFTPage;