import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { currentRootPathSlice } from "./currentRootpath.slice";
import { folderVideosInfoSlice } from "./folderVideosInfo.slice";
import { pathNavSlice } from "./pathNav.slice";

const store = configureStore({
  reducer: {
    currentRootPath: currentRootPathSlice.reducer,
    pathNav: pathNavSlice.reducer,
    folderVideosInfo: folderVideosInfoSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export function useAppDispatch() {
  return useDispatch<AppDispatch>();
}
export { store };
