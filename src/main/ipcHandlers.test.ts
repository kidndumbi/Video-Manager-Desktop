// ipcHandlers.test.ts
import { ipcMain } from "electron";
import { registerIpcHandlers } from "./ipcHandlers";

// Mocking ipcMain.handle
jest.mock("electron", () => ({
  ipcMain: {
    handle: jest.fn(),
  },
}));

describe("IPC Handlers", () => {
  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    jest.clearAllMocks();
  });

  it("should register IPC handlers correctly", () => {
    registerIpcHandlers();

    expect(ipcMain.handle).toHaveBeenCalledWith(
      "get:root-video-data",
      expect.any(Function)
    );
    expect(ipcMain.handle).toHaveBeenCalledWith(
      "get:video-json-data",
      expect.any(Function)
    );
    expect(ipcMain.handle).toHaveBeenCalledWith(
      "save:video-json-data",
      expect.any(Function)
    );
    expect(ipcMain.handle).toHaveBeenCalledWith(
      "save:lastWatch",
      expect.any(Function)
    );
    expect(ipcMain.handle).toHaveBeenCalledWith(
      "delete:video",
      expect.any(Function)
    );
    expect(ipcMain.handle).toHaveBeenCalledWith(
      "open-file-dialog",
      expect.any(Function)
    );
  });
});
