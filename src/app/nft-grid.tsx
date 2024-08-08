"use client"

import React from 'react';
import { VirtuosoGrid } from 'react-virtuoso';
import { QueryFunctionContext, useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import NFTCard from '@/components/nft-card';
import { useCart } from '@/hooks/use-cart';

interface NFT {
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
  assets: NFT[];
  next: string | null;
}

const fetchNFTs = async ({ pageParam = '' }: QueryFunctionContext): Promise<APIResponse> => {
  const response = await axios.get(`https://api.opensea.io/api/v2/collection/${"kanpai-pandas"}/nfts`, {
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

const NFTGrid = () => {
  const { cart, addToCart, removeFromCart } = useCart();

  const handleCartClick = (nft: NFT, index: number) => {
    const inCart = cart.some((item: { collection: string, identifier: string }) => `${nft.collection}-${nft.identifier}` === `${item.collection}-${item.identifier}`);
    if (inCart) {
      removeFromCart.mutate(nft.identifier);
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
  } = useInfiniteQuery<APIResponse, Error>({
    queryKey: ['nfts'],
    queryFn: fetchNFTs,
    initialPageParam: '',
    getNextPageParam: (lastPage: APIResponse) => lastPage.next,
  });

  const loadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const allNFTs = data ? data.pages.flatMap((page: any) => page.nfts) : [];

  if (status === 'pending') return <div>Loading...</div>;
  if (status === 'error') return <div>Error fetching NFTs</div>;

  return (
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
            index={index}
            nft={nft}
            inCart={cart.some((item: { collection: string, identifier: string }) => `${nft.collection}-${nft.identifier}` === `${item.collection}-${item.identifier}`)}
            handleCartClick={() => handleCartClick(nft, index)}
          />
        );
      }}
      listClassName="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
    />
  );
};

export default NFTGrid;