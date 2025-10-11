import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

import SingleImagePage from "@/pages/SingleImagePage";

vi.mock("@/components/imageDetails/ImageDetails", () => ({
  ImageDetails: vi.fn(() => <div data-testid="image-details">Mocked Image Details</div>),
}));

describe("SingleImagePage", () => {
  it("should render SingleImagePage component", () => {
    render(<SingleImagePage />);
    const list = screen.getByTestId("image-details");
    expect(list).toBeInTheDocument();
    expect(list).toHaveTextContent("Mocked Image Details");
  });
});
