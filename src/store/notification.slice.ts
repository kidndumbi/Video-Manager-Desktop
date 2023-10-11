import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./index";

const AUTO_HIDE_DURATION = 6000;

type OptionalNotificationOptions = {
  severity: "error" | "warning" | "info" | "success";
  autoHideDuration?: number;
  message: string;
};

type notificationState = {
  open: boolean;
  options: OptionalNotificationOptions;
};

const initialState: notificationState = {
  open: false,
  options: {
    severity: "success",
    autoHideDuration: AUTO_HIDE_DURATION,
    message: "",
  },
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setOpen: (state, action) => {
      state.open = action.payload;
    },
    setOptions: (state, action: PayloadAction<OptionalNotificationOptions>) => {
      state.options = {
        autoHideDuration: action.payload.autoHideDuration || AUTO_HIDE_DURATION,
        ...action.payload,
      };
    },
  },
});

const selNotificationOpen = (state: RootState) => state.notification.open;
const selNotificationOptions = (state: RootState) => state.notification.options;

const notificationActions = notificationSlice.actions;

export {
  notificationSlice,
  notificationActions,
  selNotificationOpen,
  selNotificationOptions,
};
