import React from "react";
import { ListItem, ListItemText, IconButton, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import { PlaylistVideoModel } from "../../../models/playlist.model";

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
      <Tooltip title={video.filePath} placement="bottom-start">
        <ListItemText
          primary={video.filePath.split("/").pop()?.replace(".mp4", "") ?? ""}
        />
      </Tooltip>
    </ListItem>
  );
};

export default PlaylistVideoItem;
