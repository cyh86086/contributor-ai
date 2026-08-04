import assert from "node:assert/strict";
import test from "node:test";

import { runD21OfflineCheck } from "./support/d21-offline-ui-responsiveness-harness.js";
import { IMAGE_INPUT_ERROR_CODES } from "../src/core/index.js";

const TEST_CASE_ID = "D21_UI_RESPONSIVENESS";
const CONTENT_URI =
  "content://private.provider/image/606?token=private&name=secret.jpg";
const JPEG_BYTES = [0xff, 0xd8, 0xff, 0xe0, 0x11, 0x00];
const EXPECTED_SIZE = JPEG_BYTES.length;

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
          const available = bytes.length - readPosition;
          const toRead = Math.min(buffer.length, available);
          for (let i = 0; i < toRead; i += 1) {
            buffer[i] = bytes[readPosition + i];
          }
          readPosition += toRead;
          return toRead;
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
    classifyError: () => IMAGE_INPUT_ERROR_CODES.IMAGE_READ_FAILED,
  };

  return { resolver, parseUri, javaBridge };
}

test("D21 passes with 10 successful reads and heartbeatCount", async () => {
  const { resolver, parseUri, javaBridge } = createHarness();
  const record = await runD21OfflineCheck({
    testCaseId: TEST_CASE_ID,
    sourceUri: CONTENT_URI,
    expectedMimeType: "image/jpeg",
    expectedSizeBytes: EXPECTED_SIZE,
    maxSizeBytes: EXPECTED_SIZE,
    readerSafetyLimitBytes: 12 * 1024 * 1024,
    resolver,
    parseUri,
    javaBridge,
  });

  assert.equal(record.status, "PASS");
  assert.equal(record.mimeType, "image/jpeg");
  assert.equal(record.sizeBytes, EXPECTED_SIZE);
  assert.equal(record.requestedIterations, 10);
  assert.equal(record.attemptedIterations, 10);
  assert.equal(record.successfulIterations, 10);
  assert.equal(record.allMetadataEqual, true);
  assert.equal(record.heartbeatCount, 9);
  assert.equal(record.uiResponsive, true);
});

test("D21 fails with PUBLIC_ERROR on first iteration", async () => {
  const { parseUri, javaBridge } = createHarness();
  const resolver = {
    openInputStream: () => null,
    getType: () => "image/jpeg",
  };

  const record = await runD21OfflineCheck({
    testCaseId: TEST_CASE_ID,
    sourceUri: CONTENT_URI,
    expectedMimeType: "image/jpeg",
    expectedSizeBytes: EXPECTED_SIZE,
    maxSizeBytes: EXPECTED_SIZE,
    readerSafetyLimitBytes: 12 * 1024 * 1024,
    resolver,
    parseUri,
    javaBridge,
  });

  assert.equal(record.status, "FAIL");
  assert.equal(record.failureReason, "PUBLIC_ERROR");
  assert.equal(record.attemptedIterations, 1);
  assert.equal(record.successfulIterations, 0);
  assert.equal(record.heartbeatCount, 1);
});

test("D21 fails with METADATA_MISMATCH on size mismatch", async () => {
  const { parseUri, javaBridge } = createHarness({ bytes: [0xff, 0xd8] });
  const resolver = {
    openInputStream: () => {
      let readPosition = 0;
      const bytes = [0xff, 0xd8];
      return {
        read: (buffer) => {
          if (readPosition >= bytes.length) {
            return -1;
          }
          const toRead = Math.min(buffer.length, bytes.length - readPosition);
          for (let i = 0; i < toRead; i += 1) {
            buffer[i] = bytes[readPosition + i];
          }
          readPosition += toRead;
          return toRead;
        },
        close: () => {},
      };
    },
    getType: () => "image/jpeg",
  };

  const record = await runD21OfflineCheck({
    testCaseId: TEST_CASE_ID,
    sourceUri: CONTENT_URI,
    expectedMimeType: "image/jpeg",
    expectedSizeBytes: EXPECTED_SIZE,
    maxSizeBytes: EXPECTED_SIZE,
    readerSafetyLimitBytes: 12 * 1024 * 1024,
    resolver,
    parseUri,
    javaBridge,
  });

  assert.equal(record.status, "FAIL");
  assert.equal(record.failureReason, "METADATA_MISMATCH");
});

test("D21 fails with UI_NOT_RESPONSIVE when heartbeat fails", async () => {
  const { resolver, parseUri, javaBridge } = createHarness();
  const record = await runD21OfflineCheck({
    testCaseId: TEST_CASE_ID,
    sourceUri: CONTENT_URI,
    expectedMimeType: "image/jpeg",
    expectedSizeBytes: EXPECTED_SIZE,
    maxSizeBytes: EXPECTED_SIZE,
    readerSafetyLimitBytes: 12 * 1024 * 1024,
    resolver,
    parseUri,
    javaBridge,
    uiHeartbeat: () => Promise.resolve(false),
  });

  assert.equal(record.status, "FAIL");
  assert.equal(record.failureReason, "UI_NOT_RESPONSIVE");
  assert.equal(record.uiResponsive, false);
  assert.equal(record.heartbeatCount, 0);
});

test("D21 rejects invalid testCaseId", async () => {
  const { resolver, parseUri, javaBridge } = createHarness();

  await assert.rejects(
    () =>
      runD21OfflineCheck({
        testCaseId: "",
        sourceUri: CONTENT_URI,
        expectedMimeType: "image/jpeg",
        expectedSizeBytes: EXPECTED_SIZE,
        maxSizeBytes: EXPECTED_SIZE,
        readerSafetyLimitBytes: 12 * 1024 * 1024,
        resolver,
        parseUri,
        javaBridge,
      }),
    { message: /testCaseId/ },
  );
});

test("D21 rejects invalid expectedSizeBytes", async () => {
  const { resolver, parseUri, javaBridge } = createHarness();

  await assert.rejects(
    () =>
      runD21OfflineCheck({
        testCaseId: TEST_CASE_ID,
        sourceUri: CONTENT_URI,
        expectedMimeType: "image/jpeg",
        expectedSizeBytes: -1,
        maxSizeBytes: EXPECTED_SIZE,
        readerSafetyLimitBytes: 12 * 1024 * 1024,
        resolver,
        parseUri,
        javaBridge,
      }),
    { message: /expectedSizeBytes/ },
  );
});

test("D21 rejects non-function uiHeartbeat", async () => {
  const { resolver, parseUri, javaBridge } = createHarness();

  await assert.rejects(
    () =>
      runD21OfflineCheck({
        testCaseId: TEST_CASE_ID,
        sourceUri: CONTENT_URI,
        expectedMimeType: "image/jpeg",
        expectedSizeBytes: EXPECTED_SIZE,
        maxSizeBytes: EXPECTED_SIZE,
        readerSafetyLimitBytes: 12 * 1024 * 1024,
        resolver,
        parseUri,
        javaBridge,
        uiHeartbeat: "not a function",
      }),
    { message: /uiHeartbeat/ },
  );
});
