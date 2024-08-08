import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

jest.mock("@/components/collections-slider", () => ({
  __esModule: true,
  default: () => <div data-testid="mock-slider">Mocked Slider</div>,
}));

jest.mock("@/components/mock-data-nfts", () => ({
  __esModule: true,
  default: () => <div data-testid="mock-data-nfts">Mocked MockDataNFTs</div>,
}));

describe("Home", () => {
  it("renders the component", () => {
    render(<Home />);
    expect(screen.getByText("Collections")).toBeInTheDocument();
    expect(screen.getByText("Quick add NFTs")).toBeInTheDocument();
  });

  it("includes the Slider component", () => {
    render(<Home />);
    expect(screen.getByTestId("mock-slider")).toBeInTheDocument();
  });

  it("includes the MockDataNFTs component", () => {
    render(<Home />);
    expect(screen.getByTestId("mock-data-nfts")).toBeInTheDocument();
  });

  it("has correct structure and styling", () => {
    const { container } = render(<Home />);
    const mainDiv = container.firstChild as HTMLElement;
    
    expect(mainDiv).toHaveClass("flex", "flex-col", "gap-20", "pt-12", "h-screen");
    expect(mainDiv).toHaveStyle({ height: "calc(100vh-60px)" });

    const sections = container.querySelectorAll(".flex.flex-col.gap-4");
    expect(sections).toHaveLength(2);

    const headings = screen.getAllByRole("heading", { level: 1 });
    expect(headings).toHaveLength(2);
    headings.forEach(heading => {
      expect(heading).toHaveClass("text-2xl", "font-bold", "px-12");
    });
  });
});