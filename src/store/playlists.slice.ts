import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./index";
import { PlaylistModel, PlaylistVideoModel } from "../models/playlist.model";
import { ipcRenderer } from "electron";
import { IPCChannels } from "../enums/IPCChannels";

const initialState: { playlists: PlaylistModel[] } = {
  playlists: [],
};

const handleFulfilled = (
  state: typeof initialState,
  action: PayloadAction<PlaylistModel[]>
) => {
  state.playlists = action.payload;
};

const getAllPlaylists = createAsyncThunk(
  "playlists/getAllPlaylists",
  async (): Promise<PlaylistModel[]> => {
    return await ipcRenderer.invoke(IPCChannels.GetAllPlaylists);
  }
);

const deletePlaylist = createAsyncThunk(
  "playlists/deletePlaylist",
  async (id: string): Promise<PlaylistModel[]> => {
    return await ipcRenderer.invoke(IPCChannels.DeletePlaylist, id);
  }
);

const deletePlaylistVideo = createAsyncThunk(
  "playlists/deletePlaylistVideo",
  async ({
    id,
    videoFilePath,
  }: {
    id: string;
    videoFilePath: string;
  }): Promise<PlaylistModel[]> => {
    return await ipcRenderer.invoke(
      IPCChannels.DeletePlaylistVideo,
      id,
      videoFilePath
    );
  }
);

const updatePlaylistName = createAsyncThunk(
  "playlists/updatePlaylistName",
  async ({
    id,
    newName,
  }: {
    id: string;
    newName: string;
  }): Promise<PlaylistModel[]> => {
    return await ipcRenderer.invoke(
      IPCChannels.UpdatePlaylistName,
      id,
      newName
    );
  }
);

const addNewPlaylist = createAsyncThunk(
  "playlists/addNewPlaylist",
  async (name: string): Promise<PlaylistModel[]> => {
    return await ipcRenderer.invoke(IPCChannels.AddNewPlaylist, name);
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
  }): Promise<PlaylistModel[]> => {
    return await ipcRenderer.invoke(
      IPCChannels.addOrRemoveVideoFromPlaylist,
      playlistId,
      newVideo
    );
  }
);

const playlistSlice = createSlice({
  name: "playlists",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllPlaylists.fulfilled, handleFulfilled)
      .addCase(deletePlaylist.fulfilled, handleFulfilled)
      .addCase(deletePlaylistVideo.fulfilled, handleFulfilled)
      .addCase(updatePlaylistName.fulfilled, handleFulfilled)
      .addCase(addNewPlaylist.fulfilled, handleFulfilled)
      .addCase(addVideoToPlaylist.fulfilled, handleFulfilled);
  },
});

// Export the thunks and selectors
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
