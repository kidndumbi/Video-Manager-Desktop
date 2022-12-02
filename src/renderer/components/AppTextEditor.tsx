import React, { useState } from "react";
import ReactQuill from "react-quill";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

type AppTextEditorProps = {
  onCancelClick: () => void;
  onSaveNoteClick: (value: string) => void;
  text?: string;
  btnText?: string;
};

const AppTextEditor = ({
  onCancelClick,
  onSaveNoteClick,
  text = "",
  btnText = "Save Note",
}: AppTextEditorProps) => {
  const [value, setValue] = useState(text);

  return (
    <>
      <Box>
        <ReactQuill theme="snow" value={value} onChange={setValue} />
      </Box>

      <Box sx={{ marginTop: "5px" }}>
        <Button size="small" onClick={onCancelClick} variant="text">
          Cancel
        </Button>
        <Button
          size="small"
          onClick={() => onSaveNoteClick(value)}
          variant="contained"
        >
          {btnText}
        </Button>
      </Box>
    </>
  );
};

export { AppTextEditor };
