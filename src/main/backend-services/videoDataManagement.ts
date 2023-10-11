import { VideoDataModel } from "../../models/videoData.model";
import { stat, readdir } from "fs/promises";
import * as path from "path";
import { VideoJsonModel } from "../../models/videoJSON.model";
import {
  deleteFiles,
  fileExists,
  getJsonFilePath,
  readFileData,
  readJsonFile,
  updateJsonContent,
  writeJsonToFile,
} from "./fileManagement";
import { Stats } from "fs";
import {
  calculateDuration,
  createVideoDataObject,
  readJsonData,
  shouldProcessFile,
} from "./helpers";

export const getRootVideoData = async (
  event: any,
  filePath: string,
  searchText: string
) => {
  // Your code
  const videoData: VideoDataModel[] = [];

  try {
    const files = await readdir(filePath);
    const fileProcessingPromises = files.map(async (file) => {
      const fullPath = `${filePath}/${file}`;
      const stats = await stat(fullPath);

      if (!shouldProcessFile(file, stats, searchText)) {
        return;
      }

      if (
        path.extname(file).toLocaleLowerCase() === ".mp4" ||
        stats.isDirectory()
      ) {
        const data = await populateVideoData(file, filePath, stats);
        videoData.push(data);
      }
    });

    await Promise.all(fileProcessingPromises);

    return videoData.sort((a, b) => {
      // Sort by directory first
      const directoryDifference = Number(b.isDirectory) - Number(a.isDirectory);

      // If both are either directories or files, sort by createdAt
      if (directoryDifference === 0) {
        return b.createdAt - a.createdAt;
      }

      return directoryDifference;
    });
  } catch (error) {
    throw new Error("An error occurred while fetching root video data.");
  }
};

export const getVideoJsonData = async (
  event: any,
  currentVideo: VideoDataModel
) => {
  try {
    // Constant for reusable value
    const EMPTY_JSON_RESPONSE: VideoJsonModel = { notes: [], overview: {} };
    //Validate the input data
    if (!currentVideo || !currentVideo.filePath) {
      console.warn(
        "Warning: Received undefined or invalid currentVideo.filepath."
      );
      return EMPTY_JSON_RESPONSE;
      //throw new Error("Invalid input data");
    }

    // Construct the new file path using template literals
    const newFilePath = currentVideo.filePath.replace(".mp4", ".json");

    // Check if the file exists
    if (await fileExists(newFilePath)) {
      const file = await readFileData(newFilePath);
      return file ? JSON.parse(file) : EMPTY_JSON_RESPONSE;
    } else {
      return EMPTY_JSON_RESPONSE;
    }
  } catch (error) {
    // Handle the error appropriately
    console.error("An error occurred:", error);
    return null;
  }
};

export const saveVideoJsonData = async (
  event: any,
  {
    currentVideo,
    newVideoJsonData,
  }: { currentVideo: VideoDataModel; newVideoJsonData: VideoJsonModel }
) => {
  try {
    const newFilePath = getJsonFilePath(currentVideo.filePath);
    return await writeJsonToFile(newFilePath, newVideoJsonData);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("An error occurred:", error.message);
    } else {
      console.error("An unknown error occurred:", error);
    }
    throw new Error("Failed to save video JSON data");
  }
};

export const saveLastWatch = async (
  event: any,
  {
    currentVideo,
    lastWatched,
  }: { currentVideo: VideoDataModel; lastWatched: number }
) => {
  try {
    const jsonFilePath = getJsonFilePath(currentVideo.filePath);

    if (await fileExists(jsonFilePath)) {
      let jsonFileContents = await readJsonFile(jsonFilePath);

      if (jsonFileContents) {
        jsonFileContents = updateJsonContent(jsonFileContents, lastWatched);
        await writeJsonToFile(jsonFilePath, jsonFileContents);
      }

      return jsonFileContents;
    } else {
      const newJsonContent: VideoJsonModel = {
        notes: [],
        overview: {},
        lastWatched,
        watched: lastWatched !== 0,
      };
      await writeJsonToFile(jsonFilePath, newJsonContent);
      return newJsonContent;
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log("save:lastWatch error ", error.message);
    } else {
      console.log("An unknown error occurred:", error);
    }
    console.log("currentVideo ::: ", currentVideo);
  }
};

export const deleteVideo = async (event: any, videoData: VideoDataModel[]) => {
  try {
    const filepathsToDelete: string[] = [];

    for (const video of videoData) {
      filepathsToDelete.push(video.filePath);

      const jsonFilePath = getJsonFilePath(video.filePath);

      if (await fileExists(jsonFilePath)) {
        filepathsToDelete.push(jsonFilePath);
      }
    }

    await deleteFiles(filepathsToDelete);

    return "deletion complete";
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("delete:video error:", error.message);
    } else {
      console.error("An unknown error occurred:", error);
    }
    return "deletion failed";
  }
};

export const getVideoData = async (filePath: string) => {
  try {
    const stats = await stat(filePath);
    const jsonFileContents = await readJsonData(
      filePath.replace(".mp4", ".json")
    );
    const duration = await calculateDuration(filePath);
    return createVideoDataObject(
      path.basename(filePath),
      filePath,
      stats.isDirectory(),
      stats.birthtimeMs,
      filePath,
      duration,
      jsonFileContents
    );
  } catch (error: any) {
    if (error.code === "ENOENT") {
      return null;
    }
    throw error;
  }
};

export const populateVideoData = async (
  file: string,
  filePath: string,
  stats: Stats
) => {
  const fullFilePath = `${filePath}/${file}`;
  const jsonFileContents = await readJsonData(
    `${filePath}/${path.parse(file).name}.json`
  );
  const duration = await calculateDuration(fullFilePath);
  return createVideoDataObject(
    file,
    fullFilePath,
    stats.isDirectory(),
    stats.birthtimeMs,
    filePath,
    duration,
    jsonFileContents
  );
};
