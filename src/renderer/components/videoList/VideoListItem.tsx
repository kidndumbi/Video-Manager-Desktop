import React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import FolderIcon from "@mui/icons-material/Folder";
import NewReleasesIcon from "@mui/icons-material/NewReleases";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Badge from "@mui/material/Badge";
import NotesIcon from "@mui/icons-material/Notes";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { VideoDataModel } from "../../../models/videoData.model";

type VideoListItemProps = {
  video: VideoDataModel;
  currentVideo: VideoDataModel | null;
  handleVideoSelect: (video: VideoDataModel) => void;
  handleOnVideoSelected: (
    event: React.ChangeEvent<HTMLInputElement>,
    video: VideoDataModel
  ) => void;
  convertMillisecondsToDate: (time: number) => string;
  secondsTohhmmss: (time: number) => string;
};

const VideoListItem: React.FC<VideoListItemProps> = ({
  video,
  currentVideo,
  handleVideoSelect,
  convertMillisecondsToDate,
  secondsTohhmmss,
}) => {
  return (
    <div key={video.filePath}>
      <ListItemButton
        sx={{
          marginLeft: "5px",
          borderLeft: !video.watched
            ? "5px solid #9575CD"
            : "5px solid transparent",
          paddingBottom: "9px",
          paddingTop: "9px",
          backgroundColor:
            video.fileName === currentVideo?.fileName ? "#e0e0e0" : "",
        }}
        onClick={() => handleVideoSelect(video)}
      >
        {video.isDirectory && (
          <ListItemIcon sx={{ minWidth: "33px" }}>
            <FolderIcon fontSize="small" />
          </ListItemIcon>
        )}
        <ListItemText
          disableTypography
          primary={
            <Typography variant="body1" style={{ fontSize: "14px" }}>
              {video.fileName}
            </Typography>
          }
          secondary={
            <>
              <Typography variant="body2" style={{ fontSize: "11px" }}>
                {convertMillisecondsToDate(video.createdAt)}
              </Typography>
              {!video.isDirectory && (
                <Typography variant="body2" style={{ fontSize: "10px" }}>
                  {"Duration: " + secondsTohhmmss(video.duration || 0)}
                </Typography>
              )}
            </>
          }
        />
        {video.mustWatch ? (
          <NewReleasesIcon color="warning" fontSize="small" />
        ) : null}
        {video.like ? <FavoriteIcon color="primary" fontSize="small" /> : null}
        {video.notesCount > 0 ? (
          <Badge
            color="secondary"
            badgeContent={video.notesCount}
            sx={{ right: 2, top: 9 }}
          >
            <NotesIcon fontSize="small" />
          </Badge>
        ) : null}
      </ListItemButton>
      <Divider />
    </div>
  );
};

export default VideoListItem;
