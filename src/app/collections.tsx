import React from 'react';
import { VirtuosoGrid } from 'react-virtuoso';
import { QueryFunctionContext, useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface Collection {
  collection: string;
  name: string;
  description: string | null;
  image_url: string | null;
  banner_image_url: string | null;
  owner: string;
  safelist_status: string;
  category: string;
  is_disabled: boolean;
  is_nsfw: boolean;
  trait_offers_enabled: boolean;
  collection_offers_enabled: boolean;
  opensea_url: string;
  project_url: string | null;
  wiki_url: string | null;
  discord_url: string | null;
  telegram_url: string | null;
  twitter_username: string | null;
  instagram_username: string | null;
  contracts: {
    address: string;
    chain: string;
  }[]
}

interface APIResponse {
  collections: Collection[];
  next: string;
}

const fetchCollections = async ({ pageParam = '' }: QueryFunctionContext): Promise<APIResponse> => {
  const response = await axios.get('https://api.opensea.io/api/v2/collections', {
    params: {
      chain_identifier: 'ethereum',
      order_by: 'market_cap',
      limit: 50,
      next: pageParam,
    },
    headers: {
      'X-API-KEY': 'a61df3d92b424f67a4996a6620fdc0c6',
    },
  });
  return response.data;
};

const CollectionCard: React.FC<{ collection: Collection }> = ({ collection }) => (
  <div className="group relative overflow-hidden rounded-lg bg-grey-700 shadow-sm border-[2px] border-grey-700">
    <div className="relative">
      <img
        alt={collection.name}
        src={collection.image_url || "/placeholder.png"}
        className="w-full h-48 object-cover"
      />
      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <Button variant="default" size="sm" asChild>
          <Link
            href={`/collection/${collection.collection}`}
            passHref
          >
            View Collection
          </Link>
        </Button>
      </div>
    </div>
    <div className="p-4">
      <h3 className="text-lg font-semibold truncate">{collection.name}</h3>
      <p className="text-sm text-gray-400 truncate">{collection.description}</p>
    </div>
  </div>
);

const CollectionGrid: React.FC = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery<APIResponse, Error>({
    queryKey: ['collections'],
    queryFn: fetchCollections,
    initialPageParam: '',
    getNextPageParam: (lastPage) => lastPage.next,
  });

  const loadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const allCollections = data ? data.pages.flatMap((page) => page.collections) : [];

  if (status === 'pending') return <div>Loading...</div>;
  if (status === 'error') return <div>Error fetching collections</div>;

  return (
    <VirtuosoGrid
      style={{ height: '100%', width: '100%' }}
      totalCount={allCollections.length}
      overscan={50}
      endReached={loadMore}
      itemContent={(index) => {
        const collection = allCollections[index];
        return collection ? <CollectionCard collection={collection} /> : null;
      }}
      listClassName="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
    />
  );
};

export default CollectionGrid;