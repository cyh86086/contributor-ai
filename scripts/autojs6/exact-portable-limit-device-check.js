/**
 * Runtime designation: non-production D13 evidence harness for the existing
 * portable exact-size boundary in AutoJs6.
 *
 * This wrapper delegates unchanged to the production reader and portable core
 * through runImageReaderDeviceCheck(). It only requires the sanitized success
 * size to equal the independently verified D13 fixture count.
 */

import { IMAGE_INPUT_ERROR_CODES } from "../../src/core/index.js";
import { runImageReaderDeviceCheck } from "./image-reader-device-check.js";

const PUBLIC_ERROR_CODES = new Set(Object.values(IMAGE_INPUT_ERROR_CODES));

export async function runExactPortableLimitDeviceCheck({
  expectedSizeBytes,
  maxSizeBytes,
  readerSafetyLimitBytes,
  reportMetadata = () => {},
  ...readerOptions
}) {
  validateLimits({
    expectedSizeBytes,
    maxSizeBytes,
    readerSafetyLimitBytes,
    reportMetadata,
  });

  const candidate = await runImageReaderDeviceCheck({
    ...readerOptions,
    maxSizeBytes,
    readerSafetyLimitBytes,
    reportMetadata: () => {},
  });
  const record = normalizeRecord({
    candidate,
    expectedSizeBytes,
    testCaseId: readerOptions.testCaseId,
  });

  reportMetadata(record);
  return record;
}

function normalizeRecord({ candidate, expectedSizeBytes, testCaseId }) {
  const status = safelyReadProperty(candidate, "status");
  const mimeType = safelyReadProperty(candidate, "mimeType");
  const sizeBytes = safelyReadProperty(candidate, "sizeBytes");

  if (
    status === "PASS" &&
    typeof mimeType === "string" &&
    sizeBytes === expectedSizeBytes
  ) {
    return Object.freeze({
      testCaseId,
      status: "PASS",
      mimeType,
      sizeBytes,
    });
  }

  const errorCode = safelyReadProperty(candidate, "errorCode");
  return Object.freeze({
    testCaseId,
    status: "FAIL",
    errorCode:
      status === "FAIL" && PUBLIC_ERROR_CODES.has(errorCode)
        ? errorCode
        : IMAGE_INPUT_ERROR_CODES.IMAGE_READ_FAILED,
  });
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

function validateLimits({
  expectedSizeBytes,
  maxSizeBytes,
  readerSafetyLimitBytes,
  reportMetadata,
}) {
  if (
    !Number.isSafeInteger(expectedSizeBytes) ||
    expectedSizeBytes <= 0 ||
    maxSizeBytes !== expectedSizeBytes
  ) {
    throw new TypeError(
      "D13 expectedSizeBytes and maxSizeBytes must be the same positive safe integer",
    );
  }
  if (
    !Number.isSafeInteger(readerSafetyLimitBytes) ||
    readerSafetyLimitBytes < maxSizeBytes
  ) {
    throw new TypeError(
      "D13 readerSafetyLimitBytes must not be lower than maxSizeBytes",
    );
  }
  if (typeof reportMetadata !== "function") {
    throw new TypeError("reportMetadata must be a function");
  }
}
