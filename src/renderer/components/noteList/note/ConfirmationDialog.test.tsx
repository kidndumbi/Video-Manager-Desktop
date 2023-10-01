import React, { useState, FC } from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import {
  ConfirmationDialog,
  ConfirmationDialogProps,
} from "./ConfirmationDialog"; // Adjust the import to your project structure

// Define ParentWrapper in the same file
const ParentWrapper: FC = () => {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleConfirm = () => {
    setIsOpen(false);
  };

  const dialogProps: ConfirmationDialogProps = {
    open: isOpen,
    onClose: handleClose,
    onConfirm: handleConfirm,
  };

  return <ConfirmationDialog {...dialogProps} />;
};

// The actual tests
describe("ConfirmationDialog Component", () => {
  it('should display the dialog when "open" prop is true', () => {
    render(<ParentWrapper />);
    expect(
      screen.getByText("Are you sure you want to delete?")
    ).toBeInTheDocument();
  });

  it('should close the dialog when "Cancel" button is clicked', async () => {
    render(<ParentWrapper />);
    fireEvent.click(screen.getByText("Cancel"));
    await waitFor(() => {
      expect(screen.queryByText("Are you sure you want to delete?")).toBeNull();
    });
  });
});
