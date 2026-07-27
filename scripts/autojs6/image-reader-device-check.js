/**
 * Runtime designation: non-production verification harness template for the
 * Android AutoJs6 runtime. Node.js may lint this file but is not a production
 * or device-verification runtime.
 *
 * This template has no implicit globals, device paths, personal URIs, network
 * calls, provider calls, queue behavior, Contributor app behavior, or
 * submission behavior.
 */

import { createAutoJs6AndroidImageReader } from "../../src/autojs6/android-image-reader.js";
import {
  IMAGE_INPUT_ERROR_CODES,
  prepareImageInput,
} from "../../src/core/index.js";

const PUBLIC_ERROR_CODES = new Set(Object.values(IMAGE_INPUT_ERROR_CODES));
const SAFE_CASE_ID = /^[A-Z0-9_-]{1,40}$/u;

export async function runImageReaderDeviceCheck({
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
    const result = await prepareImageInput({
      sourceUri,
      maxSizeBytes,
      reader,
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
