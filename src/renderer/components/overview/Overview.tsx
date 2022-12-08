import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import React, { useState } from "react";
import { OverviewModel } from "../../../models/overview.model";
import { NoteTextEditor } from "../NoteTextEditor";
import EditIcon from "@mui/icons-material/Edit";
import { useSelector } from "react-redux";
import { selVideoJson, videoJsonActions } from "../../../store/videoJson.slice";
import { VideoJsonModel } from "../../../models/videoJSON.model";
import { useAppDispatch } from "../../../store";
import { selCurrentVideo } from "../../../store/currentVideo.slice";

type OverviewProps = {
  overview: OverviewModel;
};

const Overview = ({ overview }: OverviewProps) => {
  const dispatch = useAppDispatch();

  const [showTextEditor, setShowTextEditor] = useState(false);

  const videoJsonData = useSelector(selVideoJson);
  const currentVideo = useSelector(selCurrentVideo);

  const save = (body: string) => {
    if (body === "") {
      return;
    }

    const newVideoJsonData: VideoJsonModel = {
      ...videoJsonData,
      overview: { updatedDat: new Date().getTime(), body },
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

  return (
    <>
      <Box>
        {!showTextEditor ? (
          <Box>
            <IconButton
              aria-label="delete"
              size="large"
              onClick={() => setShowTextEditor(true)}
            >
              <EditIcon fontSize="inherit" />
            </IconButton>
          </Box>
        ) : null}

        <Box sx={{ marginBottom: 1 }}>
          {!showTextEditor ? (
            <Box
              dangerouslySetInnerHTML={{ __html: overview.body || "" }}
            ></Box>
          ) : null}

          {showTextEditor ? (
            <Box
              sx={{
                height: 250,
                mb: 5,
              }}
            >
              <NoteTextEditor
                onSaveNoteClick={(value: string) => {
                  setShowTextEditor(false);
                  save(value);
                }}
                onCancelClick={() => {
                  setShowTextEditor(false);
                }}
                btnText="Save"
                text={overview?.body}
              />
            </Box>
          ) : null}
        </Box>
      </Box>
    </>
  );
};

export { Overview };
