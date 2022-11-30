import React from "react";
import { NoteModel } from "../../../models/note.model";
import Chip from "@mui/material/Chip";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Box from "@mui/material/Box";
import { secondsTohhmmss } from "../../../util/helperFunctions";

type NoteProps = {
  note: NoteModel;
  onVideoSeek: (seekTime: number) => void;
};

const Note = ({ note, onVideoSeek }: NoteProps) => {
  const handleClick = () => {
    console.log("You clicked the Chip.");
    onVideoSeek(note.videoTimeStamp);
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
        <div dangerouslySetInnerHTML={{ __html: note.content }}>
          {/* {note.content}{" "} */}
        </div>
      </Box>
    </>
  );
};

export { Note };
