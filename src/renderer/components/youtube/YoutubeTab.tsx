import React from "react";
import YoutubeDetails from "./YoutubeDetails";
import { useYoutubeDetails } from "../../../hooks/useYoutubeDetails";

type YoutubeTabProps = {
  youtubeId: string;
};

const YoutubeTab = ({ youtubeId }: YoutubeTabProps) => {
  const { videoDetails } = useYoutubeDetails(
    `https://www.youtube.com/watch?v=${youtubeId}`
  );

  return (
    <div>
      <YoutubeDetails videoDetails={videoDetails}></YoutubeDetails>
    </div>
  );
};

export { YoutubeTab };
