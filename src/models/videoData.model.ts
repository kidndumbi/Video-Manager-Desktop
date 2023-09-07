export interface VideoDataModel {
  fileName: string;
  filePath: string;
  isDirectory: boolean;
  rootPath?: string;
  createdAt: number;
  mustWatch?: boolean;
  notesCount: number;
  watched: boolean;
}
