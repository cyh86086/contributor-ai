/**
 * Offline test harness for D20 memory behavior.
 *
 * Uses the production reader with a mock resolver that simulates repeated
 * reads and tracks memory usage. Does not depend on Android, AutoJs6, or
 * Node.js production runtime.
 */
import { createAutoJs6AndroidImageReader } from "../../src/autojs6/android-image-reader.js";
import {
  IMAGE_INPUT_ERROR_CODES,
  IMAGE_READER_ERROR_CLASSIFICATIONS,
} from "../../src/core/index.js";

const PUBLIC_ERROR_CODES = new Set(Object.values(IMAGE_INPUT_ERROR_CODES));

export async function runD20OfflineCheck({
  testCaseId,
  sourceUri,
  expectedMimeType,
  expectedSizeBytes,
  maxSizeBytes,
  readerSafetyLimitBytes,
  resolver,
  parseUri,
  javaBridge,
  isFileUriApproved = () => false,
  reportMetadata = () => {},
}) {
  validateInputs({
    testCaseId,
    expectedMimeType,
    expectedSizeBytes,
    maxSizeBytes,
    reportMetadata,
  });

  const REQUESTED_ITERATIONS = 10;
  const REQUIRED_MIME_TYPE = "image/jpeg";
  const STABILIZATION_INTERVAL_MS = 10; // Shorter for offline tests

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

    const reader = createAutoJs6AndroidImageReader({
      context: {},
      contentResolver: resolver,
      parseUri,
      javaBridge,
      isFileUriApproved,
      readerSafetyLimitBytes,
    });

    let result;
    try {
      if ((await reader.canAccess(sourceUri)) !== true) {
        result = {
          status: "FAIL",
          errorCode: IMAGE_INPUT_ERROR_CODES.URI_ACCESS_DENIED,
        };
      } else {
        result = await reader.read(sourceUri);
      }
    } catch (error) {
      result = {
        status: "FAIL",
        errorCode: normalizeErrorCode(error),
      };
    }

    const currentMemory = getUsedHeapBytes();
    memoryAfterEach.push(currentMemory);
    if (currentMemory > peakMemory) {
      peakMemory = currentMemory;
    }

    if (result.status === "FAIL") {
      publicErrorCode = normalizePublicErrorCode(result.errorCode);
      break;
    }

    const bytes = safelyReadProperty(result, "bytes");
    const reportedMimeType = safelyReadProperty(result, "mimeType");

    if (!(bytes instanceof Uint8Array) || bytes.byteLength === 0) {
      publicErrorCode = IMAGE_INPUT_ERROR_CODES.IMAGE_READ_FAILED;
      break;
    }

    const matchesRequiredMetadata =
      reportedMimeType === REQUIRED_MIME_TYPE &&
      bytes.byteLength === expectedSizeBytes;
    const matchesFirstIteration =
      iteration === 1 ||
      (reportedMimeType === firstMimeType &&
        bytes.byteLength === firstSizeBytes);

    if (!matchesRequiredMetadata || !matchesFirstIteration) {
      metadataMismatch = true;
      break;
    }

    if (iteration === 1) {
      firstMimeType = reportedMimeType;
      firstSizeBytes = bytes.byteLength;
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
    testCaseId,
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
  // Node.js doesn't have Java Runtime, so use process.memoryUsage()
  const mem = process.memoryUsage();
  return mem.heapUsed;
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
    requestedIterations: 10,
    attemptedIterations,
    successfulIterations,
    memoryBefore,
    memoryAfterEach: Object.freeze([...memoryAfterEach]),
    memoryAfterStabilization,
    peakMemory,
    memoryGrowth,
  };

  if (
    successfulIterations === 10 &&
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

function normalizeErrorCode(error) {
  const code = safelyReadProperty(error, "code");
  if (PUBLIC_ERROR_CODES.has(code)) {
    return code;
  }

  const classification = safelyReadProperty(error, "classification");
  if (classification === IMAGE_READER_ERROR_CLASSIFICATIONS.URI_ACCESS_DENIED) {
    return IMAGE_INPUT_ERROR_CODES.URI_ACCESS_DENIED;
  }

  return IMAGE_INPUT_ERROR_CODES.IMAGE_READ_FAILED;
}

function safelyReadProperty(value, propertyName) {
  if (
    value === null ||
    (typeof value !== "object" && typeof value !== "function")
  ) {
    return undefined;
  }

  try {
    return value[propertyName];
  } catch {
    return undefined;
  }
}

function validateInputs({
  testCaseId,
  expectedMimeType,
  expectedSizeBytes,
  maxSizeBytes,
  reportMetadata,
}) {
  if (typeof testCaseId !== "string" || testCaseId.length === 0) {
    throw new TypeError("testCaseId must be a non-empty string");
  }
  if (typeof expectedMimeType !== "string" || expectedMimeType.length === 0) {
    throw new TypeError("expectedMimeType must be a non-empty string");
  }
  if (!Number.isSafeInteger(expectedSizeBytes) || expectedSizeBytes <= 0) {
    throw new TypeError("expectedSizeBytes must be a positive safe integer");
  }
  if (!Number.isSafeInteger(maxSizeBytes) || maxSizeBytes <= 0) {
    throw new TypeError("maxSizeBytes must be a positive safe integer");
  }
  if (typeof reportMetadata !== "function") {
    throw new TypeError("reportMetadata must be a function");
  }
}
