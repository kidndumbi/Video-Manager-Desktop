import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { ipcRenderer } from "electron";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import theme from "../theme";
import { VideoList } from "./VideoList";
import { RootState, useAppDispatch } from "../../store";
import { currentRootPathActions } from "../../store/currentRootpath.slice";
import { pathNavActions } from "../../store/pathNav.slice";

export default function App(): JSX.Element {
  const [videoData, setVideoData] = useState([]);
  const dispatch = useAppDispatch();

  const currentRootPath = useSelector(
    (state: RootState) => state.currentRootPath.currentRootPath
  );

  const pathNav = useSelector((state: RootState) => state.pathNav.pathNav);

  useEffect(() => {
    ipcRenderer.send("get:root-video-data", currentRootPath);

    ipcRenderer.on("video-files-data", (event, data) => {
      setVideoData(data);
    });
  }, []);

  const onRootPathChange = (path: string) => {
    dispatch(currentRootPathActions.setCurrentRootPath(path));
    dispatch(pathNavActions.setPathNav([...pathNav, currentRootPath]));
    ipcRenderer.send("get:root-video-data", path);
  };

  const onBackTriggered = () => {
    if (pathNav.length > 0) {
      dispatch(
        currentRootPathActions.setCurrentRootPath(pathNav[pathNav.length - 1])
      );
      ipcRenderer.send("get:root-video-data", pathNav[pathNav.length - 1]);
      dispatch(pathNavActions.setPathNav(pathNav.slice(0, -1)));
    }
  };

  return (
    // Setup theme and css baseline for the Material-UI app
    // https://mui.com/customization/theming/
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          backgroundColor: "white",
        }}
      >
        <main>
          {/* This is where your app content should go */}
          {/* <Greetings /> */}
          <VideoList
            showBackBtn={pathNav.length > 0}
            onBackTriggered={onBackTriggered}
            rootPath={currentRootPath}
            onRootPathChange={onRootPathChange}
            videoData={videoData}
          ></VideoList>
        </main>
      </Box>
    </ThemeProvider>
  );
}
