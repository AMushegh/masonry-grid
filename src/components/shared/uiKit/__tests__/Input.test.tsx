import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { Input } from "@/components/shared/uiKit/Input";

describe("<Input />", () => {
  it("renders input without label", () => {
    render(<Input placeholder="Type here" type="text" />);
    const input = screen.getByPlaceholderText("Type here");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("type", "text");
  });

  it("renders input with label", () => {
    render(<Input label="Username" />);
    const label = screen.getByText("Username");
    const input = screen.getByLabelText("Username");

    expect(label).toBeInTheDocument();
    expect(input).toBeInTheDocument();
  });

  it("handles typing", async () => {
    render(<Input label="Email" />);
    const input = screen.getByLabelText("Email");
    await userEvent.type(input, "mushegh@example.com");

    expect(input).toHaveValue("mushegh@example.com");
  });
});
