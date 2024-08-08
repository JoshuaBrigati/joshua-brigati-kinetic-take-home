"use client"

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

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

export function useCart() {
  const queryClient = useQueryClient();

  const { data: cart = [] } = useQuery({
    queryKey: ['cart'],
    queryFn: () => axios.get('/api/cart').then(res => res.data as NFT[]),
  });

  const addToCart = useMutation({
    mutationFn: (nft: NFT) => 
      axios.post('/api/cart', { nft: { ...nft } }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cart'] }),
  });

  const removeFromCart = useMutation({
    mutationFn: (cartId: string) => axios.delete(`/api/cart?cardId=${cartId}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cart'] }),
  });

  const clearCart = useMutation({
    mutationFn: () => axios.delete('/api/cart?nftId=all'),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cart'] }),
  });

  return { cart, addToCart, removeFromCart, clearCart };
}