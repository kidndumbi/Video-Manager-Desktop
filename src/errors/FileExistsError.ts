export class FileExistsError extends Error {
  constructor(message = "File already exists") {
    super(message);
    this.name = "FileExistsError";
  }
}
