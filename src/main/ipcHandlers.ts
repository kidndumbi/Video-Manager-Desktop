import { ipcMain } from "electron";
import {
  getRootVideoData,
  getVideoJsonData,
  saveVideoJsonData,
  saveLastWatch,
  deleteVideo,
  openFileDialog,
} from "./utilities";
import {
  deletePlaylist,
  deletePlaylistVideo,
  getAllPlaylistsDb,
} from "./playlistOperations";

export function registerIpcHandlers() {
  ipcMain.handle("get:root-video-data", getRootVideoData);
  ipcMain.handle("get:video-json-data", getVideoJsonData);
  ipcMain.handle("save:video-json-data", saveVideoJsonData);
  ipcMain.handle("save:lastWatch", saveLastWatch);
  ipcMain.handle("delete:video", deleteVideo);
  ipcMain.handle("open-file-dialog", openFileDialog);
  ipcMain.handle("playlist:getAllPlaylists", () => {
    return getAllPlaylistsDb();
  });
  ipcMain.handle("playlist:deletePlaylist", (_event: any, id: number) => {
    return deletePlaylist(id);
  });
  ipcMain.handle(
    "playlist:deletePlaylistVideo",
    (_event: any, playlistId: number, videoFilePath: string) => {
      return deletePlaylistVideo(playlistId, videoFilePath);
    }
  );
}
