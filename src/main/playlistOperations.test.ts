import { db } from "./lowdb-config"; // Replace with the actual path to your lowdb config file
import { PlaylistModel, PlaylistVideoModel } from "../models/playlist.model"; // Replace with the actual path to your Playlist model
import { deletePlaylist, deletePlaylistVideo } from "./playlistOperations"; // Import the deletePlaylistVideo function

// Mock the database
jest.mock("./lowdb-config", () => ({
  db: {
    data: {
      playlists: [],
    },
    write: jest.fn(),
  },
}));

describe("Playlist Operations", () => {
  afterEach(() => {
    // Clear the database after each test
    db.data.playlists = [];
  });

  describe("deletePlaylist", () => {
    it("should delete a playlist by its ID", async () => {
      // Arrange
      const video: PlaylistVideoModel = { filePath: "path/to/video.mp4" };
      const playlist: PlaylistModel = {
        id: 1,
        name: "Test Playlist",
        videos: [video],
      };
      db.data.playlists.push(playlist);

      // Act
      await deletePlaylist(1);

      // Assert
      expect(db.data.playlists).toHaveLength(0);
      expect(db.write).toHaveBeenCalled();
    });

    it("should throw an error if the playlist is not found", async () => {
      // Act and Assert
      await expect(deletePlaylist(1)).rejects.toThrow(
        "Playlist with ID 1 not found"
      );
    });
  });

  describe("deletePlaylistVideo", () => {
    it("should delete a video by filePath in a playlist identified by id", async () => {
      // Arrange
      const video1: PlaylistVideoModel = { filePath: "path/to/video1.mp4" };
      const video2: PlaylistVideoModel = { filePath: "path/to/video2.mp4" };
      const playlist: PlaylistModel = {
        id: 1,
        name: "Test Playlist",
        videos: [video1, video2],
      };
      db.data.playlists.push(playlist);

      // Act
      const updatedPlaylist = await deletePlaylistVideo(
        1,
        "path/to/video1.mp4"
      );

      // Assert
      expect(updatedPlaylist).toEqual({
        id: 1,
        name: "Test Playlist",
        videos: [video2],
      });
      expect(db.write).toHaveBeenCalled();
    });

    // it("should throw an error if the playlist is not found", async () => {
    //   // Act and Assert
    //   await expect(
    //     deletePlaylistVideo(1, "path/to/video1.mp4")
    //   ).rejects.toThrow("Playlist with ID 1 not found");
    // });

    it("should throw an error if the video is not found in the playlist", async () => {
      // Arrange
      const video: PlaylistVideoModel = { filePath: "path/to/video1.mp4" };
      const playlist: PlaylistModel = {
        id: 1,
        name: "Test Playlist",
        videos: [video],
      };
      db.data.playlists.push(playlist);

      // Act and Assert
      await expect(
        deletePlaylistVideo(1, "path/to/nonexistent.mp4")
      ).rejects.toThrow(
        "Video with file path path/to/nonexistent.mp4 not found"
      );
    });
  });
});
