import assert from "node:assert/strict";
import test from "node:test";

import { runImageReaderDeviceCheck } from "../scripts/autojs6/image-reader-device-check.js";

const TEST_CASE_ID = "D12_NULL_STREAM";
const SYNTHETIC_SOURCE_URI = "content://d12.invalid/offline-only";
const UNSET = Symbol("unset");

// Fake-only offline contract: this is not Android, provider, device, or D11
// missing-source evidence, and it requires no device execution.
test("D12 fake-only offline contract maps read-stage null to sanitized IMAGE_READ_FAILED", async () => {
  const reports = [];
  const metrics = {
    classifyErrorCalls: 0,
    createByteArrayCalls: 0,
    getTypeCalls: 0,
    openInputStreamCalls: 0,
    probeCloseCalls: 0,
    probeCreated: false,
    secondOpenResult: UNSET,
  };

  const contentResolver = {
    getType() {
      metrics.getTypeCalls += 1;
      return "image/jpeg";
    },
    openInputStream() {
      metrics.openInputStreamCalls += 1;

      if (metrics.openInputStreamCalls === 1) {
        metrics.probeCreated = true;
        return {
          close() {
            metrics.probeCloseCalls += 1;
          },
        };
      }

      if (metrics.openInputStreamCalls === 2) {
        metrics.secondOpenResult = null;
        return metrics.secondOpenResult;
      }

      assert.fail("D12 fake resolver received an unexpected stream open");
    },
  };

  const record = await runImageReaderDeviceCheck({
    testCaseId: TEST_CASE_ID,
    sourceUri: SYNTHETIC_SOURCE_URI,
    maxSizeBytes: 64,
    readerSafetyLimitBytes: 128,
    contentResolver,
    parseUri: (uri) => ({ uri }),
    javaBridge: {
      createByteArray(size) {
        metrics.createByteArrayCalls += 1;
        return new Int8Array(size);
      },
      classifyError() {
        metrics.classifyErrorCalls += 1;
        return "URI_ACCESS_DENIED";
      },
    },
    reportMetadata: (value) => reports.push(value),
  });

  assert.equal(metrics.openInputStreamCalls, 2);
  assert.equal(metrics.probeCreated, true);
  assert.equal(metrics.probeCloseCalls, 1);
  assert.equal(metrics.secondOpenResult, null);
  assert.equal(metrics.getTypeCalls, 1);
  assert.equal(metrics.createByteArrayCalls, 0);
  assert.equal(metrics.classifyErrorCalls, 0);

  assert.deepEqual(record, {
    testCaseId: TEST_CASE_ID,
    status: "FAIL",
    errorCode: "IMAGE_READ_FAILED",
  });
  assert.equal(Object.isFrozen(record), true);
  assert.deepEqual(Object.keys(record), ["testCaseId", "status", "errorCode"]);

  assert.equal(reports.length, 1);
  assert.equal(reports[0], record);
  assert.equal(Object.isFrozen(reports[0]), true);

  for (const prohibitedField of [
    "sourceUri",
    "mimeType",
    "sizeBytes",
    "exception",
    "cause",
    "message",
    "stack",
    "extra",
  ]) {
    assert.equal(Object.hasOwn(record, prohibitedField), false);
  }

  assert.equal(JSON.stringify(record).includes(SYNTHETIC_SOURCE_URI), false);
  assert.equal(JSON.stringify(reports).includes(SYNTHETIC_SOURCE_URI), false);
});
