import "@testing-library/jest-dom";
import { Outlet } from "react-router-dom";
import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { ContentContainer } from "@/components/contentContainer/ContentContainer";

vi.mock("react-router-dom", () => ({
  Outlet: vi.fn(() => {}),
}));

describe("<ContentContainer />", () => {
  it("renders the outlet", () => {
    render(<ContentContainer />);

    expect(Outlet).toHaveBeenCalled();
  });
});
