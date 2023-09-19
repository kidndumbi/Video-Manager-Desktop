import * as React from "react";
import Box from "@mui/material/Box";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
// import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import FormLabel from "@mui/material/FormLabel";

type VideoSettingsDialogProps = {
  onClose: () => void;
  showDialog: boolean;
  mustWatch: boolean | undefined;
  watched: boolean | undefined;
  like: boolean | undefined;
  onStateChange: (value: { [value: string]: boolean }) => void;
};

const VideoSettingsDialog = ({
  showDialog,
  onClose,
  mustWatch,
  watched,
  like,
  onStateChange,
}: VideoSettingsDialogProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onStateChange({ [event.target.name]: event.target.checked });
  };

  return (
    <Box>
      <Dialog
        open={showDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle sx={{ mb: 2 }}>
          <IconButton
            aria-label="close"
            onClick={() => onClose()}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,

              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <FormControl component="fieldset" variant="standard">
              <FormLabel component="legend">Video Settings</FormLabel>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Switch
                      checked={mustWatch}
                      onChange={handleChange}
                      name="mustWatch"
                    />
                  }
                  label="Must Watch"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={watched}
                      onChange={handleChange}
                      name="watched"
                    />
                  }
                  label="Watched"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={like}
                      onChange={handleChange}
                      name="like"
                    />
                  }
                  label="like"
                />
              </FormGroup>
            </FormControl>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export { VideoSettingsDialog };
