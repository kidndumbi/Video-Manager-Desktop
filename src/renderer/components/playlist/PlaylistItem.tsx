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
import PlaylistVideo from "./PlaylistVideo";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PlaylistPlayIcon from "@mui/icons-material/PlaylistPlay";
import { usePlaylistLogic } from "../../../hooks/usePlaylistLogic";

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
};

const PlaylistItem = ({ playlist, expanded, onChange }: PlaylistItemProps) => {
  const { deletePlaylistById } = usePlaylistLogic();

  const handleDeletePlaylist = () => {
    // Your logic for deleting a playlist goes here
    console.log(`Deleting playlist ${playlist.id}`);
    deletePlaylistById(playlist.id);
  };

  // Handler for renaming a playlist
  const handleRenamePlaylist = () => {
    // Your logic for renaming a playlist goes here
    console.log(`Renaming playlist ${playlist.name}`);
  };

  // Handler for playing a playlist
  const handlePlayPlaylist = () => {
    // Your logic for playing a playlist goes here
    console.log(`Playing playlist ${playlist.name}`);
  };

  // Handler for deleting a video from a playlist
  const onDelete = (video: PlaylistVideoModel) => {
    console.log("onDelete ", video);
  };

  // Handler for playing a video from a playlist
  const onPlay = (video: PlaylistVideoModel) => {
    console.log("onPlay ", video);
  };

  return (
    <Accordion expanded={expanded} onChange={onChange}>
      <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
        <Typography>{playlist.name}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box>
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
                onClick={handleRenamePlaylist}
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
        </Box>
        <Divider></Divider>
        <List dense={false}>
          {playlist.videos.map((video: PlaylistVideoModel) => (
            <PlaylistVideo
              key={video.filePath}
              video={video}
              onDelete={onDelete}
              onPlay={onPlay}
            />
          ))}
        </List>
      </AccordionDetails>
    </Accordion>
  );
};

export default PlaylistItem;
