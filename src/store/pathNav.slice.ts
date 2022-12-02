import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./index";

const pathNavSlice = createSlice({
  name: "pathNav",
  initialState: { pathNav: [] },
  reducers: {
    setPathNav: (state, action) => {
      console.log("in here ", action.payload);
      state.pathNav = action.payload;
    },
  },
});

const pathNavActions = pathNavSlice.actions;

const selPathNav = (state: RootState) => state.pathNav.pathNav;

export { pathNavSlice, pathNavActions, selPathNav };
