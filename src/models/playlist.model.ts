export interface PlaylistModel {
  name: string;
  id: string;
  videos: PlaylistVideoModel[];
}

export interface PlaylistVideoModel {
  filePath: string;
  duration?: number;
  lastWatched?: number;
}
