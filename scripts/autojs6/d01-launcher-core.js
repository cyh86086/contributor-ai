/**
 * Runtime designation: runtime-neutral orchestration for the non-production
 * D01 AutoJs6 device-verification launcher.
 *
 * This module owns no Android, AutoJs6, Node.js, network, provider, queue,
 * Contributor app, or submission behavior.
 */

import { IMAGE_INPUT_ERROR_CODES } from "../../src/core/index.js";

export const D01_TEST_CASE_ID = "D01_JPEG";

const PUBLIC_ERROR_CODES = new Set(Object.values(IMAGE_INPUT_ERROR_CODES));
const CONTENT_URI = /^content:\/\/.+/u;

export async function runD01OneClick({
  showInstructions,
  pickSingleJpeg,
  executeOffUiThread,
  prepareSelectedImage,
  reportMetadata,
}) {
  validateDependencies({
    showInstructions,
    pickSingleJpeg,
    executeOffUiThread,
    prepareSelectedImage,
    reportMetadata,
  });

  let record;
  try {
    await showInstructions();
    const sourceUri = await pickSingleJpeg();

    if (typeof sourceUri !== "string" || !CONTENT_URI.test(sourceUri)) {
      record = failure(IMAGE_INPUT_ERROR_CODES.URI_ACCESS_DENIED, true);
    } else {
      const execution = await executeOffUiThread(() =>
        prepareSelectedImage(sourceUri),
      );
      record = normalizeExecution(execution);
    }
  } catch (error) {
    record = failure(publicCode(error), false);
  }

  reportMetadata(record);
  return record;
}

function normalizeExecution(execution) {
  if (!execution || execution.uiResponsive !== true) {
    return failure(IMAGE_INPUT_ERROR_CODES.IMAGE_READ_FAILED, false);
  }

  const result = execution.value;
  if (
    result?.status === "PASS" &&
    result.mimeType === "image/jpeg" &&
    Number.isSafeInteger(result.sizeBytes) &&
    result.sizeBytes > 0
  ) {
    return Object.freeze({
      testCaseId: D01_TEST_CASE_ID,
      status: "PASS",
      mimeType: "image/jpeg",
      sizeBytes: result.sizeBytes,
      uiResponsive: true,
    });
  }

  return failure(
    result?.status === "FAIL"
      ? publicCode(result)
      : IMAGE_INPUT_ERROR_CODES.IMAGE_READ_FAILED,
    true,
  );
}

function failure(errorCode, uiResponsive) {
  return Object.freeze({
    testCaseId: D01_TEST_CASE_ID,
    status: "FAIL",
    errorCode: PUBLIC_ERROR_CODES.has(errorCode)
      ? errorCode
      : IMAGE_INPUT_ERROR_CODES.IMAGE_READ_FAILED,
    uiResponsive: uiResponsive === true,
  });
}

function publicCode(value) {
  return PUBLIC_ERROR_CODES.has(value?.code)
    ? value.code
    : PUBLIC_ERROR_CODES.has(value?.errorCode)
      ? value.errorCode
      : IMAGE_INPUT_ERROR_CODES.IMAGE_READ_FAILED;
}

function validateDependencies(dependencies) {
  for (const [name, dependency] of Object.entries(dependencies)) {
    if (typeof dependency !== "function") {
      throw new TypeError(`${name} must be a function`);
    }
  }
}
