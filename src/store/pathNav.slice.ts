import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./index";

const localStoragePathNav = JSON.parse(localStorage.getItem("pathNav") || "[]");

const pathNavSlice = createSlice({
  name: "pathNav",
  initialState: { pathNav: localStoragePathNav } as { pathNav: string[] },
  reducers: {
    setPathNav: (state, action) => {
      state.pathNav = action.payload;
      localStorage.setItem("pathNav", JSON.stringify(action.payload));
    },
  },
});

const pathNavActions = pathNavSlice.actions;

const selPathNav = (state: RootState) => state.pathNav.pathNav;

export { pathNavSlice, pathNavActions, selPathNav };
