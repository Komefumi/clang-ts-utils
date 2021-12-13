import { promisify } from "util";
import { join as joinPath, dirname as getDirname } from "path";
import { readdir as readDirAsync } from "fs";

const readDir = promisify(readDirAsync);

export function getJustLastDirNameOfPath(pathString: string): string {
  return pathString.split("/").slice(-2, -1)[0];
}

export async function getPathForNeededFilesIfInDir(
  dirToLookInside: string,
  neededFiles: string[]
): Promise<string[]> {
  try {
    const dirContents = await readDir(dirToLookInside);
    return dirContents
      .filter((itxFilename: string) => neededFiles.includes(itxFilename))
      .map((itxFilename: string) => joinPath(dirToLookInside, itxFilename));
  } catch (error) {
    console.error(error);
    throw new Error("Error encountered during operation");
  }
}

export async function findUpwards(
  startDir: string,
  fileSelect: string | string[]
): Promise<string[] | null> {
  try {
    const parentDir = getDirname(startDir);
    if (startDir === parentDir) return null;
    let filePaths: string[] = [];
    if (fileSelect instanceof Array) {
      filePaths = await getPathForNeededFilesIfInDir(startDir, fileSelect);
    } else {
      const dirContents = await readDir(startDir);
      if (dirContents.includes(fileSelect)) {
        filePaths = [joinPath(startDir, fileSelect)];
      }
    }
    if (filePaths.length === 0) {
      return findUpwards(getDirname(startDir), fileSelect);
    } else return filePaths;
  } catch (error) {
    return null;
  }
}
