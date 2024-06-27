import React from "react";
import { render, screen, act } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

// Mock the Home and About components
jest.mock("./components/Home", () => () => (
  <div data-testid="home">Home Component</div>
));
jest.mock("./About", () => () => (
  <div data-testid="about">About Component</div>
));

describe("App Component", () => {
  test("renders Home component for default route", () => {
    act(() => {
      render(
        <MemoryRouter initialEntries={["/"]}>
          <App />
        </MemoryRouter>
      );
    });

    // Check if Home component is rendered
    expect(screen.getByTestId("home")).toBeInTheDocument();
  });

  test("renders Home component for search route", () => {
    act(() => {
      render(
        <MemoryRouter initialEntries={["/test"]}>
          <App />
        </MemoryRouter>
      );
    });

    // Log the rendered HTML for debugging
    //  screen.debug();

    // Check if Home component is rendered
    expect(screen.getByTestId("home")).toBeInTheDocument();
  });

  test("renders About component for about route", () => {
    act(() => {
      render(
        <MemoryRouter initialEntries={["/about"]}>
          <App />
        </MemoryRouter>
      );
    });

    // Check if About component is rendered
    expect(screen.getByTestId("about")).toBeInTheDocument();
  });

  test("renders footer", () => {
    act(() => {
      render(
        <MemoryRouter initialEntries={["/"]}>
          <App />
        </MemoryRouter>
      );
    });

    // Check if footer is rendered
    expect(screen.getByText("Credits go here.")).toBeInTheDocument();
  });
});
