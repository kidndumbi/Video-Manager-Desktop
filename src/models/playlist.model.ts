export interface PlaylistModel {
  name: string;
  id: number;
  videos: PlaylistVideoModel[];
}

export interface PlaylistVideoModel {
  filePath: string;
}
