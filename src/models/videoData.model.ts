export interface VideoDataModel {
  fileName: string;
  filePath: string;
  isDirectory: boolean;
  rootPath?: string;

  // notes?: { id: string; videoTimeStamp: number }[];
}
