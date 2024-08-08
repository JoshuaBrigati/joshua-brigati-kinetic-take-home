import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Badge } from "@/components/ui/badge";

describe("Badge", () => {
  it("renders with default props", () => {
    render(<Badge>Default Badge</Badge>);
    const badge = screen.getByText("Default Badge");
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass("bg-primary");
  });

  it("applies variant classes correctly", () => {
    render(<Badge variant="secondary">Secondary Badge</Badge>);
    const badge = screen.getByText("Secondary Badge");
    expect(badge).toHaveClass("bg-grey-300");
  });

  it("applies size classes correctly", () => {
    render(<Badge size="sm">Small Badge</Badge>);
    const badge = screen.getByText("Small Badge");
    expect(badge).toHaveClass("h-5");
  });

  it("combines custom className with default classes", () => {
    render(<Badge className="custom-class">Custom Badge</Badge>);
    const badge = screen.getByText("Custom Badge");
    expect(badge).toHaveClass("custom-class");
    expect(badge).toHaveClass("inline-flex");
  });
});