/**
 * Offline test harness for D21 UI responsiveness.
 *
 * Uses the production reader with a mock resolver that simulates repeated
 * reads and tracks UI heartbeat responses. Does not depend on Android, AutoJs6,
 * or Node.js production runtime.
 */
import { createAutoJs6AndroidImageReader } from "../../src/autojs6/android-image-reader.js";
import {
  IMAGE_INPUT_ERROR_CODES,
  IMAGE_READER_ERROR_CLASSIFICATIONS,
} from "../../src/core/index.js";

const PUBLIC_ERROR_CODES = new Set(Object.values(IMAGE_INPUT_ERROR_CODES));

export async function runD21OfflineCheck({
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
  uiHeartbeat = () => Promise.resolve(true),
}) {
  validateInputs({
    testCaseId,
    expectedMimeType,
    expectedSizeBytes,
    maxSizeBytes,
    reportMetadata,
    uiHeartbeat,
  });

  const REQUESTED_ITERATIONS = 10;
  const REQUIRED_MIME_TYPE = "image/jpeg";

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
    requestedIterations: 10,
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
  uiHeartbeat,
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
  if (typeof uiHeartbeat !== "function") {
    throw new TypeError("uiHeartbeat must be a function");
  }
}
