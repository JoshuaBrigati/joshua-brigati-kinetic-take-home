import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";

describe("Popover", () => {
  it("renders trigger", () => {
    render(
      <Popover>
        <PopoverTrigger>Open Popover</PopoverTrigger>
        <PopoverContent>Popover Content</PopoverContent>
      </Popover>
    );
    expect(screen.getByText("Open Popover")).toBeInTheDocument();
  });

  it("shows content when triggered", () => {
    render(
      <Popover>
        <PopoverTrigger>Open Popover</PopoverTrigger>
        <PopoverContent>Popover Content</PopoverContent>
      </Popover>
    );
    
    fireEvent.click(screen.getByText("Open Popover"));
    expect(screen.getByText("Popover Content")).toBeInTheDocument();
  });

  it("applies correct classes to content", () => {
    render(
      <Popover>
        <PopoverTrigger>Open Popover</PopoverTrigger>
        <PopoverContent className="custom-class">Popover Content</PopoverContent>
      </Popover>
    );
    
    fireEvent.click(screen.getByText("Open Popover"));
    const content = screen.getByText("Popover Content");
    expect(content).toHaveClass("custom-class");
    expect(content).toHaveClass("z-50", "w-72", "rounded-md");
  });
});