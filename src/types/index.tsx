export interface Collection {
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

export interface NFT {
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