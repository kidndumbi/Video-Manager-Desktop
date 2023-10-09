import React, { useEffect, useState } from "react";
import {
  List,
  ListItem,
  Typography,
  Box,
  ListItemButton,
  ListItemText,
  IconButton,
  Tooltip,
} from "@mui/material";
import theme from "../../theme";
import { usePlaylistLogic } from "../../../hooks/usePlaylistLogic";
import { extractFileName } from "../../../util/helperFunctions";
import { PlaylistVideoModel } from "../../../models/playlist.model";
import { useVideoListLogic } from "../../../hooks/useVideoListLogic";
import { useVideoPlayerLogic } from "../../../hooks/useVideoPlayerLogic";
import LoopIcon from "@mui/icons-material/Loop";

const CurrentPlaylist = () => {
  const {
    currentPlaylist,
    setCurrentVideoFromDb,
    startVideo,
    setStartVideo,
    loopPlaylist,
    setLoopPlaylist,
  } = usePlaylistLogic();
  const { player } = useVideoListLogic();
  const { videoEnded, setVideoEnded } = useVideoPlayerLogic();

  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  useEffect(() => {
    if (currentPlaylist.videos.length > 0) {
      if (!startVideo) {
        setCurrentVideoIndex(0);
        playVideo(currentPlaylist.videos[0].filePath);
      } else {
        handleItemClick({ filePath: startVideo });
        setStartVideo("");
      }
    }
  }, [currentPlaylist]);

  useEffect(() => {
    if (videoEnded && loopPlaylist) {
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

  const toggleLoopPlalist = () => {
    setLoopPlaylist(!loopPlaylist);
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
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h6">{currentPlaylist?.name}</Typography>
        <Tooltip
          title={loopPlaylist ? "Turn of fLoop" : "loop playlist"}
          placement="bottom-start"
        >
          <IconButton
            aria-label="add-to-playlist"
            size="small"
            sx={{ color: loopPlaylist ? "white" : undefined }}
            onClick={toggleLoopPlalist}
          >
            <LoopIcon fontSize="small" />
          </IconButton>
        </Tooltip>
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
