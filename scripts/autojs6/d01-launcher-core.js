/**
 * Runtime designation: backward-compatible runtime-neutral D01 wrapper for
 * the shared non-production AutoJs6 image-format verification launcher.
 */

import { D01_FORMAT_CHECK_CASE } from "./format-check-case-manifest.js";
import { runFormatCheck } from "./format-check-launcher-core.js";

export const D01_TEST_CASE_ID = D01_FORMAT_CHECK_CASE.testCaseId;

export async function runD01OneClick({
  showInstructions,
  pickSingleJpeg,
  executeOffUiThread,
  prepareSelectedImage,
  reportMetadata,
}) {
  validateLegacyDependencies({
    showInstructions,
    pickSingleJpeg,
    executeOffUiThread,
    prepareSelectedImage,
    reportMetadata,
  });

  return runFormatCheck(D01_FORMAT_CHECK_CASE, {
    showInstructions: () => showInstructions(),
    pickSingleImage: () => pickSingleJpeg(),
    executeOffUiThread,
    prepareSelectedImage: (sourceUri) => prepareSelectedImage(sourceUri),
    reportMetadata,
  });
}

function validateLegacyDependencies(dependencies) {
  for (const [name, dependency] of Object.entries(dependencies)) {
    if (typeof dependency !== "function") {
      throw new TypeError(`${name} must be a function`);
    }
  }
}
