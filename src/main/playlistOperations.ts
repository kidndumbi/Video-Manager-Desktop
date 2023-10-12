import { PlaylistModel, PlaylistVideoModel } from "../models/playlist.model";
import { calculateDuration, readJsonData } from "./backend-services/helpers";
import { db } from "./lowdb-config";
import { v4 as uuidv4 } from "uuid";

export async function addPlaylist(playlist: PlaylistModel): Promise<void> {
  try {
    db.data.playlists.push({ ...playlist });
    await db.write();
  } catch (error) {
    console.error("Error adding playlist:", error);
    throw error; // Re-throw the error to be caught in the calling function
  }
}

export async function findPlaylist(
  id: string
): Promise<PlaylistModel | undefined> {
  try {
    return db.data.playlists.find((p: PlaylistModel) => p.id === id);
  } catch (error) {
    console.error("Error finding playlist by ID:", error);
    throw error; // Re-throw the error to be caught in the calling function
  }
}

export async function getAllPlaylists() {
  try {
    const playlists: PlaylistModel[] = db.data.playlists; // Replace this with your actual database call

    // Create an array of promises to populate the duration and lastWatched properties
    const populatePromises = playlists.map(async (playlist) => {
      const videoPromises = playlist.videos.map(async (video) => {
        // Call your function to calculate the duration
        const duration = await calculateDuration(video.filePath);
        video.duration = duration;

        // Call your function to read the JSON data
        const videoJsonData = await readJsonData(
          video.filePath.replace(".mp4", ".json")
        );
        if (videoJsonData && videoJsonData.lastWatched) {
          video.lastWatched = videoJsonData.lastWatched;
        }
      });

      // Wait for all videos in the current playlist to be processed
      await Promise.all(videoPromises);
    });

    // Wait for all playlists to be populated
    await Promise.all(populatePromises);

    return playlists;
  } catch (error) {
    console.error("Error getting all playlists:", error);
    throw error;
  }
}

export async function addOrRemoveVideoFromPlaylist(
  playlistId: string,
  newVideo: PlaylistVideoModel
): Promise<PlaylistModel[]> {
  try {
    // Find the index of the playlist with the given ID
    const playlistIndex = db.data.playlists.findIndex(
      (p: PlaylistModel) => p.id === playlistId
    );

    if (playlistIndex === -1) {
      throw new Error(`Playlist with ID ${playlistId} not found`);
    }

    // Check if video string 'newVideo' is already in the playlist of playlistIndex
    const videoIndex = db.data.playlists[playlistIndex].videos.findIndex(
      (v: PlaylistVideoModel) => v.filePath === newVideo.filePath
    );

    if (videoIndex !== -1) {
      // Video is already in the playlist, remove it
      db.data.playlists[playlistIndex].videos.splice(videoIndex, 1);
    } else {
      // Video is not in the playlist, add it
      db.data.playlists[playlistIndex].videos.push(newVideo);
    }

    // Write the updated data back to the database
    await db.write();

    // Return the updated playlists
    return db.data.playlists;
  } catch (error) {
    console.error(
      `Error adding or removing video from playlist with ID ${playlistId}:`,
      error
    );
    throw error; // Re-throw the error to be caught in the calling function
  }
}

export async function deletePlaylist(id: string): Promise<PlaylistModel[]> {
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

export async function deletePlaylistVideo(
  playlistId: string,
  videoFilePath: string
): Promise<PlaylistModel | undefined> {
  try {
    // Find the index of the playlist with the given ID
    const playlistIndex = db.data.playlists.findIndex(
      (p: PlaylistModel) => p.id === playlistId
    );

    if (playlistIndex === -1) {
      throw new Error(`Playlist with ID ${playlistId} not found`);
    }

    // Find the index of the video with the given file path
    const videoIndex = db.data.playlists[playlistIndex].videos.findIndex(
      (v: PlaylistVideoModel) => v.filePath === videoFilePath
    );

    if (videoIndex === -1) {
      throw new Error(`Video with file path ${videoFilePath} not found`);
    }

    // Remove the video from the playlist's videos array
    db.data.playlists[playlistIndex].videos.splice(videoIndex, 1);

    // Write the updated data back to the database
    await db.write();

    return db.data.playlists;
  } catch (error) {
    console.error(`Error deleting video from playlist:`, error);
    throw error; // Re-throw the error to be caught in the calling function
  }
}

export async function updatePlaylistName(
  playlistId: string,
  newName: string
): Promise<PlaylistModel[]> {
  try {
    // Find the index of the playlist with the given ID
    const playlistIndex = db.data.playlists.findIndex(
      (p: PlaylistModel) => p.id === playlistId
    );

    if (playlistIndex === -1) {
      throw new Error(`Playlist with ID ${playlistId} not found`);
    }

    // Update the name of the playlist
    db.data.playlists[playlistIndex].name = newName;

    // Write the updated data back to the database
    await db.write();

    // Return the updated list of playlists
    return db.data.playlists;
  } catch (error) {
    console.error(`Error updating playlist name:`, error);
    throw error; // Re-throw the error to be caught in the calling function
  }
}

export async function addNewPlaylist(name: string): Promise<PlaylistModel[]> {
  try {
    const newPlaylist: PlaylistModel = {
      id: uuidv4(), // Generate a unique ID
      name,
      videos: [], // Empty array
    };

    // Add the new playlist
    db.data.playlists.push(newPlaylist);

    // Write the updated data back to the database
    await db.write();

    // Return the updated list of playlists
    return db.data.playlists;
  } catch (error) {
    console.error("Error adding new playlist:", error);
    throw error; // Re-throw the error to be caught in the calling function
  }
}
