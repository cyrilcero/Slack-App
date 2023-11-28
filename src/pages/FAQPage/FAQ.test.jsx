import { render, screen } from "@testing-library/react";
import { describe, it } from "vitest";
import FAQ from "./FAQ";

describe("FAQ PAGE", () => {
  it("Renders FAQ Page", () => {
    render(<FAQ />);

    expect(screen.findByText("How can I enable API requests")).toBeTruthy();
    expect(screen.findByText("Frequently Asked Questions:")).toBeTruthy();

    screen.debug();

    // check if App components renders headline
  });
});
