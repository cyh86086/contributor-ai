/**
 * Runtime designation: non-production D20 evidence wrapper for memory behavior
 * during repeated reads in AutoJs6.
 *
 * This wrapper extends D16 with coarse heap memory monitoring before, during,
 * and after 10 repeated complete production-reader invocations. It does not
 * modify the production reader source.
 */

import { IMAGE_INPUT_ERROR_CODES } from "../../src/core/index.js";
import { runImageReaderDeviceCheck } from "./image-reader-device-check.js";

const REQUESTED_ITERATIONS = 10;
const REQUIRED_MIME_TYPE = "image/jpeg";
const STABILIZATION_INTERVAL_MS = 500;
const PUBLIC_ERROR_CODES = new Set(Object.values(IMAGE_INPUT_ERROR_CODES));

export async function runMemoryBehaviorDeviceCheck({
  expectedSizeBytes,
  reportMetadata = () => {},
  ...readerOptions
}) {
  validateInputs({ expectedSizeBytes, reportMetadata });

  const memoryBefore = getUsedHeapBytes();
  let peakMemory = memoryBefore;

  let attemptedIterations = 0;
  let successfulIterations = 0;
  let firstMimeType;
  let firstSizeBytes;
  let publicErrorCode;
  let metadataMismatch = false;
  const memoryAfterEach = [];

  for (let iteration = 1; iteration <= REQUESTED_ITERATIONS; iteration += 1) {
    attemptedIterations += 1;

    const result = await runImageReaderDeviceCheck({
      ...readerOptions,
      reportMetadata: () => {},
    });

    const currentMemory = getUsedHeapBytes();
    memoryAfterEach.push(currentMemory);
    if (currentMemory > peakMemory) {
      peakMemory = currentMemory;
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

  // Stabilization interval
  await new Promise((resolve) =>
    setTimeout(resolve, STABILIZATION_INTERVAL_MS),
  );

  const memoryAfterStabilization = getUsedHeapBytes();
  if (memoryAfterStabilization > peakMemory) {
    peakMemory = memoryAfterStabilization;
  }

  const memoryGrowth = memoryAfterStabilization - memoryBefore;

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
    memoryBefore,
    memoryAfterEach,
    memoryAfterStabilization,
    peakMemory,
    memoryGrowth,
  });

  reportMetadata(record);
  return record;
}

function getUsedHeapBytes() {
  const runtime = java.lang.Runtime.getRuntime();
  return runtime.totalMemory() - runtime.freeMemory();
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
  memoryBefore,
  memoryAfterEach,
  memoryAfterStabilization,
  peakMemory,
  memoryGrowth,
}) {
  const common = {
    testCaseId,
    requestedIterations: REQUESTED_ITERATIONS,
    attemptedIterations,
    successfulIterations,
    memoryBefore,
    memoryAfterEach: Object.freeze([...memoryAfterEach]),
    memoryAfterStabilization,
    peakMemory,
    memoryGrowth,
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
