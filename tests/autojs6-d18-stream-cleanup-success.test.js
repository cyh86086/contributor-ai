import assert from "node:assert/strict";
import test from "node:test";

import { runD18OfflineCheck } from "./support/d18-offline-stream-cleanup-harness.js";
import { IMAGE_INPUT_ERROR_CODES } from "../src/core/index.js";

const TEST_CASE_ID = "D18_STREAM_CLEANUP_SUCCESS";
const CONTENT_URI =
  "content://private.provider/image/606?token=private&name=secret.jpg";
const JPEG_BYTES = [0xff, 0xd8, 0xff, 0xe0, 0x11, 0x00];
const EXPECTED_SIZE = JPEG_BYTES.length;

function createHarness(overrides = {}) {
  const bytes = overrides.bytes ?? JPEG_BYTES;
  const mimeType = overrides.mimeType ?? "image/jpeg";
  const accessDenied = overrides.accessDenied ?? false;
  const readError = overrides.readError ?? false;
  let openInputStreamCalls = 0;

  const resolver = {
    openInputStream: () => {
      openInputStreamCalls += 1;
      if (accessDenied) {
        const error = new Error("access denied");
        error.javaException = Object.create(null);
        throw error;
      }
      let readPosition = 0;
      let closed = false;
      return {
        read: (buffer) => {
          if (readError) {
            throw new Error("read failed");
          }
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
      resolver,
      parseUri,
      javaBridge,
      isFileUriApproved: () => false,
      reportMetadata,
    },
    reports,
    metrics: {
      openInputStreamCalls,
    },
  };
}

function failure(errorCode, closeCount) {
  return Object.freeze({
    testCaseId: TEST_CASE_ID,
    status: "FAIL",
    errorCode,
    closeCount: closeCount ?? 0,
  });
}

test("D18 PASS with closeCount === 2 after successful read (canAccess + read)", async () => {
  const harness = createHarness();

  const record = await runD18OfflineCheck(harness.options);

  assert.deepEqual(record, {
    testCaseId: TEST_CASE_ID,
    status: "PASS",
    mimeType: "image/jpeg",
    sizeBytes: EXPECTED_SIZE,
    closeCount: 2,
  });
  assert.deepEqual(harness.reports, [record]);
  assert.equal(JSON.stringify(record).includes("private"), false);
});

test("D18 maps inaccessible probe to URI_ACCESS_DENIED with closeCount", async () => {
  const harness = createHarness({ accessDenied: true });

  const record = await runD18OfflineCheck(harness.options);

  assert.deepEqual(
    record,
    failure(IMAGE_INPUT_ERROR_CODES.URI_ACCESS_DENIED, 0),
  );
});

test("D18 maps read failure to IMAGE_READ_FAILED with closeCount", async () => {
  const harness = createHarness({ readError: true });

  const record = await runD18OfflineCheck(harness.options);

  assert.deepEqual(
    record,
    failure(IMAGE_INPUT_ERROR_CODES.IMAGE_READ_FAILED, 2),
  );
});

test("D18 rejects empty content with closeCount", async () => {
  const harness = createHarness({ bytes: [] });

  const record = await runD18OfflineCheck(harness.options);

  assert.deepEqual(record, failure(IMAGE_INPUT_ERROR_CODES.EMPTY_IMAGE, 2));
});

test("D18 rejects content above maxSizeBytes with closeCount", async () => {
  const harness = createHarness({ maxSizeBytes: EXPECTED_SIZE - 1 });

  const record = await runD18OfflineCheck(harness.options);

  assert.deepEqual(record, failure(IMAGE_INPUT_ERROR_CODES.IMAGE_TOO_LARGE, 2));
});

test("D18 rejects wrong MIME with closeCount", async () => {
  const harness = createHarness({ mimeType: "image/png" });

  const record = await runD18OfflineCheck(harness.options);

  assert.deepEqual(
    record,
    failure(IMAGE_INPUT_ERROR_CODES.UNSUPPORTED_MIME_TYPE, 2),
  );
});

test("D18 fails with SIZE_MISMATCH when byte count differs", async () => {
  const harness = createHarness({
    bytes: [...JPEG_BYTES, 0x00],
    maxSizeBytes: EXPECTED_SIZE + 1,
  });

  const record = await runD18OfflineCheck(harness.options);

  assert.equal(record.status, "FAIL");
  assert.equal(record.failureReason, "SIZE_MISMATCH");
  assert.equal(record.sizeBytes, EXPECTED_SIZE + 1);
  assert.equal(record.closeCount, 2);
});

test("D18 sanitizes output: no URI, bytes, or sensitive data", async () => {
  const harness = createHarness();

  const record = await runD18OfflineCheck(harness.options);

  const json = JSON.stringify(record);
  assert.equal(json.includes("private"), false);
  assert.equal(json.includes("token"), false);
  assert.equal(json.includes("secret"), false);
  assert.equal(json.includes("content://"), false);
});

test("D18 rejects non-positive expectedSizeBytes", async () => {
  const harness = createHarness();
  harness.options.expectedSizeBytes = 0;

  await assert.rejects(
    () => runD18OfflineCheck(harness.options),
    (error) => error instanceof TypeError,
  );
});
