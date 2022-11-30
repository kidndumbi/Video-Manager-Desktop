import { createSlice } from "@reduxjs/toolkit";

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

export { pathNavSlice, pathNavActions };
