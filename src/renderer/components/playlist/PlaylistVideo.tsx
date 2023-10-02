import React from "react";
import { ListItem, ListItemText, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import { PlaylistVideoModel } from "../../../models/playlist.model";

type PlaylistVideoProps = {
  video: PlaylistVideoModel;
  onDelete: (video: PlaylistVideoModel) => void;
  onPlay: (video: PlaylistVideoModel) => void;
};

const PlaylistVideo: React.FC<PlaylistVideoProps> = ({
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
      <ListItemText
        primary={video.filePath.split("/").pop()?.replace(".mp4", "") ?? ""}
      />
    </ListItem>
  );
};

export default PlaylistVideo;
