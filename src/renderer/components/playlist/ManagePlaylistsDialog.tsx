import React, { useEffect, useState } from "react";
import Draggable from "react-draggable";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Stack,
  Tooltip,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import { usePlaylistLogic } from "../../../hooks/usePlaylistLogic";
import theme from "../../theme";
import PlaylistItem from "./PlaylistItem";
import { PlaylistModel } from "../../../models/playlist.model";

type ManagePlaylistsDialogProps = {
  showDialog: boolean;
  handleClose: () => void;
};

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const DraggablePaper = (props: any) => {
  return (
    <Draggable handle="#customized-dialog-title">
      <Paper {...props} />
    </Draggable>
  );
};

const ManagePlaylistsDialog = ({
  showDialog,
  handleClose,
}: ManagePlaylistsDialogProps) => {
  const { playlists } = usePlaylistLogic();
  const [expanded, setExpanded] = useState<number | null>(null);

  useEffect(() => {
    console.log("playlists", playlists);
  }, [playlists]);

  const handleChange = (newExpanded: number) => {
    setExpanded(expanded === newExpanded ? null : newExpanded);
  };

  const handleCreatePlaylist = () => {
    // Your logic for creating a playlist goes here
    console.log("Creating a new playlist...");
  };

  return (
    <div>
      <BootstrapDialog
        maxWidth="md" // 'sm', 'md', 'lg', 'xl'
        fullWidth={true}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={showDialog}
        PaperComponent={DraggablePaper}
      >
        <DialogTitle
          sx={{ m: 0, p: 2 }}
          id="customized-dialog-title"
          style={{
            backgroundColor: theme.palette.secondary.main,
            color: "white",
            cursor: "move",
          }}
        >
          Playlists
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Box>
            <Stack direction="row">
              <Tooltip title="create playlist" placement="bottom-start">
                <IconButton
                  aria-label="create-playlist"
                  color="secondary"
                  size="small"
                  onClick={handleCreatePlaylist}
                >
                  <PlaylistAddIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Stack>
          </Box>
          {playlists.map((playlist: PlaylistModel, index) => (
            <PlaylistItem
              key={playlist.id}
              playlist={playlist}
              expanded={expanded === index}
              onChange={() => handleChange(index)}
            ></PlaylistItem>
          ))}
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
};

export { ManagePlaylistsDialog };
