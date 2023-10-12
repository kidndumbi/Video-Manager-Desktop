import React, { Component } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import {
  ControlBar,
  ForwardControl,
  PlaybackRateMenuButton,
  Player,
  PlayerReference,
  PlayerState,
} from "video-react";
import { VideoDataModel } from "../../models/videoData.model";
import Replay5Icon from "@mui/icons-material/Replay5";
import Replay10Icon from "@mui/icons-material/Replay10";
import Replay30Icon from "@mui/icons-material/Replay30";
import { Tooltip } from "@mui/material";
import { AddVideoToPlaylist } from "./playlist/AddVideoToPlaylist";

type AppVideoPlayerProps = {
  videoData: VideoDataModel | undefined;
  onCurrentTime: (time: number) => void;
  setPlayer: (player: PlayerReference) => void;
  videoEnded: () => void;

  onVideoPaused: () => void;
};

export default class AppVideoPlayer extends Component<AppVideoPlayerProps> {
  player: PlayerReference | any;

  componentDidMount() {
    this.initPlayer();
  }

  initPlayer() {
    let prevPausedState = false; // Keep track of the previous paused state

    this.player.playbackRate = 2;
    this.forceUpdate();
    this.props.setPlayer(this.player);

    this.player.subscribeToStateChange((state: PlayerState) => {
      this.props.onCurrentTime(state.currentTime);
      if (state.ended) {
        this.props.videoEnded();
      }

      // Notify when the video is paused, but only if the state actually changed
      if (state.paused !== prevPausedState) {
        prevPausedState = state.paused;
        if (state.paused) {
          console.log("The video is paused.");
          this.props.onVideoPaused();
          // You can trigger any other action or function here
        }
      }
    });
  }

  skip(seconds: number) {
    const { player } = this.player.getState();
    this.player.seek(player.currentTime + seconds);
  }

  renderSkipButton(seconds: number, IconComponent: any, label: string) {
    return (
      <IconButton
        sx={{ color: "white" }}
        aria-label={label}
        onClick={() => this.skip(seconds)}
      >
        <IconComponent />
      </IconButton>
    );
  }

  render() {
    const { videoData } = this.props;

    return (
      <>
        <Tooltip title={videoData?.filePath || ""} placement="bottom-start">
          <Box>{videoData?.fileName?.replace(/\.mp4$/, "")}</Box>
        </Tooltip>
        <Player
          ref={(c: PlayerReference) => {
            this.player = c;
          }}
          playsInline
          src={videoData?.filePath}
        >
          <ControlBar autoHide={false}>
            <PlaybackRateMenuButton rates={[2, 1.75, 1.5, 1.25, 1]} />
            <ForwardControl seconds={5} />
            <ForwardControl seconds={10} />
            <ForwardControl seconds={30} />
          </ControlBar>
        </Player>
        <Box sx={{ backgroundColor: "gray" }}>
          {this.renderSkipButton(-5, Replay5Icon, "replay 5 seconds")}
          {this.renderSkipButton(-10, Replay10Icon, "replay 10 seconds")}
          {this.renderSkipButton(-30, Replay30Icon, "replay 30 seconds")}
          <AddVideoToPlaylist></AddVideoToPlaylist>
        </Box>
      </>
    );
  }
}
