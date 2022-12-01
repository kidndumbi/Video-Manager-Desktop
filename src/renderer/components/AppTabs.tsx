import React from "react";
import { v4 as uuidv4 } from "uuid";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { NoteList } from "./noteList/NoteList";
import { VideoDataModel } from "../../models/videoData.model";
import { VideoJsonModel } from "../../models/videoJSON.model";
import { NoteModel } from "../../models/note.model";
import { RootState, useAppDispatch } from "../../store";
import { videoJsonActions } from "../../store/videoJson.slice";
import { useSelector } from "react-redux";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function AppTabs({
  currentVideoTime,
  currentVideo,
  onVideoSeek,
}: {
  currentVideoTime: number;
  currentVideo: VideoDataModel | undefined;
  onVideoSeek: (seekTime: number) => void;
}) {
  const dispatch = useAppDispatch();
  const [value, setValue] = React.useState(1);

  const videoJsonData = useSelector(
    (state: RootState) => state.videoJson.videoJson
  );

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  React.useEffect(() => {
    if (currentVideo) {
      dispatch(videoJsonActions.getVideoJson(currentVideo));
    }
  }, [currentVideo]);

  const onCreateNote = (content: string, videoTimeStamp: number) => {
    const newNote: NoteModel = {
      id: uuidv4(),
      content,
      videoTimeStamp,
    };

    const newVideoJsonData: VideoJsonModel = {
      ...videoJsonData,
      notes: [...videoJsonData.notes, newNote],
    };

    dispatch(
      videoJsonActions.postVideoJason({
        currentVideo,
        newVideoJsonData,
      })
    );
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Overview" {...a11yProps(0)} />
          <Tab label="Notes" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        Overview
      </TabPanel>
      <TabPanel value={value} index={1}>
        <NoteList
          onVideoSeek={onVideoSeek}
          onCreateNote={onCreateNote}
          currentVideoTime={currentVideoTime}
          notesData={videoJsonData?.notes}
        ></NoteList>
      </TabPanel>
    </Box>
  );
}

export { AppTabs };
