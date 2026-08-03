import assert from "node:assert/strict";
import test from "node:test";

import { runRepeatedReadsDeviceCheck } from "../scripts/autojs6/repeated-reads-device-check.js";

const TEST_CASE_ID = "D16_REPEATED_READS";
const SOURCE_URI = ["content:", "", "controlled.invalid", "d16-device"].join(
  "/",
);
const EXPECTED_SIZE_BYTES = 6;
const JPEG_BYTES = [0xff, 0xd8, 0xff, 0xe0, 0x11, 0x22];

test("D16 device wrapper emits one frozen 10-of-10 aggregate", async () => {
  const harness = createHarness();
  const record = await runRepeatedReadsDeviceCheck(harness.options);

  assert.deepEqual(record, {
    testCaseId: TEST_CASE_ID,
    requestedIterations: 10,
    attemptedIterations: 10,
    successfulIterations: 10,
    status: "PASS",
    mimeType: "image/jpeg",
    sizeBytes: EXPECTED_SIZE_BYTES,
    allMetadataEqual: true,
  });
  assert.equal(harness.metrics.accessCalls, 10);
  assert.equal(harness.metrics.readCalls, 10);
  assert.deepEqual(harness.reports, [record]);
  assert.equal(Object.isFrozen(record), true);
  assertSanitized(record);
});

test("D16 device wrapper preserves a stable public error and fails fast", async () => {
  const harness = createHarness({ failIteration: 4 });
  const record = await runRepeatedReadsDeviceCheck(harness.options);

  assert.deepEqual(record, {
    testCaseId: TEST_CASE_ID,
    requestedIterations: 10,
    attemptedIterations: 4,
    successfulIterations: 3,
    status: "FAIL",
    allMetadataEqual: false,
    failureReason: "PUBLIC_ERROR",
    errorCode: "IMAGE_READ_FAILED",
  });
  assert.equal(harness.metrics.accessCalls, 4);
  assert.equal(harness.metrics.readCalls, 4);
  assert.deepEqual(harness.reports, [record]);
  assertSanitized(record);
});

test("D16 device wrapper stops on metadata mismatch without errorCode", async () => {
  const harness = createHarness({ mismatchIteration: 4 });
  const record = await runRepeatedReadsDeviceCheck(harness.options);

  assert.deepEqual(record, {
    testCaseId: TEST_CASE_ID,
    requestedIterations: 10,
    attemptedIterations: 4,
    successfulIterations: 3,
    status: "FAIL",
    allMetadataEqual: false,
    failureReason: "METADATA_MISMATCH",
  });
  assert.equal(harness.metrics.accessCalls, 4);
  assert.equal(harness.metrics.readCalls, 4);
  assert.equal(Object.hasOwn(record, "errorCode"), false);
  assert.deepEqual(harness.reports, [record]);
  assertSanitized(record);
});

function createHarness({ failIteration, mismatchIteration } = {}) {
  const reports = [];
  const metrics = {
    accessCalls: 0,
    readCalls: 0,
    currentIteration: 0,
  };

  const contentResolver = {
    getType() {
      return "image/jpeg";
    },
    openInputStream() {
      if (metrics.accessCalls === metrics.readCalls) {
        metrics.currentIteration += 1;
        metrics.accessCalls += 1;
        return fakeStream([]);
      }

      metrics.readCalls += 1;
      if (metrics.currentIteration === failIteration) {
        return null;
      }

      const bytes =
        metrics.currentIteration === mismatchIteration
          ? JPEG_BYTES.slice(0, -1)
          : JPEG_BYTES;
      return fakeStream([bytes]);
    },
  };

  return {
    metrics,
    reports,
    options: {
      testCaseId: TEST_CASE_ID,
      sourceUri: SOURCE_URI,
      expectedSizeBytes: EXPECTED_SIZE_BYTES,
      maxSizeBytes: EXPECTED_SIZE_BYTES,
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
      isFileUriApproved: () => false,
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

function assertSanitized(record) {
  const serialized = JSON.stringify(record);
  assert.equal(serialized.includes(SOURCE_URI), false);

  for (const prohibitedField of [
    "sourceUri",
    "path",
    "filename",
    "bytes",
    "imageBase64",
    "exception",
    "message",
    "stack",
    "cause",
    "iterations",
  ]) {
    assert.equal(Object.hasOwn(record, prohibitedField), false);
  }
}

import { D16_REPEATED_READS_CHECK_CASE } from "../scripts/autojs6/format-check-case-manifest.js";
import { runFormatCheck } from "../scripts/autojs6/format-check-launcher-core.js";

test("D16 launcher emits the approved responsive success aggregate", async () => {
  const reports = [];
  const record = await runFormatCheck(D16_REPEATED_READS_CHECK_CASE, {
    showInstructions: async () => {},
    pickSingleImage: async () => SOURCE_URI,
    executeOffUiThread: async (task) => ({
      value: await task(),
      uiResponsive: true,
    }),
    prepareSelectedImage: async () => ({
      testCaseId: TEST_CASE_ID,
      requestedIterations: 10,
      attemptedIterations: 10,
      successfulIterations: 10,
      status: "PASS",
      mimeType: "image/jpeg",
      sizeBytes: 6_406,
      allMetadataEqual: true,
    }),
    reportMetadata: (record) => reports.push(record),
  });

  assert.deepEqual(record, {
    testCaseId: TEST_CASE_ID,
    requestedIterations: 10,
    attemptedIterations: 10,
    successfulIterations: 10,
    status: "PASS",
    mimeType: "image/jpeg",
    sizeBytes: 6_406,
    allMetadataEqual: true,
    uiResponsive: true,
  });
  assert.deepEqual(reports, [record]);
  assert.equal(Object.isFrozen(record), true);
});

test("D16 launcher applies UI_NOT_RESPONSIVE precedence", async () => {
  const reports = [];
  const record = await runFormatCheck(D16_REPEATED_READS_CHECK_CASE, {
    showInstructions: async () => {},
    pickSingleImage: async () => SOURCE_URI,
    executeOffUiThread: async (task) => ({
      value: await task(),
      uiResponsive: false,
    }),
    prepareSelectedImage: async () => ({
      testCaseId: TEST_CASE_ID,
      requestedIterations: 10,
      attemptedIterations: 4,
      successfulIterations: 3,
      status: "FAIL",
      allMetadataEqual: false,
      failureReason: "PUBLIC_ERROR",
      errorCode: "IMAGE_READ_FAILED",
    }),
    reportMetadata: (record) => reports.push(record),
  });

  assert.deepEqual(record, {
    testCaseId: TEST_CASE_ID,
    requestedIterations: 10,
    attemptedIterations: 4,
    successfulIterations: 3,
    status: "FAIL",
    allMetadataEqual: false,
    uiResponsive: false,
    failureReason: "UI_NOT_RESPONSIVE",
  });
  assert.equal(Object.hasOwn(record, "errorCode"), false);
  assert.deepEqual(reports, [record]);
  assert.equal(Object.isFrozen(record), true);
});
