"use client"

import { NFT } from "@/types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export function useCart() {
  const queryClient = useQueryClient();

  const { data: cart = [] } = useQuery({
    queryKey: ["cart"],
    queryFn: () => axios.get("/api/cart").then(res => res.data as NFT[]),
  });

  const addToCart = useMutation({
    mutationFn: (nft: NFT) => 
      axios.post("/api/cart", { nft: { ...nft } }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cart"] }),
  });

  const removeFromCart = useMutation({
    mutationFn: (cartId: string) => axios.delete(`/api/cart?cartId=${cartId}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cart"] }),
  });

  const clearCart = useMutation({
    mutationFn: () => axios.delete("/api/cart?cartId=all"),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cart"] }),
  });

  return { cart, addToCart, removeFromCart, clearCart };
}