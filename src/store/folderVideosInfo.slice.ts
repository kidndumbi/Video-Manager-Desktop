import { VideoDataModel } from "./../models/videoData.model";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ipcRenderer } from "electron";
import { RootState } from "./index";
import { IPCChannels } from "../enums/IPCChannels";

const folderVideosInfoSlice = createSlice({
  name: "folderVideosInfo",
  initialState: { folderVideosInfo: [] } as {
    folderVideosInfo: VideoDataModel[];
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchFolderVideosInfo.fulfilled, (state, action) => {
      state.folderVideosInfo = action.payload;
    });
  },
});

const fetchFolderVideosInfo = createAsyncThunk(
  "folderVideosInfo/fetchFolderVideosInfo",
  async ({
    currentRootPath,
    searchText,
  }: {
    currentRootPath: string;
    searchText?: string;
  }) => {
    const response = await ipcRenderer.invoke(
      IPCChannels.GetRootVideoData,
      currentRootPath,
      searchText
    );
    return response;
  }
);

const selFoldersVideosInfo = (state: RootState) =>
  state.folderVideosInfo.folderVideosInfo;

const folderVideosInfoActions = { fetchFolderVideosInfo };

export { folderVideosInfoSlice, folderVideosInfoActions, selFoldersVideosInfo };
