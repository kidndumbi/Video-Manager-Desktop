import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../store";
import {
  notificationActions,
  selNotificationOpen,
  selNotificationOptions,
} from "../../store/notification.slice";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function AppNotifications() {
  const dispatch = useAppDispatch();
  const open = useSelector(selNotificationOpen);
  const options = useSelector(selNotificationOptions);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    dispatch(notificationActions.setOpen(false));
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={options.autoHideDuration}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        severity={options.severity}
        sx={{ width: "100%" }}
      >
        {options.message}
      </Alert>
    </Snackbar>
  );
}
