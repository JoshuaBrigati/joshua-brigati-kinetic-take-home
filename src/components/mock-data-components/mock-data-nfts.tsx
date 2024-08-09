import { VirtuosoGrid } from "react-virtuoso";
import NFTCard from "@/components/cards/nft-card";
import { useCart } from "@/hooks/use-cart";
import { NFT } from "@/types";
import { nfts } from "@/data/nfts";

const MockDataNFTs = () => {
  const { cart, addToCart, removeFromCart } = useCart();

  const handleCartClick = (nft: NFT) => {
    const inCart = cart.some(
      (item: { collection: string, identifier: string }) =>
        `${nft.collection}-${nft.identifier}` === `${item.collection}-${item.identifier}`
    );
    if (inCart) {
      const cartItem = cart.find(
        (item: { collection: string, identifier: string }) =>
          `${nft.collection}-${nft.identifier}` === `${item.collection}-${item.identifier}`
      );
      if (!cartItem) return;
      removeFromCart.mutate(`${cartItem.cartId}`);
    } else {
      addToCart.mutate({ ...nft });
    }
  };

  return (
    <div className="flex flex-col h-screen" style={{ height: "calc(100vh-60px)" }}>
      <VirtuosoGrid
        style={{ height: "100%", width: "100%" }}
        totalCount={nfts.length}
        itemContent={(index) => {
          const nft = nfts[index];
          if (!nft) return null;
          return (
            <NFTCard
              index={index}
              nft={nft}
              inCart={cart.some(
                (item: { collection: string, identifier: string }) =>
                  `${nft.collection}-${nft.identifier}` === `${item.collection}-${item.identifier}`
              )}
              handleCartClick={() => handleCartClick(nft)}
            />
          );
        }}
        listClassName="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 px-12"
      />
    </div>
  )
}

export default MockDataNFTs
