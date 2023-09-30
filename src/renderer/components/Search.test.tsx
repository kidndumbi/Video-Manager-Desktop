import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
//import userEvent from "@testing-library/user-event";
import { Search } from "./Search";
//import { act } from "react-dom/test-utils";

describe("Search Component", () => {
  let mockOnSearchClick: jest.Mock<any, any, any>;

  // This will run before each test in this describe block
  beforeEach(() => {
    mockOnSearchClick = jest.fn();
    render(<Search onSearchClick={mockOnSearchClick} />);
  });

  it("renders search input and button", () => {
    const inputElement = screen.getByLabelText("Search");
    const buttonElement = screen.getByRole("button", { name: /Search/i });
    expect(inputElement).toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();
  });

  it("updates search text on typing", () => {
    const inputElement = screen.getByLabelText("Search");
    fireEvent.change(inputElement, { target: { value: "test" } });
    expect(inputElement).toHaveValue("test");
  });

  it("fires onSearchClick prop with search text when button clicked", async () => {
    const inputElement = screen.getByLabelText("Search") as HTMLInputElement;
    const buttonElement = screen.getByRole("button", {
      name: /Search/i,
    }) as HTMLButtonElement;

    fireEvent.change(inputElement, { target: { value: "test" } });
    fireEvent.click(buttonElement);

    expect(mockOnSearchClick).toHaveBeenCalledWith("test");
  });
});
