import { useEffect } from "react";
import { useAppDispatch } from "../store";
import { playlistsActions, selplaylists } from "../store/playlists.slice";
import { useSelector } from "react-redux";
import { PlaylistVideoModel } from "../models/playlist.model";

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

  return {
    playlists,
    deletePlaylist,
    deletePlaylistVideo,
    updatePlaylistName,
    addNewPlaylist,
    addVideoToPlaylist,
  };
};
