// import React, { useState, FC } from "react";
// import { render, fireEvent, screen, waitFor } from "@testing-library/react";
// import "@testing-library/jest-dom";
// import {
//   ConfirmationDialog,
//   ConfirmationDialogProps,
// } from "./ConfirmationDialog"; // Adjust the import to your project structure

// // Define ParentWrapper in the same file
// const ParentWrapper: FC = () => {
//   const [isOpen, setIsOpen] = useState(true);

//   const handleClose = () => {
//     setIsOpen(false);
//   };

//   const handleConfirm = () => {
//     setIsOpen(false);
//   };

//   const dialogProps: ConfirmationDialogProps = {
//     open: isOpen,
//     onClose: handleClose,
//     onConfirm: handleConfirm,
//   };

//   return <ConfirmationDialog {...dialogProps} />;
// };

// // The actual tests
// describe("ConfirmationDialog Component", () => {
//   it('should display the dialog when "open" prop is true', () => {
//     render(<ParentWrapper />);
//     expect(
//       screen.getByText("Are you sure you want to delete?")
//     ).toBeInTheDocument();
//   });

//   it('should close the dialog when "Cancel" button is clicked', async () => {
//     render(<ParentWrapper />);
//     fireEvent.click(screen.getByText("Cancel"));
//     await waitFor(() => {
//       expect(screen.queryByText("Are you sure you want to delete?")).toBeNull();
//     });
//   });
// });

import React, { useState, FC } from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import ConfirmationDialog from "./ConfirmationDialog"; // Adjust the import to your project structure

// Define ParentWrapper in the same file
const ParentWrapper: FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [lastChoice, setLastChoice] = useState<string | null>(null);

  const handleClose = (choice: string) => {
    setIsOpen(false);
    setLastChoice(choice);
  };

  return (
    <div>
      <ConfirmationDialog
        open={isOpen}
        message="Are you sure you want to delete?"
        handleClose={handleClose}
      />
      {lastChoice && <span>{`Last choice was: ${lastChoice}`}</span>}
    </div>
  );
};

// The actual tests
describe("ConfirmationDialog Component", () => {
  it('should display the dialog with message when "open" prop is true', () => {
    render(<ParentWrapper />);
    expect(
      screen.getByText("Are you sure you want to delete?")
    ).toBeInTheDocument();
  });

  it('should close the dialog and update last choice when "Cancel" button is clicked', async () => {
    render(<ParentWrapper />);
    fireEvent.click(screen.getByText("Cancel"));
    await waitFor(() => {
      expect(screen.queryByText("Are you sure you want to delete?")).toBeNull();
      expect(screen.getByText("Last choice was: Cancel")).toBeInTheDocument();
    });
  });

  it('should close the dialog and update last choice when "Ok" button is clicked', async () => {
    render(<ParentWrapper />);
    fireEvent.click(screen.getByText("Ok"));
    await waitFor(() => {
      expect(screen.queryByText("Are you sure you want to delete?")).toBeNull();
      expect(screen.getByText("Last choice was: Ok")).toBeInTheDocument();
    });
  });
});
