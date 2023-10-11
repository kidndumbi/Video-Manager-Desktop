import { VideoDataModel } from "./../models/videoData.model";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./index";
import { ipcRenderer } from "electron";
import { IPCChannels } from "../enums/IPCChannels";

const currentVideoSlice = createSlice({
  name: "currentVideo",
  initialState: { currentVideo: {} } as { currentVideo: VideoDataModel },
  reducers: {
    setCurrentVideo: (state, action) => {
      state.currentVideo = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(setCurrentVideoFromDb.fulfilled, (state, action) => {
      state.currentVideo = action.payload;
    });
  },
});

const setCurrentVideoFromDb = createAsyncThunk(
  "currentVideo/setCurrentVideoFromDb",
  async ({
    filePath,
    callback,
  }: {
    filePath: string;
    callback?: () => void;
  }) => {
    const response = await ipcRenderer.invoke(
      IPCChannels.GetVideoData,
      filePath
    );
    setTimeout(() => {
      callback?.();
    }, 500);
    return response;
  }
);

const currentVideoActions = {
  ...currentVideoSlice.actions,
  setCurrentVideoFromDb,
};
const selCurrentVideo = (state: RootState) => state.currentVideo.currentVideo;

export { currentVideoSlice, currentVideoActions, selCurrentVideo };
