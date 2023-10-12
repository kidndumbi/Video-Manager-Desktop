import React, { useEffect, useState } from "react";
import { Tooltip, IconButton } from "@mui/material";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import CheckboxListDialog, { CheckboxListModel } from "./CheckboxListDialog";
import { usePlaylistLogic } from "../../../hooks/usePlaylistLogic";
import _ from "lodash";
import { useVideoPlayerLogic } from "../../../hooks/useVideoPlayerLogic";

const AddVideoToPlaylist: React.FC = () => {
  const [showDialog, setShowDialog] = useState(false);
  const { playlists, addVideoToPlaylist } = usePlaylistLogic();
  const { currentVideo } = useVideoPlayerLogic();
  const [playlistData, setPlaylistData] = useState<CheckboxListModel[]>([]);

  // Update the playlist data based on the current video and available playlists
  useEffect(() => {
    if (!_.isEmpty(currentVideo) && playlists) {
      const updatedPlaylistData = playlists.map((playlist) => ({
        id: playlist.id,
        name: playlist.name,
        selected: playlist.videos.some(
          (video) => video.filePath === currentVideo.filePath
        ),
      }));

      setPlaylistData(updatedPlaylistData);
    }
  }, [playlists, currentVideo]);

  const onCheckboxClick = (item: CheckboxListModel) => {
    addVideoToPlaylist(item.id, { filePath: currentVideo.filePath });
  };

  return (
    <>
      {!_.isEmpty(currentVideo) && (
        <>
          <Tooltip title="Add to playlist" placement="bottom-start">
            <IconButton
              aria-label="add-to-playlist"
              size="small"
              onClick={() => setShowDialog(true)}
              sx={{ color: "white" }}
            >
              <PlaylistAddIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <CheckboxListDialog
            onCheckboxClick={onCheckboxClick}
            checkboxList={playlistData}
            title="Playlists"
            open={showDialog}
            onClose={() => setShowDialog(false)}
          />
        </>
      )}
    </>
  );
};

export { AddVideoToPlaylist };
