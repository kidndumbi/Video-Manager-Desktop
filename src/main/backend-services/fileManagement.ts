import * as path from "path";
import { VideoDataModel } from "../../models/videoData.model";
import { VideoJsonModel } from "../../models/videoJSON.model";
import { FileManager } from "../../util/FileManager";
import { writeFile } from "fs/promises";

const fm = new FileManager();

export const getNewFilePath = (video: VideoDataModel): string => {
  if (!video.rootPath) {
    throw new Error("video.rootPath is undefined!");
  }
  const fileNameWithoutExtension = path.parse(video.fileName).name;
  return path.join(video.rootPath, `${fileNameWithoutExtension}.json`);
};

export const readJsonFile = async (
  filePath: string
): Promise<VideoJsonModel | null> => {
  const jsonFile = await fm.readFile(filePath);
  return jsonFile ? (JSON.parse(jsonFile) as VideoJsonModel) : null;
};

export const updateJsonContent = (
  jsonContent: VideoJsonModel,
  lastWatched: number
): VideoJsonModel => {
  jsonContent.lastWatched = lastWatched;
  jsonContent.watched = lastWatched !== 0;
  return jsonContent;
};

export const writeJsonToFile = async (
  filePath: string,
  jsonData: VideoJsonModel
): Promise<VideoJsonModel> => {
  await writeFile(filePath, JSON.stringify(jsonData));
  return jsonData;
};

export const fileExists = async (filePath: string): Promise<boolean> => {
  return await fm.exists(filePath);
};
