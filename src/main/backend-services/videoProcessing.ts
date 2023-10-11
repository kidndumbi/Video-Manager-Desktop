import { exec } from "child_process";
import fs, { WriteStream } from "fs";
import ytdl, { videoInfo } from "ytdl-core";

export function getVideoDuration(
  filePath: string
): Promise<number | "unknown"> {
  return new Promise((resolve, reject) => {
    exec(
      `ffprobe -i "${filePath}" -show_entries format=duration -v quiet -of csv="p=0"`,
      (error, stdout, stderr) => {
        if (error) {
          console.error("Exec error:", error);
          console.error("Stderr:", stderr);
          return reject(error);
        }
        resolve(parseFloat(stdout));
      }
    );
  });
}

export async function downloadYouTubeVideo(
  url: string,
  filePath: string
): Promise<void> {
  try {
    // Create a writable stream for the file
    const fileStream: WriteStream = fs.createWriteStream(filePath);

    // Get the video stream from ytdl-core
    const videoStream = ytdl(url, {
      filter: "audioandvideo",
      quality: "highest",
    });

    // Pipe the incoming data into the file
    videoStream.pipe(fileStream);

    return new Promise<void>((resolve, reject) => {
      fileStream.on("finish", () => resolve());
      fileStream.on("error", (error) => reject(error));
      videoStream.on("error", (error) => reject(error));
    });
  } catch (error) {
    console.error(`Failed to download video: ${error}`);
  }
}

export function getYouTubeVideoDetails(
  url: string
): Promise<videoInfo["videoDetails"]> {
  return new Promise<videoInfo["videoDetails"]>((resolve, reject) => {
    const videoID = extractVideoID(url);

    // Check if videoID is null and handle it
    if (videoID === null) {
      const errorMsg = "Could not extract video ID from the provided URL";
      console.error(errorMsg);
      return reject(new Error(errorMsg));
    }

    ytdl
      .getInfo(videoID)
      .then((info) => {
        resolve(info.videoDetails);
      })
      .catch((error) => {
        console.error(`Failed to get video details: ${error}`);
        reject(error);
      });
  });
}

function extractVideoID(url: string): string | null {
  try {
    const urlObj = new URL(url);
    const params = new URLSearchParams(urlObj.search);
    return params.get("v");
  } catch (error) {
    console.error(`Invalid URL: ${error}`);
    return null;
  }
}
