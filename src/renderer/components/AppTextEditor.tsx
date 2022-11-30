import React, { useState } from "react";
import ReactQuill from "react-quill";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

type AppTextEditorProps = {
  onCancelClick: () => void;
  onSaveNoteClick: (value: string) => void;
};

const AppTextEditor = ({
  onCancelClick,
  onSaveNoteClick,
}: AppTextEditorProps) => {
  const [value, setValue] = useState("");

  return (
    <>
      <ReactQuill theme="snow" value={value} onChange={setValue} />
      <Box sx={{ marginTop: "7px" }}>
        <Button onClick={onCancelClick} variant="text">
          Cancel
        </Button>
        <Button onClick={() => onSaveNoteClick(value)} variant="contained">
          Save Note
        </Button>
      </Box>
    </>
  );
};

export { AppTextEditor };
