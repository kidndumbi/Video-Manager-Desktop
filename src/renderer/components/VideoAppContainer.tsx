import React from "react";
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
import VideoList from "./videoList/VideoList";
import CurrentPlaylist from "./playlist/CurrentPlaylist";

const VideoAppContainer = () => {
  const {
    currentVideoTime,
    showSettingsDialog,
    setShowSettingsDialog,
    showDialog,
    setShowDialog,
    folderVideosInfo,
    handleVideoSelect,
    onBackTriggered,
    onCurrentTime,
    saveVideoSettings,
    handleOnVideoSelected,
    deleteVideos,
    onSearchClick,
    currentVideo,
    setPlayer,
    pathNav,
    currentRootPath,
    videoJsonData,
    selectedVideos,
    fetchFolderVideosInfo,
  } = useVideoListLogic();

  return (
    <>
      <Grid container data-testid="video-list">
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
              setPlayer={setPlayer}
              onCurrentTime={onCurrentTime}
              videoData={currentVideo}
            ></AppVideoPlayer>
          </Grid>
          <Grid xs={12} item container>
            <Grid xs={9} item>
              <AppTabs currentVideoTime={currentVideoTime}></AppTabs>
            </Grid>
            <Grid xs={3} item>
              <CurrentPlaylist></CurrentPlaylist>
            </Grid>
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
    </>
  );
};

export { VideoAppContainer };