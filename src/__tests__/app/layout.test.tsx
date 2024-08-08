import { render } from "@testing-library/react";
import RootLayout from "@/app/layout";

jest.mock("next/font/google", () => ({
  Inter: jest.fn(() => ({
    className: "mocked-inter-class",
  })),
}));

jest.mock("@/providers/react-query", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <div data-testid="mock-react-query-provider">{children}</div>,
}));

jest.mock("@/components/navigation/top-nav", () => ({
  __esModule: true,
  default: () => <nav data-testid="mock-top-nav">Mocked TopNav</nav>,
}));

describe("RootLayout", () => {
  it("renders children correctly", () => {
    const { getByText } = render(
      <RootLayout>
        <div>Test Child Component</div>
      </RootLayout>
    );
    expect(getByText("Test Child Component")).toBeInTheDocument();
  });

  it("includes ReactQueryProvider", () => {
    const { getByTestId } = render(
      <RootLayout>
        <div>Test Child</div>
      </RootLayout>
    );
    expect(getByTestId("mock-react-query-provider")).toBeInTheDocument();
  });

  it("includes TopNav component", () => {
    const { getByTestId } = render(
      <RootLayout>
        <div>Test Child</div>
      </RootLayout>
    );
    expect(getByTestId("mock-top-nav")).toBeInTheDocument();
  });

  it("sets correct lang attribute on html tag", () => {
    const { container } = render(
      <RootLayout>
        <div>Test Child</div>
      </RootLayout>
    );
    const htmlElement = container.querySelector("html");
    expect(htmlElement).toHaveAttribute("lang", "en");
  });

  it("applies Inter font class to body", () => {
    const { container } = render(
      <RootLayout>
        <div>Test Child</div>
      </RootLayout>
    );
    const bodyElement = container.querySelector("body");
    expect(bodyElement).toHaveClass("mocked-inter-class");
  });

  it("wraps children in a main tag with correct classes", () => {
    const { container } = render(
      <RootLayout>
        <div>Test Child</div>
      </RootLayout>
    );
    const mainElement = container.querySelector("main");
    expect(mainElement).toHaveClass("flex", "flex-1", "flex-col");
  });
});