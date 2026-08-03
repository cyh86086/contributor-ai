/**
 * Runtime designation: runtime-neutral orchestration for non-production
 * AutoJs6 image-format device-verification launchers.
 *
 * This module owns no Android, AutoJs6, Node.js, network, provider, queue,
 * Contributor app, or submission behavior.
 */

import { IMAGE_INPUT_ERROR_CODES } from "../../src/core/index.js";

const PUBLIC_ERROR_CODES = new Set(Object.values(IMAGE_INPUT_ERROR_CODES));
const CONTENT_URI = /^content:\/\/.+/u;
const SAFE_CASE_ID = /^[A-Z0-9_-]{1,40}$/u;
const SAFE_MIME_TYPE = /^image\/[a-z0-9.+-]+$/u;

export function normalizeFormatCheckErrorCode(value) {
  const code = safelyReadProperty(value, "code");
  if (PUBLIC_ERROR_CODES.has(code)) {
    return code;
  }

  const errorCode = safelyReadProperty(value, "errorCode");
  return PUBLIC_ERROR_CODES.has(errorCode)
    ? errorCode
    : IMAGE_INPUT_ERROR_CODES.IMAGE_READ_FAILED;
}

export async function runFormatCheck(formatCase, dependencies) {
  validateFormatCase(formatCase);
  validateDependencies(dependencies);

  const {
    showInstructions,
    pickSingleImage,
    executeOffUiThread,
    prepareSelectedImage,
    reportMetadata,
  } = dependencies;

  let record;
  try {
    await showInstructions({
      title: formatCase.title,
      instructionText: formatCase.instructionText,
    });
    const sourceUri = await pickSingleImage({
      pickerMimeType: formatCase.pickerMimeType,
      requestCode: formatCase.requestCode,
    });

    if (typeof sourceUri !== "string" || !CONTENT_URI.test(sourceUri)) {
      record = failure(
        formatCase.testCaseId,
        IMAGE_INPUT_ERROR_CODES.URI_ACCESS_DENIED,
        true,
      );
    } else {
      const execution = await executeOffUiThread(() =>
        prepareSelectedImage(sourceUri, formatCase.testCaseId),
      );
      record = normalizeExecution(formatCase, execution);
    }
  } catch (error) {
    record = failure(
      formatCase.testCaseId,
      normalizeFormatCheckErrorCode(error),
      false,
    );
  }

  reportMetadata(record);
  return record;
}

function normalizeExecution(formatCase, execution) {
  if (formatCase.verificationMode === "repeated-reads") {
    return normalizeRepeatedReadsExecution(formatCase, execution);
  }

  const uiResponsive = safelyReadProperty(execution, "uiResponsive");
  if (uiResponsive !== true) {
    return failure(
      formatCase.testCaseId,
      IMAGE_INPUT_ERROR_CODES.IMAGE_READ_FAILED,
      false,
    );
  }

  const result = safelyReadProperty(execution, "value");
  const status = safelyReadProperty(result, "status");
  const mimeType = safelyReadProperty(result, "mimeType");
  const sizeBytes = safelyReadProperty(result, "sizeBytes");

  if (
    status === "PASS" &&
    mimeType === formatCase.expectedMimeType &&
    Number.isSafeInteger(sizeBytes) &&
    sizeBytes > 0
  ) {
    return Object.freeze({
      testCaseId: formatCase.testCaseId,
      status: "PASS",
      mimeType,
      sizeBytes,
      uiResponsive,
    });
  }

  return failure(
    formatCase.testCaseId,
    status === "FAIL"
      ? normalizeFormatCheckErrorCode(result)
      : IMAGE_INPUT_ERROR_CODES.IMAGE_READ_FAILED,
    true,
  );
}

function normalizeRepeatedReadsExecution(formatCase, execution) {
  const uiResponsive = safelyReadProperty(execution, "uiResponsive");
  const result = safelyReadProperty(execution, "value");

  const requestedIterations = safelyReadProperty(result, "requestedIterations");
  const attemptedIterations = safelyReadProperty(result, "attemptedIterations");
  const successfulIterations = safelyReadProperty(
    result,
    "successfulIterations",
  );
  const allMetadataEqual = safelyReadProperty(result, "allMetadataEqual");

  const validCounters =
    requestedIterations === 10 &&
    Number.isSafeInteger(attemptedIterations) &&
    attemptedIterations >= 1 &&
    attemptedIterations <= requestedIterations &&
    Number.isSafeInteger(successfulIterations) &&
    successfulIterations >= 0 &&
    successfulIterations <= attemptedIterations &&
    typeof allMetadataEqual === "boolean";

  if (!validCounters) {
    return failure(
      formatCase.testCaseId,
      IMAGE_INPUT_ERROR_CODES.IMAGE_READ_FAILED,
      uiResponsive === true,
    );
  }

  const common = {
    testCaseId: formatCase.testCaseId,
    requestedIterations,
    attemptedIterations,
    successfulIterations,
  };

  if (uiResponsive !== true) {
    return Object.freeze({
      ...common,
      status: "FAIL",
      allMetadataEqual,
      uiResponsive: false,
      failureReason: "UI_NOT_RESPONSIVE",
    });
  }

  const status = safelyReadProperty(result, "status");
  const mimeType = safelyReadProperty(result, "mimeType");
  const sizeBytes = safelyReadProperty(result, "sizeBytes");

  if (
    status === "PASS" &&
    attemptedIterations === requestedIterations &&
    successfulIterations === requestedIterations &&
    mimeType === formatCase.expectedMimeType &&
    sizeBytes === formatCase.expectedSizeBytes &&
    allMetadataEqual === true
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

  const failureReason = safelyReadProperty(result, "failureReason");
  if (status === "FAIL" && failureReason === "PUBLIC_ERROR") {
    return Object.freeze({
      ...common,
      status: "FAIL",
      allMetadataEqual,
      uiResponsive: true,
      failureReason,
      errorCode: normalizeFormatCheckErrorCode(result),
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

function failure(testCaseId, errorCode, uiResponsive) {
  return Object.freeze({
    testCaseId,
    status: "FAIL",
    errorCode: PUBLIC_ERROR_CODES.has(errorCode)
      ? errorCode
      : IMAGE_INPUT_ERROR_CODES.IMAGE_READ_FAILED,
    uiResponsive: uiResponsive === true,
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

function validateFormatCase(formatCase) {
  if (
    !formatCase ||
    typeof formatCase.testCaseId !== "string" ||
    !SAFE_CASE_ID.test(formatCase.testCaseId) ||
    typeof formatCase.pickerMimeType !== "string" ||
    !SAFE_MIME_TYPE.test(formatCase.pickerMimeType) ||
    typeof formatCase.expectedMimeType !== "string" ||
    !SAFE_MIME_TYPE.test(formatCase.expectedMimeType) ||
    !Number.isSafeInteger(formatCase.requestCode) ||
    formatCase.requestCode <= 0 ||
    typeof formatCase.title !== "string" ||
    formatCase.title.length === 0 ||
    typeof formatCase.instructionText !== "string" ||
    formatCase.instructionText.length === 0
  ) {
    throw new TypeError("formatCase must be a valid static case definition");
  }
}

function validateDependencies(dependencies) {
  const required = [
    "showInstructions",
    "pickSingleImage",
    "executeOffUiThread",
    "prepareSelectedImage",
    "reportMetadata",
  ];
  for (const name of required) {
    if (typeof dependencies?.[name] !== "function") {
      throw new TypeError(`${name} must be a function`);
    }
  }
}
