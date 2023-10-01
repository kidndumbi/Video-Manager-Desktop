import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../store";
import { ipcRenderer } from "electron";
import {
  folderVideosInfoActions,
  selFoldersVideosInfo,
} from "../store/folderVideosInfo.slice";
import {
  currentRootPathActions,
  selCurrentRootPath,
} from "../store/currentRootpath.slice";
import {
  currentVideoActions,
  selCurrentVideo,
} from "../store/currentVideo.slice";
import { selVideoPlayer, videoPlayerActions } from "../store/videoPlaye.slice";
import { pathNavActions, selPathNav } from "../store/pathNav.slice";
import { selVideoJson, videoJsonActions } from "../store/videoJson.slice";
import { VideoDataModel } from "../models/videoData.model";
import { VideoJsonModel } from "../models/videoJSON.model";
import { PlayerReference } from "video-react";
import { playlistsActions, selplaylists } from "../store/playlists.slice";

export const useVideoListLogic = () => {
  const dispatch = useAppDispatch();
  const [currentVideoTime, setCurrentVideoTime] = useState(0);
  const [showSettingsDialog, setShowSettingsDialog] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [selectedVideos, setSelectedVideos] = useState<VideoDataModel[]>([]);

  const currentVideo = useSelector(selCurrentVideo);
  const player = useSelector(selVideoPlayer);
  const folderVideosInfo = useSelector(selFoldersVideosInfo);
  const pathNav = useSelector(selPathNav);
  const currentRootPath = useSelector(selCurrentRootPath);
  const videoJsonData = useSelector(selVideoJson);
  const playlists = useSelector(selplaylists);

  useEffect(() => {
    fetchPlalists();
  }, []);

  useEffect(() => {
    console.log("playlists: ", playlists);
  }, [playlists]);

  useEffect(() => {
    fetchFolderVideosInfo({ currentRootPath });
  }, [dispatch, currentRootPath]);

  useEffect(() => {
    if (player && videoJsonData.lastWatched) {
      player.seek(videoJsonData.lastWatched);
    }
  }, [player, videoJsonData.lastWatched]);

  const updateLastWatched = async () => {
    await ipcRenderer.invoke("save:lastWatch", {
      currentVideo,
      lastWatched: currentVideoTime,
    });
  };

  const fetchFolderVideosInfo = (args: {
    currentRootPath: string;
    searchText?: string;
  }) => {
    dispatch(
      folderVideosInfoActions.fetchFolderVideosInfo({
        ...args,
      })
    );
  };

  const fetchPlalists = () => {
    dispatch(playlistsActions.getAllPlaylists());
  };

  const handleVideoSelect = (video: VideoDataModel) => {
    updateLastWatched();
    if (!video.isDirectory) {
      dispatch(currentVideoActions.setCurrentVideo(video));
    } else {
      dispatch(currentRootPathActions.setCurrentRootPath(video.filePath));
      dispatch(pathNavActions.setPathNav([...pathNav, currentRootPath]));
      fetchFolderVideosInfo({ currentRootPath: video.filePath });
    }
  };

  const onBackTriggered = () => {
    if (pathNav.length > 0) {
      const newPath = pathNav[pathNav.length - 1];
      dispatch(currentRootPathActions.setCurrentRootPath(newPath));
      fetchFolderVideosInfo({
        currentRootPath: newPath,
      });
      dispatch(pathNavActions.setPathNav(pathNav.slice(0, -1)));
    }
  };

  const onCurrentTime = (time: number) => {
    setCurrentVideoTime(time);
  };

  const saveVideoSettings = (value: { [key: string]: boolean }) => {
    const newVideoJsonData: VideoJsonModel = { ...videoJsonData, ...value };
    dispatch(
      videoJsonActions.postVideoJason({ currentVideo, newVideoJsonData })
    );
  };

  const handleOnVideoSelected = (
    event: React.ChangeEvent<HTMLInputElement>,
    video: VideoDataModel
  ) => {
    if (event.target.checked) {
      setSelectedVideos([...selectedVideos, video]);
    } else {
      setSelectedVideos(
        selectedVideos.filter((v) => v.filePath !== video.filePath)
      );
    }
  };

  const deleteVideos = async () => {
    if (selectedVideos.length > 0) {
      await ipcRenderer.invoke("delete:video", selectedVideos);
      setSelectedVideos([]);
      fetchFolderVideosInfo({ currentRootPath });
    }
  };

  const onSearchClick = (searchText: string) => {
    fetchFolderVideosInfo({
      currentRootPath,
      searchText: searchText.trim(),
    });
  };

  const setPlayer = (p: PlayerReference) => {
    dispatch(videoPlayerActions.setVideoPlayer(p));
  };

  return {
    currentVideoTime,
    showSettingsDialog,
    setShowSettingsDialog,
    showDialog,
    setShowDialog,
    selectedVideos,
    folderVideosInfo,
    handleVideoSelect,
    onBackTriggered,
    onCurrentTime,
    saveVideoSettings,
    handleOnVideoSelected,
    deleteVideos,
    onSearchClick,
    currentVideo,
    player,
    pathNav,
    currentRootPath,
    videoJsonData,
    setPlayer,
    fetchFolderVideosInfo,
    playlists,
  };
};
