export interface VideoDataModel {
  fileName: string;
  filePath: string;
  isDirectory: boolean;
  notes?: { id: string; videoTimeStamp: number }[];
}
