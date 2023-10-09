import React, { useEffect } from "react";
import {
  List,
  ListItem,
  Typography,
  Box,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import theme from "../../theme";
import { usePlaylistLogic } from "../../../hooks/usePlaylistLogic";
import { extractFileName } from "../../../util/helperFunctions";
import { PlaylistVideoModel } from "../../../models/playlist.model";
import { useVideoListLogic } from "../../../hooks/useVideoListLogic";
import { useVideoPlayerLogic } from "../../../hooks/useVideoPlayerLogic";

const CurrentPlaylist = () => {
  const { currentPlaylist, setCurrentVideoFromDb } = usePlaylistLogic();
  const { player } = useVideoListLogic();
  const { videoEnded } = useVideoPlayerLogic();

  useEffect(() => {
    console.log("currentPlaylist  ", currentPlaylist);
  }, [currentPlaylist]);

  useEffect(() => {
    if (videoEnded) {
      console.log("video ended ", videoEnded);
    }
  }, [videoEnded]);

  const handleItemClick = (video: PlaylistVideoModel) => {
    setCurrentVideoFromDb(video.filePath, () => {
      player.play();
    });
  };

  return (
    <Box>
      {/* Title */}
      <Box
        sx={{
          backgroundColor: theme.palette.secondary.main,
          color: "white",
          padding: 1,
          height: "49px",
        }}
      >
        <Typography variant="h6">{currentPlaylist?.name}</Typography>
      </Box>

      {/* List */}
      <List sx={{ height: "100%" }}>
        {currentPlaylist?.videos?.map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton onClick={() => handleItemClick(item)}>
              <ListItemText primary={extractFileName(item.filePath)} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default CurrentPlaylist;
