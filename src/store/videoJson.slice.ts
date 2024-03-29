import { RootState } from "./index";
import { VideoJsonModel } from "./../models/videoJSON.model";
import { VideoDataModel } from "./../models/videoData.model";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ipcRenderer } from "electron";
import { IPCChannels } from "../enums/IPCChannels";

const videoJsonSlice = createSlice({
  name: "videoJson",
  initialState: { videoJson: {} } as { videoJson: VideoJsonModel },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getVideoJson.fulfilled, (state, action) => {
      state.videoJson = action.payload;
    });

    builder.addCase(postVideoJason.fulfilled, (state, action) => {
      state.videoJson = action.payload;
    });
  },
});

const getVideoJson = createAsyncThunk(
  "videoJson/getVideoJson",
  async (currentVideo: VideoDataModel | undefined) => {
    const response = await ipcRenderer.invoke(
      IPCChannels.GetVideoJsonData,
      currentVideo
    );
    return response;
  }
);

const postVideoJason = createAsyncThunk(
  "videoJson/postVideoJason",
  async ({
    currentVideo,
    newVideoJsonData,
  }: {
    currentVideo: VideoDataModel | undefined;
    newVideoJsonData: VideoJsonModel | undefined;
  }) => {
    const response = await ipcRenderer.invoke(IPCChannels.SaveVideoJsonData, {
      currentVideo,
      newVideoJsonData,
    });

    return response;
  }
);

const selVideoJson = (state: RootState) => state.videoJson.videoJson;

const videoJsonActions = { getVideoJson, postVideoJason };

export { videoJsonSlice, videoJsonActions, selVideoJson };
