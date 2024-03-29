import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { currentRootPathSlice } from "./currentRootpath.slice";
import { currentVideoSlice } from "./currentVideo.slice";
import { folderVideosInfoSlice } from "./folderVideosInfo.slice";
import { pathNavSlice } from "./pathNav.slice";
import { videoJsonSlice } from "./videoJson.slice";
import { videoPlayerSlice } from "./videoPlaye.slice";
import { playlistSlice } from "./playlists.slice";
import { currentPlaylistSlice } from "./currentPlaylist.slice";
import { notificationSlice } from "./notification.slice";

const store = configureStore({
  reducer: {
    currentRootPath: currentRootPathSlice.reducer,
    pathNav: pathNavSlice.reducer,
    folderVideosInfo: folderVideosInfoSlice.reducer,
    videoJson: videoJsonSlice.reducer,
    currentVideo: currentVideoSlice.reducer,
    videoPlayer: videoPlayerSlice.reducer,
    playlists: playlistSlice.reducer,
    currentPlaylist: currentPlaylistSlice.reducer,
    notification: notificationSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export function useAppDispatch() {
  return useDispatch<AppDispatch>();
}
export { store };
