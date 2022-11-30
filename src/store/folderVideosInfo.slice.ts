import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ipcRenderer } from "electron";

const fetchFolderVideosInfo = createAsyncThunk(
  "folderVideosInfo/fetchFolderVideosInfo",
  async (currentRootPath: string) => {
    const response = await ipcRenderer.invoke(
      "get:root-video-data",
      currentRootPath
    );
    return response;
  }
);

const folderVideosInfoSlice = createSlice({
  name: "folderVideosInfo",
  initialState: { folderVideosInfo: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchFolderVideosInfo.fulfilled, (state, action) => {
      state.folderVideosInfo = action.payload;
    });
  },
});

const folderVideosInfoActions = { fetchFolderVideosInfo };

export { folderVideosInfoSlice, folderVideosInfoActions };
