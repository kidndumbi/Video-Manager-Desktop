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

type VideoSettingsDialogProps = {
  onClose: () => void;
  showDialog: boolean;
};

const VideoSettingsDialog = ({
  showDialog,
  onClose,
}: VideoSettingsDialogProps) => {
  const [state, setState] = React.useState({
    gilad: true,
    jason: false,
    antoine: true,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  return (
    <Box>
      <Dialog
        open={showDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle sx={{ mb: 2 }}>
          Video Settings
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
              {/* <FormLabel component="legend">Assign responsibility</FormLabel> */}
              <FormGroup>
                <FormControlLabel
                  control={
                    <Switch
                      checked={state.gilad}
                      onChange={handleChange}
                      name="gilad"
                    />
                  }
                  label="Gilad Gray"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={state.jason}
                      onChange={handleChange}
                      name="jason"
                    />
                  }
                  label="Jason Killian"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={state.antoine}
                      onChange={handleChange}
                      name="antoine"
                    />
                  }
                  label="Antoine Llorca"
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
