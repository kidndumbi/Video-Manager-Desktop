import React from "react";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { NoteModel } from "../../../models/note.model";
import { secondsTohhmmss } from "../../../util/helperFunctions";
import { NoteTextEditor } from "../NoteTextEditor";
import { Note } from "./note/Note";
import CreateNewNote from "./CreateNewNote";
import { useNoteListLogic } from "../../../hooks/useNoteListLogic";
import ConfirmationDialog from "./note/ConfirmationDialog";
import { useConfirmationDialog } from "../../../hooks/useConfirmationDialog";

interface NoteListProps {
  notesData?: NoteModel[];
  currentVideoTime: number;
}

const NoteList: React.FC<NoteListProps> = ({ notesData, currentVideoTime }) => {
  const {
    showTextEditor,
    staticCurrentTime,
    handleCreateNote,
    handleDeleteNote,
    handleVideoSeek,
    handleNoteSave,
    handleCreateNewNoteButtonClick,
    handleCancelClick,
  } = useNoteListLogic(currentVideoTime);

  const { isOpen, openDialog, closeDialog, message, setMessage } =
    useConfirmationDialog();

  const noteMessage = "Are you sure you want to delete note";

  const deleteNote = (note: NoteModel) => {
    setMessage(`${noteMessage}?`);
    openDialog().then((dialogDecision) => {
      if (dialogDecision === "Ok") {
        handleDeleteNote(note, () => console.log("deletion complete!"));
      } else {
        console.log("Cancelled");
      }
    });
  };

  return (
    <Box>
      <NoteCreationArea
        showTextEditor={showTextEditor}
        staticCurrentTime={staticCurrentTime}
        handleCreateNote={handleCreateNote}
        handleCancelClick={handleCancelClick}
        currentVideoTime={currentVideoTime}
        handleCreateNewNoteButtonClick={handleCreateNewNoteButtonClick}
      />
      <NoteDisplayArea
        notesData={notesData}
        handleVideoSeek={handleVideoSeek}
        handleNoteSave={handleNoteSave}
        deleteNote={deleteNote}
      />
      <ConfirmationDialog
        open={isOpen}
        message={message}
        handleClose={closeDialog}
      />
    </Box>
  );
};

interface NoteCreationAreaProps {
  showTextEditor: boolean;
  staticCurrentTime: number;
  handleCreateNote: (content: string) => void;
  handleCancelClick: () => void;
  currentVideoTime: number;
  handleCreateNewNoteButtonClick: () => void;
}

const NoteCreationArea: React.FC<NoteCreationAreaProps> = ({
  showTextEditor,
  staticCurrentTime,
  handleCreateNote,
  handleCancelClick,
  currentVideoTime,
  handleCreateNewNoteButtonClick,
}) => {
  return (
    <Box>
      {showTextEditor ? (
        <Box>
          New note at:
          <Chip
            label={secondsTohhmmss(staticCurrentTime)}
            icon={<AccessTimeIcon />}
            color="secondary"
            variant="filled"
            size="small"
          />
          <NoteTextEditor
            onSaveNoteClick={handleCreateNote}
            onCancelClick={handleCancelClick}
            btnText="Save New Note"
          />
        </Box>
      ) : (
        <CreateNewNote
          currentVideoTime={currentVideoTime}
          onButtonClick={handleCreateNewNoteButtonClick}
        />
      )}
    </Box>
  );
};

interface NoteDisplayAreaProps {
  notesData?: NoteModel[];
  handleVideoSeek: (time: number) => void;
  handleNoteSave: (note: NoteModel) => void;
  deleteNote: (note: NoteModel) => void;
}

const NoteDisplayArea: React.FC<NoteDisplayAreaProps> = ({
  notesData,
  handleVideoSeek,
  handleNoteSave,
  deleteNote,
}) => {
  return (
    <Box>
      {notesData?.map((note) => (
        <Note
          key={note.id}
          note={note}
          onVideoSeek={handleVideoSeek}
          onNoteSave={handleNoteSave}
          onNoteDelete={deleteNote}
        />
      ))}
    </Box>
  );
};

export { NoteList };
