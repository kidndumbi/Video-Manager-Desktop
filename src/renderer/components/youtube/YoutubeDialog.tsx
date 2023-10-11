import React, { useEffect, useState } from "react";
import Draggable from "react-draggable";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import theme from "../../theme";
import { useYoutubeDetails } from "../../../hooks/useYoutubeDetails";
import LoadingButton from "@mui/lab/LoadingButton";
import { useYoutubeDownload } from "../../../hooks/useYoutubeDownload";
import { toValidFilename } from "../../../util/helperFunctions";
import { useAppDispatch } from "../../../store";
import { notificationActions } from "../../../store/notification.slice";
import YoutubeDetails from "./YoutubeDetails";

type YoutubeDialogProps = {
  showDialog: boolean;
  handleClose: () => void;
};

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const DraggablePaper = (props: any) => {
  return (
    <Draggable handle="#customized-dialog-title">
      <Paper {...props} />
    </Draggable>
  );
};

const YoutubeDialog = ({ showDialog, handleClose }: YoutubeDialogProps) => {
  const [url, setUrl] = useState("");
  const { videoDetails, isVideoDetailsLoading } = useYoutubeDetails(url);
  const { isVideoDownloading, downloadVideo, videoDownloadError } =
    useYoutubeDownload();
  const dispatch = useAppDispatch();
  const [textFieldValue, setTextFieldValue] = useState("");

  const handleTextFieldChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTextFieldValue(event.target.value);
  };

  const handleGetDetails = () => {
    setUrl(textFieldValue);
  };

  const download = () => {
    if (videoDetails?.title) {
      downloadVideo(
        url,
        `D:/youtube/${toValidFilename(videoDetails?.title)}.mp4`,
        videoDetails.videoId,
        () => {
          dispatch(
            notificationActions.setOptions({
              message: "Video Downloaded successfully",
              severity: "success",
            })
          );
          dispatch(notificationActions.setOpen(true));
        },
        (err) => {
          dispatch(
            notificationActions.setOptions({
              message: err?.message?.includes("FileExistsError")
                ? "The file already exists. Please choose a different name or location!"
                : err?.message || "An unknown error occurred",
              severity: "error",
            })
          );
          dispatch(notificationActions.setOpen(true));
        }
      );
    }
  };

  useEffect(() => {
    console.log("videoDownloadError", videoDownloadError);
  }, [videoDownloadError]);

  return (
    <div>
      <BootstrapDialog
        maxWidth="md"
        fullWidth={true}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={showDialog}
        PaperComponent={DraggablePaper}
      >
        <DialogTitle
          sx={{ m: 0, p: 2 }}
          id="customized-dialog-title"
          style={{
            backgroundColor: theme.palette.secondary.main,
            color: "white",
            cursor: "move",
          }}
        >
          Youtube
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Box display="flex" alignItems="center">
            <TextField
              value={textFieldValue} // Bind value to TextField
              onChange={handleTextFieldChange} // Update state on change
              id="youtube-url"
              size="small"
              label="Youtube Url"
              variant="outlined"
              sx={{ flexGrow: 1, marginRight: 1 }} // marginRight added for some spacing
            />
            <LoadingButton
              variant="contained"
              onClick={handleGetDetails}
              disabled={!textFieldValue || isVideoDetailsLoading}
              loading={isVideoDetailsLoading}
            >
              Get Details
            </LoadingButton>
          </Box>
          {videoDetails && <YoutubeDetails videoDetails={videoDetails} />}
          <Box sx={{ marginTop: "7px" }}>
            <LoadingButton
              variant="contained"
              disabled={!videoDetails || isVideoDownloading}
              loading={isVideoDownloading}
              onClick={download}
            >
              Download
            </LoadingButton>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
};

export { YoutubeDialog };
