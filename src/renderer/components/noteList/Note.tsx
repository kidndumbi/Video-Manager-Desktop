import React from "react";
import { NoteModel } from "../../../models/note.model";
import Chip from "@mui/material/Chip";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Box from "@mui/material/Box";
import { secondsTohhmmss } from "../../../util/helperFunctions";

type NoteProps = {
  note: NoteModel;
};

const Note = ({ note }: NoteProps) => {
  const handleClick = () => {
    console.log("You clicked the Chip.");
  };

  return (
    <>
      <Chip
        label={secondsTohhmmss(note.videoTimeStamp)}
        icon={<AccessTimeIcon />}
        variant="outlined"
        onClick={handleClick}
      />
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
        <div>{note.id} </div>
      </Box>
    </>
  );
};

export { Note };
