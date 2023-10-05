import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import FeaturedPlayListIcon from "@mui/icons-material/FeaturedPlayList";
import { Tooltip } from "@mui/material";
import { ManagePlaylistsDialog } from "../playlist/ManagePlaylistsDialog";

const PlaylistsTool = () => {
  const [showDialog, setShowDialog] = useState(false);

  return (
    <>
      <Tooltip title="Playlists" placement="bottom-start">
        <IconButton
          aria-label="playlistTool"
          color="secondary"
          size="small"
          onClick={() => setShowDialog(true)}
        >
          <FeaturedPlayListIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <ManagePlaylistsDialog
        playPlaylistTriggered={() => setShowDialog(false)}
        showDialog={showDialog}
        handleClose={() => setShowDialog(false)}
      ></ManagePlaylistsDialog>
    </>
  );
};

export default PlaylistsTool;
