import { useState, useEffect } from "react";
import { ipcRenderer } from "electron";
import { videoInfo } from "ytdl-core";
import { IPCChannels } from "../enums/IPCChannels";

type UseYoutubeResult = {
  videoDetails: videoInfo["videoDetails"] | null;
  isVideoDetailsLoading: boolean;
  videoDetailsError: Error | null;
};

const useYoutubeDetails = (url: string): UseYoutubeResult => {
  const [videoDetails, setVideoDetails] = useState<
    videoInfo["videoDetails"] | null
  >(null);
  const [isVideoDetailsLoading, setIsVideoDetailsLoading] =
    useState<boolean>(false);
  const [videoDetailsError, setVideoDetailsError] = useState<Error | null>(
    null
  );

  useEffect(() => {
    setIsVideoDetailsLoading(true);
    ipcRenderer
      .invoke(IPCChannels.YoutubeVideoDetails, url)
      .then((details: videoInfo["videoDetails"]) => {
        setVideoDetails(details);
        setIsVideoDetailsLoading(false);
      })
      .catch((err: Error) => {
        setVideoDetailsError(err);
        setIsVideoDetailsLoading(false);
      });
  }, [url]);

  return { videoDetails, isVideoDetailsLoading, videoDetailsError };
};

export { useYoutubeDetails };
