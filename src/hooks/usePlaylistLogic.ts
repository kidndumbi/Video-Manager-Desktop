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

  const deletePlaylist = (playListId: number) => {
    dispatch(playlistsActions.deletePlaylist(playListId));
  };

  const deletePlaylistVideo = (id: number, videoFilePath: string) => {
    dispatch(playlistsActions.deletePlaylistVideo({ id, videoFilePath }));
  };

  return { playlists, deletePlaylist, deletePlaylistVideo };
};
