import fs from 'fs';

export function readInputFile(filename: string) {
  return fs.readFileSync(filename).toString();
}