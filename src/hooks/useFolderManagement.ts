import { useSelector } from "react-redux";

import { useAppDispatch } from "../store";
import {
  currentRootPathActions,
  selCurrentRootPath,
} from "../store/currentRootpath.slice";
import { pathNavActions, selPathNav } from "../store/pathNav.slice";
import { folderVideosInfoActions } from "../store/folderVideosInfo.slice";

const useFolderManagement = () => {
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

  return { updateState };
};

export { useFolderManagement };
