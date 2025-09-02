import { TreeItem, FilesObject } from './types';

interface TreeNode {
  [key: string]: TreeNode | null;
}

/**
 * Converts a files object to a hierarchical tree structure
 *
 * @param files - Object where keys are file paths and values are file contents
 * @returns Array of TreeItem representing the hierarchical structure
 *
 * @example
 * ```typescript
 * import { convertFilesToTreeItems } from 'files-to-tree';
 *
 * const files = {
 *   'src/index.ts': 'export * from "./utils"',
 *   'src/utils.ts': 'export function hello() {}',
 *   'package.json': '{"name": "my-package"}',
 *   'README.md': '# My Package'
 * };
 *
 * const tree = convertFilesToTreeItems(files);
 * console.log(tree);
 * // Output: [
 * //   'README.md',
 * //   'package.json',
 * //   ['src', 'index.ts', 'utils.ts']
 * // ]
 * ```
 */
export function convertFilesToTreeItems(files: FilesObject): TreeItem[] {
  const tree: TreeNode = {};

  const sortedPaths = Object.keys(files).sort();

  for (const filePath of sortedPaths) {
    const parts = filePath.split('/');
    let current = tree;

    for (let i = 0; i < parts.length - 1; i++) {
      const part = parts[i];
      if (!current[part]) {
        current[part] = {};
      }
      current = current[part] as TreeNode;
    }

    const fileName = parts[parts.length - 1];
    current[fileName] = null;
  }

  function convertNode(node: TreeNode, name?: string): TreeItem[] | TreeItem {
    const entries = Object.entries(node);

    if (entries.length === 0) {
      return name || '';
    }

    const children: TreeItem[] = [];

    for (const [key, value] of entries) {
      if (value === null) {
        // This is a file
        children.push(key);
      } else {
        // This is a folder
        const subTree = convertNode(value, key);
        if (Array.isArray(subTree)) {
          children.push([key, ...subTree]);
        } else {
          children.push([key, subTree]);
        }
      }
    }
    return children;
  }

  const result = convertNode(tree);
  return Array.isArray(result) ? result : [result];
}
