import fs from "fs";

/**
 * @param filePath - The path of the file to delete.
 * @returns A promise that resolves when the file has been deleted.
 */
export const deleteFile = (filePath: string): Promise<any> => {
  return new Promise<void>((resolve, reject) => {
    // check if file path provided
    if (!filePath) {
      console.log("No file path provided");

      return reject(new Error("No file path provided"));
    }

    // check if file exists
    if (!fs.existsSync(filePath)) {
      console.log(`File not found at ${filePath}`);

      return reject(new Error(`File not found at ${filePath}`));
    }

    // delete file
    fs.unlink(filePath, err => {
      if (err) {
        console.log(`Error deleting file at ${filePath}`);
        return reject(err);
      }

      console.log(`File deleted at ${filePath}`);
      resolve();
    });
  });
};

/**
 * Ensures a directory exists, creating it if necessary.
 * @param {string} dirPath - The directory path to check.
 */
export const ensureDirectoryExistence = (dirPath: string) => {
  if (!dirPath) {
    return;
  }

  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`Directory created at ${dirPath}`);
  }
};
