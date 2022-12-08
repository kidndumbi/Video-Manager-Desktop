import { VideoJsonModel } from "./../models/videoJSON.model";
import { app, BrowserWindow, ipcMain } from "electron";
import * as path from "path";
import * as url from "url";
// import { readdir } from "fs";
import { stat, access, readFile, writeFile, readdir } from "fs/promises";
import { VideoDataModel } from "../models/videoData.model";

let mainWindow: Electron.BrowserWindow | null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1100,
    height: 700,
    backgroundColor: "#f2f2f2",
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      devTools: process.env.NODE_ENV !== "production",
      webSecurity: false,
    },
  });

  mainWindow.webContents.openDevTools();

  if (process.env.NODE_ENV === "development") {
    mainWindow.loadURL("http://localhost:4000");
  } else {
    mainWindow.loadURL(
      url.format({
        pathname: path.join(__dirname, "renderer/index.html"),
        protocol: "file:",
        slashes: true,
      })
    );
  }

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it"s common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.handle("get:root-video-data", async (event, filePath) => {
  const videoData: VideoDataModel[] = [];

  try {
    const files = await readdir(filePath);

    for (const file of files) {
      const stats = await stat(filePath + "/" + file);

      if (
        path.extname(file).toLocaleLowerCase() === ".mp4" ||
        stats.isDirectory()
      ) {
        videoData.push({
          fileName: file,
          filePath: filePath + "/" + file,
          isDirectory: stats.isDirectory(),
          createdAt: stats.birthtimeMs,
          rootPath: filePath,
        });
      }
    }

    return videoData
      .sort((a, b) => b.createdAt - a.createdAt)
      .sort((a, b) => Number(b.isDirectory) - Number(a.isDirectory));
  } catch (error) {
    throw "error";
  }
});

ipcMain.handle(
  "get:video-json-data",
  async (event, currentVideo: VideoDataModel) => {
    const newFilePath =
      currentVideo.rootPath +
      "/" +
      path.parse(currentVideo.fileName).name +
      ".json";

    const fileExists = await exists(newFilePath);

    if (fileExists) {
      const file = await readFile(newFilePath);
      return JSON.parse(file.toString());
    } else {
      return {
        notes: [],
        overview: {},
      };
    }
  }
);

ipcMain.handle(
  "save:video-json-data",
  async (
    event,
    {
      currentVideo,
      newVideoJsonData,
    }: { currentVideo: VideoDataModel; newVideoJsonData: VideoJsonModel }
  ) => {
    try {
      const newFilePath =
        currentVideo.rootPath +
        "/" +
        path.parse(currentVideo.fileName).name +
        ".json";
      await writeFile(newFilePath, JSON.stringify(newVideoJsonData));
      return newVideoJsonData;
    } catch (error) {
      throw "error common...";
    }
  }
);

async function exists(path: string) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}
