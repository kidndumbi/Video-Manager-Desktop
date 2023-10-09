import _ from "lodash";

const secondsTohhmmss = (valueInseconds: number) => {
  let totalSeconds = Math.round(valueInseconds);
  const hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  // If you want strings with leading zeroes:
  const m = String(minutes).padStart(2, "0");
  const h = String(hours).padStart(2, "0");
  const s = String(seconds).padStart(2, "0");
  return (Number(h) > 0 ? h + ":" : "") + m + ":" + s;
};

function convertMillisecondsToDate(milliseconds: number): string {
  const date = new Date(milliseconds);
  const hours = date.getHours();
  const minutes = "0" + date.getMinutes();
  const seconds = "0" + date.getSeconds();
  const formattedTime =
    hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);
  const formattedDate = date.toDateString();

  return formattedDate + " " + formattedTime;
}

function extractFileName(filePath: string): string {
  return filePath.split("/").pop()?.replace(".mp4", "") ?? "";
}

function shuffleArrayDeep<T>(originalArray: T[]): T[] {
  const array = _.cloneDeep(originalArray);

  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
}

export {
  secondsTohhmmss,
  convertMillisecondsToDate,
  extractFileName,
  shuffleArrayDeep,
};
