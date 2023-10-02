import React from "react";
import IconButton from "@mui/material/IconButton";
import RefreshIcon from "@mui/icons-material/Refresh";
import { Tooltip } from "@mui/material";

interface RefreshToolProps {
  fetchFolderVideosInfo: (arg: { currentRootPath: string }) => void;
  currentRootPath: string;
}

const RefreshTool: React.FC<RefreshToolProps> = ({
  fetchFolderVideosInfo,
  currentRootPath,
}) => {
  return (
    <Tooltip title="refresh videolist" placement="bottom-start">
      <IconButton
        aria-label="refresh"
        color="secondary"
        size="small"
        onClick={() => fetchFolderVideosInfo({ currentRootPath })}
      >
        <RefreshIcon fontSize="small" />
      </IconButton>
    </Tooltip>
  );
};

export default RefreshTool;
