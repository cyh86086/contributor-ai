import assert from "node:assert/strict";
import test from "node:test";

import { runD19OfflineCheck } from "./support/d19-offline-cleanup-after-failure-harness.js";
import { IMAGE_INPUT_ERROR_CODES } from "../src/core/index.js";

const TEST_CASE_ID = "D19_CLEANUP_AFTER_FAILURE";
const CONTENT_URI =
  "content://private.provider/image/606?token=private&name=secret.jpg";
const JPEG_BYTES = [0xff, 0xd8, 0xff, 0xe0, 0x11, 0x00];
const EXPECTED_SIZE = JPEG_BYTES.length;
const FAILURE_AFTER_BYTES = 3;

function createHarness(overrides = {}) {
  const bytes = overrides.bytes ?? JPEG_BYTES;
  const mimeType = overrides.mimeType ?? "image/jpeg";

  const resolver = {
    openInputStream: () => {
      let readPosition = 0;
      let closed = false;
      return {
        read: (buffer) => {
          if (closed) {
            return -1;
          }
          if (readPosition >= bytes.length) {
            return -1;
          }
          const count = Math.min(buffer.length, bytes.length - readPosition);
          for (let i = 0; i < count; i += 1) {
            buffer[i] = bytes[readPosition + i];
          }
          readPosition += count;
          return count;
        },
        close: () => {
          closed = true;
        },
      };
    },
    getType: () => mimeType,
  };

  const parseUri = (value) => ({ toString: () => value });
  const javaBridge = {
    createByteArray: (size) => new Uint8Array(size),
    classifyError: () => "IMAGE_READ_FAILED",
  };

  const reports = [];
  const reportMetadata = (record) => {
    reports.push(record);
  };

  return {
    options: {
      testCaseId: TEST_CASE_ID,
      sourceUri: CONTENT_URI,
      expectedMimeType: "image/jpeg",
      expectedSizeBytes: EXPECTED_SIZE,
      maxSizeBytes: overrides.maxSizeBytes ?? EXPECTED_SIZE,
      readerSafetyLimitBytes:
        overrides.readerSafetyLimitBytes ?? 12 * 1024 * 1024,
      failureAfterBytes: overrides.failureAfterBytes ?? FAILURE_AFTER_BYTES,
      resolver,
      parseUri,
      javaBridge,
      isFileUriApproved: () => false,
      reportMetadata,
    },
    reports,
  };
}

test("D19 PASS shape: IMAGE_READ_FAILED with closeCount === 1 after mid-read failure", async () => {
  const harness = createHarness();

  const record = await runD19OfflineCheck(harness.options);

  assert.deepEqual(record, {
    testCaseId: TEST_CASE_ID,
    status: "FAIL",
    errorCode: IMAGE_INPUT_ERROR_CODES.IMAGE_READ_FAILED,
    closeCount: 1,
  });
  assert.deepEqual(harness.reports, [record]);
  assert.equal(JSON.stringify(record).includes("private"), false);
});

test("D19 reports exactly one close after mid-read failure", async () => {
  const harness = createHarness();

  const record = await runD19OfflineCheck(harness.options);

  assert.equal(record.closeCount, 1);
  assert.equal(record.status, "FAIL");
  assert.equal(record.errorCode, "IMAGE_READ_FAILED");
});

test("D19 sanitizes output: no URI, bytes, or sensitive data", async () => {
  const harness = createHarness();

  const record = await runD19OfflineCheck(harness.options);

  const json = JSON.stringify(record);
  assert.equal(json.includes("private"), false);
  assert.equal(json.includes("token"), false);
  assert.equal(json.includes("secret"), false);
  assert.equal(json.includes("content://"), false);
});

test("D19 rejects non-positive failureAfterBytes", async () => {
  const harness = createHarness();
  harness.options.failureAfterBytes = 0;

  await assert.rejects(
    () => runD19OfflineCheck(harness.options),
    (error) => error instanceof TypeError,
  );
});

test("D19 rejects non-positive expectedSizeBytes", async () => {
  const harness = createHarness();
  harness.options.expectedSizeBytes = 0;

  await assert.rejects(
    () => runD19OfflineCheck(harness.options),
    (error) => error instanceof TypeError,
  );
});

test("D19 reports UNEXPECTED_SUCCESS when read completes without failure", async () => {
  const harness = createHarness({
    failureAfterBytes: 1_000_000,
  });

  const record = await runD19OfflineCheck(harness.options);

  assert.equal(record.status, "FAIL");
  assert.equal(record.failureReason, "UNEXPECTED_SUCCESS");
  assert.equal(record.closeCount, 1);
});

test("D19 handles null stream as IMAGE_READ_FAILED with closeCount 0", async () => {
  const resolver = {
    openInputStream: () => null,
    getType: () => "image/jpeg",
  };
  const parseUri = (value) => ({ toString: () => value });
  const javaBridge = {
    createByteArray: (size) => new Uint8Array(size),
    classifyError: () => "IMAGE_READ_FAILED",
  };
  const reports = [];

  const record = await runD19OfflineCheck({
    testCaseId: TEST_CASE_ID,
    sourceUri: CONTENT_URI,
    expectedMimeType: "image/jpeg",
    expectedSizeBytes: EXPECTED_SIZE,
    maxSizeBytes: EXPECTED_SIZE,
    readerSafetyLimitBytes: 12 * 1024 * 1024,
    failureAfterBytes: FAILURE_AFTER_BYTES,
    resolver,
    parseUri,
    javaBridge,
    isFileUriApproved: () => false,
    reportMetadata: (r) => reports.push(r),
  });

  assert.equal(record.status, "FAIL");
  assert.equal(record.errorCode, "CLEANUP_FAILED");
  assert.equal(record.closeCount, 0);
});
