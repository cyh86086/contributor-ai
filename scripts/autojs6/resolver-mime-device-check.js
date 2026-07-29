/**
 * Runtime designation: non-production evidence harness for Android
 * ContentResolver MIME provenance in AutoJs6.
 *
 * This harness uses the existing production image reader directly and does not
 * call prepareImageInput(), so byte-signature MIME fallback cannot satisfy D06.
 */
import { createAutoJs6AndroidImageReader } from "../../src/autojs6/android-image-reader.js";
import {
  IMAGE_INPUT_ERROR_CODES,
  IMAGE_READER_ERROR_CLASSIFICATIONS,
  normalizeMimeType,
} from "../../src/core/index.js";

const PUBLIC_ERROR_CODES = new Set(Object.values(IMAGE_INPUT_ERROR_CODES));
const SAFE_CASE_ID = /^[A-Z0-9_-]{1,40}$/u;
const SAFE_MIME_TYPE = /^image\/[a-z0-9.+-]+$/u;

export async function runResolverMimeDeviceCheck({
  testCaseId,
  sourceUri,
  expectedMimeType,
  maxSizeBytes,
  readerSafetyLimitBytes,
  context,
  contentResolver,
  parseUri,
  javaBridge,
  isFileUriApproved = () => false,
  openFileReadOnly,
  reportMetadata = () => {},
}) {
  validateInputs({
    testCaseId,
    expectedMimeType,
    maxSizeBytes,
    reportMetadata,
  });

  let record;
  try {
    const reader = createAutoJs6AndroidImageReader({
      context,
      contentResolver,
      parseUri,
      javaBridge,
      isFileUriApproved,
      openFileReadOnly,
      readerSafetyLimitBytes,
    });

    if ((await reader.canAccess(sourceUri)) !== true) {
      record = failure(testCaseId, IMAGE_INPUT_ERROR_CODES.URI_ACCESS_DENIED);
    } else {
      const result = await reader.read(sourceUri);
      record = normalizeReaderResult({
        testCaseId,
        expectedMimeType,
        maxSizeBytes,
        result,
      });
    }
  } catch (error) {
    record = failure(testCaseId, normalizeErrorCode(error));
  }

  reportMetadata(record);
  return record;
}

function normalizeReaderResult({
  testCaseId,
  expectedMimeType,
  maxSizeBytes,
  result,
}) {
  const bytes = safelyReadProperty(result, "bytes");
  const reportedMimeType = safelyReadProperty(result, "mimeType");

  if (!(bytes instanceof Uint8Array)) {
    return failure(testCaseId, IMAGE_INPUT_ERROR_CODES.IMAGE_READ_FAILED);
  }
  if (bytes.byteLength === 0) {
    return failure(testCaseId, IMAGE_INPUT_ERROR_CODES.EMPTY_IMAGE);
  }
  if (bytes.byteLength > maxSizeBytes) {
    return failure(testCaseId, IMAGE_INPUT_ERROR_CODES.IMAGE_TOO_LARGE);
  }

  const mimeType = normalizeMimeType(reportedMimeType);
  if (mimeType !== expectedMimeType) {
    return failure(testCaseId, IMAGE_INPUT_ERROR_CODES.UNSUPPORTED_MIME_TYPE);
  }

  return Object.freeze({
    testCaseId,
    status: "PASS",
    mimeType,
    sizeBytes: bytes.byteLength,
  });
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

function failure(testCaseId, errorCode) {
  return Object.freeze({
    testCaseId,
    status: "FAIL",
    errorCode: PUBLIC_ERROR_CODES.has(errorCode)
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

function validateInputs({
  testCaseId,
  expectedMimeType,
  maxSizeBytes,
  reportMetadata,
}) {
  if (typeof testCaseId !== "string" || !SAFE_CASE_ID.test(testCaseId)) {
    throw new TypeError("testCaseId must be an opaque uppercase case ID");
  }
  if (
    typeof expectedMimeType !== "string" ||
    !SAFE_MIME_TYPE.test(expectedMimeType) ||
    normalizeMimeType(expectedMimeType) !== expectedMimeType
  ) {
    throw new TypeError("expectedMimeType must be a normalized image MIME");
  }
  if (!Number.isSafeInteger(maxSizeBytes) || maxSizeBytes <= 0) {
    throw new TypeError("maxSizeBytes must be a positive safe integer");
  }
  if (typeof reportMetadata !== "function") {
    throw new TypeError("reportMetadata must be a function");
  }
}
