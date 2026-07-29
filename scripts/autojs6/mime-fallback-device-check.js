/**
 * Runtime designation: non-production D07 evidence harness for the existing
 * portable MIME signature fallback in AutoJs6.
 *
 * This file is derived from the existing image-reader device harness. It uses
 * the same production reader, validation, error mapping, and metadata-only
 * output, but wraps the reader passed to prepareImageInput() so only mimeType is
 * forced absent while the exact production-reader bytes are preserved.
 */

import { createAutoJs6AndroidImageReader } from "../../src/autojs6/android-image-reader.js";
import {
  IMAGE_INPUT_ERROR_CODES,
  prepareImageInput,
} from "../../src/core/index.js";

const PUBLIC_ERROR_CODES = new Set(Object.values(IMAGE_INPUT_ERROR_CODES));
const SAFE_CASE_ID = /^[A-Z0-9_-]{1,40}$/u;

export async function runMimeFallbackDeviceCheck({
  testCaseId,
  sourceUri,
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
  validateHarnessInputs({ testCaseId, reportMetadata });

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

    const evidenceReader = Object.freeze({
      canAccess(value) {
        return reader.canAccess(value);
      },
      async read(value) {
        const result = await reader.read(value);
        return Object.freeze({
          bytes: result.bytes,
          mimeType: undefined,
        });
      },
    });
    const result = await prepareImageInput({
      sourceUri,
      maxSizeBytes,
      reader: evidenceReader,
      isFileUriApproved,
    });
    record = Object.freeze({
      testCaseId,
      status: "PASS",
      mimeType: result.mimeType,
      sizeBytes: result.sizeBytes,
    });
  } catch (error) {
    record = Object.freeze({
      testCaseId,
      status: "FAIL",
      errorCode: PUBLIC_ERROR_CODES.has(error?.code)
        ? error.code
        : IMAGE_INPUT_ERROR_CODES.IMAGE_READ_FAILED,
    });
  }

  reportMetadata(record);
  return record;
}

function validateHarnessInputs({ testCaseId, reportMetadata }) {
  if (typeof testCaseId !== "string" || !SAFE_CASE_ID.test(testCaseId)) {
    throw new TypeError("testCaseId must be an opaque uppercase case ID");
  }
  if (typeof reportMetadata !== "function") {
    throw new TypeError("reportMetadata must be a function");
  }
}
