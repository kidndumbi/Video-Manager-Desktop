import { BrowserWindow } from "electron";
import * as path from "path";
import * as url from "url";
import { initializeDb } from "./lowdb-config";

export async function createWindow() {
  let mainWindow: Electron.BrowserWindow | null;

  // Initialize your database
  try {
    await initializeDb();
    console.log("Database initialized");
  } catch (error) {
    console.error("Error initializing db:", error);
  }

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
