
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { Check, Plus } from 'lucide-react';

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

const NFTCard = ({ index, nft, inCart, handleCartClick }: { index: number, nft: NFT, inCart: boolean, handleCartClick: (index: number) => void  }) => {
  return (
    <div>
      <div className="group relative overflow-hidden">
        <div className={cn(
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
            <div className="flex items-center justify-between gap-4">
              <h3 className="truncate text-lg">{nft.identifier}</h3>
            </div>
          </div>
          <div className="absolute right-2 top-2">
            {inCart ? (
              <Button
                className="whitespace-nowrap ring-offset-grey-900 focus-visible:outline-none h-8 w-8 rounded-full border-grey-0/[0.16] bg-grey-700/60 p-0 text-primary duration-300 hover:bg-grey-700/85"
                type="button"
                onClick={() => handleCartClick(index)}
              >
                <Check className="h-4 w-4" />
                <span className="sr-only">Remove from cart</span>
              </Button>
            ) : (
              <Button
                className="ring-offset-grey-900 focus-visible:outline-none h-8 w-8 rounded-full border-grey-0/[0.16] bg-grey-700/[0.6] p-0 text-primary duration-300 hover:bg-grey-700/[0.85] scale-0 transition-transform ease-out group-hover:scale-100"
                type="button"
                onClick={() => handleCartClick(index)}
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
    </div>  
  );
}

export default NFTCard;
