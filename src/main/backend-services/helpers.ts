import { Stats } from "fs";
import * as path from "path";
import { fileExists, readFileData } from "./fileManagement";
import { VideoJsonModel } from "../../models/videoJSON.model";
import { getVideoDuration } from "./videoProcessing";

export const shouldProcessFile = (
  file: string,
  stats: Stats,
  searchText?: string
) => {
  return searchText &&
    !file.toLowerCase().includes(searchText.toLowerCase()) &&
    !stats.isDirectory()
    ? false
    : true;
};

export const readJsonData = async (jsonPath: string) => {
  try {
    const exists = await fileExists(jsonPath);
    if (exists) {
      const jsonFile = await readFileData(jsonPath);
      const parsedData = JSON.parse(jsonFile || "");
      return parsedData;
    }
    console.log("File does not exist:", jsonPath);
    return null;
  } catch (error) {
    console.error("Error in readJsonData:", error);
    throw error;
  }
};

export const calculateDuration = async (file: string) => {
  let duration = 0;
  if (path.extname(file).toLocaleLowerCase() === ".mp4") {
    const maybeDuration = await getVideoDuration(file);
    if (typeof maybeDuration === "number") {
      duration = maybeDuration;
    }
  }
  return duration;
};

export const createVideoDataObject = (
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
