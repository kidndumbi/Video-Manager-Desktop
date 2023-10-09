import { RootState } from "./index";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { PlayerReference } from "video-react";

interface VideoPlayerState {
  videoPlayer: PlayerReference;
  videoEnded: boolean;
}

const initialState: VideoPlayerState = {
  videoPlayer: {} as PlayerReference,
  videoEnded: false,
};

const videoPlayerSlice = createSlice({
  name: "videoPlayer",
  initialState,
  reducers: {
    setVideoPlayer: (state, action) => {
      state.videoPlayer = action.payload;
    },
    setVideoEnded: (state, action: PayloadAction<boolean>) => {
      state.videoEnded = action.payload;
    },
  },
});

const videoPlayerActions = videoPlayerSlice.actions;

const selVideoPlayer = (state: RootState) => state.videoPlayer.videoPlayer;
const selVideoEnded = (state: RootState) => state.videoPlayer.videoEnded;

export { videoPlayerSlice, videoPlayerActions, selVideoPlayer, selVideoEnded };
