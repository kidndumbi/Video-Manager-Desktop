import React from "react";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { NoteModel } from "../../../models/note.model";
import { secondsTohhmmss } from "../../../util/helperFunctions";
import { NoteTextEditor } from "../NoteTextEditor";
import { Note } from "./note/Note";
import CreateNewNote from "./CreateNewNote";
import { useNoteListLogic } from "../../hooks/useNoteListLogic";

export interface NoteListProps {
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

  return (
    <Box>
      <Box>
        {showTextEditor ? (
          <Box
            sx={{
              paddingBottom: "10px",
              height: "150px",
              marginBottom: "120px",
            }}
          >
            New note at:
            <Chip
              label={secondsTohhmmss(staticCurrentTime)}
              icon={<AccessTimeIcon />}
              color="secondary"
              variant="filled"
              sx={{ marginBottom: "5px" }}
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

      <Box>
        {notesData?.map((note) => (
          <Note
            key={note.id}
            note={note}
            onVideoSeek={handleVideoSeek}
            onNoteSave={handleNoteSave}
            onNoteDelete={handleDeleteNote}
          />
        ))}
      </Box>
    </Box>
  );
};

export { NoteList };
