/**
 * Runtime designation: Node.js offline build and CI harness only.
 */

import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

import { assertAutoJs6D01SyntaxCompatible } from "./autojs6-d01-syntax-compatibility.mjs";

const bundle = fileURLToPath(
  new URL("./autojs6/d01-jpeg-device-check.js", import.meta.url),
);

assertAutoJs6D01SyntaxCompatible(await readFile(bundle, "utf8"));
console.info("AutoJs6 D01 legacy syntax compatibility scan passed.");
