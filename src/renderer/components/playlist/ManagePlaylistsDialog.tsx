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
import { PlaylistItem } from "./PlaylistItem";
import { PlaylistModel } from "../../../models/playlist.model";
import { RetrieveTextfieldValue } from "../tools-components/RetrieveTextfieldValue";

type ManagePlaylistsDialogProps = {
  showDialog: boolean;
  handleClose: () => void;
  playPlaylistTriggered: () => void;
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
  playPlaylistTriggered,
}: ManagePlaylistsDialogProps) => {
  const { playlists, addNewPlaylist } = usePlaylistLogic();
  const [expanded, setExpanded] = useState<number | null>(null);

  const [playlistAddMode, setPlaylistAddMode] = useState(false);

  useEffect(() => {
    console.log("playlists", playlists);
  }, [playlists]);

  const handleChange = (newExpanded: number) => {
    setExpanded(expanded === newExpanded ? null : newExpanded);
  };

  const handleCreatePlaylist = (newPlaylistname: string) => {
    setPlaylistAddMode(true);
    console.log("Creating a new playlist...");
    addNewPlaylist(newPlaylistname);
  };

  return (
    <div>
      <BootstrapDialog
        maxWidth="md" // 'sm', 'md', 'lg', 'xl'
        fullWidth={true}
        onClose={() => {
          setPlaylistAddMode(false);
          handleClose();
        }}
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
              {playlistAddMode ? (
                <Box sx={{ marginBottom: "5px" }}>
                  <RetrieveTextfieldValue
                    label="playlist name"
                    value=""
                    onCancel={() => {
                      setPlaylistAddMode(false);
                    }}
                    onSave={handleCreatePlaylist}
                  ></RetrieveTextfieldValue>
                </Box>
              ) : (
                <Tooltip title="create playlist" placement="bottom-start">
                  <IconButton
                    aria-label="create-playlist"
                    color="secondary"
                    size="small"
                    onClick={() => setPlaylistAddMode(true)}
                  >
                    <PlaylistAddIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              )}
            </Stack>
          </Box>
          {Array.isArray(playlists) &&
            playlists?.map((playlist: PlaylistModel, index) => (
              <PlaylistItem
                playPlaylistTriggered={playPlaylistTriggered}
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
