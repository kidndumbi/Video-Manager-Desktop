import React, { useEffect, useState } from "react";
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
  const { videoEnded, setVideoEnded } = useVideoPlayerLogic();

  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  useEffect(() => {
    if (currentPlaylist.videos.length > 0) {
      setCurrentVideoIndex(0);
      playVideo(currentPlaylist.videos[0].filePath);
    }
  }, [currentPlaylist]);

  useEffect(() => {
    if (videoEnded) {
      playNextVideo();
    }
  }, [videoEnded]);

  const playNextVideo = () => {
    const nextIndex = currentVideoIndex + 1;
    if (nextIndex < currentPlaylist.videos.length) {
      setCurrentVideoIndex(nextIndex);
      playVideo(currentPlaylist.videos[nextIndex].filePath);
    }
    setVideoEnded(false);
  };

  const playVideo = (filePath: string) => {
    setCurrentVideoFromDb(filePath, () => {
      player.play();
    });
  };

  const handleItemClick = (video: PlaylistVideoModel) => {
    const videoIndex = currentPlaylist.videos.findIndex(
      (v) => v.filePath === video.filePath
    );
    setCurrentVideoIndex(videoIndex);
    playVideo(video.filePath);
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
            <ListItemButton
              onClick={() => handleItemClick(item)}
              sx={{
                backgroundColor:
                  index === currentVideoIndex
                    ? "rgba(0, 0, 0, 0.08)"
                    : "transparent",
              }}
            >
              <ListItemText primary={extractFileName(item.filePath)} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default CurrentPlaylist;
