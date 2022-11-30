import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import React, { useState } from "react";
import { NoteModel } from "../../../models/note.model";
import { secondsTohhmmss } from "../../../util/helperFunctions";
import { AppTextEditor } from "../AppTextEditor";
import { Note } from "./Note";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

export interface NoteListProps {
  notesData?: NoteModel[];
  currentVideoTime: number;
  onCreateNote: (content: string, videoTimeStamp: number) => void;
  onVideoSeek: (seekTime: number) => void;
}

const NoteList = ({
  notesData,
  currentVideoTime,
  onCreateNote,
  onVideoSeek,
}: NoteListProps) => {
  //const [notes, setNotes] = useState(notesData);

  const [showTextEditor, setShowTextEditor] = useState(false);
  const [staticCurrentTime, setStaticCurrentTime] = useState(0);

  const onCancelClick = () => {
    setShowTextEditor(false);
  };

  return (
    <>
      <div>
        {showTextEditor ? (
          <Box
            sx={{
              paddingBottom: "10px",
              height: "150px",
              marginBottom: "40px",
            }}
          >
            <Chip
              label={secondsTohhmmss(staticCurrentTime)}
              icon={<AccessTimeIcon />}
              variant="filled"
            />
            <AppTextEditor
              onSaveNoteClick={(content) => {
                onCreateNote(content, staticCurrentTime);
              }}
              onCancelClick={onCancelClick}
            ></AppTextEditor>
          </Box>
        ) : null}
        {!showTextEditor ? (
          <Box>
            <Button
              color="secondary"
              variant="outlined"
              onClick={() => {
                setShowTextEditor(true);
                setStaticCurrentTime(currentVideoTime);
              }}
            >
              Create new note at {secondsTohhmmss(currentVideoTime)}
            </Button>
          </Box>
        ) : null}

        <Box sx={{ marginTop: "97px" }}>
          {notesData && notesData.length > 0
            ? notesData.map((note) => (
                <Note
                  onVideoSeek={onVideoSeek}
                  key={note.id}
                  note={note}
                ></Note>
              ))
            : null}
        </Box>
      </div>
    </>
  );
};

export { NoteList };
