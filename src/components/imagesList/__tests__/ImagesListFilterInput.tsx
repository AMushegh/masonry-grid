import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { TopBlur } from "../styled";
import { ImagesListFilterInput } from "@/components/imagesList/ImagesListFilterInput";

vi.mock("./styled", () => ({
  TopBlur: vi.fn(() => {}),
}));

describe("<ImagesListFilterInput />", () => {
  it("renders TopBlur", () => {
    render(<ImagesListFilterInput value="" onChange={() => {}} />);
    expect(TopBlur).toHaveBeenCalled();
  });

  it("renders with default placeholder", () => {
    render(<ImagesListFilterInput value="" onChange={() => {}} />);
    const input = screen.getByPlaceholderText("Search...");
    expect(input).toBeInTheDocument();
  });

  it("renders with custom placeholder", () => {
    render(<ImagesListFilterInput value="" onChange={() => {}} placeholder="Find photo..." />);
    const input = screen.getByPlaceholderText("Find photo...");
    expect(input).toBeInTheDocument();
  });

  it("renders the correct value", () => {
    render(<ImagesListFilterInput value="mountains" onChange={() => {}} />);
    const input = screen.getByDisplayValue("mountains");
    expect(input).toBeInTheDocument();
  });

  it("calls onChange when user types", async () => {
    const handleChange = vi.fn();
    render(<ImagesListFilterInput value="" onChange={handleChange} />);
    const input = screen.getByPlaceholderText("Search...");

    await userEvent.type(input, "12345");

    expect(handleChange).toHaveBeenCalled();
    expect(handleChange).toHaveBeenCalledTimes(5);
  });
});
