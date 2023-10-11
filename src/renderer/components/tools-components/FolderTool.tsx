import React, { useEffect } from "react";
import { IconButton, Tooltip } from "@mui/material";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import { ipcRenderer } from "electron";
import { IPCChannels } from "../../../enums/IPCChannels";
import { CustomRendererEvents } from "../../../enums/CustomRendererEvents";
import { useFolderManagement } from "../../../hooks/useFolderManagement";

const FolderTool: React.FC = () => {
  const { updateState } = useFolderManagement();

  useEffect(() => {
    const handleFolderSelected = (event: any, newFolderPath: string) => {
      updateState(newFolderPath);
    };

    ipcRenderer.on(CustomRendererEvents.FolderSelected, handleFolderSelected);

    return () => {
      ipcRenderer.removeListener(
        CustomRendererEvents.FolderSelected,
        handleFolderSelected
      );
    };
  }, [updateState]);

  const selectFolder = async () => {
    try {
      const folderPath: string | null = await ipcRenderer.invoke(
        IPCChannels.OpenFileDialog
      );
      if (folderPath) {
        console.log(`You selected: ${folderPath}`);
        updateState(folderPath);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("An error occurred while selecting folder:", error);
      }
    }
  };

  return (
    <Tooltip title="Open Folder" placement="bottom-start">
      <IconButton
        aria-label="select-folder"
        color="secondary"
        size="small"
        onClick={selectFolder}
      >
        <FolderOpenIcon fontSize="small" />
      </IconButton>
    </Tooltip>
  );
};

export { FolderTool };
