import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import CartPopover from "@/components/cart-popover";
import { useCart } from "@/hooks/use-cart";

jest.mock("@/hooks/use-cart", () => ({
  useCart: jest.fn(),
}));

jest.mock("@/components/ui/popover", () => ({
  Popover: ({ children }: any) => <div data-testid="popover">{children}</div>,
  PopoverTrigger: ({ children }: any) => <div data-testid="popover-trigger">{children}</div>,
  PopoverContent: ({ children }: any) => <div data-testid="popover-content">{children}</div>,
  PopoverClose: ({ children }: any) => <div data-testid="popover-close">{children}</div>,
}));

jest.mock("@/components/ui/button", () => ({
  Button: ({ children, onClick }: any) => <button onClick={onClick}>{children}</button>,
}));

jest.mock("@/components/ui/badge", () => ({
  Badge: ({ children }: any) => <span data-testid="badge">{children}</span>,
}));

jest.mock("lucide-react", () => ({
  ShoppingCart: () => <span>ShoppingCart</span>,
  Trash: () => <span>Trash</span>,
  XIcon: () => <span>XIcon</span>,
}));

describe("CartPopover", () => {
  const mockCart = [
    { cartId: "1", collection: "collection1", identifier: "001", name: "NFT 1", image_url: "image1.jpg" },
    { cartId: "2", collection: "collection2", identifier: "002", name: "NFT 2", image_url: "image2.jpg" },
  ];

  const mockClearCart = { mutate: jest.fn() };
  const mockRemoveFromCart = { mutate: jest.fn() };

  beforeEach(() => {
    (useCart as jest.Mock).mockReturnValue({
      cart: mockCart,
      clearCart: mockClearCart,
      removeFromCart: mockRemoveFromCart,
    });
  });

  it("renders the cart button", () => {
    render(<CartPopover />);
    expect(screen.getByText("View cart")).toBeInTheDocument();
  });

  it("displays the correct number of items in the cart", () => {
    render(<CartPopover />);
    expect(screen.getByTestId("badge")).toHaveTextContent("2");
  });

  it("renders cart items", () => {
    render(<CartPopover />);
    expect(screen.getByText("NFT 1")).toBeInTheDocument();
    expect(screen.getByText("NFT 2")).toBeInTheDocument();
  });

  it(`calls clearCart when "Clear all" button is clicked`, () => {
    render(<CartPopover />);
    fireEvent.click(screen.getByText("Clear all"));
    expect(mockClearCart.mutate).toHaveBeenCalled();
  });

  it("calls removeFromCart when trash icon is clicked for an item", async () => {
    render(<CartPopover />);
    const trashButtons = screen.getAllByText("Trash");
    fireEvent.click(trashButtons[0]);
    await waitFor(() => {
      expect(mockRemoveFromCart.mutate).toHaveBeenCalledWith("1");
    });
  });

  it("displays the correct total price", () => {
    render(<CartPopover />);
    expect(screen.getByText("$420")).toBeInTheDocument();
  });

  it("renders the checkout button", () => {
    render(<CartPopover />);
    expect(screen.getByText("Checkout")).toBeInTheDocument();
  });

  it("renders images for cart items", () => {
    render(<CartPopover />);
    const images = screen.getAllByRole("img");
    expect(images).toHaveLength(2);
    expect(images[0]).toHaveAttribute("src", "image1.jpg");
    expect(images[1]).toHaveAttribute("src", "image2.jpg");
  });

  it("handles items without image_url", () => {
    const cartWithoutImage = [...mockCart, { cartId: "3", collection: "collection3", identifier: "003", name: "NFT 3" }];
    (useCart as jest.Mock).mockReturnValue({
      cart: cartWithoutImage,
      clearCart: mockClearCart,
      removeFromCart: mockRemoveFromCart,
    });

    render(<CartPopover />);
    const images = screen.getAllByRole("img");
    expect(images).toHaveLength(3);
    expect(images[2]).toHaveAttribute("src", "");
  });

  it("does not render items without identifier", () => {
    const cartWithInvalidItem = [...mockCart, { cartId: "3", collection: "collection3", name: "Invalid NFT" }];
    (useCart as jest.Mock).mockReturnValue({
      cart: cartWithInvalidItem,
      clearCart: mockClearCart,
      removeFromCart: mockRemoveFromCart,
    });

    render(<CartPopover />);
    expect(screen.queryByText("Invalid NFT")).not.toBeInTheDocument();
  });
});