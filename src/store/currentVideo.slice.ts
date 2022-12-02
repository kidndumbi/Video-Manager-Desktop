import { VideoDataModel } from "./../models/videoData.model";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./index";

const currentVideoSlice = createSlice({
  name: "currentVideo",
  initialState: { currentVideo: {} } as { currentVideo: VideoDataModel },
  reducers: {
    setCurrentVideo: (state, action) => {
      state.currentVideo = action.payload;
    },
  },
});

const currentVideoActions = currentVideoSlice.actions;
const selCurrentVideo = (state: RootState) => state.currentVideo.currentVideo;

export { currentVideoSlice, currentVideoActions, selCurrentVideo };
