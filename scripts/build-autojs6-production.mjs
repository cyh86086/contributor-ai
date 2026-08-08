/**
 * Runtime designation: Node.js offline deterministic build harness.
 *
 * Builds the production entry point bundle for AutoJs6.
 */

import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

import Babel from "@babel/standalone";
import { build } from "esbuild";

const checkOnly = process.argv.includes("--check");

const entry = fileURLToPath(
  new URL("./autojs6/source/production.entry.js", import.meta.url),
);
const output = fileURLToPath(
  new URL("./autojs6/production.js", import.meta.url),
);

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
/* Contributor AI production entry point — Gemini provider. */
/* Polyfill: String.prototype.trim for AutoJs6 Rhino engine */
if (!String.prototype.trim) {
  String.prototype.trim = function () {
    return this.replace(/^\\s+|\\s+$/g, "");
  };
}
${transpiled}
`;

if (checkOnly) {
  const committed = await readFile(output, "utf8");
  if (committed !== generated) {
    console.error(
      "Production bundle is stale; run npm run build:autojs6:production",
    );
    process.exit(1);
  }
  console.info("Production bundle is current.");
} else {
  await writeFile(output, generated, "utf8");
  console.info("Generated scripts/autojs6/production.js");
}
