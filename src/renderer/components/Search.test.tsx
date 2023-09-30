import React from "react";
import { render, screen } from "@testing-library/react";
// import userEvent from '@testing-library/user-event';
import { Search } from "./Search";

describe("Search Component", () => {
  it("renders search input and button", () => {
    render(<Search onSearchClick={jest.fn()} />);

    const inputElement = screen.getByLabelText("Search");
    const buttonElement = screen.getByRole("button", { name: /Search/i });

    expect(inputElement).toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();
  });

  //   it('updates search text on typing', () => {
  //     render(<Search onSearchClick={jest.fn()} />);

  //     const inputElement = screen.getByLabelText('Search');
  //     userEvent.type(inputElement, 'test');

  //     expect(inputElement).toHaveValue('test');
  //   });

  //   it('fires onSearchClick prop with search text when button clicked', () => {
  //     const mockOnSearchClick = jest.fn();
  //     render(<Search onSearchClick={mockOnSearchClick} />);

  //     const inputElement = screen.getByLabelText('Search');
  //     const buttonElement = screen.getByRole('button', { name: /Search/i });

  //     userEvent.type(inputElement, 'test');
  //     userEvent.click(buttonElement);

  //     expect(mockOnSearchClick).toHaveBeenCalledWith('test');
  //   });
});
