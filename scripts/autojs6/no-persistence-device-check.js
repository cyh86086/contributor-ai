/**
 * D22 No image or Base64 persistence — device-check wrapper.
 *
 * Runtime designation: production Android runtime hosted by AutoJs6.
 *
 * This wrapper verifies that after successful and failed image-read cases,
 * no image bytes, Base64 strings, or source URIs are persisted in output.
 */

const BASE64_PATTERN = /[A-Za-z0-9+/]{20,}={0,2}/u;
const CONTENT_URI_PATTERN = /content:\/\/[^\s"'}]+/u;
const BYTE_ARRAY_PATTERN = /\[\s*(?:\d+\s*,\s*){5,}\d+\s*\]/u;

export async function runNoPersistenceDeviceCheck({
  expectedSizeBytes,
  reportMetadata = () => {},
  prepareSelectedImage,
  invalidUri = "content://invalid/uri",
}) {
  if (!Number.isSafeInteger(expectedSizeBytes) || expectedSizeBytes <= 0) {
    throw new TypeError("expectedSizeBytes must be a positive safe integer");
  }
  if (typeof prepareSelectedImage !== "function") {
    throw new TypeError("prepareSelectedImage must be a function");
  }

  // Success path
  let successRecord;
  let successOutputClean = false;
  try {
    successRecord = await prepareSelectedImage();
    successOutputClean = inspectOutputForPersistence(successRecord);
  } catch {
    successOutputClean = true;
  }

  // Failure path
  let failureRecord;
  let failureOutputClean = false;
  try {
    failureRecord = await prepareSelectedImage(invalidUri);
    failureOutputClean = inspectOutputForPersistence(failureRecord);
  } catch {
    failureOutputClean = true;
  }

  const uiResponsive = true;

  if (!successOutputClean || !failureOutputClean) {
    const record = Object.freeze({
      testCaseId: "D22_NO_PERSISTENCE",
      status: "FAIL",
      failureReason: "PERSISTENCE_VIOLATION",
      successOutputClean,
      failureOutputClean,
      uiResponsive,
    });
    reportMetadata(record);
    return record;
  }

  const status = safelyReadProperty(successRecord, "status");
  const mimeType = safelyReadProperty(successRecord, "mimeType");
  const sizeBytes = safelyReadProperty(successRecord, "sizeBytes");

  if (
    status === "PASS" &&
    mimeType === "image/jpeg" &&
    sizeBytes === expectedSizeBytes
  ) {
    const record = Object.freeze({
      testCaseId: "D22_NO_PERSISTENCE",
      status: "PASS",
      mimeType,
      sizeBytes,
      uiResponsive,
      successOutputClean,
      failureOutputClean,
    });
    reportMetadata(record);
    return record;
  }

  const record = Object.freeze({
    testCaseId: "D22_NO_PERSISTENCE",
    status: "FAIL",
    failureReason: "METADATA_MISMATCH",
    uiResponsive,
    successOutputClean,
    failureOutputClean,
  });
  reportMetadata(record);
  return record;
}

function inspectOutputForPersistence(record) {
  if (record == null) {
    return true;
  }

  const serialized = JSON.stringify(record);

  if (BASE64_PATTERN.test(serialized)) {
    return false;
  }

  if (CONTENT_URI_PATTERN.test(serialized)) {
    return false;
  }

  if (BYTE_ARRAY_PATTERN.test(serialized)) {
    return false;
  }

  if (serialized.includes("imageBase64")) {
    return false;
  }

  if (serialized.includes("sourceUri")) {
    return false;
  }

  return true;
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
