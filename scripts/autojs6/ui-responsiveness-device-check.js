/**
 * Runtime designation: non-production D21 evidence wrapper for UI responsiveness
 * during repeated reads in AutoJs6.
 *
 * This wrapper extends D16 with UI heartbeat monitoring during 10 repeated
 * complete production-reader invocations. It posts a heartbeat to the UI thread
 * every 200ms between iterations to verify the UI remains responsive.
 */

import { IMAGE_INPUT_ERROR_CODES } from "../../src/core/index.js";
import { runImageReaderDeviceCheck } from "./image-reader-device-check.js";

const REQUESTED_ITERATIONS = 10;
const REQUIRED_MIME_TYPE = "image/jpeg";
const PUBLIC_ERROR_CODES = new Set(Object.values(IMAGE_INPUT_ERROR_CODES));

export async function runUiResponsivenessDeviceCheck({
  expectedSizeBytes,
  reportMetadata = () => {},
  uiHeartbeat = () => Promise.resolve(true),
  ...readerOptions
}) {
  validateInputs({ expectedSizeBytes, reportMetadata, uiHeartbeat });

  let attemptedIterations = 0;
  let successfulIterations = 0;
  let firstMimeType;
  let firstSizeBytes;
  let publicErrorCode;
  let metadataMismatch = false;
  let heartbeatCount = 0;
  let uiBlocked = false;

  for (let iteration = 1; iteration <= REQUESTED_ITERATIONS; iteration += 1) {
    attemptedIterations += 1;

    const result = await runImageReaderDeviceCheck({
      ...readerOptions,
      reportMetadata: () => {},
    });

    // Post heartbeat between iterations (not after the last one)
    if (iteration < REQUESTED_ITERATIONS) {
      const heartbeatOk = await uiHeartbeat();
      if (heartbeatOk) {
        heartbeatCount += 1;
      } else {
        uiBlocked = true;
      }
    }

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
    heartbeatCount,
    uiBlocked,
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
  heartbeatCount,
  uiBlocked,
}) {
  const common = {
    testCaseId,
    requestedIterations: REQUESTED_ITERATIONS,
    attemptedIterations,
    successfulIterations,
    heartbeatCount,
  };

  if (uiBlocked) {
    return Object.freeze({
      ...common,
      status: "FAIL",
      allMetadataEqual,
      uiResponsive: false,
      failureReason: "UI_NOT_RESPONSIVE",
    });
  }

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
      uiResponsive: true,
    });
  }

  if (publicErrorCode !== undefined) {
    return Object.freeze({
      ...common,
      status: "FAIL",
      allMetadataEqual,
      uiResponsive: true,
      failureReason: "PUBLIC_ERROR",
      errorCode: publicErrorCode,
    });
  }

  return Object.freeze({
    ...common,
    status: "FAIL",
    allMetadataEqual,
    uiResponsive: true,
    failureReason: "METADATA_MISMATCH",
  });
}

function normalizePublicErrorCode(errorCode) {
  return PUBLIC_ERROR_CODES.has(errorCode)
    ? errorCode
    : IMAGE_INPUT_ERROR_CODES.IMAGE_READ_FAILED;
}

function validateInputs({ expectedSizeBytes, reportMetadata, uiHeartbeat }) {
  if (!Number.isSafeInteger(expectedSizeBytes) || expectedSizeBytes <= 0) {
    throw new TypeError("expectedSizeBytes must be a positive safe integer");
  }

  if (typeof reportMetadata !== "function") {
    throw new TypeError("reportMetadata must be a function");
  }

  if (typeof uiHeartbeat !== "function") {
    throw new TypeError("uiHeartbeat must be a function");
  }
}
