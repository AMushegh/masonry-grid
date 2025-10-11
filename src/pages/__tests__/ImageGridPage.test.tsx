import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

import ImagesGridPage from "@/pages/ImagesGridPage";

vi.mock("@/components/imagesList/ImagesList", () => ({
  ImagesList: vi.fn(() => <div data-testid="images-list">Mocked ImagesList</div>),
}));

describe("Images Page", () => {
  it("should render ImagesList component", () => {
    render(<ImagesGridPage />);
    const list = screen.getByTestId("images-list");
    expect(list).toBeInTheDocument();
    expect(list).toHaveTextContent("Mocked ImagesList");
  });
});
