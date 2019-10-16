import { readFile, writeFile } from "fs";
import { join } from "path";

import Huffman from "./huffman";

const compressor = new Huffman();

const originalString = "assassin";

// Compression
const {compressedString, root} = compressor.compress(originalString);
const JSONTree = JSON.stringify(root.toObject(), null, 2);
process.stdout.write(`Compressed String: ${compressedString}\n`);
// process.stdout.write(`Tree: ${JSONTree}`);

writeFile(
  join(__dirname, "../output/compressedString"),
  compressedString,
  (err) => err && process.stderr.write(`${err.message}\n`),
);

writeFile(
  join(__dirname, "../output/tree.json"),
  JSONTree,
  (err) => err && process.stderr.write(`${err.message}\n`),
);

process.stdout.write(`Decompressed String: ${compressor.decompress(compressedString, root)}\n`);
