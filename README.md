# files-to-tree

[![npm version](https://badge.fury.io/js/files-to-tree.svg)](https://badge.fury.io/js/files-to-tree)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org)

A lightweight TypeScript library that converts flat file path objects into hierarchical tree structures. Perfect for representing file systems, directory structures, or any hierarchical data in a clean, tree-like format.

## Installation

```bash
npm install files-to-tree
```

```bash
yarn add files-to-tree
```

```bash
pnpm add files-to-tree
```

## Quick Start

```typescript
import { convertFilesToTreeItems } from 'files-to-tree';

const files = {
  'src/index.ts': 'export * from "./utils"',
  'src/utils/helpers.ts': 'export function help() {}',
  'src/components/Button.tsx': 'export const Button = () => {}',
  'package.json': '{"name": "my-app"}',
  'README.md': '# My App',
};

const tree = convertFilesToTreeItems(files);
console.log(tree);

// Output:
// [
//   'README.md',
//   'package.json',
//   [
//     'src',
//     ['components', 'Button.tsx'],
//     'index.ts',
//     ['utils', 'helpers.ts']
//   ]
// ]
```

## API Reference

### `convertFilesToTreeItems(files: FilesObject): TreeItem[]`

Converts a flat object of file paths to a hierarchical tree structure.

**Parameters:**

- `files` (FilesObject): An object where keys are file paths and values are file contents (contents are used for sorting but not included in output)

**Returns:**

- `TreeItem[]`: An array representing the tree structure

### Types

```typescript
// A tree item can be either a string (file/empty dir) or a tuple (directory with children)
type TreeItem = string | [string, ...TreeItem[]];

// Input object type
interface FilesObject {
  [path: string]: string;
}
```

## Examples

### Basic File Structure

```typescript
import { convertFilesToTreeItems } from 'files-to-tree';

const files = {
  'index.html': '<html>...</html>',
  'styles.css': 'body { margin: 0; }',
  'script.js': 'console.log("Hello");',
};

const tree = convertFilesToTreeItems(files);
// Result: ['index.html', 'script.js', 'styles.css']
```

### Nested Directories

```typescript
const files = {
  'src/components/Header/index.ts': 'export',
  'src/components/Header/Header.tsx': 'component',
  'src/components/Footer/Footer.tsx': 'component',
  'src/utils/api.ts': 'api functions',
  'public/favicon.ico': 'icon',
  'package.json': 'manifest',
};

const tree = convertFilesToTreeItems(files);
// Result:
// [
//   'package.json',
//   ['public', 'favicon.ico'],
//   [
//     'src',
//     [
//       'components',
//       ['Footer', 'Footer.tsx'],
//       ['Header', 'Header.tsx', 'index.ts']
//     ],
//     ['utils', 'api.ts']
//   ]
// ]
```

### Usage with Different Import Styles

```typescript
// Named import
import { convertFilesToTreeItems } from 'files-to-tree';

// Default import
import convertFilesToTreeItems from 'files-to-tree';

// CommonJS
const { convertFilesToTreeItems } = require('files-to-tree');
```

## Features

- **🚀 Lightweight**: Zero dependencies, minimal footprint
- **📦 TypeScript First**: Full TypeScript support with detailed type definitions
- **🔧 Multiple Formats**: Supports CommonJS, ESM, and TypeScript
- **📊 Sorted Output**: Files and directories are automatically sorted alphabetically
- **🎯 Simple API**: Single function with intuitive input/output
- **✅ Well Tested**: Comprehensive test coverage
- **📱 Universal**: Works in Node.js, browsers, and edge environments

## Use Cases

- **File System Representation**: Display directory structures in UI components
- **Documentation**: Generate file tree views for project documentation
- **Code Analysis**: Analyze project structure and dependencies
- **Build Tools**: Process file hierarchies in build pipelines
- **API Responses**: Structure file listings in REST APIs

## Development

```bash
# Install dependencies
npm install

# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Build the package
npm run build

# Development mode (watch)
npm run dev
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## License

MIT © [KlyneChrysler]

## Changelog

### 2.0.0

- **BREAKING**: Fixed TypeScript compilation issues with strict mode
- Improved error handling and type safety
- Better handling of edge cases (empty paths, undefined values)
- Enhanced sorting algorithm for consistent output
- Full TypeScript declaration file generation

### 1.0.0

- Initial release
- Basic file-to-tree conversion functionality
- TypeScript support
- Comprehensive test coverage
