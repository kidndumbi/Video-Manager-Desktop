import Box from "@mui/material/Box";
import React, { Component } from "react";
import {
  ControlBar,
  ForwardControl,
  PlaybackRateMenuButton,
  Player,
  PlayerReference,
} from "video-react";
import { VideoDataModel } from "../../models/videoData.model";
import Replay5Icon from "@mui/icons-material/Replay5";
import IconButton from "@mui/material/IconButton";
import Replay10Icon from "@mui/icons-material/Replay10";
import Replay30Icon from "@mui/icons-material/Replay30";

type AppVideoPlayerProps = {
  videoData: VideoDataModel | undefined;
  onCurrentTime: (time: number) => void;
  setPlayer: (player: PlayerReference) => void;
};

export default class AppVideoPlayer extends Component<AppVideoPlayerProps> {
  player: PlayerReference | any;

  componentDidMount() {
    this.player.playbackRate = 2;
    this.forceUpdate();
    this.props.setPlayer(this.player);

    this.player.subscribeToStateChange((state: any) => {
      this.props.onCurrentTime(state.currentTime);
    });
  }

  skip(seconds: number) {
    const { player } = this.player.getState();
    this.player.seek(player.currentTime + seconds);
  }

  render() {
    return (
      <>
        <Box>{this.props.videoData?.fileName}</Box>
        <Player
          ref={(c: PlayerReference) => {
            this.player = c;
          }}
          playsInline
          src={this.props.videoData?.filePath}
        >
          <ControlBar autoHide={false}>
            <PlaybackRateMenuButton rates={[2, 1.75, 1.5, 1.25, 1]} />
            <ForwardControl seconds={5} />
            <ForwardControl seconds={10} />
            <ForwardControl seconds={30} />
          </ControlBar>
        </Player>
        <Box sx={{ backgroundColor: "gray" }}>
          <IconButton
            sx={{ color: "white" }}
            aria-label="replay 5 seconds"
            onClick={() => this.skip(-5)}
          >
            <Replay5Icon />
          </IconButton>
          <IconButton
            sx={{ color: "white" }}
            color="primary"
            aria-label="replay 10 seconds"
            onClick={() => this.skip(-10)}
          >
            <Replay10Icon />
          </IconButton>
          <IconButton
            sx={{ color: "white" }}
            color="primary"
            aria-label="replay 30 seconds"
            onClick={() => this.skip(-30)}
          >
            <Replay30Icon />
          </IconButton>
        </Box>
      </>
    );
  }
}
