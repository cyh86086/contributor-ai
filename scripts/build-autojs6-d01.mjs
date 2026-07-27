/**
 * Runtime designation: Node.js offline build and CI harness only.
 */

import assert from "node:assert/strict";
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

import Babel from "@babel/standalone";
import { build } from "esbuild";

import { assertAutoJs6D01SyntaxCompatible } from "./autojs6-d01-syntax-compatibility.mjs";

const entry = fileURLToPath(
  new URL("./autojs6/source/d01-jpeg-device-check.entry.js", import.meta.url),
);
const output = fileURLToPath(
  new URL("./autojs6/d01-jpeg-device-check.js", import.meta.url),
);
const checkOnly = process.argv.includes("--check");

const result = await build({
  entryPoints: [entry],
  bundle: true,
  write: false,
  format: "iife",
  platform: "neutral",
  target: "es2015",
  charset: "ascii",
  legalComments: "none",
  sourcemap: false,
});

const transpiled = Babel.transform(result.outputFiles[0].text, {
  presets: [
    [
      "env",
      {
        modules: false,
        targets: { ie: "11" },
        useBuiltIns: false,
      },
    ],
  ],
  ast: false,
  comments: false,
  compact: false,
  sourceMaps: false,
  sourceType: "script",
}).code;
const generated = `"ui";
/* GENERATED: non-production AutoJs6 D01 device-verification support only. */
${transpiled}
`;

assertAutoJs6D01SyntaxCompatible(generated);

if (checkOnly) {
  const committed = await readFile(output, "utf8");
  assert.equal(
    committed,
    generated,
    "AutoJs6 D01 bundle is stale; run npm run build:autojs6:d01",
  );
  console.info("AutoJs6 D01 bundle is current.");
} else {
  await writeFile(output, generated, "utf8");
  console.info("Generated scripts/autojs6/d01-jpeg-device-check.js");
}
