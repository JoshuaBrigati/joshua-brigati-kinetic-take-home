import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import TopNav from "@/components/navigation/top-nav";

jest.mock("next/link", () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  );
});

jest.mock("@/components/cart-popover", () => {
  return function MockCartPopover() {
    return <div data-testid="cart-popover">Cart Popover</div>;
  };
});

describe("TopNav", () => {
  it("renders the NFTS heading", () => {
    render(<TopNav />);
    expect(screen.getByText("NFTS")).toBeInTheDocument();
  });

  it("renders the Collections link", () => {
    render(<TopNav />);
    const collectionsLink = screen.getByText("Collections");
    expect(collectionsLink).toBeInTheDocument();
    expect(collectionsLink.closest("a")).toHaveAttribute("href", "/collections");
  });

  it("renders the CartPopover component", () => {
    render(<TopNav />);
    expect(screen.getByTestId("cart-popover")).toBeInTheDocument();
  });

  it("has the correct structure and styling", () => {
    const { container } = render(<TopNav />);
    const header = container.firstChild as HTMLElement;
    
    expect(header.tagName).toBe("HEADER");
    expect(header).toHaveClass("flex", "items-center", "gap-4", "border-b", "border-white/10", "bg-grey-800/60");
  });

  it("has responsive styling classes", () => {
    const { container } = render(<TopNav />);
    const header = container.firstChild as HTMLElement;

    expect(header).toHaveClass("min-h-14", "px-4", "lg:min-h-[60px]", "lg:px-6");
  });

  it("renders the home link correctly", () => {
    render(<TopNav />);
    const homeLink = screen.getByText("NFTS").closest("a");
    expect(homeLink).toHaveAttribute("href", "/");
  });

  it("applies correct styling to links", () => {
    render(<TopNav />);
    const nftsHeading = screen.getByText("NFTS");
    const collectionsLink = screen.getByText("Collections");

    expect(nftsHeading).toHaveClass("text-lg", "font-semibold");
    expect(collectionsLink).toHaveClass("text-sm");
  });
});