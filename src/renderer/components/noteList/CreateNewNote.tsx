// CreateNewNote.tsx
import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { secondsTohhmmss } from "../../../util/helperFunctions";

interface CreateNewNoteProps {
  currentVideoTime: number;
  onButtonClick: () => void;
}

const CreateNewNote: React.FC<CreateNewNoteProps> = ({
  currentVideoTime,
  onButtonClick,
}) => {
  return (
    <Box sx={{ marginBottom: "15px" }}>
      <Button color="primary" variant="contained" onClick={onButtonClick}>
        Create new note at {secondsTohhmmss(currentVideoTime)}
      </Button>
    </Box>
  );
};

export default CreateNewNote;
