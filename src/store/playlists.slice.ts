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

    builder.addCase(deletePlaylist.fulfilled, (state, action) => {
      state.playlists = action.payload;
    });

    builder.addCase(deletePlaylistVideo.fulfilled, (state, action) => {
      state.playlists = action.payload;
    });
  },
});

const getAllPlaylists = createAsyncThunk(
  "playlists/getAllPlaylists",
  async () => {
    const playlists = await ipcRenderer.invoke("playlist:getAllPlaylists");
    return playlists;
  }
);

const deletePlaylist = createAsyncThunk(
  "playlists/deletePlaylist",
  async (id: number) => {
    const playlists = await ipcRenderer.invoke("playlist:deletePlaylist", id);
    return playlists;
  }
);

const deletePlaylistVideo = createAsyncThunk(
  "playlists/deletePlaylistVideo",
  async ({ id, videoFilePath }: { id: number; videoFilePath: string }) => {
    const playlists = await ipcRenderer.invoke(
      "playlist:deletePlaylistVideo",
      id,
      videoFilePath
    );
    return playlists;
  }
);

// Export the actions
const playlistsActions = {
  getAllPlaylists,
  deletePlaylist,
  deletePlaylistVideo,
};

const selplaylists = (state: RootState) => state.playlists.playlists;

// Export the slice and selectors
export { playlistSlice, playlistsActions, selplaylists };
