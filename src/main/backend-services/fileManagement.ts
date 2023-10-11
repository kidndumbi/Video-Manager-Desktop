import * as path from "path";
import { VideoDataModel } from "../../models/videoData.model";
import { VideoJsonModel } from "../../models/videoJSON.model";
import { readFile } from "fs/promises";
import { writeFile, access, unlink } from "fs/promises";
//const fm = new FileManager();
//import { FileManager } from "../../util/FileManager";
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
  const jsonFile = await readFileData(filePath);
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
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
};

export const readFileData = async (
  filePath: string
): Promise<string | undefined> => {
  try {
    const jsonFile = await readFile(filePath);
    return jsonFile?.toString();
  } catch (error) {
    console.log("error::: readFile() ", error);
  }
};

export const deleteFiles = async (filePaths: string[]) => {
  for (const filePath of filePaths) {
    try {
      await unlink(filePath);
      console.log(`Successfully deleted ${filePath}`);
    } catch (err) {
      console.error(`Error deleting ${filePath}: ${err}`);
    }
  }
};
