import React from "react";

type VideoListProps = {
  videoData: any[];
}; /* use `interface` if exporting so that consumers can extend */

// Easiest way to declare a Function Component; return type is inferred.
const VideoList = ({ videoData }: VideoListProps) => {
  return (
    <>
      {videoData && videoData.length > 0 ? (
        <div>
          {videoData.map((video: any) => {
            return (
              <div
                style={{ color: video.isDirectory === true ? "red" : "" }}
                key={video.path}
              >
                {video.path}
              </div>
            );
          })}
        </div>
      ) : null}
    </>
  );
};

export { VideoList };
