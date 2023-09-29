import { getNewFilePath } from "./utilities"; // Import the function to be tested
import { VideoDataModel } from "../models/videoData.model";

describe("getNewFilePath", () => {
  it("should generate the correct file path", () => {
    // Mock data for a VideoDataModel
    const videoData: VideoDataModel = {
      fileName: "Intro-to-IFR-Ken.mp4",
      filePath: "D:/Private-pilot/Intro-to-IFR-Ken.mp4",
      isDirectory: false,
      rootPath: "D:/Private-pilot",
      createdAt: Date.now(),
      mustWatch: true,
      notesCount: 2,
      watched: true,
      like: false,
      duration: 120, // in seconds
    };

    const expectedFilePath = "D:\\Private-pilot\\Intro-to-IFR-Ken.json";

    const result = getNewFilePath(videoData);

    expect(result).toEqual(expectedFilePath);
  });

  it("should throw an error when video.rootPath is undefined", () => {
    // Mock data with undefined rootPath
    const videoData: VideoDataModel = {
      fileName: "video.mp4",
      filePath: "/path/to/videos/video.mp4",
      isDirectory: false,
      createdAt: Date.now(),
      mustWatch: true,
      notesCount: 2,
      watched: true,
      like: false,
      duration: 120,
    };

    // Call the function with the mock data and expect it to throw an error
    expect(() => getNewFilePath(videoData)).toThrow(
      "video.rootPath is undefined!"
    );
  });
});
