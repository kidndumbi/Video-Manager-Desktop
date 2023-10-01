import React, { FC } from "react";
import { Button, DialogContentText } from "@mui/material";
import { AlertDialog } from "../../AlertDialog";

export type ConfirmationDialogProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

const ConfirmationDialog: FC<ConfirmationDialogProps> = ({
  open,
  onClose,
  onConfirm,
}) => (
  <AlertDialog
    onClose={onClose}
    showDialog={open}
    dialogContent={
      <DialogContentText id="alert-dialog-description">
        Are you sure you want to delete?
      </DialogContentText>
    }
    dialogActions={
      <>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onConfirm} autoFocus>
          Ok
        </Button>
      </>
    }
  />
);

export { ConfirmationDialog };
