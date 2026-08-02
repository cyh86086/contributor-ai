import assert from "node:assert/strict";
import test from "node:test";

import { runPortableSizeOverflowDeviceCheck } from "../scripts/autojs6/portable-size-overflow-device-check.js";

const TEST_CASE_ID = "D14_PORTABLE_SIZE_OVERFLOW";
const JPEG_BYTES = [0xff, 0xd8, 0xff, 0xe0, 0x11, 0x22, 0x33];

test("D14 accepts only production-path IMAGE_TOO_LARGE", async () => {
  const harness = createHarness();
  const record = await runPortableSizeOverflowDeviceCheck(harness.options);

  assert.deepEqual(record, failure("IMAGE_TOO_LARGE"));
  assert.deepEqual(harness.reports, [record]);
  assert.equal(harness.metrics.openInputStreamCalls, 2);
  assert.equal(Object.isFrozen(record), true);
  assert.deepEqual(Object.keys(record), ["testCaseId", "status", "errorCode"]);
  assert.equal(JSON.stringify(record).includes("controlled.invalid"), false);
});

test("D14 fails closed when the selected source does not overflow", async () => {
  const harness = createHarness({ bytes: JPEG_BYTES.slice(0, -1) });
  const record = await runPortableSizeOverflowDeviceCheck(harness.options);

  assert.deepEqual(record, failure("IMAGE_READ_FAILED"));
});

test("D14 preserves a reader-ceiling failure without relabeling it", async () => {
  const harness = createHarness({
    bytes: new Array(65).fill(1),
    expectedSizeBytes: 7,
    maxSizeBytes: 6,
    readerSafetyLimitBytes: 64,
  });
  const record = await runPortableSizeOverflowDeviceCheck(harness.options);

  assert.deepEqual(record, failure("IMAGE_READ_FAILED"));
});

test("D14 preserves access denial without accepting it as overflow", async () => {
  const harness = createHarness({ accessDenied: true });
  const record = await runPortableSizeOverflowDeviceCheck(harness.options);

  assert.deepEqual(record, failure("URI_ACCESS_DENIED"));
});

test("D14 rejects a non-overflow static ordering", async () => {
  const harness = createHarness();

  await assert.rejects(
    runPortableSizeOverflowDeviceCheck({
      ...harness.options,
      maxSizeBytes: JPEG_BYTES.length,
    }),
    /greater than maxSizeBytes/u,
  );
});

test("D14 requires a reader ceiling above the verified source count", async () => {
  const harness = createHarness();

  await assert.rejects(
    runPortableSizeOverflowDeviceCheck({
      ...harness.options,
      readerSafetyLimitBytes: JPEG_BYTES.length,
    }),
    /greater than expectedSizeBytes/u,
  );
});

function createHarness({
  bytes = JPEG_BYTES,
  accessDenied = false,
  expectedSizeBytes = JPEG_BYTES.length,
  maxSizeBytes = JPEG_BYTES.length - 1,
  readerSafetyLimitBytes = 64,
} = {}) {
  const reports = [];
  const metrics = { openInputStreamCalls: 0 };
  const contentResolver = {
    getType() {
      return "image/jpeg";
    },
    openInputStream() {
      metrics.openInputStreamCalls += 1;
      if (accessDenied) {
        return null;
      }
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
      sourceUri: ["content:", "", "controlled.invalid", "d14"].join("/"),
      expectedSizeBytes,
      maxSizeBytes,
      readerSafetyLimitBytes,
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
