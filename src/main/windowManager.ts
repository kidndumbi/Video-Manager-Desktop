import { openFileDialog } from "./backend-services/dialogsAndUI";
import { BrowserWindow, Menu, MenuItemConstructorOptions } from "electron";
import * as path from "path";
import * as url from "url";
import { initializeDb } from "./lowdb-config";
import { CustomRendererEvents } from "../enums/CustomRendererEvents";

export async function createWindow() {
  let mainWindow: Electron.BrowserWindow | null;

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

  // Create the menu template
  const template: MenuItemConstructorOptions[] = [
    {
      label: "File",
      submenu: [
        {
          label: "Open Folder",
          click: async () => {
            const folderPath = await openFileDialog({});
            console.log("folder ", folderPath);
            if (folderPath) {
              mainWindow?.webContents.send(
                CustomRendererEvents.FolderSelected,
                folderPath
              );
            }
          },
        },
        {
          type: "separator",
        },
        {
          label: "Exit",
          accelerator: process.platform === "darwin" ? "Cmd+Q" : "Alt+F4",
          click: () => {
            if (mainWindow) {
              mainWindow.close();
            }
          },
        },
      ],
    },
  ];

  // Build the menu from the template and set it as the application menu
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}
