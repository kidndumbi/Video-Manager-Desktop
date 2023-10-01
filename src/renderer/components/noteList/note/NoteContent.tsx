import React, { FC } from "react";
import { Box } from "@mui/material";
import { NoteModel } from "../../../../models/note.model"; // Adjust the import to your actual path
import { NoteTextEditorWrapper } from "./NoteTextEditorWrapper";

type NoteContentProps = {
  edit: boolean;
  note: NoteModel;
  onSave: (updatedNote: NoteModel) => void;
  onCancel: () => void;
};

const NoteContent: FC<NoteContentProps> = ({
  edit,
  note,
  onSave,
  onCancel,
}) => {
  if (edit) {
    return (
      <NoteTextEditorWrapper note={note} onSave={onSave} onCancel={onCancel} />
    );
  }

  return (
    <Box
      sx={{
        width: "100%",
        padding: "20px",
        backgroundColor: "whitesmoke",
        marginTop: "5px",
        marginBottom: "5px",
        borderRadius: "5px",
        color: "#6a6f73",
      }}
    >
      <Box dangerouslySetInnerHTML={{ __html: note.content }}></Box>
    </Box>
  );
};

export { NoteContent };
