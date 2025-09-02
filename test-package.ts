// test-package.js - Test your built package
const { convertFilesToTreeItems } = require('./dist/index.js');

console.log('Testing CommonJS build...');

const files = {
  'src/index.ts': 'export * from "./utils"',
  'src/utils/helpers.ts': 'export function help() {}',
  'src/components/Button.tsx': 'export const Button = () => {}',
  'package.json': '{"name": "my-app"}',
  'README.md': '# My App',
};

const tree = convertFilesToTreeItems(files);
console.log('Result:', JSON.stringify(tree, null, 2));

console.log('✅ CommonJS build works!');
