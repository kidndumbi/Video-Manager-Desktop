import { VideoDataModel } from "./videoData.model";

export interface PlaylistModel {
  name: string;
  id: number;
  videos: VideoDataModel[];
}
