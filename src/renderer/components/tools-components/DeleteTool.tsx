import React from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { VideoDataModel } from "../../../models/videoData.model";

interface DeleteToolProps {
  selectedVideos: VideoDataModel[];
  setShowDialog: (show: boolean) => void;
}

const DeleteTool: React.FC<DeleteToolProps> = ({
  selectedVideos,
  setShowDialog,
}) => {
  return (
    <IconButton
      aria-label="delete"
      color="secondary"
      size="small"
      disabled={selectedVideos.length === 0}
      onClick={() => setShowDialog(true)}
    >
      <DeleteIcon fontSize="small" />
    </IconButton>
  );
};

export default DeleteTool;
