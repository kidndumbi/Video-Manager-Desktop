import { useSelector } from "react-redux";
import {
  selVideoEnded,
  selVideoPlayer,
  videoPlayerActions,
} from "../store/videoPlaye.slice";
import { useAppDispatch } from "../store";
import { IPCChannels } from "../enums/IPCChannels";
import { ipcRenderer } from "electron";
import { selCurrentVideo } from "../store/currentVideo.slice";
import { useState } from "react";

export const useVideoPlayerLogic = () => {
  const dispatch = useAppDispatch();
  const player = useSelector(selVideoPlayer);
  const videoEnded = useSelector(selVideoEnded);
  const currentVideo = useSelector(selCurrentVideo);
  const [currentVideoTime, setCurrentVideoTime] = useState(0);

  const setVideoEnded = (isVideoEnded: boolean) => {
    dispatch(videoPlayerActions.setVideoEnded(isVideoEnded));
  };

  const updateLastWatched = async () => {
    await ipcRenderer.invoke(IPCChannels.SaveLastWatch, {
      currentVideo,
      lastWatched: currentVideoTime,
    });
  };

  const onCurrentTime = (time: number) => {
    setCurrentVideoTime(time);
  };

  return {
    player,
    setVideoEnded,
    videoEnded,
    currentVideoTime,
    onCurrentTime,
    currentVideo,
    updateLastWatched,
  };
};
