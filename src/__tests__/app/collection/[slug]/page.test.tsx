import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";
import NFTPage from "@/app/collection/[slug]/page";
import { useCart } from "@/hooks/use-cart";

jest.mock("axios");
jest.mock("@/hooks/use-cart");
jest.mock("react-virtuoso", () => ({
  VirtuosoGrid: ({ itemContent, totalCount }: any) => (
    <div data-testid="virtuoso-grid">
      {[...Array(totalCount)].map((_, index) => (
        <div key={index}>{itemContent(index)}</div>
      ))}
    </div>
  ),
}));
jest.mock("@/components/cards/nft-card", () => ({
  __esModule: true,
  default: ({ nft, handleCartClick }: any) => (
    <div data-testid={`nft-card-${nft.identifier}`} onClick={() => handleCartClick(nft)}>
      {nft.name}
    </div>
  ),
}));

const mockUseCart = useCart as jest.MockedFunction<typeof useCart>;
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("NFTPage", () => {
  const queryClient = new QueryClient();
  const mockNFTs = [
    { cartId: 0, identifier: "1", name: "NFT 1", collection: "test-collection" },
    { cartId: 1, identifier: "2", name: "NFT 2", collection: "test-collection" },
  ];

  beforeEach(() => {
    mockedAxios.get.mockResolvedValue({
      data: { nfts: mockNFTs, next: null },
    });
    mockUseCart.mockReturnValue({
      cart: [],
      addToCart: { mutate: jest.fn() },
      removeFromCart: { mutate: jest.fn() },
    } as any);
  });

  it("renders loading state initially", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <NFTPage params={{ slug: "test-collection" }} />
      </QueryClientProvider>
    );
    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });

  it("renders NFT cards after data is loaded", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <NFTPage params={{ slug: "test-collection" }} />
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("virtuoso-grid")).toBeInTheDocument();
    });

    mockNFTs.forEach((nft) => {
      expect(screen.getByTestId(`nft-card-${nft.identifier}`)).toBeInTheDocument();
    });
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
        <NFTPage params={{ slug: "test-collection" }} />
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("virtuoso-grid")).toBeInTheDocument();
    });

    const firstNFTCard = screen.getByTestId(`nft-card-${mockNFTs[0].identifier}`);
    fireEvent.click(firstNFTCard);

    expect(addToCartMock).toHaveBeenCalledWith(expect.objectContaining({
      identifier: mockNFTs[0].identifier,
      collection: mockNFTs[0].collection,
    }));
  });

  it("removes from cart when clicking an NFT already in the cart", async () => {
    const removeFromCartMock = jest.fn();
    mockUseCart.mockReturnValue({
      cart: [mockNFTs[0]],
      addToCart: { mutate: jest.fn() },
      removeFromCart: { mutate: removeFromCartMock },
    } as any);

    render(
      <QueryClientProvider client={queryClient}>
        <NFTPage params={{ slug: "test-collection" }} />
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("virtuoso-grid")).toBeInTheDocument();
    });

    const firstNFTCard = screen.getByTestId(`nft-card-${mockNFTs[0].identifier}`);
    fireEvent.click(firstNFTCard);

    expect(removeFromCartMock).toHaveBeenCalledWith(`${mockNFTs[0].cartId}`);
  });
});