import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./index";

const currentRootPathSlice = createSlice({
  name: "currentRootPath",
  initialState: { currentRootPath: "D:/Pru videos" },
  reducers: {
    setCurrentRootPath: (state, action) => {
      state.currentRootPath = action.payload;
    },
  },
});

const currentRootPathActions = currentRootPathSlice.actions;

const selCurrentRootPath = (state: RootState) =>
  state.currentRootPath.currentRootPath;

export { currentRootPathSlice, currentRootPathActions, selCurrentRootPath };
