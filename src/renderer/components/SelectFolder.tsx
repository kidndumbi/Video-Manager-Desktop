import { IconButton } from "@mui/material";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import { ipcRenderer } from "electron";
import React, { MouseEventHandler } from "react";
import { useAppDispatch } from "../../store";
import {
  currentRootPathActions,
  selCurrentRootPath,
} from "../../store/currentRootpath.slice";
import { pathNavActions, selPathNav } from "../../store/pathNav.slice";
import { folderVideosInfoActions } from "../../store/folderVideosInfo.slice";
import { useSelector } from "react-redux";

const SelectFolder: React.FC = () => {
  const dispatch = useAppDispatch();
  const pathNav = useSelector(selPathNav);
  const currentRootPath = useSelector(selCurrentRootPath);

  const updateState = (newFolderPath: string) => {
    dispatch(currentRootPathActions.setCurrentRootPath(newFolderPath));
    if (newFolderPath !== currentRootPath)
      dispatch(pathNavActions.setPathNav([...pathNav, currentRootPath]));
    dispatch(
      folderVideosInfoActions.fetchFolderVideosInfo({
        currentRootPath: newFolderPath,
      })
    );
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
    } catch (error: any) {
      console.error("An error occurred while selecting folder:", error);
    }
  };

  return (
    <IconButton
      aria-label="select-folder"
      color="secondary"
      size="small"
      onClick={selectFolder as MouseEventHandler<HTMLButtonElement>}
    >
      <FolderOpenIcon fontSize="small" />
    </IconButton>
  );
};

export { SelectFolder };
