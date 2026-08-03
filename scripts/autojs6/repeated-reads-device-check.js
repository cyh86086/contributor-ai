/**
 * Runtime designation: non-production D16 evidence wrapper for exactly 10
 * repeated complete production-reader and portable-core invocations.
 *
 * This wrapper owns no picker, permission, Android UI, provider, network,
 * queue, Contributor app, or submission behavior. It suppresses per-iteration
 * reporting and returns one sanitized loop result for launcher finalization.
 */

import { IMAGE_INPUT_ERROR_CODES } from "../../src/core/index.js";
import { runImageReaderDeviceCheck } from "./image-reader-device-check.js";

const REQUESTED_ITERATIONS = 10;
const REQUIRED_MIME_TYPE = "image/jpeg";
const PUBLIC_ERROR_CODES = new Set(Object.values(IMAGE_INPUT_ERROR_CODES));

export async function runRepeatedReadsDeviceCheck({
  expectedSizeBytes,
  reportMetadata = () => {},
  ...readerOptions
}) {
  validateInputs({ expectedSizeBytes, reportMetadata });

  let attemptedIterations = 0;
  let successfulIterations = 0;
  let firstMimeType;
  let firstSizeBytes;
  let publicErrorCode;
  let metadataMismatch = false;

  for (let iteration = 1; iteration <= REQUESTED_ITERATIONS; iteration += 1) {
    attemptedIterations += 1;

    const result = await runImageReaderDeviceCheck({
      ...readerOptions,
      reportMetadata: () => {},
    });

    if (result.status === "FAIL") {
      publicErrorCode = normalizePublicErrorCode(result.errorCode);
      break;
    }

    const matchesRequiredMetadata =
      result.status === "PASS" &&
      result.mimeType === REQUIRED_MIME_TYPE &&
      result.sizeBytes === expectedSizeBytes;
    const matchesFirstIteration =
      iteration === 1 ||
      (result.mimeType === firstMimeType &&
        result.sizeBytes === firstSizeBytes);

    if (!matchesRequiredMetadata || !matchesFirstIteration) {
      metadataMismatch = true;
      break;
    }

    if (iteration === 1) {
      firstMimeType = result.mimeType;
      firstSizeBytes = result.sizeBytes;
    }

    successfulIterations += 1;
  }

  const allMetadataEqual =
    successfulIterations === REQUESTED_ITERATIONS &&
    publicErrorCode === undefined &&
    metadataMismatch === false;

  const record = createLoopRecord({
    testCaseId: readerOptions.testCaseId,
    attemptedIterations,
    successfulIterations,
    allMetadataEqual,
    publicErrorCode,
    metadataMismatch,
    mimeType: firstMimeType,
    sizeBytes: firstSizeBytes,
  });

  reportMetadata(record);
  return record;
}

function createLoopRecord({
  testCaseId,
  attemptedIterations,
  successfulIterations,
  allMetadataEqual,
  publicErrorCode,
  metadataMismatch,
  mimeType,
  sizeBytes,
}) {
  const common = {
    testCaseId,
    requestedIterations: REQUESTED_ITERATIONS,
    attemptedIterations,
    successfulIterations,
  };

  if (
    successfulIterations === REQUESTED_ITERATIONS &&
    publicErrorCode === undefined &&
    metadataMismatch === false
  ) {
    return Object.freeze({
      ...common,
      status: "PASS",
      mimeType,
      sizeBytes,
      allMetadataEqual,
    });
  }

  if (publicErrorCode !== undefined) {
    return Object.freeze({
      ...common,
      status: "FAIL",
      allMetadataEqual,
      failureReason: "PUBLIC_ERROR",
      errorCode: publicErrorCode,
    });
  }

  return Object.freeze({
    ...common,
    status: "FAIL",
    allMetadataEqual,
    failureReason: "METADATA_MISMATCH",
  });
}

function normalizePublicErrorCode(errorCode) {
  return PUBLIC_ERROR_CODES.has(errorCode)
    ? errorCode
    : IMAGE_INPUT_ERROR_CODES.IMAGE_READ_FAILED;
}

function validateInputs({ expectedSizeBytes, reportMetadata }) {
  if (!Number.isSafeInteger(expectedSizeBytes) || expectedSizeBytes <= 0) {
    throw new TypeError("expectedSizeBytes must be a positive safe integer");
  }

  if (typeof reportMetadata !== "function") {
    throw new TypeError("reportMetadata must be a function");
  }
}
