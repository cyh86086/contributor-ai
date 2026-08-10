/**
 * Runtime designation: Node.js offline build harness.
 *
 * Builds the UI Discovery tool bundle for AutoJs6.
 * This script has no ES module imports so we use Babel only.
 */

import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

import Babel from "@babel/standalone";

const entry = fileURLToPath(
  new URL("./autojs6/source/ui-discovery.entry.js", import.meta.url),
);
const output = fileURLToPath(
  new URL("./autojs6/ui-discovery.js", import.meta.url),
);

const source = await readFile(entry, "utf8");

const transpiled = Babel.transform(source, {
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

const generated = `/* Contributor AI — UI Discovery Tool for AutoJs6. */\n${transpiled}\n`;

await writeFile(output, generated, "utf8");
console.info("Generated scripts/autojs6/ui-discovery.js");
