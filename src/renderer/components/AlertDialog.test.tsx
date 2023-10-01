import React, { useState } from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
// import { fireEvent, render, screen, logRoles } from "@testing-library/react";
import { AlertDialog } from "./AlertDialog"; // Adjust the import to your project structure
import "@testing-library/jest-dom";
import { Button, DialogContentText } from "@mui/material";

const ParentWrapper = () => {
  const [showDialog, setShowDialog] = useState(true);
  const testContent = "Are you sure you want to delete?";

  return (
    <AlertDialog
      onClose={() => {
        setShowDialog(false);
      }}
      showDialog={showDialog}
      dialogContent={
        <DialogContentText id="alert-dialog-description">
          {testContent}
        </DialogContentText>
      }
      dialogActions={
        <>
          <Button
            onClick={() => {
              setShowDialog(false);
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              setShowDialog(false);
            }}
            autoFocus
          >
            Ok
          </Button>
        </>
      }
    />
  );
};

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
    render(<AlertDialog showDialog={false} dialogContent={testContent} />);

    expect(screen.queryByText("Are you sure you want to delete?")).toBeNull();
  });

  it("closes dialog when Ok button is clicked", async () => {
    const testContent = "Are you sure you want to delete?";

    render(<ParentWrapper />);

    // Confirm that the dialog is open
    expect(screen.getByText(testContent)).toBeInTheDocument();

    // Simulate clicking the "Ok" button
    fireEvent.click(screen.getByText("Ok"));

    // Wait for the dialog to close
    await waitFor(() => {
      expect(screen.queryByText(testContent)).toBeNull();
    });
  });

  it("closes dialog when Cancel button is clicked", async () => {
    const testContent = "Are you sure you want to delete?";

    render(<ParentWrapper />);

    // Confirm that the dialog is open
    expect(screen.getByText(testContent)).toBeInTheDocument();

    // Simulate clicking the "Ok" button
    fireEvent.click(screen.getByText("Cancel"));

    // Wait for the dialog to close
    await waitFor(() => {
      expect(screen.queryByText(testContent)).toBeNull();
    });
  });

  it("closes on backdrop click", async () => {
    const testContent = "Are you sure you want to delete?";
    render(<ParentWrapper />);

    // Add a null check before calling fireEvent.click
    const backdropElement = document.querySelector(".MuiBackdrop-root");
    if (backdropElement !== null) {
      fireEvent.click(backdropElement);
    }

    // Wait for the dialog to close
    await waitFor(() => {
      expect(screen.queryByText(testContent)).toBeNull();
    });
  });
});
