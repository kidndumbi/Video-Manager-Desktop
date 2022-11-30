import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { ipcRenderer } from "electron";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import theme from "../theme";
import { VideoList } from "./VideoList";
import { RootState, useAppDispatch } from "../../store";
import { currentRootPathActions } from "../../store/currentRootpath.slice";

export default function App(): JSX.Element {
  const [videoData, setVideoData] = useState([]);
  const [pathNav, setPathNav] = useState<string[]>([]);
  const dispatch = useAppDispatch();

  const currentRootPath = useSelector(
    (state: RootState) => state.currentRootPath.currentRootPath
  );

  useEffect(() => {
    console.log("currentRootPath page change::: ", currentRootPath);
  }, [currentRootPath]);

  useEffect(() => {
    ipcRenderer.send("get:root-video-data", currentRootPath);

    ipcRenderer.on("video-files-data", (event, data) => {
      setVideoData(data);
    });
  }, []);

  useEffect(() => {
    console.log("pathnav  ", pathNav);
  }, [pathNav]);

  const onRootPathChange = (path: string) => {
    console.log("path ", path);
    dispatch(currentRootPathActions.setCurrentRootPath(path));
    setPathNav((oldArray) => [...oldArray, currentRootPath]);
    ipcRenderer.send("get:root-video-data", path);
  };

  const onBackTriggered = () => {
    if (pathNav.length > 0) {
      dispatch(
        currentRootPathActions.setCurrentRootPath(pathNav[pathNav.length - 1])
      );
      ipcRenderer.send("get:root-video-data", pathNav[pathNav.length - 1]);
      setPathNav(pathNav.slice(0, -1));
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
