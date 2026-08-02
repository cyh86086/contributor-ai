import assert from "node:assert/strict";
import test from "node:test";

import { runExactPortableLimitDeviceCheck } from "../scripts/autojs6/exact-portable-limit-device-check.js";

const TEST_CASE_ID = "D13_EXACT_PORTABLE_LIMIT";
const CONTENT_URI = "content://controlled.invalid/d13-exact-boundary";
const JPEG_BYTES = [0xff, 0xd8, 0xff, 0xe0, 0x11, 0x22];

test("D13 accepts only the exact production-reader byte count", async () => {
  const harness = createHarness();
  const record = await runExactPortableLimitDeviceCheck(harness.options);

  assert.deepEqual(record, {
    testCaseId: TEST_CASE_ID,
    status: "PASS",
    mimeType: "image/jpeg",
    sizeBytes: JPEG_BYTES.length,
  });
  assert.deepEqual(harness.reports, [record]);
  assert.equal(harness.metrics.openInputStreamCalls, 2);
  assert.equal(JSON.stringify(record).includes("private"), false);
});

test("D13 rejects a smaller successful source instead of creating PASS", async () => {
  const harness = createHarness({ bytes: JPEG_BYTES.slice(0, -1) });
  const record = await runExactPortableLimitDeviceCheck(harness.options);

  assert.deepEqual(record, failure("IMAGE_READ_FAILED"));
});

test("D13 preserves portable overflow as IMAGE_TOO_LARGE", async () => {
  const harness = createHarness({ bytes: [...JPEG_BYTES, 0x33] });
  const record = await runExactPortableLimitDeviceCheck(harness.options);

  assert.deepEqual(record, failure("IMAGE_TOO_LARGE"));
});

test("D13 requires matching portable and independently verified counts", async () => {
  const harness = createHarness();

  await assert.rejects(
    runExactPortableLimitDeviceCheck({
      ...harness.options,
      maxSizeBytes: JPEG_BYTES.length + 1,
    }),
    /same positive safe integer/u,
  );
});

test("D13 requires a reader ceiling not lower than the portable limit", async () => {
  const harness = createHarness();

  await assert.rejects(
    runExactPortableLimitDeviceCheck({
      ...harness.options,
      readerSafetyLimitBytes: JPEG_BYTES.length - 1,
    }),
    /must not be lower/u,
  );
});

function createHarness({ bytes = JPEG_BYTES } = {}) {
  const reports = [];
  const metrics = { openInputStreamCalls: 0 };
  const contentResolver = {
    getType() {
      return "image/jpeg";
    },
    openInputStream() {
      metrics.openInputStreamCalls += 1;
      return metrics.openInputStreamCalls === 1
        ? fakeStream([])
        : fakeStream([bytes]);
    },
  };

  return {
    metrics,
    reports,
    options: {
      testCaseId: TEST_CASE_ID,
      sourceUri: CONTENT_URI,
      expectedSizeBytes: JPEG_BYTES.length,
      maxSizeBytes: JPEG_BYTES.length,
      readerSafetyLimitBytes: 64,
      contentResolver,
      parseUri: (uri) => ({ uri }),
      javaBridge: {
        createByteArray(size) {
          return new Int8Array(size);
        },
        classifyError() {
          return "IMAGE_READ_FAILED";
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

function failure(errorCode) {
  return {
    testCaseId: TEST_CASE_ID,
    status: "FAIL",
    errorCode,
  };
}
