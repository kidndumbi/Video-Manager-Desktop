// import { useEffect } from "react";
import { useAppDispatch } from "../store";
import { playlistsActions, selplaylists } from "../store/playlists.slice";
import { useSelector } from "react-redux";
import { PlaylistModel, PlaylistVideoModel } from "../models/playlist.model";
import {
  currentPlaylistActions,
  selCurrentPlaylist,
  selLoopPlaylist,
  selShufflePlaylist,
  selStartVideo,
} from "../store/currentPlaylist.slice";
import { currentVideoActions } from "../store/currentVideo.slice";

export const usePlaylistLogic = () => {
  const dispatch = useAppDispatch();
  const playlists = useSelector(selplaylists);
  const currentPlaylist = useSelector(selCurrentPlaylist);
  const startVideo = useSelector(selStartVideo);
  const shufflePlaylist = useSelector(selShufflePlaylist);
  const loopPlaylist = useSelector(selLoopPlaylist);

  const fetchPlalists = () => {
    dispatch(playlistsActions.getAllPlaylists());
  };

  const deletePlaylist = (playListId: string) => {
    dispatch(playlistsActions.deletePlaylist(playListId));
  };

  const deletePlaylistVideo = (id: string, videoFilePath: string) => {
    dispatch(playlistsActions.deletePlaylistVideo({ id, videoFilePath }));
  };

  const updatePlaylistName = (id: string, newName: string) => {
    dispatch(playlistsActions.updatePlaylistName({ id, newName }));
  };

  const addNewPlaylist = (name: string) => {
    dispatch(playlistsActions.addNewPlaylist(name));
  };

  const addVideoToPlaylist = (
    playlistId: string,
    newVideo: PlaylistVideoModel
  ) => {
    dispatch(
      playlistsActions.addVideoToPlaylist({
        playlistId,
        newVideo,
      })
    );
  };

  const setCurrentPlaylist = (newCurrentPlalist: PlaylistModel) => {
    dispatch(currentPlaylistActions.setPlaylist(newCurrentPlalist));
  };

  const setStartVideo = (filePath: string) => {
    dispatch(currentPlaylistActions.setStartVideo(filePath));
  };

  const setShufflePlaylist = (shuffle: boolean) => {
    dispatch(currentPlaylistActions.setShufflePlaylist(shuffle));
  };

  const setLoopPlaylist = (loop: boolean) => {
    dispatch(currentPlaylistActions.setLoopPlaylist(loop));
  };

  const setCurrentVideoFromDb = (filePath: string, onVideoSet?: () => void) => {
    dispatch(
      currentVideoActions.setCurrentVideoFromDb({
        filePath,
        callback: onVideoSet,
      })
    );
  };

  return {
    playlists,
    deletePlaylist,
    deletePlaylistVideo,
    updatePlaylistName,
    addNewPlaylist,
    addVideoToPlaylist,
    currentPlaylist,
    setCurrentPlaylist,
    setCurrentVideoFromDb,
    setStartVideo,
    startVideo,
    setShufflePlaylist,
    setLoopPlaylist,
    shufflePlaylist,
    loopPlaylist,
    fetchPlalists,
  };
};
