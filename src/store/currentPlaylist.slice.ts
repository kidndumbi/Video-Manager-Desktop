import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./index";
import { PlaylistModel } from "../models/playlist.model";

const currentPlaylistSlice = createSlice({
  name: "currentPlaylist",
  initialState: {
    currentPlaylist: {},
    shuffle: false,
    continuous: true,
    startVideo: "",
  } as {
    currentPlaylist: PlaylistModel;
    shuffle: boolean;
    continuous: boolean;
    startVideo: string;
  },
  reducers: {
    setPlaylist: (state, action) => {
      state.currentPlaylist = action.payload;
    },
    setStartVideo: (state, action) => {
      state.startVideo = action.payload;
    },
  },
});

const currentPlaylistActions = currentPlaylistSlice.actions;
const selCurrentPlaylist = (state: RootState) =>
  state.currentPlaylist.currentPlaylist;
const selStartVideo = (state: RootState) => state.currentPlaylist.startVideo;

export {
  currentPlaylistSlice,
  currentPlaylistActions,
  selCurrentPlaylist,
  selStartVideo,
};
