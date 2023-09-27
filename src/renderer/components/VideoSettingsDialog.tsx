import React, { ChangeEvent } from "react";
import {
  Box,
  DialogContent,
  DialogContentText,
  Dialog,
  DialogTitle,
  IconButton,
  FormControl,
  FormGroup,
  FormControlLabel,
  Switch,
  FormLabel,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

type VideoSettingsDialogProps = {
  onClose: () => void;
  showDialog: boolean;
  mustWatch: boolean | undefined;
  watched: boolean | undefined;
  like: boolean | undefined;
  onStateChange: (value: { [value: string]: boolean }) => void;
};

const SwitchControl = ({
  checked,
  onChange,
  name,
  label,
}: {
  checked: boolean | undefined;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  name: string;
  label: string;
}) => (
  <FormControlLabel
    control={<Switch checked={checked} onChange={onChange} name={name} />}
    label={label}
  />
);

const VideoSettingsDialog = ({
  showDialog,
  onClose,
  mustWatch,
  watched,
  like,
  onStateChange,
}: VideoSettingsDialogProps) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
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
            onClick={onClose}
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
                <SwitchControl
                  checked={mustWatch}
                  onChange={handleChange}
                  name="mustWatch"
                  label="Must Watch"
                />
                <SwitchControl
                  checked={watched}
                  onChange={handleChange}
                  name="watched"
                  label="Watched"
                />
                <SwitchControl
                  checked={like}
                  onChange={handleChange}
                  name="like"
                  label="Like"
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
