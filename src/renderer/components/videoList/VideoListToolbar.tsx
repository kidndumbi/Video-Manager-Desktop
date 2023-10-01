import React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { VideoDataModel } from "../../../models/videoData.model";
import DeleteTool from "../tools-components/DeleteTool";
import RefreshTool from "../tools-components/RefreshTool";
import { FolderTool } from "../tools-components/FolderTool";

interface VideoListToolbarProps {
  selectedVideos: VideoDataModel[];
  fetchFolderVideosInfo: (arg: { currentRootPath: string }) => void;
  currentRootPath: string;
  setShowDialog: (show: boolean) => void;
}

const VideoListToolbar: React.FC<VideoListToolbarProps> = ({
  selectedVideos,
  fetchFolderVideosInfo,
  currentRootPath,
  setShowDialog,
}) => {
  return (
    <Box>
      <Stack direction="row">
        <DeleteTool
          selectedVideos={selectedVideos}
          setShowDialog={setShowDialog}
        />
        <RefreshTool
          fetchFolderVideosInfo={fetchFolderVideosInfo}
          currentRootPath={currentRootPath}
        />
        <FolderTool></FolderTool>
      </Stack>
    </Box>
  );
};

export default VideoListToolbar;
