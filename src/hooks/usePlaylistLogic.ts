import { useEffect } from "react";
import { useAppDispatch } from "../store";
import { playlistsActions, selplaylists } from "../store/playlists.slice";
import { useSelector } from "react-redux";

export const usePlaylistLogic = () => {
  const dispatch = useAppDispatch();
  const playlists = useSelector(selplaylists);

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

  return {
    playlists,
    deletePlaylist,
    deletePlaylistVideo,
    updatePlaylistName,
    addNewPlaylist,
  };
};
