import React, { useState } from "react";
import { NoteModel } from "../../../models/note.model";
import Chip from "@mui/material/Chip";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Box from "@mui/material/Box";
import { secondsTohhmmss } from "../../../util/helperFunctions";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { AppTextEditor } from "../AppTextEditor";
import Moment from "react-moment";

type NoteProps = {
  note: NoteModel;
  onVideoSeek: (seekTime: number) => void;
  onNoteSave: (note: NoteModel) => void;
};

const Note = ({ note, onVideoSeek, onNoteSave }: NoteProps) => {
  const [edit, setEdit] = useState(false);
  // const [textEditorValue, setTextEditorValue] = useState(note.content);

  const handleClick = () => {
    console.log("You clicked the Chip.");
    onVideoSeek(note.videoTimeStamp);
  };

  const onEditNote = () => {
    setEdit(true);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          minHeight: "40.28px",
        }}
      >
        <Box>
          <Chip
            label={secondsTohhmmss(note.videoTimeStamp)}
            icon={<AccessTimeIcon />}
            color="secondary"
            variant="filled"
            onClick={handleClick}
            size="small"
          />
          <small>
            {note.createdAt ? (
              <Moment format="dddd Do MMMM YYYY h:mm A">
                {note?.createdAt}
              </Moment>
            ) : null}
          </small>
        </Box>

        {!edit ? (
          <Box>
            <IconButton aria-label="edut" size="medium" onClick={onEditNote}>
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton aria-label="delete" size="medium">
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
        ) : null}
      </Box>

      {!edit ? (
        <Box
          sx={{
            width: "100%",
            height: "auto",
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
      ) : null}

      {edit ? (
        <Box
          sx={{
            paddingBottom: "10px",
            height: "150px",
            marginBottom: "100px",
          }}
        >
          <AppTextEditor
            onSaveNoteClick={(value: string) => {
              if (value === "") {
                return;
              }
              console.log("i was saved ", value);
              onNoteSave({ ...note, content: value });
              setEdit(false);
            }}
            onCancelClick={() => {
              console.log("i was cancelled");
              setEdit(false);
            }}
            text={note.content}
          ></AppTextEditor>
        </Box>
      ) : null}
    </>
  );
};

export { Note };
