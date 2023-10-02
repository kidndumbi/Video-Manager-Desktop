import { ipcMain } from "electron";
import {
  getRootVideoData,
  getVideoJsonData,
  saveVideoJsonData,
  saveLastWatch,
  deleteVideo,
  openFileDialog,
} from "./utilities";
import { deletePlaylistById, getAllPlaylistsDb } from "./playlistOperations";

export function registerIpcHandlers() {
  ipcMain.handle("get:root-video-data", getRootVideoData);
  ipcMain.handle("get:video-json-data", getVideoJsonData);
  ipcMain.handle("save:video-json-data", saveVideoJsonData);
  ipcMain.handle("save:lastWatch", saveLastWatch);
  ipcMain.handle("delete:video", deleteVideo);
  ipcMain.handle("open-file-dialog", openFileDialog);
  ipcMain.handle("playlist:getAllPlaylistsDb", () => {
    return getAllPlaylistsDb();
  });
  ipcMain.handle("playlist:deletePlaylistById", (_event: any, id: number) => {
    console.log("playlist:deletePlaylistById ", id);
    return deletePlaylistById(id);
  });
}
