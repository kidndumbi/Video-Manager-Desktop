import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Note, NoteProps } from "./Note"; // Adjust the import to your project structure

// Mock NoteModel data for testing
const mockNoteData = {
  id: "1",
  videoTimeStamp: 100,
  createdAt: 1672444800000, // This is a Unix timestamp for January 1, 2023
  content: "Test Note Content",
};

// ParentWrapper component for testing
const ParentWrapper = () => {
  const handleVideoSeek = jest.fn();
  const handleNoteSave = jest.fn();
  const handleNoteDelete = jest.fn();

  const noteProps: NoteProps = {
    note: mockNoteData,
    onVideoSeek: handleVideoSeek,
    onNoteSave: handleNoteSave,
    onNoteDelete: handleNoteDelete,
  };

  return <Note {...noteProps} />;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
let debug: any;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
let container: HTMLElement;

describe("Note Component", () => {
  beforeEach(() => {
    const renderResult = render(<ParentWrapper />);
    debug = renderResult.debug;
    container = renderResult.container;
  });

  describe("When not in edit mode", () => {
    it("should display the note content", () => {
      expect(screen.getByText("Test Note Content")).toBeInTheDocument();
    });
    it("Should display the right created at date", () => {
      const timeElement = screen.getByText("Friday 30th December 2022 7:00 PM");
      expect(timeElement).toBeInTheDocument();
    });

    it('should display "01:40"', () => {
      expect(screen.getByText("01:40")).toBeInTheDocument();
    });

    it("should display AccessTimeIcon", () => {
      expect(screen.getByTestId("AccessTimeIcon")).toBeInTheDocument();
    });

    it("should display Delete button", () => {
      expect(screen.getByLabelText("delete")).toBeInTheDocument();
    });

    it("should display Edit button", () => {
      expect(screen.getByLabelText("edit")).toBeInTheDocument();
    });

    it("should display EditIcon", () => {
      expect(screen.getByTestId("EditIcon")).toBeInTheDocument();
    });

    it("should display DeleteIcon", () => {
      expect(screen.getByTestId("DeleteIcon")).toBeInTheDocument();
    });
    it("should toggle the editor when the Edit button is clicked", () => {
      // Find the Edit button and click it
      const editButton = screen.getByLabelText("edit");
      fireEvent.click(editButton);
      //debug();
    });
    it("should open the confirmation dialog when the delete button is clicked", async () => {
      fireEvent.click(screen.getByLabelText("delete")); // Assumes the delete IconButton has aria-label="delete"
      await waitFor(() => {
        expect(
          screen.getByText("Are you sure you want to delete?")
        ).toBeInTheDocument();
      });
    });
  });

  describe("When in edit mode", () => {
    beforeEach(() => {
      // Code to run before each test
      const editIcon = screen.getByTestId("EditIcon");
      fireEvent.click(editIcon);
    });

    it("should render TextEditor", () => {
      const textEditor = container.querySelector("[contenteditable='true']");
      expect(textEditor).toBeInTheDocument();
    });
    it("should display the note content", () => {
      expect(screen.getByText("Test Note Content")).toBeInTheDocument();
    });

    it("should display Cancel and Save Note buttons", () => {
      const cancelButton = screen.getByText("Cancel");
      const saveButton = screen.getByText("Save Note");

      expect(cancelButton).toBeInTheDocument();
      expect(saveButton).toBeInTheDocument();

      expect(cancelButton.tagName).toBe("BUTTON");
      expect(saveButton.tagName).toBe("BUTTON");
    });

    it("should not display TextEditor when Cancel is clicked", () => {
      // Find the Cancel button and click it
      const cancelButton = screen.getByText("Cancel");
      fireEvent.click(cancelButton);

      const textEditor = container.querySelector("[contenteditable='true']");
      expect(textEditor).not.toBeInTheDocument();
    });

    it("should not display TextEditor when Save Note is clicked", () => {
      // Find the Cancel button and click it
      const saveButton = screen.getByText("Save Note");
      fireEvent.click(saveButton);

      const textEditor = container.querySelector("[contenteditable='true']");
      expect(textEditor).not.toBeInTheDocument();
    });

    // More tests can go here
  });
});
