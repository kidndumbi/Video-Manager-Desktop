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
import NewReleasesIcon from "@mui/icons-material/NewReleases";
import NotesIcon from "@mui/icons-material/Notes";
import AppVideoPlayer from "./AppVideoPlayer";
import { VideoDataModel } from "../../models/videoData.model";
import SettingsIcon from "@mui/icons-material/Settings";
import FavoriteIcon from "@mui/icons-material/Favorite";
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
import {
  selVideoPlayer,
  videoPlayerActions,
} from "../../store/videoPlaye.slice";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { selVideoJson, videoJsonActions } from "../../store/videoJson.slice";
import { VideoJsonModel } from "../../models/videoJSON.model";
import Divider from "@mui/material/Divider";
import { ipcRenderer } from "electron";
import {
  convertMillisecondsToDate,
  secondsTohhmmss,
} from "../../util/helperFunctions";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { AlertDialog } from "./AlertDialog";
import { Search } from "./Search";
import Typography from "@mui/material/Typography";

const VideoList = () => {
  const dispatch = useAppDispatch();

  const [currentVideoTime, setCurrentVideoTime] = useState(0);
  const [showSettingsDialog, setShowSettingsDialog] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [selectedVideos, setSelectedVideos] = useState<VideoDataModel[]>([]);
  const currentVideo = useSelector(selCurrentVideo);

  const player = useSelector(selVideoPlayer);

  const folderVideosInfo = useSelector(selFoldersVideosInfo);
  const pathNav = useSelector(selPathNav);
  const currentRootPath = useSelector(selCurrentRootPath);

  const videoJsonData = useSelector(selVideoJson);

  useEffect(() => {
    dispatch(
      folderVideosInfoActions.fetchFolderVideosInfo({ currentRootPath })
    );
  }, []);

  useEffect(() => {
    if (player) {
      if (videoJsonData.lastWatched) {
        player.seek(videoJsonData.lastWatched);
      }
    }
  }, [videoJsonData]);

  useEffect(() => {
    if (folderVideosInfo && folderVideosInfo.length > 0) {
      dispatch(
        currentVideoActions.setCurrentVideo(
          folderVideosInfo.find((v) => v.isDirectory !== true)
        )
      );
    }
  }, [folderVideosInfo]);

  const updateLastWatched = async () => {
    await ipcRenderer.invoke("save:lastWatch", {
      currentVideo,
      lastWatched: currentVideoTime,
    });
  };

  const handleVideoSelect = (video: VideoDataModel) => {
    updateLastWatched();
    if (video.isDirectory === false) {
      dispatch(currentVideoActions.setCurrentVideo(video));
    } else {
      dispatch(currentRootPathActions.setCurrentRootPath(video.filePath));
      dispatch(pathNavActions.setPathNav([...pathNav, currentRootPath]));
      dispatch(
        folderVideosInfoActions.fetchFolderVideosInfo({
          currentRootPath: video.filePath,
        })
      );
    }
  };

  const onBackTriggered = () => {
    if (pathNav.length > 0) {
      dispatch(
        currentRootPathActions.setCurrentRootPath(pathNav[pathNav.length - 1])
      );
      dispatch(
        folderVideosInfoActions.fetchFolderVideosInfo({
          currentRootPath: pathNav[pathNav.length - 1],
        })
      );
      dispatch(pathNavActions.setPathNav(pathNav.slice(0, -1)));
    }
  };

  const onCurrentTime = (time: number) => {
    setCurrentVideoTime(time);
  };

  const saveVideosettings = (value: { [value: string]: boolean }) => {
    const newVideoJsonData: VideoJsonModel = {
      ...videoJsonData,
      ...value,
    };

    dispatch(
      videoJsonActions.postVideoJason({
        currentVideo,
        newVideoJsonData,
      })
    ).then(() => {
      // setShowTextEditor(false);
    });
  };

  const handleOnVideoSelected = (
    event: React.ChangeEvent<HTMLInputElement>,
    video: VideoDataModel
  ) => {
    if (event.target.checked) {
      setSelectedVideos([...selectedVideos, video]);
    } else {
      setSelectedVideos(
        selectedVideos.filter((v) => v.filePath !== video.filePath)
      );
    }
  };

  const deleteVideos = async () => {
    if (selectedVideos.length > 0) {
      await ipcRenderer.invoke("delete:video", selectedVideos);
      setSelectedVideos([]);
      dispatch(
        folderVideosInfoActions.fetchFolderVideosInfo({ currentRootPath })
      );
    }
  };

  const onSearchClick = (searchText: string) => {
    dispatch(
      folderVideosInfoActions.fetchFolderVideosInfo({
        currentRootPath,
        searchText: searchText.trim(),
      })
    );
  };

  return (
    <>
      <Grid container>
        <Grid xs={3}>
          <Search onSearchClick={onSearchClick}></Search>
          <Box>
            <Stack direction="row" spacing={1}>
              <IconButton
                aria-label="delete"
                color="secondary"
                size="small"
                onClick={() => setShowDialog(true)}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Stack>
          </Box>
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
                    <>
                      <ListItemButton
                        sx={{
                          marginLeft: "5px",
                          borderLeft: !video.watched
                            ? "5px solid #9575CD"
                            : "5px solid transparent",
                          paddingBottom: "9px",
                          paddingTop: "9px",
                          backgroundColor:
                            video.fileName === currentVideo.fileName
                              ? "#e0e0e0"
                              : "",
                        }}
                        key={video.filePath}
                        onClick={() => handleVideoSelect(video)}
                      >
                        {video.isDirectory ? (
                          <ListItemIcon sx={{ minWidth: "33px" }}>
                            <FolderIcon fontSize="small" />
                          </ListItemIcon>
                        ) : (
                          <ListItemIcon
                            onClick={(event) => event.stopPropagation()}
                          >
                            <Checkbox
                              edge="start"
                              onChange={(event) => {
                                handleOnVideoSelected(event, video);
                              }}
                            />
                          </ListItemIcon>
                        )}

                        <ListItemText
                          disableTypography
                          primary={
                            <Typography
                              variant="body1"
                              style={{ fontSize: "14px" }}
                            >
                              {video.fileName}
                            </Typography>
                          }
                          secondary={
                            <>
                              <Typography
                                variant="body2"
                                style={{ fontSize: "11px" }}
                              >
                                {convertMillisecondsToDate(video.createdAt)}
                              </Typography>
                              {!video.isDirectory && (
                                <Typography
                                  variant="body2"
                                  style={{ fontSize: "10px" }}
                                >
                                  {"Duration: " +
                                    secondsTohhmmss(video.duration || 0)}
                                </Typography>
                              )}
                            </>
                          }
                        />

                        {video.mustWatch ? (
                          <NewReleasesIcon color="warning" fontSize="small" />
                        ) : null}
                        {video.like ? (
                          <FavoriteIcon
                            color="primary"
                            fontSize="small"
                          ></FavoriteIcon>
                        ) : null}
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
                    </>
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
          mustWatch={videoJsonData.mustWatch}
          watched={videoJsonData.watched}
          like={videoJsonData.like}
          onStateChange={saveVideosettings}
        ></VideoSettingsDialog>
      </Grid>
      <Box>
        <AlertDialog
          showDialog={showDialog}
          onSelectedOption={(option: string) => {
            setShowDialog(false);
            if (option === "ok") {
              deleteVideos();
            }
          }}
        ></AlertDialog>
      </Box>
    </>
  );
};

export { VideoList };
