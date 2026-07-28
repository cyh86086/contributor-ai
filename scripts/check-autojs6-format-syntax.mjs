/**
 * Runtime designation: Node.js offline build and CI harness only.
 */

import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

import { selectFormatCheckCases } from "./autojs6/format-check-case-manifest.js";
import { assertAutoJs6FormatSyntaxCompatible } from "./autojs6-format-syntax-compatibility.mjs";

const selectedCases = selectFormatCheckCases(readCaseIds(process.argv));

for (const formatCase of selectedCases) {
  const bundle = fileURLToPath(
    new URL(formatCase.generatedPath, import.meta.url),
  );
  assertAutoJs6FormatSyntaxCompatible(
    await readFile(bundle, "utf8"),
    `AutoJs6 ${formatCase.testCaseId} bundle`,
  );
  console.info(
    `AutoJs6 ${formatCase.testCaseId} legacy syntax compatibility scan passed.`,
  );
}

function readCaseIds(args) {
  const selection = args.find((argument) => argument.startsWith("--cases="));
  if (!selection) {
    return undefined;
  }
  return selection.slice("--cases=".length).split(",");
}
