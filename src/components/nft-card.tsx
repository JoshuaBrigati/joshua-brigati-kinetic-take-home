
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Check, Plus } from "lucide-react";
import { NFT } from "@/types";

interface NFTCardProps {
  index: number;
  nft: NFT;
  inCart: boolean;
  handleCartClick: (nft: NFT) => void;
}

const NFTCard = ({
  index,
  nft,
  inCart,
  handleCartClick
}: NFTCardProps) => {
  return (
    <div className="group relative overflow-hidden">
      <div data-testid="nft-card" className={cn(
        "overflow-hidden rounded-lg bg-grey-700 shadow-sm border-[2px] relative border-grey-700",
        inCart ? "border-[2px] border-primary" : "border-grey-700"
      )}>
        <div className="relative">
          <div className="rounded-b-none">
            <img
              alt={nft.identifier}
              loading="eager"
              width="420"
              height="420"
              decoding="async"
              className="aspect-square overflow-hidden rounded-t-lg object-cover group-hover:scale-110 transition-transform duration-300"
              src={nft.image_url || ""}
            />
          </div>
        </div>
        <div className="p-2.5 min-h-16">
          <h3 className="truncate text-lg">{nft.name || nft.identifier}</h3>
          <span className="text-grey-100 text-md">{nft.identifier}</span>
        </div>
        <div className="absolute right-2 top-2">
          {inCart ? (
            <Button
              className="whitespace-nowrap ring-offset-grey-900 focus-visible:outline-none h-8 w-8 rounded-full border-grey-0/[0.16] bg-grey-700/60 p-0 text-primary duration-300 hover:bg-grey-700/85"
              type="button"
              onClick={() => handleCartClick(nft)}
              data-testid={`remove-from-cart-${nft.identifier}`}
            >
              <Check className="h-4 w-4" />
              <span className="sr-only">Remove from cart</span>
            </Button>
          ) : (
            <Button
              className="ring-offset-grey-900 focus-visible:outline-none h-8 w-8 rounded-full border-grey-0/[0.16] bg-grey-700/[0.6] p-0 text-primary duration-300 hover:bg-grey-700/[0.85] scale-0 transition-transform ease-out group-hover:scale-100"
              type="button"
              onClick={() => handleCartClick(nft)}
              data-testid={`add-to-cart-${nft.identifier}`}
            >
              <Plus className="h-4 w-4" />
              <span className="sr-only">Add to cart</span>
            </Button>
          )}
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 translate-y-full duration-300 group-hover:translate-y-0">
        <div className="m-0.5 flex gap-1 rounded-b-lg bg-grey-700 p-3">
          <Button variant={"default"} size={"lg"} className="w-full">Buy now</Button>
        </div>
      </div>
    </div>
  );
}

export default NFTCard;
