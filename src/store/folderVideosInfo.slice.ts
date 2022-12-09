import { VideoDataModel } from "./../models/videoData.model";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ipcRenderer } from "electron";
import { RootState } from "./index";

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
  async (currentRootPath: string) => {
    const response = await ipcRenderer.invoke(
      "get:root-video-data",
      currentRootPath
    );
    console.log("response ", response);
    return response;
  }
);

const selFoldersVideosInfo = (state: RootState) =>
  state.folderVideosInfo.folderVideosInfo;

const folderVideosInfoActions = { fetchFolderVideosInfo };

export { folderVideosInfoSlice, folderVideosInfoActions, selFoldersVideosInfo };
