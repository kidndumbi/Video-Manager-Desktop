import React, { Component } from "react";
import {
  ControlBar,
  ForwardControl,
  PlaybackRateMenuButton,
  Player,
  PlayerReference,
} from "video-react";
import { VideoDataModel } from "../../models/videoData.model";

type AppVideoPlayerProps = {
  videoData: VideoDataModel | undefined;
  onCurrentTime: (time: number) => void;
  setPlayer: (player: PlayerReference) => void;
};

export default class AppVideoPlayer extends Component<AppVideoPlayerProps> {
  player: any;

  componentDidMount() {
    this.player.playbackRate = 2;
    this.forceUpdate();
    this.props.setPlayer(this.player);

    setInterval(() => {
      const { player } = this.player.getState();
      this.props.onCurrentTime(player.currentTime);
    }, 1000);
  }

  render() {
    return (
      <>
        <div>{this.props.videoData?.fileName}</div>
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
      </>
    );
  }
}
