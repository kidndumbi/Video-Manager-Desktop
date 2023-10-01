import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../store";
import { v4 as uuidv4 } from "uuid";

import { NoteModel } from "../../../models/note.model";
import { VideoJsonModel } from "../../../models/videoJSON.model";
import { secondsTohhmmss } from "../../../util/helperFunctions";
import { selVideoJson, videoJsonActions } from "../../../store/videoJson.slice";
import { selCurrentVideo } from "../../../store/currentVideo.slice";
import { selVideoPlayer } from "../../../store/videoPlaye.slice";

import { NoteTextEditor } from "../NoteTextEditor";
import { Note } from "./note/Note";
import CreateNewNote from "./CreateNewNote";

export interface NoteListProps {
  notesData?: NoteModel[];
  currentVideoTime: number;
}

const NoteList: React.FC<NoteListProps> = ({ notesData, currentVideoTime }) => {
  const dispatch = useAppDispatch();
  const videoJsonData = useSelector(selVideoJson);
  const currentVideo = useSelector(selCurrentVideo);
  const player = useSelector(selVideoPlayer);

  const [showTextEditor, setShowTextEditor] = useState(false);
  const [staticCurrentTime, setStaticCurrentTime] = useState(0);

  useEffect(() => {
    setShowTextEditor(false);
  }, [currentVideo]);

  const handleCancelClick = () => setShowTextEditor(false);

  const handleCreateNewNoteButtonClick = () => {
    player.pause();
    setShowTextEditor(true);
    setStaticCurrentTime(currentVideoTime);
  };

  const handleCreateNote = (content: string) => {
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

  const handleDeleteNote = (note: NoteModel) => {
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
      // Optional: setShowTextEditor(false);
    });
  };

  const handleVideoSeek = (seekTime: number) => {
    player?.seek(seekTime);
  };

  const handleNoteSave = (updatedNote: NoteModel) => {
    const notesForUpdate = JSON.parse(
      JSON.stringify(videoJsonData.notes)
    ) as NoteModel[];
    notesForUpdate.forEach((note) => {
      if (note.id === updatedNote.id) note.content = updatedNote.content;
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
      // Optional: setShowTextEditor(false);
    });
  };

  return (
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
              sx={{ marginBottom: "5px" }}
              size="small"
            />
            <NoteTextEditor
              onSaveNoteClick={handleCreateNote}
              onCancelClick={handleCancelClick}
              btnText="Save New Note"
            />
          </Box>
        ) : (
          <CreateNewNote
            currentVideoTime={currentVideoTime}
            onButtonClick={handleCreateNewNoteButtonClick}
          />
        )}
      </Box>

      <Box>
        {notesData?.map((note) => (
          <Note
            key={note.id}
            note={note}
            onVideoSeek={handleVideoSeek}
            onNoteSave={handleNoteSave}
            onNoteDelete={handleDeleteNote}
          />
        ))}
      </Box>
    </Box>
  );
};

export { NoteList };
