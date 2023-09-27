import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./index";

const localStorageCurrentnPath = localStorage.getItem("currentRootPath");

const currentRootPathSlice = createSlice({
  name: "currentRootPath",
  initialState: {
    currentRootPath: localStorageCurrentnPath
      ? localStorageCurrentnPath
      : "D:/",
  },
  reducers: {
    setCurrentRootPath: (state, action) => {
      state.currentRootPath = action.payload;
      localStorage.setItem("currentRootPath", action.payload);
    },
  },
});

const currentRootPathActions = currentRootPathSlice.actions;

const selCurrentRootPath = (state: RootState) =>
  state.currentRootPath.currentRootPath;

export { currentRootPathSlice, currentRootPathActions, selCurrentRootPath };
