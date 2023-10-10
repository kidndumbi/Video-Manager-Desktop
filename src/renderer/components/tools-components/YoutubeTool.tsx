import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Tooltip } from "@mui/material";
import { YoutubeDialog } from "../youtube/YoutubeDialog";

const YoutubeTool = () => {
  const [showDialog, setShowDialog] = useState(false);

  return (
    <>
      <Tooltip title="download youtube videos" placement="bottom-start">
        <IconButton
          aria-label="YoutubeTool"
          color="secondary"
          size="small"
          onClick={() => setShowDialog(true)}
        >
          <YouTubeIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <YoutubeDialog
        showDialog={showDialog}
        handleClose={() => setShowDialog(false)}
      ></YoutubeDialog>
    </>
  );
};

export default YoutubeTool;
