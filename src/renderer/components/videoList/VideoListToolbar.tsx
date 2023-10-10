import React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { VideoDataModel } from "../../../models/videoData.model";
import RefreshTool from "../tools-components/RefreshTool";
import { FolderTool } from "../tools-components/FolderTool";
import PlaylistsTool from "../tools-components/PlaylistsTool";
import YoutubeTool from "../tools-components/YoutubeTool";

interface VideoListToolbarProps {
  selectedVideos: VideoDataModel[];
  fetchFolderVideosInfo: (arg: { currentRootPath: string }) => void;
  currentRootPath: string;
  setShowDialog: (show: boolean) => void;
}

const VideoListToolbar: React.FC<VideoListToolbarProps> = ({
  fetchFolderVideosInfo,
  currentRootPath,
}) => {
  return (
    <Box>
      <Stack direction="row">
        <RefreshTool
          fetchFolderVideosInfo={fetchFolderVideosInfo}
          currentRootPath={currentRootPath}
        />
        <FolderTool></FolderTool>
        <PlaylistsTool></PlaylistsTool>
        <YoutubeTool></YoutubeTool>
      </Stack>
    </Box>
  );
};

export default VideoListToolbar;
