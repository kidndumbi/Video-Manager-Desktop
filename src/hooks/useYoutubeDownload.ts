import { useState } from "react";
import { ipcRenderer } from "electron";
import { IPCChannels } from "../enums/IPCChannels";

type UseYoutubeDownloadResult = {
  isVideoDownloading: boolean;
  videoDownloadError: Error | null;
  downloadVideo: (
    url: string,
    filePath: string,
    youtubeId: string,
    onSuccess?: () => void,
    onFailure?: (err: Error) => void
  ) => void;
};

const useYoutubeDownload = (): UseYoutubeDownloadResult => {
  const [isVideoDownloading, setIsVideoDownloading] = useState<boolean>(false);
  const [videoDownloadError, setVideoDownloadError] = useState<Error | null>(
    null
  );

  const downloadVideo = (
    url: string,
    filePath: string,
    youtubeId: string,
    onSuccess?: () => void,
    onFailure?: (err: Error) => void
  ) => {
    setIsVideoDownloading(true);
    setVideoDownloadError(null);

    ipcRenderer
      .invoke(IPCChannels.YoutubeVideoDownload, url, filePath, youtubeId)
      .then(() => {
        setIsVideoDownloading(false);
        if (onSuccess) {
          onSuccess();
        }
      })
      .catch((err: Error) => {
        setVideoDownloadError(err);
        setIsVideoDownloading(false);
        if (onFailure) {
          onFailure(err);
        }
      });
  };

  return { isVideoDownloading, videoDownloadError, downloadVideo };
};

export { useYoutubeDownload };
