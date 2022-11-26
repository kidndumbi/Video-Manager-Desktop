import { app, BrowserWindow, ipcMain } from "electron";
import * as path from "path";
import * as url from "url";
import { readdir } from "fs";
import { stat } from "fs";

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
    },
  });

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

ipcMain.on("get:root-video-data", (event, path) => {
  console.log("data ", path);

  const videoData: any[] = [];

  readdir(path, (err, files) => {
    files.forEach((file) => {
      stat(path + "/" + file, (err, stats) => {
        if (stats.isDirectory()) {
          console.log(file + " THIS IS A DIRECTOTY!!!!!!!!!!!!!!!!!!!");
          videoData.push({
            name: file,
            path: path + "/" + file,
            isDirectory: true,
          });
        } else {
          videoData.push({
            name: file,
            path: path + "/" + file,
            isDirectory: false,
          });
        }
      });
    });

    console.log("files: ", videoData);
  });

  setTimeout(() => {
    mainWindow?.webContents.send("video-files-data", videoData);
  }, 1000);
});
