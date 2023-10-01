import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../store";
import { selVideoJson, videoJsonActions } from "../store/videoJson.slice";
import { selCurrentVideo } from "../store/currentVideo.slice";
import { selVideoPlayer } from "../store/videoPlaye.slice";
import { v4 as uuidv4 } from "uuid";
import { NoteModel } from "../models/note.model";
import { VideoJsonModel } from "../models/videoJSON.model";

export const useNoteListLogic = (currentVideoTime: number) => {
  const dispatch = useAppDispatch();
  const videoJsonData = useSelector(selVideoJson);
  const currentVideo = useSelector(selCurrentVideo);
  const player = useSelector(selVideoPlayer);

  const [showTextEditor, setShowTextEditor] = useState(false);
  const [staticCurrentTime, setStaticCurrentTime] = useState(0);

  useEffect(() => {
    setShowTextEditor(false);
  }, [currentVideo]);

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

  const handleCreateNewNoteButtonClick = () => {
    player.pause();
    setShowTextEditor(true);
    setStaticCurrentTime(currentVideoTime);
  };

  const handleCancelClick = () => setShowTextEditor(false);

  return {
    showTextEditor,
    staticCurrentTime,
    handleCreateNote,
    handleDeleteNote,
    handleVideoSeek,
    handleNoteSave,
    handleCreateNewNoteButtonClick,
    handleCancelClick,
  };
};
