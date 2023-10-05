import React, { useEffect } from "react";
import {
  List,
  ListItem,
  Typography,
  Box,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import theme from "../../theme";
import { usePlaylistLogic } from "../../../hooks/usePlaylistLogic";
import { extractFileName } from "../../../util/helperFunctions";
import { PlaylistVideoModel } from "../../../models/playlist.model";

const CurrentPlaylist = () => {
  const { currentPlaylist } = usePlaylistLogic();

  useEffect(() => {
    console.log("currentPlaylist ", currentPlaylist);
  }, [currentPlaylist]);

  const handleItemClick = (video: PlaylistVideoModel) => {
    console.log("You clicked on:", video);
    // Perform further actions here
  };

  return (
    <Box>
      {/* Title */}
      <Box
        sx={{
          backgroundColor: theme.palette.secondary.main,
          color: "white",
          padding: 1,
          height: "49px",
        }}
      >
        <Typography variant="h6">{currentPlaylist?.name}</Typography>
      </Box>

      {/* List */}
      <List sx={{ height: "100%" }}>
        {currentPlaylist?.videos?.map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton onClick={() => handleItemClick(item)}>
              <ListItemText primary={extractFileName(item.filePath)} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default CurrentPlaylist;
