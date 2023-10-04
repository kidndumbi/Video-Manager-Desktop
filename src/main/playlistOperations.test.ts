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
        id: "slice",
        name: "Test Playlist",
        videos: [video],
      };
      db.data.playlists.push(playlist);

      await deletePlaylist("slice");

      expect(db.data.playlists).toHaveLength(0);
      expect(db.write).toHaveBeenCalled();
    });

    it("should throw an error if the playlist is not found", async () => {
      await expect(deletePlaylist("slice")).rejects.toThrow(
        "Playlist with ID slice not found"
      );
    });
  });

  describe("deletePlaylistVideo", () => {
    it("should delete a video by filePath in a playlist identified by id", async () => {
      const video1: PlaylistVideoModel = { filePath: "path/to/video1.mp4" };
      const video2: PlaylistVideoModel = { filePath: "path/to/video2.mp4" };
      const playlist: PlaylistModel = {
        id: "slice",
        name: "Test Playlist",
        videos: [video1, video2],
      };
      db.data.playlists.push(playlist);

      // Act
      const updatedPlaylist = await deletePlaylistVideo(
        "slice",
        "path/to/video1.mp4"
      );

      // Assert
      expect(updatedPlaylist).toEqual([
        {
          id: "slice",
          name: "Test Playlist",
          videos: [{ filePath: "path/to/video2.mp4" }],
        },
      ]);
      expect(db.write).toHaveBeenCalled();
    });

    it("should throw an error if the video is not found in the playlist", async () => {
      // Arrange
      const video: PlaylistVideoModel = { filePath: "path/to/video1.mp4" };
      const playlist: PlaylistModel = {
        id: "slice",
        name: "Test Playlist",
        videos: [video],
      };
      db.data.playlists.push(playlist);

      // Act and Assert
      await expect(
        deletePlaylistVideo("slice", "path/to/nonexistent.mp4")
      ).rejects.toThrow(
        "Video with file path path/to/nonexistent.mp4 not found"
      );
    });
  });
});
