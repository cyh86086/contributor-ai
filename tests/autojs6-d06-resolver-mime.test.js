import assert from "node:assert/strict";
import test from "node:test";

import { runResolverMimeDeviceCheck } from "../scripts/autojs6/resolver-mime-device-check.js";
import {
  IMAGE_INPUT_ERROR_CODES,
  IMAGE_READER_ERROR_CLASSIFICATIONS,
} from "../src/core/index.js";

const TEST_CASE_ID = "D06_RESOLVER_MIME";
const CONTENT_URI =
  "content://private.provider/image/606?token=private&name=secret.jpg";
const JPEG_BYTES = [0xff, 0xd8, 0xff, 0xe0];

test("D06 reports normalized MIME returned by ContentResolver", async () => {
  const harness = createHarness({
    mimeType: " Image/JPEG; charset=binary ",
  });

  const record = await runResolverMimeDeviceCheck(harness.options);

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

test("D06 does not accept byte-signature fallback when resolver MIME is absent", async () => {
  const harness = createHarness({ mimeType: undefined });
  const record = await runResolverMimeDeviceCheck(harness.options);

  assert.deepEqual(
    record,
    failure(IMAGE_INPUT_ERROR_CODES.UNSUPPORTED_MIME_TYPE),
  );
});

test("D06 rejects a wrong resolver MIME even when bytes are JPEG", async () => {
  const harness = createHarness({ mimeType: "image/png" });
  const record = await runResolverMimeDeviceCheck(harness.options);

  assert.deepEqual(
    record,
    failure(IMAGE_INPUT_ERROR_CODES.UNSUPPORTED_MIME_TYPE),
  );
});

test("D06 accepts the configured size boundary exactly", async () => {
  const harness = createHarness({ maxSizeBytes: JPEG_BYTES.length });
  const record = await runResolverMimeDeviceCheck(harness.options);

  assert.equal(record.status, "PASS");
  assert.equal(record.sizeBytes, JPEG_BYTES.length);
});

test("D06 rejects content above the configured size boundary", async () => {
  const harness = createHarness({ maxSizeBytes: JPEG_BYTES.length - 1 });
  const record = await runResolverMimeDeviceCheck(harness.options);

  assert.deepEqual(record, failure(IMAGE_INPUT_ERROR_CODES.IMAGE_TOO_LARGE));
});

test("D06 rejects empty content", async () => {
  const harness = createHarness({ bytes: [] });
  const record = await runResolverMimeDeviceCheck(harness.options);

  assert.deepEqual(record, failure(IMAGE_INPUT_ERROR_CODES.EMPTY_IMAGE));
});

test("D06 maps an inaccessible probe to URI_ACCESS_DENIED", async () => {
  const harness = createHarness({ accessDenied: true });
  const record = await runResolverMimeDeviceCheck(harness.options);

  assert.deepEqual(record, failure(IMAGE_INPUT_ERROR_CODES.URI_ACCESS_DENIED));
  assert.equal(JSON.stringify(record).includes(CONTENT_URI), false);
});

test("D06 maps read-time permission revocation to URI_ACCESS_DENIED", async () => {
  const harness = createHarness({
    readError: runtimeError(
      IMAGE_READER_ERROR_CLASSIFICATIONS.URI_ACCESS_DENIED,
      `private ${CONTENT_URI}`,
    ),
  });
  const record = await runResolverMimeDeviceCheck(harness.options);

  assert.deepEqual(record, failure(IMAGE_INPUT_ERROR_CODES.URI_ACCESS_DENIED));
  assert.equal(JSON.stringify(record).includes("private"), false);
});

test("D06 maps ordinary read failure to IMAGE_READ_FAILED", async () => {
  const harness = createHarness({
    readError: runtimeError(
      IMAGE_READER_ERROR_CLASSIFICATIONS.IMAGE_READ_FAILED,
      `private ${CONTENT_URI}`,
    ),
  });
  const record = await runResolverMimeDeviceCheck(harness.options);

  assert.deepEqual(record, failure(IMAGE_INPUT_ERROR_CODES.IMAGE_READ_FAILED));
});

function createHarness(options = {}) {
  const {
    bytes = JPEG_BYTES,
    maxSizeBytes = 10,
    accessDenied = false,
    readError,
  } = options;
  const mimeType = Object.hasOwn(options, "mimeType")
    ? options.mimeType
    : "image/jpeg";
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
      expectedMimeType: "image/jpeg",
      maxSizeBytes,
      readerSafetyLimitBytes: 64,
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
