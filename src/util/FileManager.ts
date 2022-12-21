import { unlink, access, readFile } from "fs/promises";

class FileManager {
  async deleteFiles(filePaths: string[]) {
    for (const filePath of filePaths) {
      try {
        await unlink(filePath);
        console.log(`Successfully deleted ${filePath}`);
      } catch (err) {
        console.error(`Error deleting ${filePath}: ${err}`);
      }
    }
  }

  async exists(path: string) {
    try {
      await access(path);
      return true;
    } catch {
      return false;
    }
  }

  async readFile(filePath: string): Promise<string | undefined> {
    try {
      const jsonFile = await readFile(filePath);
      return jsonFile.toString();
    } catch (error) {
      console.log("error::: readFile() ", error);
    }
  }
}

export { FileManager };
