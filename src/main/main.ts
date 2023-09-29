import { app } from "electron";
import { createWindow } from "./windowManager";
import { registerIpcHandlers } from "./ipcHandlers";

app.on("ready", createWindow);
registerIpcHandlers();
