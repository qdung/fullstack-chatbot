import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import App from "../App";

describe("renders title correctly", () => {
  it("should render title", () => {
    render(<App />);
    const titleElement = screen.getByTestId("title");
    expect(titleElement).toBeInTheDocument();
    expect(titleElement.textContent).toBe("JOSEPH DUNG");
  });
});
