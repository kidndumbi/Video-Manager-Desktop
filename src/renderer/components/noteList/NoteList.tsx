import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import React, { useEffect, useState } from "react";
import { NoteModel } from "../../../models/note.model";
import { secondsTohhmmss } from "../../../util/helperFunctions";
import { NoteTextEditor } from "../NoteTextEditor";
import { Note } from "./note/Note";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { v4 as uuidv4 } from "uuid";
import { useAppDispatch } from "../../../store";
import { VideoJsonModel } from "../../../models/videoJSON.model";
import { useSelector } from "react-redux";
import { selVideoJson, videoJsonActions } from "../../../store/videoJson.slice";
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

  const videoJsonData = useSelector(selVideoJson);

  const currentVideo = useSelector(selCurrentVideo);
  const player = useSelector(selVideoPlayer);

  const onCancelClick = () => {
    setShowTextEditor(false);
  };

  useEffect(() => {
    setShowTextEditor(false);
  }, [currentVideo]);

  const onCreateNote = (content: string) => {
    if (content === "") {
      return;
    }

    const newNote: NoteModel = {
      id: uuidv4(),
      content,
      videoTimeStamp: staticCurrentTime,
      createdAt: new Date().getTime(),
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
    ).then(() => {
      setShowTextEditor(false);
    });
  };

  const onDeleteNote = (note: NoteModel) => {
    const filteredNotes = videoJsonData.notes.filter((n) => n.id !== note.id);

    const newVideoJsonData: VideoJsonModel = {
      ...videoJsonData,
      notes: filteredNotes,
    };

    dispatch(
      videoJsonActions.postVideoJason({
        currentVideo,
        newVideoJsonData,
      })
    ).then(() => {
      // setShowTextEditor(false);
    });
  };

  const onVideoSeek = (seekTime: number) => {
    player?.seek(seekTime);
  };

  const onNoteSave = (updatedNote: NoteModel) => {
    const notesForUpdate = JSON.parse(
      JSON.stringify(videoJsonData.notes)
    ) as NoteModel[];
    notesForUpdate.forEach((note) => {
      if (note.id == updatedNote.id) note.content = updatedNote.content;
    });

    const newVideoJsonData: VideoJsonModel = {
      ...videoJsonData,
      notes: notesForUpdate,
    };

    dispatch(
      videoJsonActions.postVideoJason({
        currentVideo,
        newVideoJsonData,
      })
    ).then(() => {
      // setShowTextEditor(false);
    });
  };

  return (
    <>
      <Box>
        <Box>
          {showTextEditor ? (
            <Box
              sx={{
                paddingBottom: "10px",
                height: "150px",
                marginBottom: "120px",
              }}
            >
              New note at:
              <Chip
                label={secondsTohhmmss(staticCurrentTime)}
                icon={<AccessTimeIcon />}
                color="secondary"
                variant="filled"
                sx={{ marginBottom: " 5px" }}
                size="small"
              />
              <NoteTextEditor
                onSaveNoteClick={onCreateNote}
                onCancelClick={onCancelClick}
                btnText="Save New Note"
              ></NoteTextEditor>
            </Box>
          ) : null}
          {!showTextEditor ? (
            <Box sx={{ marginBottom: " 15px" }}>
              <Button
                color="primary"
                variant="contained"
                onClick={() => {
                  player.pause();
                  setShowTextEditor(true);
                  setStaticCurrentTime(currentVideoTime);
                }}
              >
                Create new note at {secondsTohhmmss(currentVideoTime)}
              </Button>
            </Box>
          ) : null}
        </Box>

        <Box>
          {notesData && notesData.length > 0
            ? notesData.map((note) => (
                <Note
                  onVideoSeek={onVideoSeek}
                  key={note.id}
                  note={note}
                  onNoteSave={onNoteSave}
                  onNoteDelete={onDeleteNote}
                ></Note>
              ))
            : null}
        </Box>
      </Box>
    </>
  );
};

export { NoteList };
