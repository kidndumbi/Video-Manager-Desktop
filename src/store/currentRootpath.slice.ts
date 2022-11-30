import { createSlice } from "@reduxjs/toolkit";

const currentRootPathSlice = createSlice({
  name: "currentRootPath",
  initialState: { currentRootPath: "D:/Pru videos" },
  reducers: {
    setCurrentRootPath: (state, action) => {
      console.log("in here ", action.payload);
      state.currentRootPath = action.payload;
    },
  },
});

const currentRootPathActions = currentRootPathSlice.actions;

export { currentRootPathSlice, currentRootPathActions };
