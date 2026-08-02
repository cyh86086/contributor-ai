/**
 * Runtime designation: test-only, non-production D16 verification seam.
 *
 * This module reuses the production Android reader and portable core with
 * injected offline dependencies. It is not a launcher, generated bundle,
 * device procedure, permission implementation, or Android evidence.
 */

import { createAutoJs6AndroidImageReader } from "../../src/autojs6/android-image-reader.js";
import {
  IMAGE_INPUT_ERROR_CODES,
  prepareImageInput,
} from "../../src/core/index.js";

export const D16_OFFLINE_TEST_CASE_ID = "D16_REPEATED_READS";

const REQUESTED_ITERATIONS = 10;
const REQUIRED_MIME_TYPE = "image/jpeg";
const PUBLIC_ERROR_CODES = new Set(Object.values(IMAGE_INPUT_ERROR_CODES));

export async function runD16OfflineAggregateCheck({
  sourceUri,
  independentlyVerifiedByteCount,
  maxSizeBytes,
  readerOptions,
  encodeBase64,
  assessUiResponsive,
  reportMetadata,
}) {
  validateInputs({
    independentlyVerifiedByteCount,
    assessUiResponsive,
    reportMetadata,
  });

  const reader = createAutoJs6AndroidImageReader(readerOptions);
  let attemptedIterations = 0;
  let successfulIterations = 0;
  let firstMimeType;
  let firstSizeBytes;
  let publicErrorCode;
  let metadataMismatch = false;

  for (let iteration = 1; iteration <= REQUESTED_ITERATIONS; iteration += 1) {
    attemptedIterations += 1;

    const result = await runCompletePath({
      sourceUri,
      maxSizeBytes,
      reader,
      encodeBase64,
    });
    const status = safelyReadProperty(result, "status");
    if (status === "FAIL") {
      publicErrorCode = normalizePublicErrorCode(result);
      break;
    }

    const mimeType = safelyReadProperty(result, "mimeType");
    const sizeBytes = safelyReadProperty(result, "sizeBytes");
    const matchesRequiredMetadata =
      status === "PASS" &&
      mimeType === REQUIRED_MIME_TYPE &&
      sizeBytes === independentlyVerifiedByteCount;
    const matchesFirstIteration =
      iteration === 1 ||
      (mimeType === firstMimeType && sizeBytes === firstSizeBytes);

    if (!matchesRequiredMetadata || !matchesFirstIteration) {
      metadataMismatch = true;
      break;
    }

    if (iteration === 1) {
      firstMimeType = mimeType;
      firstSizeBytes = sizeBytes;
    }
    successfulIterations += 1;
  }

  const uiResponsive = await safelyAssessUiResponsiveness(assessUiResponsive);
  const allMetadataEqual =
    successfulIterations === REQUESTED_ITERATIONS &&
    publicErrorCode === undefined &&
    metadataMismatch === false;
  const record = createAggregateRecord({
    attemptedIterations,
    successfulIterations,
    allMetadataEqual,
    uiResponsive,
    publicErrorCode,
    metadataMismatch,
    mimeType: firstMimeType,
    sizeBytes: firstSizeBytes,
  });

  reportMetadata(record);
  return record;
}

async function runCompletePath({
  sourceUri,
  maxSizeBytes,
  reader,
  encodeBase64,
}) {
  try {
    const result = await prepareImageInput({
      sourceUri,
      maxSizeBytes,
      reader,
      encodeBase64,
    });
    return Object.freeze({
      status: "PASS",
      mimeType: safelyReadProperty(result, "mimeType"),
      sizeBytes: safelyReadProperty(result, "sizeBytes"),
    });
  } catch (error) {
    return Object.freeze({
      status: "FAIL",
      errorCode: normalizePublicErrorCode(error),
    });
  }
}

function createAggregateRecord({
  attemptedIterations,
  successfulIterations,
  allMetadataEqual,
  uiResponsive,
  publicErrorCode,
  metadataMismatch,
  mimeType,
  sizeBytes,
}) {
  const common = {
    testCaseId: D16_OFFLINE_TEST_CASE_ID,
    requestedIterations: REQUESTED_ITERATIONS,
    attemptedIterations,
    successfulIterations,
  };

  if (
    uiResponsive &&
    successfulIterations === REQUESTED_ITERATIONS &&
    !publicErrorCode &&
    !metadataMismatch
  ) {
    return Object.freeze({
      ...common,
      status: "PASS",
      mimeType,
      sizeBytes,
      allMetadataEqual,
      uiResponsive,
    });
  }

  const failure = {
    ...common,
    status: "FAIL",
    allMetadataEqual,
    uiResponsive,
  };

  if (!uiResponsive) {
    return Object.freeze({
      ...failure,
      failureReason: "UI_NOT_RESPONSIVE",
    });
  }

  if (publicErrorCode) {
    return Object.freeze({
      ...failure,
      failureReason: "PUBLIC_ERROR",
      errorCode: publicErrorCode,
    });
  }

  return Object.freeze({
    ...failure,
    failureReason: "METADATA_MISMATCH",
  });
}

function normalizePublicErrorCode(error) {
  const code =
    safelyReadProperty(error, "code") ?? safelyReadProperty(error, "errorCode");
  return PUBLIC_ERROR_CODES.has(code)
    ? code
    : IMAGE_INPUT_ERROR_CODES.IMAGE_READ_FAILED;
}

async function safelyAssessUiResponsiveness(assessUiResponsive) {
  try {
    return (await assessUiResponsive()) === true;
  } catch {
    return false;
  }
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
  independentlyVerifiedByteCount,
  assessUiResponsive,
  reportMetadata,
}) {
  if (
    !Number.isSafeInteger(independentlyVerifiedByteCount) ||
    independentlyVerifiedByteCount <= 0
  ) {
    throw new TypeError(
      "independentlyVerifiedByteCount must be a positive safe integer",
    );
  }
  if (typeof assessUiResponsive !== "function") {
    throw new TypeError("assessUiResponsive must be a function");
  }
  if (typeof reportMetadata !== "function") {
    throw new TypeError("reportMetadata must be a function");
  }
}
