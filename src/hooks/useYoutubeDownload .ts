import { useState } from "react";
import { ipcRenderer } from "electron";

type UseYoutubeDownloadResult = {
  isVideoDownloading: boolean;
  videoDownloadError: Error | null;
  downloadVideo: (url: string, filePath: string) => void;
};

const useYoutubeDownload = (): UseYoutubeDownloadResult => {
  const [isVideoDownloading, setIsVideoDownloading] = useState<boolean>(false);
  const [videoDownloadError, setVideoDownloadError] = useState<Error | null>(
    null
  );

  const downloadVideo = (url: string, filePath: string) => {
    setIsVideoDownloading(true);

    ipcRenderer
      .invoke("youtube:videoDownload", url, filePath)
      .then(() => {
        setIsVideoDownloading(false);
      })
      .catch((err: Error) => {
        setVideoDownloadError(err);
        setIsVideoDownloading(false);
      });
  };

  return { isVideoDownloading, videoDownloadError, downloadVideo };
};

export { useYoutubeDownload };
