import React from "react";
import { IconButton } from "@mui/material";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import { ipcRenderer } from "electron";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../store";
import {
  currentRootPathActions,
  selCurrentRootPath,
} from "../../../store/currentRootpath.slice";
import { pathNavActions, selPathNav } from "../../../store/pathNav.slice";
import { folderVideosInfoActions } from "../../../store/folderVideosInfo.slice";

const FolderTool: React.FC = () => {
  const dispatch = useAppDispatch();
  const pathNav = useSelector(selPathNav);
  const currentRootPath = useSelector(selCurrentRootPath);

  const setCurrentRootPath = (path: string) => {
    dispatch(currentRootPathActions.setCurrentRootPath(path));
  };

  const updatePathNav = (newRootPath: string) => {
    if (newRootPath !== currentRootPath) {
      dispatch(pathNavActions.setPathNav([...pathNav, currentRootPath]));
    }
  };

  const fetchFolderVideos = (newRootPath: string) => {
    dispatch(
      folderVideosInfoActions.fetchFolderVideosInfo({
        currentRootPath: newRootPath,
      })
    );
  };

  const updateState = (newFolderPath: string) => {
    setCurrentRootPath(newFolderPath);
    updatePathNav(newFolderPath);
    fetchFolderVideos(newFolderPath);
  };

  const selectFolder = async () => {
    try {
      const folderPath: string | null = await ipcRenderer.invoke(
        "open-file-dialog"
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
    <IconButton
      aria-label="select-folder"
      color="secondary"
      size="small"
      onClick={selectFolder}
    >
      <FolderOpenIcon fontSize="small" />
    </IconButton>
  );
};

export { FolderTool };
