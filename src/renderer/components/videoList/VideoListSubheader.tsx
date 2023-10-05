import React from "react";
// import ListSubheader from "@mui/material/ListSubheader";
import Typography from "@mui/material/Typography";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { Box, IconButton } from "@mui/material";

interface VideoListSubheaderProps {
  pathNav: string[];
  onBackTriggered: () => void;
  currentRootPath: string;
}

const VideoListSubheader: React.FC<VideoListSubheaderProps> = ({
  pathNav,
  onBackTriggered,
  currentRootPath,
}) => {
  return (
    <Box
      sx={{
        fontSize: "14px",
        lineHeight: "19px",
        marginTop: "10px",
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
      }}
      id="nested-list-subheader"
    >
      {pathNav.length > 0 ? (
        <IconButton
          aria-label="back"
          color="secondary"
          size="small"
          onClick={onBackTriggered}
        >
          <ArrowBackIosNewIcon fontSize="small" />
        </IconButton>
      ) : null}

      <div style={{ display: "flex", alignItems: "center" }}>
        <Typography variant="body1">{currentRootPath}</Typography>
      </div>
    </Box>
  );
};

export default VideoListSubheader;
