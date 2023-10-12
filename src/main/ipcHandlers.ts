import { ipcMain } from "electron";

import {
  addNewPlaylist,
  deletePlaylist,
  deletePlaylistVideo,
  getAllPlaylists,
  updatePlaylistName,
  addOrRemoveVideoFromPlaylist,
} from "./playlistOperations";
import { PlaylistVideoModel } from "../models/playlist.model";
import { IPCChannels } from "../enums/IPCChannels";
import {
  deleteVideo,
  getRootVideoData,
  getVideoData,
  getVideoJsonData,
  saveLastWatch,
  saveVideoJsonData,
} from "./backend-services/videoDataManagement";
import { openFileDialog } from "./backend-services/dialogsAndUI";
import {
  downloadYouTubeVideo,
  getYouTubeVideoDetails,
} from "./backend-services/videoProcessing";

export function registerIpcHandlers() {
  ipcMain.handle(IPCChannels.GetRootVideoData, getRootVideoData);
  ipcMain.handle(IPCChannels.GetVideoJsonData, getVideoJsonData);
  ipcMain.handle(IPCChannels.SaveVideoJsonData, saveVideoJsonData);
  ipcMain.handle(IPCChannels.SaveLastWatch, saveLastWatch);
  ipcMain.handle(IPCChannels.DeleteVideo, deleteVideo);
  ipcMain.handle(IPCChannels.OpenFileDialog, openFileDialog);
  ipcMain.handle(IPCChannels.GetAllPlaylists, () => getAllPlaylists());
  ipcMain.handle(IPCChannels.DeletePlaylist, (_event: any, id: string) =>
    deletePlaylist(id)
  );
  ipcMain.handle(
    IPCChannels.DeletePlaylistVideo,
    (_event: any, playlistId: string, videoFilePath: string) =>
      deletePlaylistVideo(playlistId, videoFilePath)
  );
  ipcMain.handle(
    IPCChannels.UpdatePlaylistName,
    (_event: any, playlistId: string, newName: string) =>
      updatePlaylistName(playlistId, newName)
  );
  ipcMain.handle(IPCChannels.AddNewPlaylist, (_event: any, name: string) =>
    addNewPlaylist(name)
  );
  ipcMain.handle(
    IPCChannels.addOrRemoveVideoFromPlaylist,
    (_event: any, playlistId: string, newVideo: PlaylistVideoModel) =>
      addOrRemoveVideoFromPlaylist(playlistId, newVideo)
  );
  ipcMain.handle(IPCChannels.GetVideoData, (_event: any, filePath: string) =>
    getVideoData(filePath)
  );
  ipcMain.handle(
    IPCChannels.YoutubeVideoDownload,
    (_event: any, url: string, filePath: string, youtubeId: string) =>
      downloadYouTubeVideo(url, filePath, youtubeId)
  );
  ipcMain.handle(IPCChannels.YoutubeVideoDetails, (_event: any, url: string) =>
    getYouTubeVideoDetails(url)
  );
}
