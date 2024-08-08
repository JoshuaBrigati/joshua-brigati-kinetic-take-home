"use client"

import { ShoppingCart, Trash, XIcon } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger, PopoverClose } from "./ui/popover"
import { Button } from "./ui/button"
import { useCart } from "@/hooks/use-cart";
import { Badge } from "./ui/badge";

const CartPopover = () => {
  const { cart, clearCart, removeFromCart } = useCart();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="secondary" size="icon">
          <ShoppingCart className="h-4 w-4" />
          <span className="sr-only">View cart</span>
        </Button>
      </PopoverTrigger>

      <PopoverContent align="end" className="p-0 bg-grey-700 border-grey-600 w-screen max-w-96 shadow-2xl">
        <div className="flex min-h-[420px] flex-col">
          <div className="flex items-center justify-between gap-2 p-4 pb-2">
            <div className="flex items-center gap-2">
              <h2 className="text-xl">Cart</h2>
              <Badge variant="secondary" size={"lg"}>
                {cart.length}
              </Badge>
            </div>
            <div className="flex items-center gap-1">
              <Button
                className="text-primary px-2"
                onClick={() => clearCart.mutate()}
                variant={"ghost"}
              >
                Clear all
              </Button>
              <Button variant={"secondary"} size={"icon"} asChild className="h-6 w-6 min-w-6">
                <PopoverClose className="">
                  <XIcon className="h-4 w-4" />
                </PopoverClose>
              </Button>
            </div>
          </div>
          <div className="flex max-h-[400px] grow flex-col overflow-y-auto px-4">
            {cart.map((item) => (
              item.identifier &&
              <div key={`${item.collection}-${item.identifier}`} className="group rounded-lg hover:bg-grey-500">
                <div className="group rounded-lg hover:bg-grey-500">
                  <div className="relative flex items-center gap-2 p-2">
                    <picture className="shrink-0">
                      <img
                        alt={`${item.collection}-${item.identifier} image`}
                        loading="lazy"
                        width="54"
                        height="54"
                        decoding="async"
                        data-nimg="1"
                        className="nft-image aspect-square overflow-hidden rounded-lg object-contain"
                        src={item.image_url || ""}
                        style={{color: "transparent"}}
                      />
                    </picture>
                    <div>
                      <h3 className="font-medium">{item.name}</h3>
                      <span className="text-grey-100">{item.identifier}</span>
                    </div>
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 scale-0 opacity-0 duration-300 group-hover:scale-100 group-hover:opacity-100">
                      <Button
                        variant={"secondary"}
                        size={"icon"}
                        onClick={() => removeFromCart.mutate(`${item.cartId}`)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex grow flex-col items-end gap-1 group-hover:hidden">
                      
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex flex-col gap-4 border-t border-white/10 p-4">
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-base text-grey-50">Total</h3>
              <div className="text-end [&amp;_*]:text-sm">
                <div className="flex items-center gap-1.5 overflow-hidden">
                  
                </div>
                <div className="muted">
                  <span>$22</span>
                </div>
              </div>
            </div>
            <button
              className="btn inline-flex shrink-0 whitespace-nowrap items-center border border-transparent justify-center text-sm [&amp;>span]:leading-[inherit] ring-offset-grey-900 transition-colors focus-visible:outline-none disabled:disabled-btn default-btn default-btn-size"
              type="button"
            >
              Checkout
            </button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default CartPopover
