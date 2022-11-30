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

export { secondsTohhmmss };
