import { VideoJsonModel } from "./../models/videoJSON.model";
import { app, BrowserWindow, ipcMain, dialog } from "electron";
import { exec } from "child_process";

import * as path from "path";
import * as url from "url";
// import { readdir } from "fs";
import { stat, writeFile, readdir } from "fs/promises";
import { Stats } from "fs";
import { VideoDataModel } from "../models/videoData.model";
import { FileManager } from "../util/FileManager";

const fm = new FileManager();

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

// Utility function to check if a file should be processed
const shouldProcessFile = (file: string, stats: Stats, searchText?: string) => {
  return searchText &&
    !file.toLowerCase().includes(searchText.toLowerCase()) &&
    !stats.isDirectory()
    ? false
    : true;
};

// Utility function to populate video data from a file and its JSON sidecar (if exists)
const populateVideoData = async (
  file: string,
  filePath: string,
  stats: Stats
) => {
  const dataJsonPath = `${filePath}/${path.parse(file).name}.json`;
  const jsonFileExists = await fileExists(dataJsonPath);
  let jsonFileContents: VideoJsonModel | null = null;

  if (jsonFileExists) {
    const jsonFile = await fm.readFile(dataJsonPath);
    jsonFileContents = JSON.parse(jsonFile || "") as VideoJsonModel;
  }

  let duration = 0;
  if (path.extname(file).toLocaleLowerCase() === ".mp4") {
    const maybeDuration = await getVideoDuration(`${filePath}/${file}`);
    if (typeof maybeDuration === "number") {
      duration = maybeDuration;
    }
  }

  return {
    fileName: file,
    filePath: `${filePath}/${file}`,
    isDirectory: stats.isDirectory(),
    createdAt: stats.birthtimeMs,
    rootPath: filePath,
    duration,
    mustWatch: jsonFileContents?.mustWatch || false,
    notesCount: jsonFileContents?.notes?.length || 0,
    watched: jsonFileContents?.watched || false,
    like: jsonFileContents?.like || false,
  };
};

const fileExists = async (filePath: string): Promise<boolean> => {
  return await fm.exists(filePath);
};

ipcMain.handle("get:root-video-data", async (event, filePath, searchText) => {
  const videoData: VideoDataModel[] = [];

  try {
    const files = await readdir(filePath);
    const fileProcessingPromises = files.map(async (file) => {
      const fullPath = `${filePath}/${file}`;
      const stats = await stat(fullPath);

      if (!shouldProcessFile(file, stats, searchText)) {
        return;
      }

      if (
        path.extname(file).toLocaleLowerCase() === ".mp4" ||
        stats.isDirectory()
      ) {
        const data = await populateVideoData(file, filePath, stats);
        videoData.push(data);
      }
    });

    await Promise.all(fileProcessingPromises);

    return videoData
      .sort((a, b) => b.createdAt - a.createdAt)
      .sort((a, b) => Number(b.isDirectory) - Number(a.isDirectory));
  } catch (error) {
    throw new Error("An error occurred while fetching root video data.");
  }
});

ipcMain.handle(
  "get:video-json-data",
  async (event, currentVideo: VideoDataModel) => {
    try {
      // Constant for reusable value
      const EMPTY_JSON_RESPONSE: VideoJsonModel = { notes: [], overview: {} };
      //Validate the input data
      if (!currentVideo || !currentVideo.rootPath || !currentVideo.fileName) {
        console.warn(
          "Warning: Received undefined or invalid currentVideo.rootPath or currentVideo.fileName."
        );
        return EMPTY_JSON_RESPONSE;
        //throw new Error("Invalid input data");
      }

      // Construct the new file path using template literals
      const newFilePath = `${currentVideo.rootPath}/${
        path.parse(currentVideo.fileName).name
      }.json`;

      // Check if the file exists
      if (await fileExists(newFilePath)) {
        const file = await fm.readFile(newFilePath);
        return file ? JSON.parse(file) : EMPTY_JSON_RESPONSE;
      } else {
        return EMPTY_JSON_RESPONSE;
      }
    } catch (error) {
      // Handle the error appropriately
      console.error("An error occurred:", error);
      return null;
    }
  }
);

