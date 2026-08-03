/**
 * Offline test harness for D19 cleanup after failure.
 *
 * Uses the production reader with an instrumented resolver that counts
 * close() invocations and injects a controlled mid-read failure. Does not
 * depend on Android, AutoJs6, or Node.js production runtime.
 */
import { createAutoJs6AndroidImageReader } from "../../src/autojs6/android-image-reader.js";
import {
  IMAGE_INPUT_ERROR_CODES,
  IMAGE_READER_ERROR_CLASSIFICATIONS,
} from "../../src/core/index.js";

const PUBLIC_ERROR_CODES = new Set(Object.values(IMAGE_INPUT_ERROR_CODES));

export async function runD19OfflineCheck({
  testCaseId,
  sourceUri,
  expectedMimeType,
  expectedSizeBytes,
  maxSizeBytes,
  readerSafetyLimitBytes,
  failureAfterBytes,
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
    failureAfterBytes,
    reportMetadata,
  });

  let closeCount = 0;
  const instrumentedResolver = createInstrumentedResolver(
    resolver,
    () => {
      closeCount += 1;
    },
    failureAfterBytes,
  );

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

    await reader.read(sourceUri);
    record = normalizeUnexpectedSuccess({
      testCaseId,
      closeCount,
    });
  } catch (error) {
    record = normalizeFailure({
      testCaseId,
      error,
      closeCount,
    });
  }

  reportMetadata(record);
  return record;
}

function createInstrumentedResolver(resolver, onClose, failureAfterBytes) {
  let totalBytesRead = 0;
  return {
    openInputStream(uri) {
      const stream = resolver.openInputStream(uri);
      if (stream == null) {
        return null;
      }
      return {
        read(buffer) {
          const count = stream.read(buffer);
          if (count > 0) {
            totalBytesRead += count;
            if (totalBytesRead > failureAfterBytes) {
              throw new Error("D19 controlled mid-read failure");
            }
          }
          return count;
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

function normalizeFailure({ testCaseId, error, closeCount }) {
  const errorCode = normalizeErrorCode(error);

  if (closeCount !== 1) {
    return Object.freeze({
      testCaseId,
      status: "FAIL",
      errorCode: "CLEANUP_FAILED",
      closeCount,
    });
  }

  return Object.freeze({
    testCaseId,
    status: "FAIL",
    errorCode,
    closeCount,
  });
}

function normalizeUnexpectedSuccess({ testCaseId, closeCount }) {
  return Object.freeze({
    testCaseId,
    status: "FAIL",
    failureReason: "UNEXPECTED_SUCCESS",
    closeCount,
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
  failureAfterBytes,
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
  if (!Number.isSafeInteger(failureAfterBytes) || failureAfterBytes <= 0) {
    throw new TypeError("failureAfterBytes must be a positive safe integer");
  }
  if (typeof reportMetadata !== "function") {
    throw new TypeError("reportMetadata must be a function");
  }
}
