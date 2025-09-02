/**
 * Represents a tree item that can be either:
 * - A string (for files or empty directories)
 * - A tuple with the first element being the folder name and remaining elements being child TreeItems
 */
export type TreeItem = string | [string, ...TreeItem[]];

/**
 * Input type for the convertFilesToTreeItems function
 */
export interface FilesObject {
  [path: string]: string;
}