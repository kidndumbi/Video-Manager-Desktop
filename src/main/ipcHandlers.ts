import { ipcMain } from "electron";
import {
  getRootVideoData,
  getVideoJsonData,
  saveVideoJsonData,
  saveLastWatch,
  deleteVideo,
  openFileDialog,
  getVideoData,
} from "./utilities";
import {
  addNewPlaylist,
  deletePlaylist,
  deletePlaylistVideo,
  getAllPlaylists,
  updatePlaylistName,
  addVideoToPlaylist,
} from "./playlistOperations";
import { PlaylistVideoModel } from "../models/playlist.model";

export function registerIpcHandlers() {
  ipcMain.handle("get:root-video-data", getRootVideoData);
  ipcMain.handle("get:video-json-data", getVideoJsonData);
  ipcMain.handle("save:video-json-data", saveVideoJsonData);
  ipcMain.handle("save:lastWatch", saveLastWatch);
  ipcMain.handle("delete:video", deleteVideo);
  ipcMain.handle("open-file-dialog", openFileDialog);
  ipcMain.handle("playlist:getAllPlaylists", () => {
    return getAllPlaylists();
  });
  ipcMain.handle("playlist:deletePlaylist", (_event: any, id: string) => {
    return deletePlaylist(id);
  });
  ipcMain.handle(
    "playlist:deletePlaylistVideo",
    (_event: any, playlistId: string, videoFilePath: string) => {
      return deletePlaylistVideo(playlistId, videoFilePath);
    }
  );
  ipcMain.handle(
    "playlist:updatePlaylistName",
    (_event: any, playlistId: string, newName: string) => {
      return updatePlaylistName(playlistId, newName);
    }
  );
  ipcMain.handle("playlist:addNewPlaylist", (_event: any, name: string) => {
    return addNewPlaylist(name);
  });
  ipcMain.handle(
    "playlist:addVideoToPlaylist",
    (_event: any, playlistId: string, newVideo: PlaylistVideoModel) => {
      return addVideoToPlaylist(playlistId, newVideo);
    }
  );
  ipcMain.handle("playlist:getVideoData", (_event: any, filePath: string) => {
    return getVideoData(filePath);
  });
}
