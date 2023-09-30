import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import React, { useState } from "react";
import { OverviewModel } from "../../../models/overview.model";
import { NoteTextEditor } from "../NoteTextEditor";
import EditIcon from "@mui/icons-material/Edit";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../store";
import { selVideoJson, videoJsonActions } from "../../../store/videoJson.slice";
import { VideoJsonModel } from "../../../models/videoJSON.model";
import { selCurrentVideo } from "../../../store/currentVideo.slice";

type OverviewProps = {
  overview: OverviewModel;
};

const EditButton = ({ onClick }: { onClick: () => void }) => (
  <IconButton aria-label="edit" size="large" onClick={onClick}>
    <EditIcon fontSize="inherit" />
  </IconButton>
);

const TextDisplay = ({ body }: { body: string }) => (
  <Box dangerouslySetInnerHTML={{ __html: body || "" }}></Box>
);

const TextEditor = ({
  onSave,
  onCancel,
  body,
}: {
  onSave: (value: string) => void;
  onCancel: () => void;
  body: string;
}) => (
  <Box sx={{ height: 250, mb: 5 }}>
    <NoteTextEditor
      onSaveNoteClick={onSave}
      onCancelClick={onCancel}
      btnText="Save"
      text={body}
    />
  </Box>
);

const Overview = ({ overview }: OverviewProps) => {
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
