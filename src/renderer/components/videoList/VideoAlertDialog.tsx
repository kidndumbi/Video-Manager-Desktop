// VideoAlertDialog.tsx
import React from "react";
import { Button, DialogContentText } from "@mui/material";
import { AlertDialog } from "../AlertDialog";

type VideoAlertDialogProps = {
  showDialog: boolean;
  onClose: () => void;
  deleteVideos: () => void;
};

const VideoAlertDialog: React.FC<VideoAlertDialogProps> = ({
  showDialog,
  onClose,
  deleteVideos,
}) => {
  return (
    <AlertDialog
      onClose={onClose}
      showDialog={showDialog}
      dialogContent={
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete?
        </DialogContentText>
      }
      dialogActions={
        <>
          <Button
            onClick={() => {
              onClose();
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              onClose();
              deleteVideos();
            }}
            autoFocus
          >
            Ok
          </Button>
        </>
      }
    ></AlertDialog>
  );
};

export default VideoAlertDialog;
