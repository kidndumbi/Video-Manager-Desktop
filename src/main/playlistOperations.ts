import { PlaylistModel } from "../models/playlist.model";
import { VideoDataModel } from "../models/videoData.model";
import { db } from "./lowdb-config";

export async function addPlaylistDb(playlist: PlaylistModel): Promise<void> {
  try {
    db.data.playlists.push({ ...playlist });
    await db.write();
  } catch (error) {
    console.error("Error adding playlist:", error);
    throw error; // Re-throw the error to be caught in the calling function
  }
}

export async function findPlaylistByIdDb(
  id: number
): Promise<PlaylistModel | undefined> {
  try {
    return db.data.playlists.find((p: PlaylistModel) => p.id === id);
  } catch (error) {
    console.error("Error finding playlist by ID:", error);
    throw error; // Re-throw the error to be caught in the calling function
  }
}

export async function getAllPlaylistsDb(): Promise<PlaylistModel[]> {
  try {
    return db.data.playlists;
  } catch (error) {
    console.error("Error getting all playlists:", error);
    throw error; // Re-throw the error to be caught in the calling function
  }
}

export async function addVideoToPlaylistByIdDb(
  playlistId: number,
  newVideo: VideoDataModel
): Promise<void> {
  try {
    // Find the index of the playlist with the given ID
    const playlistIndex = db.data.playlists.findIndex(
      (p: PlaylistModel) => p.id === playlistId
    );

    if (playlistIndex === -1) {
      throw new Error(`Playlist with ID ${playlistId} not found`);
    }

    // Add the new video to the playlist's videos array
    db.data.playlists[playlistIndex].videos.push(newVideo);

    // Write the updated data back to the database
    await db.write();
  } catch (error) {
    console.error(
      `Error adding video to playlist with ID ${playlistId}:`,
      error
    );
    throw error; // Re-throw the error to be caught in the calling function
  }
}

export async function deletePlaylistById(id: number): Promise<PlaylistModel[]> {
  try {
    // Find the index of the playlist with the given ID
    const playlistIndex = db.data.playlists.findIndex(
      (p: PlaylistModel) => p.id === id
    );

    if (playlistIndex === -1) {
      throw new Error(`Playlist with ID ${id} not found`);
    }

    // Remove the playlist from the array
    db.data.playlists.splice(playlistIndex, 1);

    // Write the updated data back to the database
    await db.write();

    // Return the updated list of playlists
    return db.data.playlists;
  } catch (error) {
    console.error(`Error deleting playlist with ID ${id}:`, error);
    throw error; // Re-throw the error to be caught in the calling function
  }
}
