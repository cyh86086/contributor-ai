/**
 * Runtime designation: test-only, non-production D17 verification seam.
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

export const D17_OFFLINE_TEST_CASE_ID = "D17_MULTI_IMAGE_SEQUENTIAL";

const PUBLIC_ERROR_CODES = new Set(Object.values(IMAGE_INPUT_ERROR_CODES));

export async function runD17OfflineMultiImageCheck({
  sourceUris,
  expectedImages,
  maxSizeBytes,
  readerOptions,
  encodeBase64,
  reportMetadata,
}) {
  validateInputs({ sourceUris, expectedImages, reportMetadata });

  const reader = createAutoJs6AndroidImageReader(readerOptions);
  const images = [];
  let attemptedImages = 0;
  let successfulImages = 0;
  let publicErrorCode;
  let metadataMismatch = false;

  for (let index = 0; index < sourceUris.length; index += 1) {
    attemptedImages += 1;
    const sourceUri = sourceUris[index];

    const result = await runCompletePath({
      sourceUri,
      maxSizeBytes,
      reader,
      encodeBase64,
    });

    if (result.status === "FAIL") {
      publicErrorCode = normalizePublicErrorCode(result);
      images.push({
        mimeType: undefined,
        sizeBytes: undefined,
        status: "FAIL",
        errorCode: publicErrorCode,
      });
      break;
    }

    const expected = expectedImages[index];
    const matchesExpected =
      result.mimeType === expected.mimeType &&
      result.sizeBytes === expected.sizeBytes;

    if (!matchesExpected) {
      metadataMismatch = true;
      images.push({
        mimeType: result.mimeType,
        sizeBytes: result.sizeBytes,
        status: "FAIL",
      });
      break;
    }

    images.push({
      mimeType: result.mimeType,
      sizeBytes: result.sizeBytes,
      status: "PASS",
    });
    successfulImages += 1;
  }

  const record = createAggregateRecord({
    testCaseId: D17_OFFLINE_TEST_CASE_ID,
    requestedImages: sourceUris.length,
    attemptedImages,
    successfulImages,
    images,
    publicErrorCode,
    metadataMismatch,
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
  testCaseId,
  requestedImages,
  attemptedImages,
  successfulImages,
  images,
  publicErrorCode,
  metadataMismatch,
}) {
  const common = {
    testCaseId,
    requestedImages,
    attemptedImages,
    successfulImages,
  };

  if (
    attemptedImages === requestedImages &&
    successfulImages === requestedImages &&
    publicErrorCode === undefined &&
    metadataMismatch === false
  ) {
    return Object.freeze({
      ...common,
      status: "PASS",
      images,
      uiResponsive: true,
    });
  }

  if (publicErrorCode !== undefined) {
    return Object.freeze({
      ...common,
      status: "FAIL",
      images,
      uiResponsive: true,
      failureReason: "PUBLIC_ERROR",
      errorCode: publicErrorCode,
    });
  }

  return Object.freeze({
    ...common,
    status: "FAIL",
    images,
    uiResponsive: true,
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

function validateInputs({ sourceUris, expectedImages, reportMetadata }) {
  if (!Array.isArray(sourceUris) || sourceUris.length === 0) {
    throw new TypeError("sourceUris must be a non-empty array");
  }
  if (!Array.isArray(expectedImages)) {
    throw new TypeError("expectedImages must be an array");
  }
  if (expectedImages.length !== sourceUris.length) {
    throw new TypeError("expectedImages length must match sourceUris length");
  }
  for (const expected of expectedImages) {
    if (
      !expected ||
      typeof expected.mimeType !== "string" ||
      !Number.isSafeInteger(expected.sizeBytes) ||
      expected.sizeBytes <= 0
    ) {
      throw new TypeError(
        "each expectedImage must have mimeType and positive sizeBytes",
      );
    }
  }
  if (typeof reportMetadata !== "function") {
    throw new TypeError("reportMetadata must be a function");
  }
}
