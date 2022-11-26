import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { ipcRenderer } from "electron";
import React, { useEffect, useState } from "react";
import theme from "../theme";
import { VideoList } from "./VideoList";

export default function App(): JSX.Element {
  const [videoData, setVideoData] = useState([]);

  useEffect(() => {
    ipcRenderer.send("get:root-video-data", "D:/Pru videos");

    ipcRenderer.on("video-files-data", (event, data) => {
      console.log("data ", data);
      setVideoData(data);
    });
  }, []);

  return (
    // Setup theme and css baseline for the Material-UI app
    // https://mui.com/customization/theming/
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          backgroundColor: (theme) => theme.palette.background.default,
        }}
      >
        <main>
          {/* This is where your app content should go */}
          {/* <Greetings /> */}
          <VideoList videoData={videoData}></VideoList>
        </main>
      </Box>
    </ThemeProvider>
  );
}
