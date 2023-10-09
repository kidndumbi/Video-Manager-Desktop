import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./index";
import { PlaylistModel } from "../models/playlist.model";

const currentPlaylistSlice = createSlice({
  name: "currentPlaylist",
  initialState: {
    currentPlaylist: {},
    shufflePlaylist: false,
    loopPlaylist: true,
    startVideo: "",
  } as {
    currentPlaylist: PlaylistModel;
    shufflePlaylist: boolean;
    loopPlaylist: boolean;
    startVideo: string;
  },
  reducers: {
    setPlaylist: (state, action) => {
      state.currentPlaylist = action.payload;
    },
    setStartVideo: (state, action) => {
      state.startVideo = action.payload;
    },
    setShufflePlaylist: (state, action) => {
      state.shufflePlaylist = action.payload;
    },
    setLoopPlaylist: (state, action) => {
      state.loopPlaylist = action.payload;
    },
  },
});

const currentPlaylistActions = currentPlaylistSlice.actions;
const selCurrentPlaylist = (state: RootState) =>
  state.currentPlaylist.currentPlaylist;
const selStartVideo = (state: RootState) => state.currentPlaylist.startVideo;
const selShufflePlaylist = (state: RootState) =>
  state.currentPlaylist.shufflePlaylist;
const selLoopPlaylist = (state: RootState) =>
  state.currentPlaylist.loopPlaylist;

export {
  currentPlaylistSlice,
  currentPlaylistActions,
  selCurrentPlaylist,
  selStartVideo,
  selShufflePlaylist,
  selLoopPlaylist,
};
