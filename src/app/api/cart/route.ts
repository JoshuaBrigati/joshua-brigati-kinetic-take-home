import { NextApiRequest, NextApiResponse } from 'next';
import { cartStorage } from '@/lib/cart-storage';
import { NextRequest, NextResponse } from 'next/server';

// export default function handler(req: NextApiRequest, res: NextApiResponse) {
//   switch (req.method) {
//     case 'GET':
//       return res.status(200).json(cartStorage.getCart());
//     case 'POST':
//       const { nftId, index } = req.body;
//       return res.status(200).json(cartStorage.addToCart({ nftId, index }));
//     case 'DELETE':
//       const { nftId: deleteId } = req.query;
//       if (deleteId === 'all') {
//         return res.status(200).json(cartStorage.clearCart());
//       }
//       return res.status(200).json(cartStorage.removeFromCart(deleteId as string));
//     default:
//       res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
//       res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }

export async function GET(req: NextApiRequest) {
  return NextResponse.json(cartStorage.getCart())
  // return res.status(200).json(cartStorage.getCart());
}

export async function POST(req: NextRequest, res: NextApiResponse) {
  const { nft } = await req.json();
  console.log("🚀 ~ POST ~ nft:", nft)
  // console.log("🚀 ~ POST ~ nft:", nft)
  return NextResponse.json(cartStorage.addToCart({ ...nft }))
  // return res.status(200).json(cartStorage.addToCart({ nftId, index }));
}

export async function DELETE(req: NextApiRequest, res: NextApiResponse) {
  const { nftId: deleteId } = req.query;
  if (deleteId === 'all') {
    return NextResponse.json(cartStorage.clearCart())
    // return res.status(200).json(cartStorage.clearCart());
  }
  return NextResponse.json(cartStorage.removeFromCart(deleteId as string))
  // return res.status(200).json(cartStorage.removeFromCart(deleteId as string));
}
