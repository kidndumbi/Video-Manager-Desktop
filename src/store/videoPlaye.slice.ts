import { RootState } from "./index";
import { createSlice } from "@reduxjs/toolkit";
import { PlayerReference } from "video-react";
const videoPlayerSlice = createSlice({
  name: "videoPlayer",
  initialState: { videoPlayer: {} } as { videoPlayer: PlayerReference },
  reducers: {
    setVideoPlayer: (state, action) => {
      state.videoPlayer = action.payload;
    },
  },
});

const videoPlayerActions = videoPlayerSlice.actions;

const selVideoPlayer = (state: RootState) => state.videoPlayer.videoPlayer;

export { videoPlayerSlice, videoPlayerActions, selVideoPlayer };
