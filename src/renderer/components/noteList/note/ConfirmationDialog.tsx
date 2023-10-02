import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Button from "@mui/material/Button";
import React from "react";

type ConfirmationDialogProps = {
  open: boolean;
  message: string;
  handleClose: (choice: string) => void;
};

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  open,
  message,
  handleClose,
}) => {
  return (
    <Dialog open={open} onClose={() => handleClose("Cancel")}>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClose("Cancel")} color="primary">
          Cancel
        </Button>
        <Button onClick={() => handleClose("Ok")} color="primary">
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
