import { useSelector } from "react-redux";
import {
  selVideoEnded,
  selVideoPlayer,
  videoPlayerActions,
} from "../store/videoPlaye.slice";
import { useAppDispatch } from "../store";

export const useVideoPlayerLogic = () => {
  const dispatch = useAppDispatch();
  const player = useSelector(selVideoPlayer);
  const videoEnded = useSelector(selVideoEnded);

  const setVideoEnded = () => {
    dispatch(videoPlayerActions.setVideoEnded(true));
  };

  return {
    player,
    setVideoEnded,
    videoEnded,
  };
};
