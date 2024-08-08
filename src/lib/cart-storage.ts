interface CartItem {
  nftId: string;
  index: number;
}

let cart: CartItem[] = [];

export const cartStorage = {
  getCart: () => cart,
  addToCart: (item: CartItem) => {
    cart.push(item);
    return cart;
  },
  removeFromCart: (nftId: string) => {
    cart = cart.filter(item => item.nftId !== nftId);
    return cart;
  },
  clearCart: () => {
    cart = [];
    return cart;
  }
};
