import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

type AlertDialogProps = {
  onSelectedOption: (option: "ok" | "cancel") => void;
  showDialog: boolean;
};

const DialogButtons = ({
  onClose,
}: {
  onClose: (option: "ok" | "cancel") => void;
}) => (
  <DialogActions>
    <Button onClick={() => onClose("cancel")}>Cancel</Button>
    <Button onClick={() => onClose("ok")} autoFocus>
      Ok
    </Button>
  </DialogActions>
);

const DialogMessage = () => (
  <DialogContent>
    <DialogContentText id="alert-dialog-description">
      Are you sure you want to delete?
    </DialogContentText>
  </DialogContent>
);

const AlertDialog = ({ onSelectedOption, showDialog }: AlertDialogProps) => {
  return (
    <div>
      <Dialog
        open={showDialog}
        onClose={() => onSelectedOption("cancel")}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogMessage />
        <DialogButtons onClose={onSelectedOption} />
      </Dialog>
    </div>
  );
};

export { AlertDialog };
