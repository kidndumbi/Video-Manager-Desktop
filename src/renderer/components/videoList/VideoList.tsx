import React from "react";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import VideoListItem from "./VideoListItem";
import VideoListSubheader from "./VideoListSubheader";
import { VideoDataModel } from "../../../models/videoData.model";
import {
  convertMillisecondsToDate,
  secondsTohhmmss,
} from "../../../util/helperFunctions";

interface VideoListProps {
  folderVideosInfo: VideoDataModel[];
  handleOnVideoSelected: (
    event: React.ChangeEvent<HTMLInputElement>,
    video: VideoDataModel
  ) => void;
  handleVideoSelect: (video: VideoDataModel) => void;
  currentVideo: VideoDataModel;
  pathNav: string[];
  onBackTriggered: () => void;
  currentRootPath: string;
}

const VideoList: React.FC<VideoListProps> = ({
  folderVideosInfo,
  handleOnVideoSelected,
  handleVideoSelect,
  currentVideo,
  pathNav,
  onBackTriggered,
  currentRootPath,
}) => {
  return (
    <>
      <VideoListSubheader
        pathNav={pathNav}
        onBackTriggered={onBackTriggered}
        currentRootPath={currentRootPath}
      />

      <List
        sx={{
          width: "100%",
          bgcolor: "background.paper",
          overflow: "auto",
          height: "100%",
        }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        {folderVideosInfo && folderVideosInfo.length > 0 ? (
          <div>
            {folderVideosInfo.map((video) => (
              <div key={video.filePath}>
                <VideoListItem
                  currentVideo={currentVideo}
                  secondsTohhmmss={secondsTohhmmss}
                  video={video}
                  handleOnVideoSelected={handleOnVideoSelected}
                  handleVideoSelect={handleVideoSelect}
                  convertMillisecondsToDate={convertMillisecondsToDate}
                />
                <Divider />
              </div>
            ))}
          </div>
        ) : null}
      </List>
    </>
  );
};

export { VideoList };
