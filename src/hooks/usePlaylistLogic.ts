import { useEffect } from "react";
import { useAppDispatch } from "../store";
import { playlistsActions, selplaylists } from "../store/playlists.slice";
import { useSelector } from "react-redux";
import { PlaylistModel, PlaylistVideoModel } from "../models/playlist.model";
import {
  currentPlaylistActions,
  selCurrentPlaylist,
} from "../store/currentPlaylist.slice";

export const usePlaylistLogic = () => {
  const dispatch = useAppDispatch();
  const playlists = useSelector(selplaylists);
  const currentPlaylist = useSelector(selCurrentPlaylist);

  useEffect(() => {
    fetchPlalists();
  }, []);

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

  return {
    playlists,
    deletePlaylist,
    deletePlaylistVideo,
    updatePlaylistName,
    addNewPlaylist,
    addVideoToPlaylist,
    currentPlaylist,
    setCurrentPlaylist,
  };
};
