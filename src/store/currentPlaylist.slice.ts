import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./index";
import { PlaylistModel } from "../models/playlist.model";

const currentPlaylistSlice = createSlice({
  name: "currentPlaylist",
  initialState: { currentPlaylist: {} } as { currentPlaylist: PlaylistModel },
  reducers: {
    setPlaylist: (state, action) => {
      state.currentPlaylist = action.payload;
    },
  },
});

const currentPlaylistActions = currentPlaylistSlice.actions;
const selCurrentPlaylist = (state: RootState) =>
  state.currentPlaylist.currentPlaylist;

export { currentPlaylistSlice, currentPlaylistActions, selCurrentPlaylist };
