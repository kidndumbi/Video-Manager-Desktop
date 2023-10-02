import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "./index";
import { PlaylistModel } from "../models/playlist.model";
import { ipcRenderer } from "electron";

const initialState: { playlists: PlaylistModel[] } = {
  playlists: [],
};

const playlistSlice = createSlice({
  name: "playlists",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllPlaylists.fulfilled, (state, action) => {
      state.playlists = action.payload;
    });

    builder.addCase(deletePlaylistById.fulfilled, (state, action) => {
      state.playlists = action.payload;
    });
  },
});

const getAllPlaylists = createAsyncThunk(
  "playlists/getAllPlaylists",
  async () => {
    const playlists = await ipcRenderer.invoke("playlist:getAllPlaylistsDb");
    return playlists;
  }
);

//deletePlaylistById
const deletePlaylistById = createAsyncThunk(
  "playlists/deletePlaylistById",
  async (id: number) => {
    const playlists = await ipcRenderer.invoke(
      "playlist:deletePlaylistById",
      id
    );
    return playlists;
  }
);

// Export the actions
const playlistsActions = { getAllPlaylists, deletePlaylistById };

const selplaylists = (state: RootState) => state.playlists.playlists;

// Export the slice and selectors
export { playlistSlice, playlistsActions, selplaylists };
