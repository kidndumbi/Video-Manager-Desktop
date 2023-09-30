import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { AlertDialog } from "./AlertDialog"; // Adjust the import to your project structure
import "@testing-library/jest-dom";

describe("AlertDialog Component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the dialog when showDialog is true", () => {
    render(
      <AlertDialog onSelectedOption={() => jest.fn()} showDialog={true} />
    );
    expect(
      screen.getByText("Are you sure you want to delete?")
    ).toBeInTheDocument();
  });

  it("does not render the dialog when showDialog is false", () => {
    const { container } = render(
      <AlertDialog onSelectedOption={() => jest.fn()} showDialog={false} />
    );
    expect(container.querySelector("#alert-dialog-description")).toBeNull();
  });

  it('calls onSelectedOption with "ok" when Ok button is clicked', () => {
    const mockCallback = jest.fn();
    render(<AlertDialog onSelectedOption={mockCallback} showDialog={true} />);

    fireEvent.click(screen.getByText("Ok"));
    expect(mockCallback).toHaveBeenCalledWith("ok");
  });

  it('calls onSelectedOption with "cancel" when Cancel button is clicked', () => {
    const mockCallback = jest.fn();
    render(<AlertDialog onSelectedOption={mockCallback} showDialog={true} />);

    fireEvent.click(screen.getByText("Cancel"));
    expect(mockCallback).toHaveBeenCalledWith("cancel");
  });

  // it('calls onSelectedOption with "cancel" when dialog is closed', () => {
  //   const mockCallback = jest.fn();
  //   const { unmount, rerender } = render(
  //     <AlertDialog onSelectedOption={mockCallback} showDialog={true} />
  //   );

  //   // Manually trigger dialog close by setting showDialog to false
  //   rerender(
  //     <AlertDialog onSelectedOption={mockCallback} showDialog={false} />
  //   );

  //   // Unmount the component to clear any effects
  //   unmount();

  //   expect(mockCallback).toHaveBeenCalledWith("cancel");
  // });
});
