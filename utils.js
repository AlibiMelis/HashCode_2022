import fs from 'fs';

export function readfile(filename) {
  return fs.readFileSync(filename).toString();
}