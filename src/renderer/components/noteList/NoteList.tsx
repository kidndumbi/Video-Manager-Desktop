import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import React, { useState } from "react";
import { NoteModel } from "../../../models/note.model";
import { secondsTohhmmss } from "../../../util/helperFunctions";
import { AppTextEditor } from "../AppTextEditor";
import { Note } from "./Note";

export interface NoteListProps {
  notesData?: NoteModel[];
  currentVideoTime: number;
}

const NoteList = ({ notesData, currentVideoTime }: NoteListProps) => {
  //const [notes, setNotes] = useState(notesData);

  const [showTextEditor, setShowTextEditor] = useState(false);

  const onCancelClick = () => {
    console.log("cancel clicked!!!");
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
            <AppTextEditor onCancelClick={onCancelClick}></AppTextEditor>
          </Box>
        ) : null}
        {!showTextEditor ? (
          <Box>
            <Button
              color="secondary"
              variant="outlined"
              onClick={() => setShowTextEditor(true)}
            >
              Create new note at {secondsTohhmmss(currentVideoTime)}
            </Button>
          </Box>
        ) : null}

        <Box sx={{ marginTop: "97px" }}>
          {notesData && notesData.length > 0
            ? notesData.map((note) => <Note key={note.id} note={note}></Note>)
            : null}
        </Box>
      </div>
    </>
  );
};

export { NoteList };
