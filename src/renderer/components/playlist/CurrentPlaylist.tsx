import React from "react";
import { List, ListItem, Typography, Box } from "@mui/material";
import theme from "../../theme";

const CurrentPlaylist = () => {
  // Mock data for the list
  const mockData = Array.from({ length: 5 }, (_, index) => `Item ${index + 1}`);

  return (
    <Box>
      {/* Title */}
      <Box
        sx={{
          backgroundColor: theme.palette.secondary.main,
          color: "white",
          padding: 1,
        }}
      >
        <Typography variant="h6">Current Playlist</Typography>
      </Box>

      {/* List */}
      <List sx={{ borderLeft: "4px solid #ccc" }}>
        {mockData.map((item, index) => (
          <ListItem key={index}>
            <Typography variant="body1">{item}</Typography>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default CurrentPlaylist;