const getNewFilePath = (video: VideoDataModel): string => {
  if (!video.rootPath) {
    throw new Error("video.rootPath is undefined!");
  }
  const fileNameWithoutExtension = path.parse(video.fileName).name;
  return path.join(video.rootPath, `${fileNameWithoutExtension}.json`);
};

const writeJsonToFile = async (
  filePath: string,
  jsonData: VideoJsonModel
): Promise<VideoJsonModel> => {
  await writeFile(filePath, JSON.stringify(jsonData));
  return jsonData;
};

ipcMain.handle("open-file-dialog", async (_event) => {
  const result = await dialog.showOpenDialog({
    properties: ["openDirectory"],
  });

  if (!result.canceled) {
    return result.filePaths[0];
  }

  return null;
});

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
      const newFilePath = getNewFilePath(currentVideo);
      return await writeJsonToFile(newFilePath, newVideoJsonData);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("An error occurred:", error.message);
      } else {
        console.error("An unknown error occurred:", error);
      }
      throw new Error("Failed to save video JSON data");
    }
  }
);

const readJsonFile = async (
  filePath: string
): Promise<VideoJsonModel | null> => {
  const jsonFile = await fm.readFile(filePath);
  return jsonFile ? (JSON.parse(jsonFile) as VideoJsonModel) : null;
};

const updateJsonContent = (
  jsonContent: VideoJsonModel,
  lastWatched: number
): VideoJsonModel => {
  jsonContent.lastWatched = lastWatched;
  jsonContent.watched = lastWatched !== 0;
  return jsonContent;
};

ipcMain.handle(
  "save:lastWatch",
  async (
    event,
    {
      currentVideo,
      lastWatched,
    }: { currentVideo: VideoDataModel; lastWatched: number }
  ) => {
    try {
      const jsonFilePath = getNewFilePath(currentVideo);

      if (await fileExists(jsonFilePath)) {
        let jsonFileContents = await readJsonFile(jsonFilePath);

        if (jsonFileContents) {
          jsonFileContents = updateJsonContent(jsonFileContents, lastWatched);
          await writeJsonToFile(jsonFilePath, jsonFileContents);
        }

        return jsonFileContents;
      } else {
        const newJsonContent: VideoJsonModel = {
          notes: [],
          overview: {},
          lastWatched,
          watched: lastWatched !== 0,
        };
        await writeJsonToFile(jsonFilePath, newJsonContent);
        return newJsonContent;
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log("save:lastWatch error ", error.message);
      } else {
        console.log("An unknown error occurred:", error);
      }
      console.log("currentVideo ::: ", currentVideo);
    }
  }
);

ipcMain.handle("delete:video", async (event, videoData: VideoDataModel[]) => {
  try {
    const filepathsToDelete: string[] = [];

    for (const video of videoData) {
      filepathsToDelete.push(video.filePath);

      const jsonFilePath = getNewFilePath(video);

      if (await fileExists(jsonFilePath)) {
        filepathsToDelete.push(jsonFilePath);
      }
    }

    await fm.deleteFiles(filepathsToDelete);

    return "deletion complete";
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("delete:video error:", error.message);
    } else {
      console.error("An unknown error occurred:", error);
    }
    return "deletion failed";
  }
});

function getVideoDuration(filePath: string): Promise<number | "unknown"> {
  return new Promise((resolve, reject) => {
    exec(
      `ffprobe -i "${filePath}" -show_entries format=duration -v quiet -of csv="p=0"`,
      (error, stdout, stderr) => {
        if (error) {
          console.error("Exec error:", error);
          console.error("Stderr:", stderr);
          return reject(error);
        }
        resolve(parseFloat(stdout));
      }
    );
  });
}
