import * as React from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { PlaylistModel } from "../../../models/playlist.model";
import DeleteIcon from "@mui/icons-material/Delete";
import { List, ListItem, ListItemText, IconButton } from "@mui/material";
import { VideoDataModel } from "../../../models/videoData.model";

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
  return (
    <Accordion expanded={expanded} onChange={onChange}>
      <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
        <Typography>{playlist.name}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <List dense={false}>
          {playlist.videos.map((video: VideoDataModel) => (
            <ListItem
              key={video.filePath}
              secondaryAction={
                <>
                  <IconButton edge="end" aria-label="delete" color="secondary">
                    <DeleteIcon />
                  </IconButton>
                </>
              }
            >
              <ListItemText primary={video.fileName} />
            </ListItem>
          ))}
        </List>
      </AccordionDetails>
    </Accordion>
  );
};

export default PlaylistItem;
