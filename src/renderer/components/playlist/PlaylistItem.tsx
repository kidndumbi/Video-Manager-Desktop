import * as React from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import {
  PlaylistModel,
  PlaylistVideoModel,
} from "../../../models/playlist.model";
import { Box, Divider, IconButton, List, Stack, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PlaylistPlayIcon from "@mui/icons-material/PlaylistPlay";
import { usePlaylistLogic } from "../../../hooks/usePlaylistLogic";
import ConfirmationDialog from "../noteList/note/ConfirmationDialog";
import { useConfirmationDialog } from "../../../hooks/useConfirmationDialog";
import { RetrieveTextfieldValue } from "../tools-components/RetrieveTextfieldValue";
import { useState } from "react";
import PlaylistVideoItem from "./PlaylistVideoItem";

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

type PlaylistItemProps = {
  playlist: PlaylistModel;
  expanded: boolean;
  onChange: () => void;
  playPlaylistTriggered: () => void;
};

const PlaylistItem = ({
  playlist,
  expanded,
  onChange,
  playPlaylistTriggered,
}: PlaylistItemProps) => {
  const {
    deletePlaylist,
    deletePlaylistVideo,
    updatePlaylistName,
    setCurrentPlaylist,
    setStartVideo,
  } = usePlaylistLogic();
  const { isOpen, openDialog, closeDialog, message, setMessage } =
    useConfirmationDialog();
  const [playlistNameEditMode, setPlaylistNameEditMode] = useState(false);

  const handleDeletePlaylist = () => {
    setMessage("Are you sure you want to delete playlist?");
    openDialog().then((dialogDecision: string) => {
      if (dialogDecision === "Ok") {
        deletePlaylist(playlist.id);
      } else {
        console.log("Cancelled");
      }
    });
  };

  // Handler for playing a playlist
  const handlePlayPlaylist = () => {
    // Your logic for playing a playlist goes here
    console.log(`Playing playlist ${playlist.name}`);
    setCurrentPlaylist(playlist);
    playPlaylistTriggered();
  };

  // Handler for deleting a video from a playlist
  const onDelete = (video: PlaylistVideoModel) => {
    setMessage("Are you sure you want to delete video from playlist?");
    openDialog().then((dialogDecision: string) => {
      if (dialogDecision === "Ok") {
        deletePlaylistVideo(playlist.id, video.filePath);
      } else {
        console.log("Cancelled");
      }
    });
  };

  // Handler for playing a video from a playlist
  const onPlay = (video: PlaylistVideoModel) => {
    console.log("onPlay ", video);
    setStartVideo(video.filePath);
    setCurrentPlaylist(playlist);
    playPlaylistTriggered();
  };

  const handleRenamePlaylist = (newPlaylistName: string) => {
    // Your save logic here
    setPlaylistNameEditMode(false);
    updatePlaylistName(playlist.id, newPlaylistName);
    console.log("newPlaylistName", newPlaylistName);
  };

  return (
    <>
      <Accordion expanded={expanded} onChange={onChange}>
        <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
          <Typography>{playlist.name}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box>
            {playlistNameEditMode ? (
              <Box sx={{ marginBottom: "5px" }}>
                <RetrieveTextfieldValue
                  label="playlist name"
                  value={playlist.name}
                  onCancel={() => {
                    setPlaylistNameEditMode(false);
                  }}
                  onSave={handleRenamePlaylist}
                ></RetrieveTextfieldValue>
              </Box>
            ) : (
              <Stack direction="row">
                <Tooltip title="delete playlist" placement="bottom-start">
                  <IconButton
                    aria-label="delete-playlist"
                    color="secondary"
                    size="small"
                    onClick={handleDeletePlaylist}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="rename-playlist" placement="bottom-start">
                  <IconButton
                    aria-label="rename-playlist"
                    color="secondary"
                    size="small"
                    onClick={() => setPlaylistNameEditMode(true)} // You can set it to true when clicking on the rename button
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="play playlist" placement="bottom-start">
                  <IconButton
                    aria-label="play-playlist"
                    color="secondary"
                    size="small"
                    onClick={handlePlayPlaylist}
                  >
                    <PlaylistPlayIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Stack>
            )}
          </Box>

          <Divider></Divider>
          <List dense={false}>
            {playlist.videos.map((video: PlaylistVideoModel) => (
              <PlaylistVideoItem
                key={video.filePath}
                video={video}
                onDelete={onDelete}
                onPlay={onPlay}
              />
            ))}
          </List>
        </AccordionDetails>
      </Accordion>
      <ConfirmationDialog
        open={isOpen}
        message={message}
        handleClose={closeDialog}
      />
    </>
  );
};

export { PlaylistItem };
