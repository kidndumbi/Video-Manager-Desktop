import React, { useState, FC } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import { useSelector } from "react-redux";
import { OverviewModel } from "../../../models/overview.model";
import { VideoJsonModel } from "../../../models/videoJSON.model";
import { NoteTextEditor } from "../NoteTextEditor";
import { selVideoJson, videoJsonActions } from "../../../store/videoJson.slice";
import { selCurrentVideo } from "../../../store/currentVideo.slice";
import { useAppDispatch } from "../../../store";

type EditButtonProps = {
  onClick: () => void;
};

const EditButton: FC<EditButtonProps> = ({ onClick }) => (
  <IconButton aria-label="edit" size="large" onClick={onClick}>
    <EditIcon fontSize="inherit" />
  </IconButton>
);

type TextDisplayProps = {
  body: string;
};

const TextDisplay: FC<TextDisplayProps> = ({ body }) => (
  <Box dangerouslySetInnerHTML={{ __html: body || "" }}></Box>
);

type TextEditorProps = {
  onSave: (value: string) => void;
  onCancel: () => void;
  body: string;
};

const TextEditor: FC<TextEditorProps> = ({ onSave, onCancel, body }) => (
  <Box sx={{ height: 250, mb: 5 }}>
    <NoteTextEditor
      onSaveNoteClick={onSave}
      onCancelClick={onCancel}
      btnText="Save"
      text={body}
    />
  </Box>
);

type OverviewProps = {
  overview: OverviewModel;
};

const Overview: FC<OverviewProps> = ({ overview }) => {
  const dispatch = useAppDispatch();
  const [showTextEditor, setShowTextEditor] = useState(false);
  const videoJsonData = useSelector(selVideoJson);
  const currentVideo = useSelector(selCurrentVideo);

  const save = (body: string) => {
    if (!body) return;

    const newVideoJsonData: VideoJsonModel = {
      ...videoJsonData,
      overview: { updatedDat: new Date().getTime(), body },
    };

    dispatch(
      videoJsonActions.postVideoJason({
        currentVideo,
        newVideoJsonData,
      })
    ).then(() => setShowTextEditor(false));
  };

  return (
    <Box>
      {!showTextEditor && (
        <EditButton onClick={() => setShowTextEditor(true)} />
      )}
      <Box sx={{ marginBottom: 1 }}>
        {!showTextEditor && <TextDisplay body={overview.body || ""} />}
        {showTextEditor && (
          <TextEditor
            onSave={(value) => {
              setShowTextEditor(false);
              save(value);
            }}
            onCancel={() => setShowTextEditor(false)}
            body={overview?.body || ""}
          />
        )}
      </Box>
    </Box>
  );
};

export { Overview };
