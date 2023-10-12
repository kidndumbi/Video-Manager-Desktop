import React from "react";
import {
  ListItem,
  ListItemText,
  IconButton,
  Tooltip,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import { PlaylistVideoModel } from "../../../models/playlist.model";
import { extractFileName } from "../../../util/helperFunctions";
import { VideoProgressBar } from "../VideoProgressBar";

type PlaylistVideoItemProps = {
  video: PlaylistVideoModel;
  onDelete: (video: PlaylistVideoModel) => void;
  onPlay: (video: PlaylistVideoModel) => void;
};

const PlaylistVideoItem: React.FC<PlaylistVideoItemProps> = ({
  video,
  onDelete,
  onPlay,
}) => {
  return (
    <ListItem
      key={video.filePath}
      secondaryAction={
        <>
          <IconButton
            edge="end"
            aria-label="delete"
            color="secondary"
            onClick={() => onDelete(video)}
          >
            <DeleteIcon />
          </IconButton>
          <IconButton
            edge="end"
            aria-label="delete"
            color="secondary"
            onClick={() => onPlay(video)}
          >
            <PlayCircleIcon />
          </IconButton>
        </>
      }
    >
      <Box sx={{ width: "100%" }}>
        <Tooltip title={video.filePath} placement="bottom-start">
          <ListItemText primary={extractFileName(video.filePath)} />
        </Tooltip>
        <Box sx={{ mt: 2 }}>
          <VideoProgressBar
            current={video.lastWatched || 0}
            total={video.duration || 0}
          />
        </Box>
      </Box>
    </ListItem>
  );
};

export default PlaylistVideoItem;
