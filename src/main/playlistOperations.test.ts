//import { deletePlaylistByIdDb } from "./yourDbFile";  // Replace with the actual path to your DB file
import { db } from "./lowdb-config"; // Replace with the actual path to your lowdb config file
import { PlaylistModel, PlaylistVideoModel } from "../models/playlist.model"; // Replace with the actual path to your Playlist model
import { deletePlaylistById } from "./playlistOperations";

// Mock the database
jest.mock("./lowdb-config", () => ({
  db: {
    data: {
      playlists: [],
    },
    write: jest.fn(),
  },
}));

describe("deletePlaylistByIdDb", () => {
  afterEach(() => {
    // Clear the database after each test
    db.data.playlists = [];
  });

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
    await deletePlaylistById(1);

    // Assert
    expect(db.data.playlists).toHaveLength(0);
    expect(db.write).toHaveBeenCalled();
  });

  it("should throw an error if the playlist is not found", async () => {
    // Act and Assert
    await expect(deletePlaylistById(1)).rejects.toThrow(
      "Playlist with ID 1 not found"
    );
  });
});
