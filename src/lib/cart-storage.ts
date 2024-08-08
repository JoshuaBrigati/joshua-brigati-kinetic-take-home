import { NFT } from "@/types";
import { prisma } from "./database";

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