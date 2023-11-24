import { render, screen } from "@testing-library/react";
import { describe, it } from "vitest";
import AllUsers from "../MainPage/components/AllUsers";

describe("LoginPage", () => {
  it("renders login page", () => {
    render(<AllUsers />);
    const linkElement = screen.findByText(/ID/i);
    expect(linkElement).toBeInTheDocument();

    screen.debug();

    // check if App components renders headline
  });
});
