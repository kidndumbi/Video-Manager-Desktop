import React, { useEffect, useState } from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import Grid from "@mui/material/Grid";
// import Collapse from "@mui/material/Collapse";
// import InboxIcon from "@mui/icons-material/MoveToInbox";
// import ExpandLess from "@mui/icons-material/ExpandLess";
// import ExpandMore from "@mui/icons-material/ExpandMore";
// import StarBorder from "@mui/icons-material/StarBorder";
import FolderIcon from "@mui/icons-material/Folder";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import AppVideoPlayer from "./AppVideoPlayer";
import { VideoDataModel } from "../../models/videoData.model";
import Button from "@mui/material/Button";
import { AppTabs } from "./AppTabs";

type VideoListProps = {
  videoData: VideoDataModel[];
  onRootPathChange: (path: string) => void;
  rootPath: string;
  onBackTriggered: () => void;
  showBackBtn: boolean;
}; /* use `interface` if exporting so that consumers can extend */

// Easiest way to declare a Function Component; return type is inferred.
const VideoList = ({
  videoData,
  onRootPathChange,
  rootPath,
  onBackTriggered,
  showBackBtn,
}: VideoListProps) => {
  const [currentVideoTime, setCurrentVideoTime] = useState(0);

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

  const onCurrentTime = (time: number) => {
    console.log("current time triggered", time);
    setCurrentVideoTime(time);
  };

  return (
    <>
      <Grid container>
        <Grid xs={3}>
          <List
            sx={{ width: "100%", bgcolor: "background.paper" }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
                {showBackBtn ? (
                  <Button
                    variant="outlined"
                    onClick={onBackTriggered}
                    startIcon={<ArrowBackIosNewIcon />}
                  >
                    Back
                  </Button>
                ) : null}

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
          </List>
        </Grid>
        <Grid xs={9}>
          <Grid xs={12}>
            <AppVideoPlayer
              onCurrentTime={onCurrentTime}
              videoData={currentVideo}
            ></AppVideoPlayer>
          </Grid>
          <Grid xs={12}>
            <AppTabs currentVideoTime={currentVideoTime}></AppTabs>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export { VideoList };
