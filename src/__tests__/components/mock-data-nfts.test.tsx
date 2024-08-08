import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@testing-library/jest-dom";
import MockDataNFTs from "@/components/mock-data-nfts";
import { useCart } from "@/hooks/use-cart";
import { nfts } from "@/data/nfts";

jest.mock("@/hooks/use-cart");
jest.mock("react-virtuoso", () => ({
  VirtuosoGrid: ({ itemContent, totalCount }: any) => (
    <div data-testid="virtuoso-grid" style={{ height: "100%", width: "100%" }}>
      {[...Array(totalCount)].map((_, index) => (
        <div key={index}>{itemContent(index)}</div>
      ))}
    </div>
  ),
}));
jest.mock("@/components/nft-card", () => ({
  __esModule: true,
  default: ({ nft, handleCartClick }: any) => (
    <div data-testid={`nft-card-${nft.identifier}`} onClick={() => handleCartClick(nft)}>
      {nft.name}
    </div>
  ),
}));
jest.mock("@/data/nfts", () => ({
  nfts: [
    { cartId: 0, identifier: "1", name: "NFT 1", collection: "collection1" },
    { cartId: 1, identifier: "2", name: "NFT 2", collection: "collection2" },
  ],
}));

const mockUseCart = useCart as jest.MockedFunction<typeof useCart>;

describe("MockDataNFTs", () => {
  const queryClient = new QueryClient();

  beforeEach(() => {
    mockUseCart.mockReturnValue({
      cart: [],
      addToCart: { mutate: jest.fn() },
      removeFromCart: { mutate: jest.fn() },
    } as any);
  });

  it("renders the VirtuosoGrid", () => {
    render(<MockDataNFTs />);
    expect(screen.getByTestId("virtuoso-grid")).toBeInTheDocument();
  });

  it("renders NFT cards", () => {
    render(<MockDataNFTs />);
    expect(screen.getByText("NFT 1")).toBeInTheDocument();
    expect(screen.getByText("NFT 2")).toBeInTheDocument();
  });

  it("calls handleCartClick when NFTCard is clicked", async () => {
    const addToCartMock = jest.fn();
    mockUseCart.mockReturnValue({
      cart: [],
      addToCart: { mutate: addToCartMock },
      removeFromCart: { mutate: jest.fn() },
    } as any);

    render(
      <QueryClientProvider client={queryClient}>
        <MockDataNFTs />
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("virtuoso-grid")).toBeInTheDocument();
    });

    const firstNFTCard = screen.getByTestId(`nft-card-${nfts[0].identifier}`);
    fireEvent.click(firstNFTCard);

    expect(addToCartMock).toHaveBeenCalledWith(expect.objectContaining({
      identifier: nfts[0].identifier,
      collection: nfts[0].collection,
    }));
  });

  it("removes from cart when clicking an NFT already in the cart", async () => {
    const removeFromCartMock = jest.fn();
    mockUseCart.mockReturnValue({
      cart: [nfts[0]],
      addToCart: { mutate: jest.fn() },
      removeFromCart: { mutate: removeFromCartMock },
    } as any);

    render(
      <QueryClientProvider client={queryClient}>
        <MockDataNFTs />
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("virtuoso-grid")).toBeInTheDocument();
    });

    const firstNFTCard = screen.getByTestId(`nft-card-${nfts[0].identifier}`);
    fireEvent.click(firstNFTCard);

    expect(removeFromCartMock).toHaveBeenCalledWith(`${nfts[0].cartId}`);
  });

  it("applies correct styles to the container", () => {
    const { container } = render(<MockDataNFTs />);
    const mainDiv = container.firstChild as HTMLElement;
    expect(mainDiv).toHaveClass("flex", "flex-col", "h-screen");
    expect(mainDiv).toHaveStyle({ height: "calc(100vh-60px)" });
  });

  it("passes correct props to VirtuosoGrid", () => {
    render(<MockDataNFTs />);
    const virtuosoGrid = screen.getByTestId("virtuoso-grid");
    expect(virtuosoGrid).toHaveStyle({ height: "100%", width: "100%" });
  });

  it("passes correct props to NFTCard", () => {
    render(<MockDataNFTs />);
    expect(screen.getByText("NFT 1")).toBeInTheDocument();
    expect(screen.getByText("NFT 2")).toBeInTheDocument();
  });
});