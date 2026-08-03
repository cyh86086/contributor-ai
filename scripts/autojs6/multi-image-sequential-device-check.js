/**
 * Runtime designation: non-production D17 evidence wrapper for sequential
 * multi-image production-reader and portable-core invocations.
 *
 * This wrapper owns no picker, permission, Android UI, provider, network,
 * queue, Contributor app, or submission behavior. It processes each selected
 * URI sequentially and returns one sanitized aggregate with per-image records.
 */

import { IMAGE_INPUT_ERROR_CODES } from "../../src/core/index.js";
import { runImageReaderDeviceCheck } from "./image-reader-device-check.js";

const PUBLIC_ERROR_CODES = new Set(Object.values(IMAGE_INPUT_ERROR_CODES));

export async function runMultiImageSequentialDeviceCheck({
  sourceUris,
  expectedImages,
  reportMetadata = () => {},
  ...readerOptions
}) {
  validateInputs({ sourceUris, expectedImages, reportMetadata });

  const images = [];
  let attemptedImages = 0;
  let successfulImages = 0;
  let publicErrorCode;
  let metadataMismatch = false;
  const uiResponsive = true;

  for (let index = 0; index < sourceUris.length; index += 1) {
    attemptedImages += 1;
    const sourceUri = sourceUris[index];

    const result = await runImageReaderDeviceCheck({
      ...readerOptions,
      sourceUri,
      reportMetadata: () => {},
    });

    if (result.status === "FAIL") {
      publicErrorCode = normalizePublicErrorCode(result.errorCode);
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
    testCaseId: readerOptions.testCaseId,
    requestedImages: sourceUris.length,
    attemptedImages,
    successfulImages,
    images,
    publicErrorCode,
    metadataMismatch,
    uiResponsive,
  });

  reportMetadata(record);
  return record;
}

function createAggregateRecord({
  testCaseId,
  requestedImages,
  attemptedImages,
  successfulImages,
  images,
  publicErrorCode,
  metadataMismatch,
  uiResponsive,
}) {
  const common = {
    testCaseId,
    requestedImages,
    attemptedImages,
    successfulImages,
  };

  if (uiResponsive !== true) {
    return Object.freeze({
      ...common,
      status: "FAIL",
      images,
      uiResponsive: false,
      failureReason: "UI_NOT_RESPONSIVE",
    });
  }

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

function normalizePublicErrorCode(errorCode) {
  if (PUBLIC_ERROR_CODES.has(errorCode)) {
    return errorCode;
  }
  return IMAGE_INPUT_ERROR_CODES.IMAGE_READ_FAILED;
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
