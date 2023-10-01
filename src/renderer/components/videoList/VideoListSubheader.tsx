import React from "react";
import ListSubheader from "@mui/material/ListSubheader";
import Button from "@mui/material/Button";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import Typography from "@mui/material/Typography";

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
    <ListSubheader
      sx={{
        fontSize: "14px",
        lineHeight: "19px",
        marginTop: "10px",
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
      }}
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

      <div style={{ display: "flex", alignItems: "center" }}>
        <Typography variant="body1">{currentRootPath}</Typography>
      </div>
    </ListSubheader>
  );
};

export default VideoListSubheader;
