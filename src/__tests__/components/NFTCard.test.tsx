import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import NFTCard from "@/components/nft-card";
import { NFT } from "@/types";

jest.mock("@/lib/utils", () => ({
  cn: jest.fn((...args) => args.join(" ")),
}));

jest.mock("@/components/ui/button", () => ({
  Button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
}));

describe("NFTCard", () => {
  const mockNFT = {
    cartId: 0,
    "identifier": "12345",
    "collection": "piratenation",
    "contract": "0x1b41d54b3f8de13d58102c50d7431fd6aa1a2c48",
    "token_standard": "erc721",
    "name": "Test NFT",
    "description": `Take to the seas with your pirate crew! Explore the world and gather XP, loot, and untold riches in a race to become the world"s greatest pirate captain! Play at https://piratenation.game`,
    "image_url": "https://example.com/image.jpg",
    "display_image_url": "https://example.com/image.jpg",
    "display_animation_url": "https://example.com/image.jpg",
    "metadata_url": "https://api.proofofplay.gg/api/metadata/0x5B0661B61b0e947E7e49cE7A67abaf8eAAfcdC1A/6227",
    "opensea_url": "https://opensea.io/assets/ethereum/0x1b41d54b3f8de13d58102c50d7431fd6aa1a2c48/6227",
    "updated_at": "2024-06-29T01:16:34.440449",
    "is_disabled": false,
    "is_nsfw": false
  } as NFT;

  it("renders NFT details correctly", () => {
    render(<NFTCard index={0} nft={mockNFT} inCart={false} handleCartClick={() => {}} />);
    expect(screen.getByText("Test NFT")).toBeInTheDocument();
    expect(screen.getByText("12345")).toBeInTheDocument();
    expect(screen.getByAltText("12345")).toHaveAttribute("src", "https://example.com/image.jpg");
  });

  it("calls handleCartClick when add to cart button is clicked", () => {
    const mockHandleCartClick = jest.fn();
    render(<NFTCard index={0} nft={mockNFT} inCart={false} handleCartClick={mockHandleCartClick} />);
    fireEvent.click(screen.getByRole("button", { name: /add to cart/i }));
    expect(mockHandleCartClick).toHaveBeenCalledWith(0);
  });

  it(`displays "Remove from cart" button when inCart is true`, () => {
    render(<NFTCard index={0} nft={mockNFT} inCart={true} handleCartClick={() => {}} />);
    expect(screen.getByRole("button", { name: /remove from cart/i })).toBeInTheDocument();
  });

  it(`displays "Add to cart" button when inCart is false`, () => {
    render(<NFTCard index={0} nft={mockNFT} inCart={false} handleCartClick={() => {}} />);
    expect(screen.getByRole("button", { name: /add to cart/i })).toBeInTheDocument();
  });

  it("renders NFT without a name correctly", () => {
    const nftWithoutName = { ...mockNFT, name: null };
    render(<NFTCard index={0} nft={nftWithoutName} inCart={false} handleCartClick={() => {}} />);
    expect(screen.getByRole("heading", { name: /12345/i })).toBeInTheDocument();
  });

  it("renders NFT with a long name correctly", () => {
    const nftWithLongName = { ...mockNFT, name: "This is a very long name for an NFT that should be truncated in the UI" };
    render(<NFTCard index={0} nft={nftWithLongName} inCart={false} handleCartClick={() => {}} />);
    const nameElement = screen.getByText(/This is a very long name/);
    expect(nameElement).toBeInTheDocument();
    expect(nameElement).toHaveClass("truncate");
  });

  it(`displays "Buy now" button`, () => {
    render(<NFTCard index={0} nft={mockNFT} inCart={false} handleCartClick={() => {}} />);
    expect(screen.getByRole("button", { name: /buy now/i })).toBeInTheDocument();
  });

  it("handles NFT without image_url", () => {
    const nftWithoutImage = { ...mockNFT, image_url: null };
    render(<NFTCard index={0} nft={nftWithoutImage} inCart={false} handleCartClick={() => {}} />);
    const img = screen.getByAltText("12345");
    expect(img).toHaveAttribute("src", "");
  });

  it("applies correct CSS classes based on inCart prop", () => {
    const { rerender } = render(<NFTCard index={0} nft={mockNFT} inCart={false} handleCartClick={() => {}} />);
    expect(screen.getByTestId("nft-card")).not.toHaveClass("border-primary");
    
    rerender(<NFTCard index={0} nft={mockNFT} inCart={true} handleCartClick={() => {}} />);
    expect(screen.getByTestId("nft-card")).toHaveClass("border-primary");
  });

  it("shows hover effects on mouse enter", () => {
    render(<NFTCard index={0} nft={mockNFT} inCart={false} handleCartClick={() => {}} />);
    const card = screen.getByTestId("nft-card");
    fireEvent.mouseEnter(card);
    expect(screen.getByRole("button", { name: /buy now/i })).toBeVisible();
  });
});

