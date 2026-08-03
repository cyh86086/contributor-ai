/**
 * Offline test harness for D18 stream cleanup after success.
 *
 * Uses the production reader with an instrumented resolver that counts
 * close() invocations. Does not depend on Android, AutoJs6, or Node.js
 * production runtime.
 */
import { createAutoJs6AndroidImageReader } from "../../src/autojs6/android-image-reader.js";
import {
  IMAGE_INPUT_ERROR_CODES,
  normalizeMimeType,
} from "../../src/core/index.js";

const PUBLIC_ERROR_CODES = new Set(Object.values(IMAGE_INPUT_ERROR_CODES));

export async function runD18OfflineCheck({
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

  let closeCount = 0;
  const instrumentedResolver = createInstrumentedResolver(resolver, () => {
    closeCount += 1;
  });

  let record;
  try {
    const reader = createAutoJs6AndroidImageReader({
      context: null,
      contentResolver: instrumentedResolver,
      parseUri,
      javaBridge,
      isFileUriApproved,
      readerSafetyLimitBytes,
    });

    if ((await reader.canAccess(sourceUri)) !== true) {
      record = failureWithCloseCount(
        testCaseId,
        IMAGE_INPUT_ERROR_CODES.URI_ACCESS_DENIED,
        closeCount,
      );
    } else {
      const result = await reader.read(sourceUri);
      record = normalizeReaderResult({
        testCaseId,
        expectedMimeType,
        expectedSizeBytes,
        maxSizeBytes,
        result,
        closeCount,
      });
    }
  } catch (error) {
    record = failureWithCloseCount(
      testCaseId,
      normalizeErrorCode(error),
      closeCount,
    );
  }

  reportMetadata(record);
  return record;
}

function createInstrumentedResolver(resolver, onClose) {
  return {
    openInputStream(uri) {
      const stream = resolver.openInputStream(uri);
      if (stream == null) {
        return null;
      }
      return {
        read(buffer) {
          return stream.read(buffer);
        },
        close() {
          onClose();
          stream.close();
        },
      };
    },
    getType(uri) {
      return resolver.getType(uri);
    },
  };
}

function normalizeReaderResult({
  testCaseId,
  expectedMimeType,
  expectedSizeBytes,
  maxSizeBytes,
  result,
  closeCount,
}) {
  const bytes = safelyReadProperty(result, "bytes");
  const reportedMimeType = safelyReadProperty(result, "mimeType");

  if (!(bytes instanceof Uint8Array)) {
    return failureWithCloseCount(
      testCaseId,
      IMAGE_INPUT_ERROR_CODES.IMAGE_READ_FAILED,
      closeCount,
    );
  }
  if (bytes.byteLength === 0) {
    return failureWithCloseCount(
      testCaseId,
      IMAGE_INPUT_ERROR_CODES.EMPTY_IMAGE,
      closeCount,
    );
  }
  if (bytes.byteLength > maxSizeBytes) {
    return failureWithCloseCount(
      testCaseId,
      IMAGE_INPUT_ERROR_CODES.IMAGE_TOO_LARGE,
      closeCount,
    );
  }

  const mimeType = normalizeMimeType(reportedMimeType);
  if (mimeType !== expectedMimeType) {
    return failureWithCloseCount(
      testCaseId,
      IMAGE_INPUT_ERROR_CODES.UNSUPPORTED_MIME_TYPE,
      closeCount,
    );
  }
  if (bytes.byteLength !== expectedSizeBytes) {
    return Object.freeze({
      testCaseId,
      status: "FAIL",
      mimeType,
      sizeBytes: bytes.byteLength,
      closeCount,
      failureReason: "SIZE_MISMATCH",
    });
  }

  if (closeCount !== 2) {
    return Object.freeze({
      testCaseId,
      status: "FAIL",
      mimeType,
      sizeBytes: bytes.byteLength,
      closeCount,
      errorCode: "CLEANUP_FAILED",
    });
  }

  return Object.freeze({
    testCaseId,
    status: "PASS",
    mimeType,
    sizeBytes: bytes.byteLength,
    closeCount,
  });
}

function normalizeErrorCode(error) {
  const code = safelyReadProperty(error, "code");
  if (PUBLIC_ERROR_CODES.has(code)) {
    return code;
  }
  return IMAGE_INPUT_ERROR_CODES.IMAGE_READ_FAILED;
}

function failureWithCloseCount(testCaseId, errorCode, closeCount) {
  return Object.freeze({
    testCaseId,
    status: "FAIL",
    errorCode: PUBLIC_ERROR_CODES.has(errorCode)
      ? errorCode
      : IMAGE_INPUT_ERROR_CODES.IMAGE_READ_FAILED,
    closeCount,
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
  expectedSizeBytes,
  maxSizeBytes,
  reportMetadata,
}) {
  if (typeof testCaseId !== "string") {
    throw new TypeError("testCaseId must be a string");
  }
  if (typeof expectedMimeType !== "string") {
    throw new TypeError("expectedMimeType must be a string");
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
