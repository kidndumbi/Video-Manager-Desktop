import React, { useEffect, useState } from "react";
import { ipcRenderer } from "electron";
import { useSelector } from "react-redux";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import Grid from "@mui/material/Grid";
import FolderIcon from "@mui/icons-material/Folder";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import AppVideoPlayer from "./AppVideoPlayer";
import { VideoDataModel } from "../../models/videoData.model";
import Button from "@mui/material/Button";
import { AppTabs } from "./AppTabs";
import { RootState, useAppDispatch } from "../../store";
import { currentRootPathActions } from "../../store/currentRootpath.slice";
import { pathNavActions } from "../../store/pathNav.slice";

const VideoList = () => {
  const [currentVideoTime, setCurrentVideoTime] = useState(0);

  const dispatch = useAppDispatch();

  const [currentVideo, setCurrentVideo] = useState<VideoDataModel>();
  const [player, setPlayer] = useState<any>();
  const [videoData, setVideoData] = useState([]);

  const pathNav = useSelector((state: RootState) => state.pathNav.pathNav);

  const currentRootPath = useSelector(
    (state: RootState) => state.currentRootPath.currentRootPath
  );

  useEffect(() => {
    ipcRenderer.send("get:root-video-data", currentRootPath);

    ipcRenderer.on("send:root-video-data", (event, data) => {
      setVideoData(data);
    });
  }, []);

  useEffect(() => {
    if (videoData && videoData.length > 0) {
      setCurrentVideo(videoData.find((v: any) => v.isDirectory !== true));
    }
  }, [videoData]);

  const handleVideoSelect = (video: VideoDataModel) => {
    if (video.isDirectory === false) {
      setCurrentVideo(video);
    } else {
      dispatch(currentRootPathActions.setCurrentRootPath(video.filePath));
      dispatch(pathNavActions.setPathNav([...pathNav, currentRootPath]));
      ipcRenderer.send("get:root-video-data", video.filePath);
    }
  };

  const onBackTriggered = () => {
    if (pathNav.length > 0) {
      dispatch(
        currentRootPathActions.setCurrentRootPath(pathNav[pathNav.length - 1])
      );
      ipcRenderer.send("get:root-video-data", pathNav[pathNav.length - 1]);
      dispatch(pathNavActions.setPathNav(pathNav.slice(0, -1)));
    }
  };

  const onCurrentTime = (time: number) => {
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
                {pathNav.length > 0 ? (
                  <Button
                    variant="outlined"
                    onClick={onBackTriggered}
                    startIcon={<ArrowBackIosNewIcon />}
                  >
                    Back
                  </Button>
                ) : null}

                <div> {currentRootPath}</div>
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
              setPlayer={setPlayer}
              onCurrentTime={onCurrentTime}
              videoData={currentVideo}
            ></AppVideoPlayer>
          </Grid>
          <Grid xs={12}>
            <AppTabs
              onVideoSeek={(seekTime: number) => {
                player.seek(seekTime);
              }}
              currentVideo={currentVideo}
              currentVideoTime={currentVideoTime}
            ></AppTabs>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export { VideoList };
