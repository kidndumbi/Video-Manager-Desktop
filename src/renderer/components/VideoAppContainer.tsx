import React, { useEffect } from "react";
import Grid from "@mui/material/Grid";
import AppVideoPlayer from "./AppVideoPlayer";
import SettingsIcon from "@mui/icons-material/Settings";
import { VideoSettingsDialog } from "./VideoSettingsDialog";
import { AppTabs } from "./AppTabs";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import { Search } from "./Search";
import VideoAlertDialog from "./videoList/VideoAlertDialog";
import { useVideoListLogic } from "../../hooks/useVideoListLogic";
import VideoListToolbar from "./videoList/VideoListToolbar";
import { VideoList } from "./videoList/VideoList";
import CurrentPlaylist from "./playlist/CurrentPlaylist";
import { usePlaylistLogic } from "../../hooks/usePlaylistLogic";
import _ from "lodash";
import { useVideoPlayerLogic } from "../../hooks/useVideoPlayerLogic";
import AppNotifications from "./AppNotifications";

const VideoAppContainer = () => {
  const {
    showSettingsDialog,
    setShowSettingsDialog,
    showDialog,
    setShowDialog,
    folderVideosInfo,
    handleVideoSelect,
    onBackTriggered,
    saveVideoSettings,
    handleOnVideoSelected,
    deleteVideos,
    onSearchClick,
    setPlayer,
    pathNav,
    currentRootPath,
    videoJsonData,
    selectedVideos,
    fetchFolderVideosInfo,
  } = useVideoListLogic();

  const { updateLastWatched, currentVideo, onCurrentTime, currentVideoTime } =
    useVideoPlayerLogic();

  const { fetchPlalists } = usePlaylistLogic();

  useEffect(() => {
    fetchPlalists();
  }, []);

  const { setVideoEnded } = useVideoPlayerLogic();

  const { currentPlaylist } = usePlaylistLogic();

  const onVideoPaused = () => {
    updateLastWatched();
  };

  return (
    <>
      <Grid container data-testid="video-list" style={{ height: "100vh" }}>
        <Box></Box>
        <Grid xs={3} item>
          <Search onSearchClick={onSearchClick}></Search>
          <VideoListToolbar
            selectedVideos={selectedVideos}
            fetchFolderVideosInfo={fetchFolderVideosInfo}
            currentRootPath={currentRootPath}
            setShowDialog={setShowDialog}
          />
          <Divider />
          <VideoList
            folderVideosInfo={folderVideosInfo}
            handleOnVideoSelected={handleOnVideoSelected}
            handleVideoSelect={handleVideoSelect}
            currentVideo={currentVideo}
            pathNav={pathNav}
            onBackTriggered={onBackTriggered}
            currentRootPath={currentRootPath}
          />
        </Grid>
        <Grid xs={9} item>
          <Grid xs={12} item>
            <IconButton
              color="primary"
              aria-label="set show settings dialog"
              onClick={() => setShowSettingsDialog(true)}
            >
              <SettingsIcon />
            </IconButton>
          </Grid>
          <Grid xs={12} item>
            <AppVideoPlayer
              onVideoPaused={onVideoPaused}
              setPlayer={setPlayer}
              onCurrentTime={onCurrentTime}
              videoData={currentVideo}
              videoEnded={() => setVideoEnded(true)}
            ></AppVideoPlayer>
          </Grid>
          <Grid xs={12} item container style={{ height: "100vh" }}>
            <Grid
              xs={
                _.isUndefined(currentPlaylist) ||
                _.isEmpty(currentPlaylist) ||
                currentPlaylist.videos.length === 0
                  ? 12
                  : 7
              }
              item
              style={{ height: "100vh" }}
            >
              <Box>
                <AppTabs currentVideoTime={currentVideoTime}></AppTabs>
              </Box>
            </Grid>
            {!(
              _.isUndefined(currentPlaylist) ||
              _.isEmpty(currentPlaylist) ||
              currentPlaylist.videos.length === 0
            ) && (
              <Grid xs={5} item>
                <Box>
                  <CurrentPlaylist></CurrentPlaylist>
                </Box>
              </Grid>
            )}
          </Grid>
        </Grid>
        <VideoSettingsDialog
          onClose={() => setShowSettingsDialog(false)}
          showDialog={showSettingsDialog}
          mustWatch={videoJsonData.mustWatch}
          watched={videoJsonData.watched}
          like={videoJsonData.like}
          onStateChange={saveVideoSettings}
        ></VideoSettingsDialog>
      </Grid>
      <Box>
        <VideoAlertDialog
          showDialog={showDialog}
          onClose={() => setShowDialog(false)}
          deleteVideos={deleteVideos}
        />
      </Box>
      <Box>
        <AppNotifications></AppNotifications>
      </Box>
    </>
  );
};

export { VideoAppContainer };
