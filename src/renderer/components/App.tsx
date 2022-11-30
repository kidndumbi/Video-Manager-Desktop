import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { ipcRenderer } from "electron";
import React, { useEffect, useState } from "react";
import theme from "../theme";
import { VideoList } from "./VideoList";

export default function App(): JSX.Element {
  const [videoData, setVideoData] = useState([]);
  const [rootPath, setRootPath] = useState("D:/Pru videos");
  const [pathNav, setPathNav] = useState<string[]>([]);

  useEffect(() => {
    ipcRenderer.send("get:root-video-data", rootPath);

    ipcRenderer.on("video-files-data", (event, data) => {
      console.log("data  ", data);
      setVideoData(data);
    });
  }, []);

  useEffect(() => {
    console.log("pathnav  ", pathNav);
  }, [pathNav]);

  const onRootPathChange = (path: string) => {
    setRootPath(path);
    setPathNav((oldArray) => [...oldArray, rootPath]);
    ipcRenderer.send("get:root-video-data", path);
  };

  const onBackTriggered = () => {
    if (pathNav.length > 0) {
      setRootPath(pathNav[pathNav.length - 1]);
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
            rootPath={rootPath}
            onRootPathChange={onRootPathChange}
            videoData={videoData}
          ></VideoList>
        </main>
      </Box>
    </ThemeProvider>
  );
}
