import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "./index";
import { PlaylistModel, PlaylistVideoModel } from "../models/playlist.model";
import { ipcRenderer } from "electron";
// import { VideoDataModel } from "../models/videoData.model";

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

    builder.addCase(updatePlaylistName.fulfilled, (state, action) => {
      state.playlists = action.payload;
    });

    builder.addCase(addNewPlaylist.fulfilled, (state, action) => {
      state.playlists = action.payload;
    });

    builder.addCase(addVideoToPlaylist.fulfilled, (state, action) => {
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
  async (id: string) => {
    const playlists = await ipcRenderer.invoke("playlist:deletePlaylist", id);
    return playlists;
  }
);

const deletePlaylistVideo = createAsyncThunk(
  "playlists/deletePlaylistVideo",
  async ({ id, videoFilePath }: { id: string; videoFilePath: string }) => {
    const playlists = await ipcRenderer.invoke(
      "playlist:deletePlaylistVideo",
      id,
      videoFilePath
    );
    return playlists;
  }
);

const updatePlaylistName = createAsyncThunk(
  "playlists/updatePlaylistName",
  async ({ id, newName }: { id: string; newName: string }) => {
    const playlists = await ipcRenderer.invoke(
      "playlist:updatePlaylistName",
      id,
      newName
    );
    return playlists;
  }
);

const addNewPlaylist = createAsyncThunk(
  "playlists/addNewPlaylist",
  async (name: string) => {
    const playlists = await ipcRenderer.invoke("playlist:addNewPlaylist", name);
    return playlists;
  }
);

const addVideoToPlaylist = createAsyncThunk(
  "playlists/addVideoToPlaylist",
  async ({
    playlistId,
    newVideo,
  }: {
    playlistId: string;
    newVideo: PlaylistVideoModel;
  }) => {
    const playlists = await ipcRenderer.invoke(
      "playlist:addVideoToPlaylist",
      playlistId,
      newVideo
    );
    return playlists;
  }
);

const playlistsActions = {
  getAllPlaylists,
  deletePlaylist,
  deletePlaylistVideo,
  updatePlaylistName,
  addNewPlaylist,
  addVideoToPlaylist,
};

const selplaylists = (state: RootState) => state.playlists.playlists;

export { playlistSlice, playlistsActions, selplaylists };
