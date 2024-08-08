import { render, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import Slider from "@/components/collections-slider";

jest.mock("keen-slider/react", () => ({
  useKeenSlider: jest.fn(() => {
    return [
      () => {},
      { 
        current: {
          prev: jest.fn(),
          next: jest.fn(),
        },
      },
    ];
  }),
}));

jest.mock("@/components/collection-card", () => {
  return function MockCollectionCard({ collection }: { collection: any }) {
    return <div data-testid={`collection-card-${collection.collection}`}>{collection.name}</div>;
  };
});

jest.mock("@/data/collections", () => ({
  collections: [
    { collection: "test1", name: "Test Collection 1" },
    { collection: "test2", name: "Test Collection 2" },
  ],
}));

jest.mock("lucide-react", () => ({
  ArrowLeftCircle: () => <div data-testid="arrow-left">Left Arrow</div>,
  ArrowRightCircle: () => <div data-testid="arrow-right">Right Arrow</div>,
}));

describe("Slider", () => {
  it("renders without crashing", () => {
    expect(() => render(<Slider />)).not.toThrow();
  });

  it("renders some collection cards", () => {
    render(<Slider />);
    const cards = screen.getAllByTestId(/collection-card/);
    expect(cards.length).toBeGreaterThan(0);
  });

  it("renders navigation arrows after initial render", async () => {
    await act(async () => {
      render(<Slider />);
    });

    expect(screen.getByTestId("arrow-left")).toBeInTheDocument();
    expect(screen.getByTestId("arrow-right")).toBeInTheDocument();
  });

  it("renders the correct number of collection cards", () => {
    render(<Slider />);
    const cards = screen.getAllByTestId(/collection-card/);
    expect(cards).toHaveLength(2); // Based on our mock data
  });

  it("renders collection names correctly", () => {
    render(<Slider />);
    expect(screen.getByText("Test Collection 1")).toBeInTheDocument();
    expect(screen.getByText("Test Collection 2")).toBeInTheDocument();
  });
});