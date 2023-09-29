import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import React from "react";
import theme from "../theme";
import { VideoList } from "./VideoList";

export default function App(): JSX.Element {
  return (
    // Setup theme and css baseline for the Material-UI app
    // https://mui.com/customization/theming/
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        data-testid="box-container"
        sx={{
          backgroundColor: "white",
        }}
      >
        <main>
          <VideoList></VideoList>
        </main>
      </Box>
    </ThemeProvider>
  );
}
