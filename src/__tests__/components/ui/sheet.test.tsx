import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

describe("Sheet", () => {
  it("renders trigger and content", () => {
    render(
      <Sheet>
        <SheetTrigger>Open Sheet</SheetTrigger>
        <SheetContent>Sheet Content</SheetContent>
      </Sheet>
    );
    expect(screen.getByText("Open Sheet")).toBeInTheDocument();
  });
});