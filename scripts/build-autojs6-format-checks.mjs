/**
 * Runtime designation: Node.js offline deterministic build and CI harness.
 */

import assert from "node:assert/strict";
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

import Babel from "@babel/standalone";
import { build } from "esbuild";

import { selectFormatCheckCases } from "./autojs6/format-check-case-manifest.js";
import { assertAutoJs6FormatSyntaxCompatible } from "./autojs6-format-syntax-compatibility.mjs";

const checkOnly = process.argv.includes("--check");
const selectedCases = selectFormatCheckCases(readCaseIds(process.argv));

for (const formatCase of selectedCases) {
  const generated = await generateBundle(formatCase);
  const output = fileURLToPath(
    new URL(formatCase.generatedPath, import.meta.url),
  );

  assertAutoJs6FormatSyntaxCompatible(
    generated,
    `AutoJs6 ${formatCase.testCaseId} bundle`,
  );

  if (checkOnly) {
    const committed = await readFile(output, "utf8");
    assert.equal(
      committed,
      generated,
      `AutoJs6 ${formatCase.testCaseId} bundle is stale; run npm run build:autojs6:format-checks`,
    );
    console.info(`AutoJs6 ${formatCase.testCaseId} bundle is current.`);
  } else {
    await writeFile(output, generated, "utf8");
    console.info(`Generated scripts/${formatCase.generatedPath}`);
  }
}

async function generateBundle(formatCase) {
  const entry = fileURLToPath(
    new URL(formatCase.sourceEntryPath, import.meta.url),
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

  return `"ui";
/* GENERATED: non-production AutoJs6 ${formatCase.testCaseId} device-verification support only. */
${transpiled}
`;
}

function readCaseIds(args) {
  const selection = args.find((argument) => argument.startsWith("--cases="));
  if (!selection) {
    return undefined;
  }
  return selection.slice("--cases=".length).split(",");
}
