import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import CollectionCard from "@/components/collection-card";
import { Collection } from "@/types";

jest.mock("next/link", () => {
  return ({ children }: { children: React.ReactNode }) => children;
});

jest.mock("@/components/ui/button", () => ({
  Button: ({ children, onClick }: any) => <button onClick={onClick}>{children}</button>,
}));

describe("CollectionCard", () => {
  const mockCollection: Collection = {
    collection: "test-collection",
    name: "Test Collection",
    description: "This is a test collection",
    image_url: "https://example.com/image.jpg",
    banner_image_url: null,
    owner: "",
    safelist_status: "",
    category: "",
    is_disabled: false,
    is_nsfw: false,
    trait_offers_enabled: false,
    collection_offers_enabled: false,
    opensea_url: "",
    project_url: null,
    wiki_url: null,
    discord_url: null,
    telegram_url: null,
    twitter_username: null,
    instagram_username: null,
    contracts: []
  };

  it("renders the collection name", () => {
    render(<CollectionCard collection={mockCollection} />);
    expect(screen.getByText("Test Collection")).toBeInTheDocument();
  });

  it("renders the collection description", () => {
    render(<CollectionCard collection={mockCollection} />);
    expect(screen.getByText("This is a test collection")).toBeInTheDocument();
  });

  it("renders the collection image", () => {
    render(<CollectionCard collection={mockCollection} />);
    const image = screen.getByAltText("Test Collection") as HTMLImageElement;
    expect(image).toBeInTheDocument();
    expect(image.src).toBe("https://example.com/image.jpg");
  });

  it("uses placeholder image when image_url is not provided", () => {
    const collectionWithoutImage = { ...mockCollection, image_url: null };
    render(<CollectionCard collection={collectionWithoutImage} />);
    const image = screen.getByAltText("Test Collection") as HTMLImageElement;
    expect(image.src).toContain("/placeholder.png");
  });

  it("renders a link to the collection page", () => {
    render(<CollectionCard collection={mockCollection} />);
    const link = screen.getByRole("button", { name: /View Collection/i });
    expect(link).toBeInTheDocument();
  });

  it("applies correct classes for hover effect", () => {
    render(<CollectionCard collection={mockCollection} />);
    const card = screen.getByTestId("collection-card");
    expect(card).toHaveClass("group");
    
    const image = screen.getByAltText("Test Collection");
    expect(image).toHaveClass("group-hover:scale-110");

    const overlay = screen.getByTestId("hover-overlay");
    expect(overlay).toHaveClass("opacity-0", "group-hover:opacity-100");
  });

  it("truncates long name and description", () => {
    const longCollection = {
      ...mockCollection,
      name: "This is a very long collection name that should be truncated",
      description: "This is a very long description that should also be truncated to prevent overflow and maintain the layout of the card",
    };
    render(<CollectionCard collection={longCollection} />);
    
    const name = screen.getByText(/This is a very long collection name/);
    const description = screen.getByText(/This is a very long description/);
    
    expect(name).toHaveClass("truncate");
    expect(description).toHaveClass("truncate");
  });
});