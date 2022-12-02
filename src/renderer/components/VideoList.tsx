import React, { useEffect, useState } from "react";
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
import { useAppDispatch } from "../../store";
import {
  currentRootPathActions,
  selCurrentRootPath,
} from "../../store/currentRootpath.slice";
import { pathNavActions, selPathNav } from "../../store/pathNav.slice";
import {
  folderVideosInfoActions,
  selFoldersVideosInfo,
} from "../../store/folderVideosInfo.slice";
import {
  currentVideoActions,
  selCurrentVideo,
} from "../../store/currentVideo.slice";
import { videoPlayerActions } from "../../store/videoPlaye.slice";

const VideoList = () => {
  const dispatch = useAppDispatch();

  const [currentVideoTime, setCurrentVideoTime] = useState(0);
  const currentVideo = useSelector(selCurrentVideo);

  const folderVideosInfo = useSelector(selFoldersVideosInfo);
  const pathNav = useSelector(selPathNav);
  const currentRootPath = useSelector(selCurrentRootPath);

  useEffect(() => {
    dispatch(folderVideosInfoActions.fetchFolderVideosInfo(currentRootPath));
  }, []);

  useEffect(() => {
    if (folderVideosInfo && folderVideosInfo.length > 0) {
      dispatch(
        currentVideoActions.setCurrentVideo(
          folderVideosInfo.find((v) => v.isDirectory !== true)
        )
      );
    }
  }, [folderVideosInfo]);

  const handleVideoSelect = (video: VideoDataModel) => {
    if (video.isDirectory === false) {
      dispatch(currentVideoActions.setCurrentVideo(video));
    } else {
      dispatch(currentRootPathActions.setCurrentRootPath(video.filePath));
      dispatch(pathNavActions.setPathNav([...pathNav, currentRootPath]));
      dispatch(folderVideosInfoActions.fetchFolderVideosInfo(video.filePath));
    }
  };

  const onBackTriggered = () => {
    if (pathNav.length > 0) {
      dispatch(
        currentRootPathActions.setCurrentRootPath(pathNav[pathNav.length - 1])
      );
      dispatch(
        folderVideosInfoActions.fetchFolderVideosInfo(
          pathNav[pathNav.length - 1]
        )
      );
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
            {folderVideosInfo && folderVideosInfo.length > 0 ? (
              <div>
                {folderVideosInfo.map((video: VideoDataModel) => {
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
              setPlayer={(p) => {
                dispatch(videoPlayerActions.setVideoPlayer(p));
              }}
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
