import { describe, it, expect } from 'vitest';
import { convertFilesToTreeItems } from './utils';

describe('convertFilesToTreeItems', () => {
  it('should convert simple files to tree structure', () => {
    const files = {
      'file1.txt': 'content1',
      'file2.txt': 'content2',
    };

    const result = convertFilesToTreeItems(files);
    expect(result).toEqual(['file1.txt', 'file2.txt']);
  });

  it('should handle nested directories', () => {
    const files = {
      'src/index.ts': 'export * from "./utils"',
      'src/utils.ts': 'export function hello() {}',
      'package.json': '{"name": "my-package"}',
    };

    const result = convertFilesToTreeItems(files);
    expect(result).toEqual([
      'package.json',
      ['src', 'index.ts', 'utils.ts']
    ]);
  });

  it('should handle deeply nested structures', () => {
    const files = {
      'src/components/Button/index.ts': 'export',
      'src/components/Button/Button.tsx': 'component',
      'src/utils/helpers.ts': 'helpers',
      'README.md': 'readme',
    };

    const result = convertFilesToTreeItems(files);
    expect(result).toEqual([
      'README.md',
      ['src', 
        ['components', 
          ['Button', 'Button.tsx', 'index.ts']
        ],
        ['utils', 'helpers.ts']
      ]
    ]);
  });

  it('should handle empty input', () => {
    const result = convertFilesToTreeItems({});
    expect(result).toEqual([]);
  });

  it('should sort files and directories alphabetically', () => {
    const files = {
      'z-file.txt': 'content',
      'a-file.txt': 'content',
      'middle/file.txt': 'content',
      'beta/file.txt': 'content',
    };

    const result = convertFilesToTreeItems(files);
    expect(result).toEqual([
      'a-file.txt',
      ['beta', 'file.txt'],
      ['middle', 'file.txt'],
      'z-file.txt'
    ]);
  });

  it('should handle single file in nested directory', () => {
    const files = {
      'very/deep/nested/file.txt': 'content',
    };

    const result = convertFilesToTreeItems(files);
    expect(result).toEqual([
      ['very', ['deep', ['nested', 'file.txt']]]
    ]);
  });
});