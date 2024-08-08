import { cartStorage } from "@/lib/cart-storage";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const cart = await cartStorage.getCart();
  return NextResponse.json(cart);
}

export async function POST(req: NextRequest) {
  const { nft } = await req.json();
  const updatedCart = await cartStorage.addToCart(nft);
  return NextResponse.json(updatedCart);
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const cartId = searchParams.get("cartId");
  if (cartId === "all") {
    const clearedCart = await cartStorage.clearCart();
    return NextResponse.json(clearedCart);
  }
  const updatedCart = await cartStorage.removeFromCart(Number(cartId));
  return NextResponse.json(updatedCart);
}
