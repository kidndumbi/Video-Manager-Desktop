import { RootState } from "./index";
import { createSlice } from "@reduxjs/toolkit";
const videoPlayerSlice = createSlice({
  name: "videoPlayer",
  initialState: { videoPlayer: null } as { videoPlayer: any },
  reducers: {
    setVideoPlayer: (state, action) => {
      state.videoPlayer = action.payload;
    },
  },
});

const videoPlayerActions = videoPlayerSlice.actions;

const selVideoPlayer = (state: RootState) => state.videoPlayer.videoPlayer;

export { videoPlayerSlice, videoPlayerActions, selVideoPlayer };
