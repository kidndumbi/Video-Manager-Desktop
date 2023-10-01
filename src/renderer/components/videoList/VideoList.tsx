import React from "react";
import List from "@mui/material/List";
import Grid from "@mui/material/Grid";
import AppVideoPlayer from "../AppVideoPlayer";
import { VideoDataModel } from "../../../models/videoData.model";
import SettingsIcon from "@mui/icons-material/Settings";
import { VideoSettingsDialog } from "../VideoSettingsDialog";
import { AppTabs } from "../AppTabs";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import {
  convertMillisecondsToDate,
  secondsTohhmmss,
} from "../../../util/helperFunctions";
import Box from "@mui/material/Box";
import { Search } from "../Search";
import VideoListItem from "./VideoListItem";
import VideoAlertDialog from "./VideoAlertDialog";
import { useVideoListLogic } from "../../hooks/useVideoListLogic";
import VideoListSubheader from "./VideoListSubheader";
import VideoListToolbar from "./VideoListToolbar";

const VideoList = () => {
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
              <VideoListSubheader
                pathNav={pathNav}
                onBackTriggered={onBackTriggered}
                currentRootPath={currentRootPath}
              />
            }
          >
            {folderVideosInfo && folderVideosInfo.length > 0 ? (
              <div>
                {folderVideosInfo.map((video: VideoDataModel) => {
                  return (
                    <div key={video.filePath}>
                      <VideoListItem
                        currentVideo={currentVideo}
                        secondsTohhmmss={secondsTohhmmss}
                        video={video}
                        handleOnVideoSelected={handleOnVideoSelected}
                        handleVideoSelect={handleVideoSelect}
                        convertMillisecondsToDate={convertMillisecondsToDate}
                      ></VideoListItem>
                      <Divider />
                    </div>
                  );
                })}
              </div>
            ) : null}
          </List>
        </Grid>
        <Grid xs={9} item>
          <Grid xs={12} item>
            <IconButton
              color="primary"
              aria-label="add to shopping cart"
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
          <Grid xs={12} item>
            <AppTabs currentVideoTime={currentVideoTime}></AppTabs>
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

export { VideoList };
