import React from "react";
import { act, render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";
import CollectionsPage from "@/app/collections/page";
import CollectionGrid from "@/app/collections/collections";

jest.mock("axios");
jest.mock("react-virtuoso", () => ({
  VirtuosoGrid: ({ itemContent, totalCount, endReached }: any) => (
    <div data-testid="virtuoso-grid" style={{ height: "100%", width: "100%" }}>
      {[...Array(totalCount)].map((_, index) => (
        <div key={index}>{itemContent(index)}</div>
      ))}
      <button onClick={endReached} data-testid="load-more">Load More</button>
    </div>
  ),
}));
jest.mock("@/components/cards/collection-card", () => ({
  __esModule: true,
  default: ({ collection }: any) => <div data-testid={`collection-card-${collection.collection}`}>{collection.name}</div>,
}));

const mockedAxios = axios as jest.Mocked<typeof axios>;

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("CollectionsPage", () => {
  it("renders loading state initially", () => {
    render(<CollectionsPage />, { wrapper: createWrapper() });
    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });
});

describe("CollectionGrid", () => {
  const mockCollections = [
    { collection: "collection1", name: "Collection 1" },
    { collection: "collection2", name: "Collection 2" },
  ];

  beforeEach(() => {
    mockedAxios.get.mockResolvedValue({
      data: { collections: mockCollections, next: "next_page_token" },
    });
  });

  it("renders loading state initially", () => {
    render(<CollectionGrid />, { wrapper: createWrapper() });
    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });

  it("renders collection cards after data is loaded", async () => {
    render(<CollectionGrid />, { wrapper: createWrapper() });

    await waitFor(() => {
      expect(screen.getByTestId("virtuoso-grid")).toBeInTheDocument();
    });

    mockCollections.forEach((collection) => {
      expect(screen.getByTestId(`collection-card-${collection.collection}`)).toBeInTheDocument();
    });
  });

  it("handles error state", async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error("API Error"));

    render(<CollectionGrid />, { wrapper: createWrapper() });

    await waitFor(() => {
      expect(screen.getByText("Error fetching collections.")).toBeInTheDocument();
    });
  });

  it("loads more data when endReached is called", async () => {
    const secondPageCollections = [
      { collection: "collection3", name: "Collection 3" },
      { collection: "collection4", name: "Collection 4" },
    ];

    mockedAxios.get.mockResolvedValueOnce({
      data: { collections: mockCollections, next: "next_page_token" },
    });
    mockedAxios.get.mockResolvedValueOnce({
      data: { collections: secondPageCollections, next: null },
    });

    render(<CollectionGrid />, { wrapper: createWrapper() });

    await waitFor(() => {
      expect(screen.getByTestId("virtuoso-grid")).toBeInTheDocument();
    });

    const loadMoreButton = screen.getByTestId("load-more");
    act(() => {
      loadMoreButton.click();
    });

    await waitFor(() => {
      secondPageCollections.forEach((collection) => {
        expect(screen.getByTestId(`collection-card-${collection.collection}`)).toBeInTheDocument();
      });
    });
  });

  it("does not load more data when there is no next page", async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: { collections: mockCollections, next: null },
    });

    render(<CollectionGrid />, { wrapper: createWrapper() });

    await waitFor(() => {
      expect(screen.getByTestId("virtuoso-grid")).toBeInTheDocument();
    });

    const loadMoreButton = screen.getByTestId("load-more");
    act(() => {
      loadMoreButton.click();
    });

    expect(mockedAxios.get).toHaveBeenCalledTimes(7);
  });

  it("handles empty collection data", async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: { collections: [], next: null },
    });

    render(<CollectionGrid />, { wrapper: createWrapper() });

    await waitFor(() => {
      expect(screen.getByTestId("virtuoso-grid")).toBeInTheDocument();
    });

    expect(screen.queryByTestId(/collection-card-/)).not.toBeInTheDocument();
  });

  it("applies correct styling to VirtuosoGrid", async () => {
    render(<CollectionGrid />, { wrapper: createWrapper() });

    await waitFor(() => {
      const virtuosoGrid = screen.getByTestId("virtuoso-grid");
      expect(virtuosoGrid).toHaveStyle({ height: "100%", width: "100%" });
    });
  });

  it("sets correct props on VirtuosoGrid", async () => {
    render(<CollectionGrid />, { wrapper: createWrapper() });

    await waitFor(() => {
      const virtuosoGrid = screen.getByTestId("virtuoso-grid");
      expect(virtuosoGrid).toHaveAttribute("data-testid", "virtuoso-grid");
    });
  });
});