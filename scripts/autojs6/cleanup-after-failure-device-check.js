/**
 * Runtime designation: non-production evidence harness for D19 cleanup after
 * failure in AutoJs6.
 *
 * This harness instruments the ContentResolver's openInputStream() to return
 * proxied streams that count close() invocations and inject a controlled
 * mid-read failure. It does not modify the production reader source.
 */
import { createAutoJs6AndroidImageReader } from "../../src/autojs6/android-image-reader.js";
import {
  IMAGE_INPUT_ERROR_CODES,
  IMAGE_READER_ERROR_CLASSIFICATIONS,
} from "../../src/core/index.js";

const PUBLIC_ERROR_CODES = new Set(Object.values(IMAGE_INPUT_ERROR_CODES));
const SAFE_CASE_ID = /^[A-Z0-9_-]{1,40}$/u;
const SAFE_MIME_TYPE = /^image\/[a-z0-9.+-]+$/u;

export async function runCleanupAfterFailureDeviceCheck({
  testCaseId,
  sourceUri,
  expectedMimeType,
  expectedSizeBytes,
  maxSizeBytes,
  readerSafetyLimitBytes,
  failureAfterBytes,
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
    expectedSizeBytes,
    maxSizeBytes,
    failureAfterBytes,
    reportMetadata,
  });

  let closeCount = 0;
  const instrumentedResolver = createInstrumentedResolver(
    contentResolver,
    () => {
      closeCount += 1;
    },
    failureAfterBytes,
  );

  let record;
  try {
    const reader = createAutoJs6AndroidImageReader({
      context,
      contentResolver: instrumentedResolver,
      parseUri,
      javaBridge,
      isFileUriApproved,
      openFileReadOnly,
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
  if (typeof testCaseId !== "string" || !SAFE_CASE_ID.test(testCaseId)) {
    throw new TypeError("testCaseId must be an opaque uppercase case ID");
  }
  if (
    typeof expectedMimeType !== "string" ||
    !SAFE_MIME_TYPE.test(expectedMimeType)
  ) {
    throw new TypeError("expectedMimeType must be a normalized image MIME");
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
