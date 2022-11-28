import React, { useEffect, useState } from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
// import Collapse from "@mui/material/Collapse";
// import InboxIcon from "@mui/icons-material/MoveToInbox";
// import ExpandLess from "@mui/icons-material/ExpandLess";
// import ExpandMore from "@mui/icons-material/ExpandMore";
// import StarBorder from "@mui/icons-material/StarBorder";
import FolderIcon from "@mui/icons-material/Folder";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import { AppVideoPlayer } from "./AppVideoPlayer";
import { VideoDataModel } from "../../models/videoData.model";
import Button from "@mui/material/Button";

type VideoListProps = {
  videoData: VideoDataModel[];
  onRootPathChange: (path: string) => void;
  rootPath: string;
  onBackTriggered: () => void;
}; /* use `interface` if exporting so that consumers can extend */

// Easiest way to declare a Function Component; return type is inferred.
const VideoList = ({
  videoData,
  onRootPathChange,
  rootPath,
  onBackTriggered,
}: VideoListProps) => {
  //const [open, setOpen] = useState(true);

  const [currentVideo, setCurrentVideo] = useState<VideoDataModel>();

  useEffect(() => {
    if (videoData && videoData.length > 0) {
      setCurrentVideo(videoData.find((v) => v.isDirectory !== true));
    }
  }, [videoData]);

  const handleVideoSelect = (video: VideoDataModel) => {
    //setOpen(!open);
    if (video.isDirectory === false) {
      setCurrentVideo(video);
    } else {
      onRootPathChange(video.filePath);
    }
  };

  return (
    <>
      <AppVideoPlayer videoData={currentVideo}></AppVideoPlayer>
      <List
        sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            <Button
              variant="outlined"
              onClick={onBackTriggered}
              startIcon={<ArrowBackIosNewIcon />}
            >
              Back
            </Button>
            <div> {rootPath}</div>
          </ListSubheader>
        }
      >
        {videoData && videoData.length > 0 ? (
          <div>
            {videoData.map((video: VideoDataModel) => {
              return (
                <ListItemButton
                  key={video.filePath}
                  onClick={() => handleVideoSelect(video)}
                >
                  <ListItemIcon>
                    {video.isDirectory === true ? (
                      <FolderIcon />
                    ) : (
                      <OndemandVideoIcon />
                    )}
                  </ListItemIcon>
                  <ListItemText primary={video.fileName} />
                </ListItemButton>
              );
            })}
          </div>
        ) : null}
        {/* <ListItemButton onClick={handleClick}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Inbox" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton> */}
        {/* <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText primary="Starred" />
            </ListItemButton>
          </List>
        </Collapse> */}
      </List>
    </>
  );
};

export { VideoList };
