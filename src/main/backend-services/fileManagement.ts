import { VideoJsonModel } from "../../models/videoJSON.model";
import { readFile } from "fs/promises";
import { writeFile, access, unlink } from "fs/promises";

export const getJsonFilePath = (filePath: string): string => {
  if (!filePath) {
    throw new Error("filePath is undefined!");
  }
  return filePath.replace(".mp4", ".json");
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
