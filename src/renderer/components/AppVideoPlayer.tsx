import React from "react";
import { Player } from "video-react";
import { VideoDataModel } from "../../models/videoData.model";

type AppVideoPlayerProps = {
  videoData: VideoDataModel | undefined;
};

const AppVideoPlayer = ({ videoData }: AppVideoPlayerProps) => {
  return (
    <>
      <Player playsInline src={videoData?.filePath} />
    </>
  );
};

export { AppVideoPlayer };
