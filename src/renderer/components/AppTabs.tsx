import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { NoteList } from "./noteList/NoteList";
import { VideoDataModel } from "../../models/videoData.model";
import { ipcRenderer } from "electron";
import { VideoJsonModel } from "../../models/videoJSON.model";
import { NoteModel } from "../../models/note.model";

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
  const [value, setValue] = React.useState(1);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const [videoJsonData, setVideoJsonData] = useState<VideoJsonModel>({
    overview: {},
    notes: [],
  });

  React.useEffect(() => {
    if (currentVideo) {
      ipcRenderer.send("get:video-json-data", currentVideo);
    }
    ipcRenderer.on(
      "send:video-json-data",
      (event, videoJson: VideoJsonModel) => {
        setVideoJsonData(videoJson);
      }
    );
  }, [currentVideo]);

  useEffect(() => {
    ipcRenderer.on("confirm:video-json-data-save", (event, confirm) => {
      console.log("data-saved ", confirm);
    });
  }, []);

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

    //save to db
    ipcRenderer.send("save:video-json-data", {
      currentVideo,
      newVideoJsonData,
    });

    setVideoJsonData(newVideoJsonData);
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
