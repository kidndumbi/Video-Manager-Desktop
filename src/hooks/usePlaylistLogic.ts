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

  return { playlists };
};
