import React from "react";
import { Avatar, List, ListItem, Paper, Typography } from "@mui/material";
import { videoInfo } from "ytdl-core";

type YoutubeDetailsProps = {
  videoDetails: videoInfo["videoDetails"] | null;
};

const YoutubeDetails: React.FC<YoutubeDetailsProps> = ({ videoDetails }) => {
  return (
    <Paper elevation={3} sx={{ padding: 2, marginTop: 2 }}>
      <Avatar
        src={videoDetails?.author?.thumbnails?.[0]?.url || ""}
        alt="Video Thumbnail"
        sx={{
          width: videoDetails?.author?.thumbnails?.[0]?.width || 88,
          height: videoDetails?.author?.thumbnails?.[0]?.height || 88,
          margin: "0 auto",
        }}
      />
      <Typography variant="h6" gutterBottom>
        Video Details
      </Typography>
      <List>
        <ListItem>
          <Typography variant="subtitle1">
            Channel Name: {videoDetails?.ownerChannelName}
          </Typography>
        </ListItem>
        <ListItem>
          <Typography variant="subtitle1">
            Title: {videoDetails?.title}
          </Typography>
        </ListItem>
        <ListItem>
          <Typography variant="subtitle1">
            Upload Date: {videoDetails?.uploadDate}
          </Typography>
        </ListItem>
        <ListItem>
          <Typography variant="subtitle1">Description</Typography>
        </ListItem>
        <ListItem>
          <Typography
            variant="body1"
            component="div"
            sx={{ whiteSpace: "pre-line" }}
          >
            {videoDetails?.description}
          </Typography>
        </ListItem>
      </List>
    </Paper>
  );
};

export default YoutubeDetails;
