// Import all your dependencies at the top
import { FileManager } from "../util/FileManager";
import { stat, writeFile, readdir } from "fs/promises";
import { Stats } from "fs";
import { VideoDataModel } from "../models/videoData.model";
import { VideoJsonModel } from "../models/videoJSON.model";
import { dialog } from "electron";
import { exec } from "child_process";
import * as path from "path";

const fm = new FileManager();

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
    if (!currentVideo || !currentVideo.rootPath || !currentVideo.fileName) {
      console.warn(
        "Warning: Received undefined or invalid currentVideo.rootPath or currentVideo.fileName."
      );
      return EMPTY_JSON_RESPONSE;
      //throw new Error("Invalid input data");
    }

    // Construct the new file path using template literals
    const newFilePath = `${currentVideo.rootPath}/${
      path.parse(currentVideo.fileName).name
    }.json`;

    // Check if the file exists
    if (await fileExists(newFilePath)) {
      const file = await fm.readFile(newFilePath);
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
    const newFilePath = getNewFilePath(currentVideo);
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
    const jsonFilePath = getNewFilePath(currentVideo);

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

      const jsonFilePath = getNewFilePath(video);

      if (await fileExists(jsonFilePath)) {
        filepathsToDelete.push(jsonFilePath);
      }
    }

    await fm.deleteFiles(filepathsToDelete);

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

export const openFileDialog = async (_event: any) => {
  const result = await dialog.showOpenDialog({
    properties: ["openDirectory"],
  });

  if (!result.canceled) {
    return result.filePaths[0];
  }

  return null;
};

export const getNewFilePath = (video: VideoDataModel): string => {
  if (!video.rootPath) {
    throw new Error("video.rootPath is undefined!");
  }
  const fileNameWithoutExtension = path.parse(video.fileName).name;
  return path.join(video.rootPath, `${fileNameWithoutExtension}.json`);
};

const readJsonFile = async (
  filePath: string
): Promise<VideoJsonModel | null> => {
  const jsonFile = await fm.readFile(filePath);
  return jsonFile ? (JSON.parse(jsonFile) as VideoJsonModel) : null;
};

const updateJsonContent = (
  jsonContent: VideoJsonModel,
  lastWatched: number
): VideoJsonModel => {
  jsonContent.lastWatched = lastWatched;
  jsonContent.watched = lastWatched !== 0;
  return jsonContent;
};

const writeJsonToFile = async (
  filePath: string,
  jsonData: VideoJsonModel
): Promise<VideoJsonModel> => {
  await writeFile(filePath, JSON.stringify(jsonData));
  return jsonData;
};

const shouldProcessFile = (file: string, stats: Stats, searchText?: string) => {
  return searchText &&
    !file.toLowerCase().includes(searchText.toLowerCase()) &&
    !stats.isDirectory()
    ? false
    : true;
};

const readJsonData = async (jsonPath: string) => {
  const exists = await fileExists(jsonPath);
  if (exists) {
    const jsonFile = await fm.readFile(jsonPath);
    return JSON.parse(jsonFile || "") as VideoJsonModel;
  }
  return null;
};

const calculateDuration = async (file: string) => {
  let duration = 0;
  if (path.extname(file).toLocaleLowerCase() === ".mp4") {
    const maybeDuration = await getVideoDuration(file);
    if (typeof maybeDuration === "number") {
      duration = maybeDuration;
    }
  }
  return duration;
};

const createVideoDataObject = (
  fileName: string,
  filePath: string,
  isDirectory: boolean,
  createdAt: number,
  rootPath: string,
  duration: number,
  jsonFileContents: VideoJsonModel | null
) => ({
  fileName,
  filePath,
  isDirectory,
  createdAt,
  rootPath,
  duration,
  mustWatch: jsonFileContents?.mustWatch || false,
  notesCount: jsonFileContents?.notes?.length || 0,
  watched: jsonFileContents?.watched || false,
  like: jsonFileContents?.like || false,
});

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

export const fileExists = async (filePath: string): Promise<boolean> => {
  return await fm.exists(filePath);
};

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
