import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { NoteList } from "./noteList/NoteList";
import { useAppDispatch } from "../../store";
import { selVideoJson, videoJsonActions } from "../../store/videoJson.slice";
import { useSelector } from "react-redux";
import { selCurrentVideo } from "../../store/currentVideo.slice";

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

function AppTabs({ currentVideoTime }: { currentVideoTime: number }) {
  const dispatch = useAppDispatch();
  const [value, setValue] = React.useState(1);

  const videoJsonData = useSelector(selVideoJson);

  const currentVideo = useSelector(selCurrentVideo);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  React.useEffect(() => {
    if (currentVideo) {
      dispatch(videoJsonActions.getVideoJson(currentVideo));
    }
  }, [currentVideo]);

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
          currentVideoTime={currentVideoTime}
          notesData={videoJsonData?.notes}
        ></NoteList>
      </TabPanel>
    </Box>
  );
}

export { AppTabs };
