import { prisma } from './database'

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

export const cartStorage = {
  getCart: async () => {
    try {
      return await prisma.cart.findMany();
    } catch (error) {
      console.error("Error getting cart:", error);
      return [];
    }
  },
  addToCart: async (item: NFT) => {
    try {
      await prisma.cart.create({
        data: {
          ...item
        },
      });
      return await prisma.cart.findMany();
    } catch (error) {
      console.error("Error adding to cart:", error);
      return [];
    }
  },
  removeFromCart: async (cartId: number) => {
    try {
      await prisma.cart.deleteMany({
        where: { cartId },
      });
      return await prisma.cart.findMany();
    } catch (error) {
      console.error("Error removing from cart:", error);
      return [];
    }
  },
  clearCart: async () => {
    try {
      await prisma.cart.deleteMany();
      return [];
    } catch (error) {
      console.error("Error clearing cart:", error);
      return [];
    }
  }
};