import { render, screen } from "@testing-library/react";
import { describe, it } from "vitest";
import { MemoryRouter } from "react-router-dom";
import LoginPage from "./LoginPage";

describe("LoginPage", () => {
  it("renders login page", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <LoginPage />
      </MemoryRouter>
    );

    screen.debug();

    // check if App components renders headline
  });
});
