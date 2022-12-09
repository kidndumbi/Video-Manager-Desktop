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
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import NotesIcon from "@mui/icons-material/Notes";
import AppVideoPlayer from "./AppVideoPlayer";
import { VideoDataModel } from "../../models/videoData.model";
import SettingsIcon from "@mui/icons-material/Settings";
import { VideoSettingsDialog } from "./VideoSettingsDialog";
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
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";

const VideoList = () => {
  const dispatch = useAppDispatch();

  const [currentVideoTime, setCurrentVideoTime] = useState(0);
  const [showSettingsDialog, setShowSettingsDialog] = useState(false);
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
            sx={{
              width: "100%",
              bgcolor: "background.paper",
              overflow: "auto",
              height: "100vh",
            }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
              <ListSubheader
                sx={{ fontSize: "14px", lineHeight: "19px", marginTop: "10px" }}
                component="div"
                id="nested-list-subheader"
              >
                {pathNav.length > 0 ? (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={onBackTriggered}
                    startIcon={<ArrowBackIosNewIcon />}
                    size="small"
                    sx={{ marginBottom: "10px" }}
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
                      sx={{ paddingBottom: "3px", paddingTop: "3px" }}
                      key={video.filePath}
                      onClick={() => handleVideoSelect(video)}
                    >
                      {video.isDirectory ? (
                        <ListItemIcon sx={{ minWidth: "33px" }}>
                          <FolderIcon fontSize="small" />
                        </ListItemIcon>
                      ) : null}

                      <ListItemText
                        primaryTypographyProps={{ fontSize: "14px" }}
                        primary={video.fileName}
                      />
                      {video.mustWatch ? (
                        <ListItemIcon>
                          <PriorityHighIcon color="warning" fontSize="small" />
                        </ListItemIcon>
                      ) : null}
                      {video.notesCount > 0 ? (
                        <Badge
                          color="secondary"
                          badgeContent={video.notesCount}
                        >
                          <NotesIcon fontSize="small" />
                        </Badge>
                      ) : null}
                    </ListItemButton>
                  );
                })}
              </div>
            ) : null}
          </List>
        </Grid>
        <Grid xs={9}>
          <Grid xs={12}>
            <IconButton
              color="primary"
              aria-label="add to shopping cart"
              onClick={() => setShowSettingsDialog(true)}
            >
              <SettingsIcon />
            </IconButton>
          </Grid>
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
        <VideoSettingsDialog
          onClose={() => setShowSettingsDialog(false)}
          showDialog={showSettingsDialog}
        ></VideoSettingsDialog>
      </Grid>
    </>
  );
};

export { VideoList };
