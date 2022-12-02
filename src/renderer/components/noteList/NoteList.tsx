import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import React, { useState } from "react";
import { NoteModel } from "../../../models/note.model";
import { secondsTohhmmss } from "../../../util/helperFunctions";
import { AppTextEditor } from "../AppTextEditor";
import { Note } from "./Note";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { v4 as uuidv4 } from "uuid";
import { RootState, useAppDispatch } from "../../../store";
import { VideoJsonModel } from "../../../models/videoJSON.model";
import { useSelector } from "react-redux";
import { videoJsonActions } from "../../../store/videoJson.slice";
import { selCurrentVideo } from "../../../store/currentVideo.slice";
import { selVideoPlayer } from "../../../store/videoPlaye.slice";

export interface NoteListProps {
  notesData?: NoteModel[];
  currentVideoTime: number;
}

const NoteList = ({ notesData, currentVideoTime }: NoteListProps) => {
  const dispatch = useAppDispatch();

  const [showTextEditor, setShowTextEditor] = useState(false);
  const [staticCurrentTime, setStaticCurrentTime] = useState(0);

  const videoJsonData = useSelector(
    (state: RootState) => state.videoJson.videoJson
  );

  const currentVideo = useSelector(selCurrentVideo);
  const player = useSelector(selVideoPlayer);

  const onCancelClick = () => {
    setShowTextEditor(false);
  };

  const onCreateNote = (content: string) => {
    const newNote: NoteModel = {
      id: uuidv4(),
      content,
      videoTimeStamp: staticCurrentTime,
    };

    const newVideoJsonData: VideoJsonModel = {
      ...videoJsonData,
      notes: [...videoJsonData.notes, newNote],
    };

    dispatch(
      videoJsonActions.postVideoJason({
        currentVideo,
        newVideoJsonData,
      })
    ).then((data) => {
      console.log("data saved ", data);
      setShowTextEditor(false);
    });
  };

  const onVideoSeek = (seekTime: number) => {
    player?.seek(seekTime);
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
              onSaveNoteClick={onCreateNote}
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
