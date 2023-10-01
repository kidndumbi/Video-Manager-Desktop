import { VideoDataModel } from "./videoData.model";

export interface PlaylistModel {
  id: number;
  videos: VideoDataModel[];
}
