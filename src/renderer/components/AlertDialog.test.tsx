import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { AlertDialog } from "./AlertDialog"; // Adjust the import to your project structure
import "@testing-library/jest-dom";
import { Button } from "@mui/material";

describe("AlertDialog Component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the dialog when showDialog is true", () => {
    const testContent = "Are you sure you want to delete?"; // Define the dialog content

    render(<AlertDialog showDialog={true} dialogContent={testContent} />);

    expect(screen.getByText(testContent)).toBeInTheDocument(); // Check if the dialog content is rendered
  });

  it("does not render the dialog when showDialog is false", () => {
    const testContent = "Are you sure you want to delete?"; // Define the dialog content
    const { container } = render(
      <AlertDialog showDialog={false} dialogContent={testContent} />
    );

    expect(container.querySelector("#alert-dialog-description")).toBeNull();
  });

  it("calls onClose when Ok button is clicked", () => {
    const mockCallback = jest.fn(); // Mock callback for onClose
    const testContent = "Are you sure you want to delete?"; // Define the dialog content

    render(
      <AlertDialog
        showDialog={true}
        dialogContent={testContent}
        dialogActions={
          <>
            <Button onClick={() => mockCallback("cancel")}>Cancel</Button>
            <Button onClick={() => mockCallback("ok")} autoFocus>
              Ok
            </Button>
          </>
        }
      />
    );

    fireEvent.click(screen.getByText("Ok"));
    expect(mockCallback).toHaveBeenCalledWith("ok");
  });

  it('calls onClose with "cancel" when Cancel button is clicked', () => {
    const mockCallback = jest.fn(); // Mock callback for onClose
    const testContent = "Are you sure you want to delete?"; // Define the dialog content

    render(
      <AlertDialog
        showDialog={true}
        dialogContent={testContent}
        dialogActions={
          <>
            <Button onClick={() => mockCallback("cancel")}>Cancel</Button>
            <Button onClick={() => mockCallback("ok")} autoFocus>
              Ok
            </Button>
          </>
        }
      />
    );

    fireEvent.click(screen.getByText("Cancel"));
    expect(mockCallback).toHaveBeenCalledWith("cancel");
  });

  it("closes on backdrop click", () => {
    const mockCloseCallback = jest.fn(); // Mock callback for onClose
    const testContent = "Are you sure you want to delete?"; // Define the dialog content

    render(
      <AlertDialog
        showDialog={true}
        dialogContent={testContent}
        dialogActions={
          <>
            <Button onClick={() => mockCloseCallback("cancel")}>Cancel</Button>
            <Button onClick={() => mockCloseCallback("ok")} autoFocus>
              Ok
            </Button>
          </>
        }
        onClose={mockCloseCallback}
      />
    );

    // Add a null check before calling fireEvent.click
    const backdropElement = document.querySelector(".MuiBackdrop-root");
    if (backdropElement !== null) {
      fireEvent.click(backdropElement);
    }

    expect(mockCloseCallback).toHaveBeenCalled();
  });
});
