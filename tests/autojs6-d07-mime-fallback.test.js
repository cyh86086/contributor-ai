import assert from "node:assert/strict";
import test from "node:test";

import { runMimeFallbackDeviceCheck } from "../scripts/autojs6/mime-fallback-device-check.js";
import {
  IMAGE_INPUT_ERROR_CODES,
  IMAGE_READER_ERROR_CLASSIFICATIONS,
} from "../src/core/index.js";

const TEST_CASE_ID = "D07_MIME_FALLBACK";
const CONTENT_URI =
  "content://private.provider/image/707?token=private&name=secret.jpg";
const JPEG_BYTES = [0xff, 0xd8, 0xff, 0xe0];
const PNG_BYTES = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];

test("D07 forces absent reader MIME and falls back to JPEG bytes", async () => {
  const harness = createHarness({
    mimeType: "image/png",
    bytes: JPEG_BYTES,
  });

  const record = await runMimeFallbackDeviceCheck(harness.options);

  assert.deepEqual(record, {
    testCaseId: TEST_CASE_ID,
    status: "PASS",
    mimeType: "image/jpeg",
    sizeBytes: JPEG_BYTES.length,
  });
  assert.deepEqual(harness.reports, [record]);
  assert.equal(harness.metrics.getTypeCalls, 1);
  assert.equal(harness.metrics.openInputStreamCalls, 2);
  assert.equal(JSON.stringify(record).includes("private"), false);
});

test("D07 does not allow a reported JPEG MIME to override PNG signature bytes", async () => {
  const harness = createHarness({
    mimeType: "image/jpeg",
    bytes: PNG_BYTES,
  });

  const record = await runMimeFallbackDeviceCheck(harness.options);

  assert.deepEqual(record, {
    testCaseId: TEST_CASE_ID,
    status: "PASS",
    mimeType: "image/png",
    sizeBytes: PNG_BYTES.length,
  });
});

test("D07 preserves the exact production-reader byte count", async () => {
  const bytes = [...JPEG_BYTES, 0x11, 0x22, 0x33];
  const harness = createHarness({ mimeType: "text/plain", bytes });

  const record = await runMimeFallbackDeviceCheck(harness.options);

  assert.equal(record.status, "PASS");
  assert.equal(record.mimeType, "image/jpeg");
  assert.equal(record.sizeBytes, bytes.length);
});

test("D07 rejects unsupported bytes after controlled MIME removal", async () => {
  const harness = createHarness({
    mimeType: "image/jpeg",
    bytes: [0x01, 0x02, 0x03, 0x04],
  });

  const record = await runMimeFallbackDeviceCheck(harness.options);

  assert.deepEqual(
    record,
    failure(IMAGE_INPUT_ERROR_CODES.UNSUPPORTED_MIME_TYPE),
  );
});

test("D07 preserves URI access denial classification", async () => {
  const harness = createHarness({ accessDenied: true });
  const record = await runMimeFallbackDeviceCheck(harness.options);

  assert.deepEqual(record, failure(IMAGE_INPUT_ERROR_CODES.URI_ACCESS_DENIED));
  assert.equal(JSON.stringify(record).includes(CONTENT_URI), false);
});

test("D07 preserves read-time permission revocation classification", async () => {
  const harness = createHarness({
    readError: runtimeError(
      IMAGE_READER_ERROR_CLASSIFICATIONS.URI_ACCESS_DENIED,
      `private ${CONTENT_URI}`,
    ),
  });
  const record = await runMimeFallbackDeviceCheck(harness.options);

  assert.deepEqual(record, failure(IMAGE_INPUT_ERROR_CODES.URI_ACCESS_DENIED));
  assert.equal(JSON.stringify(record).includes("private"), false);
});

test("D07 preserves ordinary read failure sanitization", async () => {
  const harness = createHarness({
    readError: runtimeError(
      IMAGE_READER_ERROR_CLASSIFICATIONS.IMAGE_READ_FAILED,
      `private ${CONTENT_URI}`,
    ),
  });
  const record = await runMimeFallbackDeviceCheck(harness.options);

  assert.deepEqual(record, failure(IMAGE_INPUT_ERROR_CODES.IMAGE_READ_FAILED));
  assert.equal(JSON.stringify(record).includes("private"), false);
});

function createHarness({
  mimeType = "image/jpeg",
  bytes = JPEG_BYTES,
  maxSizeBytes = 64,
  accessDenied = false,
  readError,
} = {}) {
  const reports = [];
  const metrics = {
    getTypeCalls: 0,
    openInputStreamCalls: 0,
  };

  const contentResolver = {
    getType() {
      metrics.getTypeCalls += 1;
      return mimeType;
    },
    openInputStream() {
      metrics.openInputStreamCalls += 1;
      if (metrics.openInputStreamCalls === 1) {
        return accessDenied ? null : fakeStream([]);
      }
      if (readError) {
        throw readError;
      }
      return fakeStream([bytes]);
    },
  };

  return {
    metrics,
    reports,
    options: {
      testCaseId: TEST_CASE_ID,
      sourceUri: CONTENT_URI,
      maxSizeBytes,
      readerSafetyLimitBytes: 128,
      contentResolver,
      parseUri: (uri) => ({ uri }),
      javaBridge: {
        createByteArray(size) {
          return new Int8Array(size);
        },
        classifyError(error) {
          return (
            error?.runtimeClassification ??
            IMAGE_READER_ERROR_CLASSIFICATIONS.IMAGE_READ_FAILED
          );
        },
      },
      reportMetadata: (record) => reports.push(record),
    },
  };
}

function fakeStream(steps) {
  let index = 0;
  return {
    read(target) {
      if (index >= steps.length) {
        return -1;
      }
      const step = steps[index++];
      for (let byteIndex = 0; byteIndex < step.length; byteIndex += 1) {
        target[byteIndex] = step[byteIndex];
      }
      return step.length;
    },
    close() {},
  };
}

function runtimeError(runtimeClassification, message) {
  const error = new Error(message);
  error.runtimeClassification = runtimeClassification;
  return error;
}

function failure(errorCode) {
  return {
    testCaseId: TEST_CASE_ID,
    status: "FAIL",
    errorCode,
  };
}
