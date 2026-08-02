import assert from "node:assert/strict";
import test from "node:test";

import { D15_READER_SAFETY_CEILING_OVERFLOW_CHECK_CASE } from "../scripts/autojs6/format-check-case-manifest.js";
import { runFormatCheck } from "../scripts/autojs6/format-check-launcher-core.js";
import { runReaderSafetyCeilingOverflowDeviceCheck } from "../scripts/autojs6/reader-safety-ceiling-overflow-device-check.js";

const TEST_CASE_ID = "D15_READER_SAFETY_CEILING_OVERFLOW";
const JPEG_BYTES = [0xff, 0xd8, 0xff, 0xe0, 0x11, 0x22, 0x33];

test("D15 observes production-path reader-ceiling IMAGE_READ_FAILED", async () => {
  const harness = createHarness();
  const record = await runReaderSafetyCeilingOverflowDeviceCheck(
    harness.options,
  );

  assert.deepEqual(record, failure("IMAGE_READ_FAILED"));
  assert.deepEqual(harness.reports, [record]);
  assert.equal(harness.metrics.openInputStreamCalls, 2);
  assert.equal(harness.metrics.readStreamClosed, true);
  assert.equal(Object.isFrozen(record), true);
  assert.deepEqual(Object.keys(record), ["testCaseId", "status", "errorCode"]);
  assert.equal(JSON.stringify(record).includes("controlled.invalid"), false);
});

test("D15 target flows through the stable responsive reporter", async () => {
  const harness = createHarness();
  const reports = [];
  const record = await runFormatCheck(
    D15_READER_SAFETY_CEILING_OVERFLOW_CHECK_CASE,
    {
      showInstructions: async () => {},
      pickSingleImage: async () => harness.options.sourceUri,
      executeOffUiThread: async (task) => ({
        value: await task(),
        uiResponsive: true,
      }),
      prepareSelectedImage: async () =>
        runReaderSafetyCeilingOverflowDeviceCheck(harness.options),
      reportMetadata: (reported) => reports.push(reported),
    },
  );

  assert.deepEqual(record, {
    testCaseId: TEST_CASE_ID,
    status: "FAIL",
    errorCode: "IMAGE_READ_FAILED",
    uiResponsive: true,
  });
  assert.deepEqual(reports, [record]);
  assert.deepEqual(Object.keys(record), [
    "testCaseId",
    "status",
    "errorCode",
    "uiResponsive",
  ]);
});

test("D15 preserves accidental success instead of manufacturing the target", async () => {
  const harness = createHarness({ bytes: JPEG_BYTES.slice(0, -1) });
  const record = await runReaderSafetyCeilingOverflowDeviceCheck(
    harness.options,
  );

  assert.deepEqual(record, {
    testCaseId: TEST_CASE_ID,
    status: "PASS",
    mimeType: "image/jpeg",
    sizeBytes: JPEG_BYTES.length - 1,
  });
});

test("D15 preserves access denial instead of relabeling it", async () => {
  const harness = createHarness({ accessDenied: true });
  const record = await runReaderSafetyCeilingOverflowDeviceCheck(
    harness.options,
  );

  assert.deepEqual(record, failure("URI_ACCESS_DENIED"));
});

test("D15 requires the portable limit at or above the verified source", async () => {
  const harness = createHarness();

  await assert.rejects(
    runReaderSafetyCeilingOverflowDeviceCheck({
      ...harness.options,
      maxSizeBytes: JPEG_BYTES.length - 1,
    }),
    /at or above expectedSizeBytes/u,
  );
});

test("D15 requires a lower positive reader ceiling", async () => {
  const harness = createHarness();

  await assert.rejects(
    runReaderSafetyCeilingOverflowDeviceCheck({
      ...harness.options,
      readerSafetyLimitBytes: JPEG_BYTES.length,
    }),
    /below expectedSizeBytes/u,
  );
});

function createHarness({
  bytes = JPEG_BYTES,
  accessDenied = false,
  expectedSizeBytes = JPEG_BYTES.length,
  maxSizeBytes = JPEG_BYTES.length,
  readerSafetyLimitBytes = JPEG_BYTES.length - 1,
} = {}) {
  const reports = [];
  const metrics = { openInputStreamCalls: 0, readStreamClosed: false };
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
        ? fakeStream([], () => {})
        : fakeStream([bytes], () => {
            metrics.readStreamClosed = true;
          });
    },
  };

  return {
    metrics,
    reports,
    options: {
      testCaseId: TEST_CASE_ID,
      sourceUri: ["content:", "", "controlled.invalid", "d15"].join("/"),
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

function fakeStream(steps, onClose) {
  let index = 0;
  return {
    read(target) {
      if (index >= steps.length) {
        return -1;
      }
      const step = steps[index++];
      const count = Math.min(step.length, target.length);
      for (let byteIndex = 0; byteIndex < count; byteIndex += 1) {
        target[byteIndex] = step[byteIndex];
      }
      if (count < step.length) {
        steps.splice(index, 0, step.slice(count));
      }
      return count;
    },
    close: onClose,
  };
}

function failure(errorCode) {
  return {
    testCaseId: TEST_CASE_ID,
    status: "FAIL",
    errorCode,
  };
}
