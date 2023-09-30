import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

type AlertDialogProps = {
  showDialog: boolean;
  dialogContent: React.ReactNode;
  dialogActions?: React.ReactNode;
  onClose?: () => void;
};

const AlertDialog = ({
  showDialog,
  dialogContent,
  dialogActions,
  onClose,
}: AlertDialogProps) => {
  return (
    <div>
      <Dialog
        open={showDialog}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>{dialogContent}</DialogContent>
        <DialogActions>{dialogActions}</DialogActions>
      </Dialog>
    </div>
  );
};

export { AlertDialog };
