import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";

const __dirname = dirname(fileURLToPath(import.meta.url));
const file = join(__dirname, "db.json");

const adapter = new JSONFile(file);
const defaultData = { playlists: [] };

export const db = new Low(adapter, defaultData);

// Initialize the database
export async function initializeDb() {
  try {
    await db.read();
    if (!db.data) {
      db.data = defaultData;
      await db.write();
    }
  } catch (error) {
    console.error("Error reading or writing to the database:", error);
    throw error; // Re-throw the error to be caught in the main function
  }
}
