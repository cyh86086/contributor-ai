import assert from "node:assert/strict";
import test from "node:test";

import {
  IMAGE_INPUT_ERROR_CODES,
  IMAGE_READER_ERROR_CLASSIFICATIONS,
} from "../src/core/index.js";
import {
  D17_OFFLINE_TEST_CASE_ID,
  runD17OfflineMultiImageCheck,
} from "./support/d17-offline-multi-image-harness.js";

const SOURCE_URIS = [
  ["content:", "", "controlled-a", "d17-img1"].join("/"),
  ["content:", "", "controlled-b", "d17-img2"].join("/"),
  ["content:", "", "controlled-c", "d17-img3"].join("/"),
];
const PRIVATE_MARKER = "d17-private-runtime-marker";
const INDEPENDENT_BYTE_COUNT = 6;
const JPEG_BYTES = [0xff, 0xd8, 0xff, 0xe0, 0x11, 0x22];
const EXPECTED_IMAGES = SOURCE_URIS.map(() => ({
  mimeType: "image/jpeg",
  sizeBytes: INDEPENDENT_BYTE_COUNT,
}));

const PASS_FIELDS = [
  "testCaseId",
  "requestedImages",
  "attemptedImages",
  "successfulImages",
  "status",
  "images",
  "uiResponsive",
];

test("D17 requires all 3 images to PASS through the complete production reader and core path", async () => {
  const harness = createHarness();
  const record = await runD17OfflineMultiImageCheck(harness.options);

  assert.deepEqual(record, successRecord());
  assert.deepEqual(Object.keys(record), PASS_FIELDS);
  assert.equal(Object.isFrozen(record), true);
  assert.equal(record.images.length, 3);
  for (const img of record.images) {
    assert.equal(img.status, "PASS");
    assert.equal(img.mimeType, "image/jpeg");
    assert.equal(img.sizeBytes, INDEPENDENT_BYTE_COUNT);
  }
  assertSingleReport(harness, record);
  assertSanitized(record);
});

for (const errorCode of [
  IMAGE_INPUT_ERROR_CODES.IMAGE_READ_FAILED,
  IMAGE_INPUT_ERROR_CODES.EMPTY_IMAGE,
  IMAGE_INPUT_ERROR_CODES.UNSUPPORTED_MIME_TYPE,
  IMAGE_INPUT_ERROR_CODES.ENCODING_FAILED,
]) {
  test(`D17 image 2 ${errorCode} fails fast`, async () => {
    const harness = createHarness({
      failAtIndex: 1,
      publicErrorCode: errorCode,
    });
    const record = await runD17OfflineMultiImageCheck(harness.options);

    assert.equal(record.status, "FAIL");
    assert.equal(record.failureReason, "PUBLIC_ERROR");
    assert.equal(record.errorCode, errorCode);
    assert.equal(record.attemptedImages, 2);
    assert.equal(record.successfulImages, 1);
    assert.equal(record.images.length, 2);
    assert.equal(record.images[0].status, "PASS");
    assert.equal(record.images[1].status, "FAIL");
    assert.equal(Object.isFrozen(record), true);
    assertSingleReport(harness, record);
    assertSanitized(record);
  });
}

test("D17 image 2 URI_ACCESS_DENIED fails fast", async () => {
  const harness = createHarness({
    failAtIndex: 1,
    publicErrorCode: IMAGE_INPUT_ERROR_CODES.URI_ACCESS_DENIED,
  });
  const record = await runD17OfflineMultiImageCheck(harness.options);

  assert.equal(record.status, "FAIL");
  assert.equal(record.failureReason, "PUBLIC_ERROR");
  assert.equal(record.errorCode, IMAGE_INPUT_ERROR_CODES.URI_ACCESS_DENIED);
  assert.equal(record.attemptedImages, 2);
  assert.equal(record.successfulImages, 1);
  assert.equal(Object.isFrozen(record), true);
  assertSanitized(record);
});

test("D17 image 2 MIME mismatch uses METADATA_MISMATCH", async () => {
  const harness = createHarness({
    failAtIndex: 1,
    mimeMismatch: true,
  });
  const record = await runD17OfflineMultiImageCheck(harness.options);

  assert.equal(record.status, "FAIL");
  assert.equal(record.failureReason, "METADATA_MISMATCH");
  assert.equal(Object.hasOwn(record, "errorCode"), false);
  assert.equal(record.attemptedImages, 2);
  assert.equal(record.successfulImages, 1);
  assert.equal(record.images.length, 2);
  assert.equal(record.images[0].status, "PASS");
  assert.equal(record.images[1].status, "FAIL");
  assert.equal(Object.isFrozen(record), true);
  assertSingleReport(harness, record);
  assertSanitized(record);
});

test("D17 image 2 size mismatch uses METADATA_MISMATCH", async () => {
  const harness = createHarness({
    failAtIndex: 1,
    sizeMismatch: true,
  });
  const record = await runD17OfflineMultiImageCheck(harness.options);

  assert.equal(record.status, "FAIL");
  assert.equal(record.failureReason, "METADATA_MISMATCH");
  assert.equal(Object.hasOwn(record, "errorCode"), false);
  assert.equal(record.attemptedImages, 2);
  assert.equal(record.successfulImages, 1);
  assert.equal(Object.isFrozen(record), true);
  assertSanitized(record);
});

test("D17 failure reasons remain outside production error and reader sets", () => {
  const publicCodes = new Set(Object.values(IMAGE_INPUT_ERROR_CODES));
  const readerClassifications = new Set(
    Object.values(IMAGE_READER_ERROR_CLASSIFICATIONS),
  );

  for (const failureReason of ["PUBLIC_ERROR", "METADATA_MISMATCH"]) {
    assert.equal(publicCodes.has(failureReason), false);
    assert.equal(readerClassifications.has(failureReason), false);
  }
});

test("D17 per-image records contain no URIs or raw bytes", async () => {
  const harness = createHarness();
  const record = await runD17OfflineMultiImageCheck(harness.options);
  const serialized = JSON.stringify(record);

  for (const uri of SOURCE_URIS) {
    assert.equal(serialized.includes(uri), false);
  }
  assert.equal(serialized.includes(PRIVATE_MARKER), false);
});

test("D17 validates sourceUris is non-empty array", async () => {
  await assert.rejects(
    runD17OfflineMultiImageCheck({
      sourceUris: [],
      expectedImages: [],
      maxSizeBytes: INDEPENDENT_BYTE_COUNT,
      readerOptions: minimalReaderOptions(),
      reportMetadata() {},
    }),
    TypeError,
  );
});

test("D17 validates expectedImages length matches sourceUris", async () => {
  await assert.rejects(
    runD17OfflineMultiImageCheck({
      sourceUris: SOURCE_URIS,
      expectedImages: [EXPECTED_IMAGES[0]],
      maxSizeBytes: INDEPENDENT_BYTE_COUNT,
      readerOptions: minimalReaderOptions(),
      reportMetadata() {},
    }),
    TypeError,
  );
});

function createHarness({
  failAtIndex,
  publicErrorCode,
  mimeMismatch,
  sizeMismatch,
} = {}) {
  const reports = [];
  const metrics = {
    canAccessCalls: 0,
    readCalls: 0,
    getTypeCalls: 0,
    reportCalls: 0,
    currentImageIndex: -1,
    phase: "access",
  };

  const contentResolver = {
    getType() {
      metrics.getTypeCalls += 1;
      if (
        failAtIndex !== undefined &&
        metrics.currentImageIndex === failAtIndex
      ) {
        if (mimeMismatch) return "image/png";
        if (publicErrorCode === IMAGE_INPUT_ERROR_CODES.UNSUPPORTED_MIME_TYPE)
          return "image/bmp";
      }
      return "image/jpeg";
    },
    openInputStream() {
      if (metrics.phase === "access") {
        metrics.canAccessCalls += 1;

        if (
          failAtIndex !== undefined &&
          metrics.currentImageIndex === failAtIndex &&
          publicErrorCode === IMAGE_INPUT_ERROR_CODES.URI_ACCESS_DENIED
        ) {
          metrics.phase = "access";
          throw runtimeError(
            IMAGE_READER_ERROR_CLASSIFICATIONS.URI_ACCESS_DENIED,
          );
        }

        metrics.phase = "read";
        return fakeStream([], () => {});
      }

      metrics.readCalls += 1;
      metrics.phase = "access";

      if (
        failAtIndex !== undefined &&
        metrics.currentImageIndex === failAtIndex &&
        publicErrorCode &&
        publicErrorCode !== IMAGE_INPUT_ERROR_CODES.URI_ACCESS_DENIED
      ) {
        return publicErrorStream(publicErrorCode);
      }

      if (
        failAtIndex !== undefined &&
        metrics.currentImageIndex === failAtIndex &&
        sizeMismatch
      ) {
        return readStream([0xff, 0xd8, 0xff, 0xe0, 0x11]);
      }

      return readStream(JPEG_BYTES);
    },
  };

  const options = {
    sourceUris: SOURCE_URIS,
    expectedImages: EXPECTED_IMAGES,
    maxSizeBytes: INDEPENDENT_BYTE_COUNT,
    readerOptions: {
      contentResolver,
      parseUri(uri) {
        const idx = SOURCE_URIS.indexOf(uri);
        if (idx >= 0) {
          metrics.currentImageIndex = idx;
        }
        return { uri };
      },
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
      readerSafetyLimitBytes: 64,
      chunkSizeBytes: 16,
      maxZeroLengthReads: 2,
    },
    encodeBase64:
      publicErrorCode === IMAGE_INPUT_ERROR_CODES.ENCODING_FAILED
        ? () => {
            const idx = metrics.currentImageIndex;
            if (failAtIndex !== undefined && idx === failAtIndex) {
              throw new Error(PRIVATE_MARKER);
            }
            return "offline-encoded";
          }
        : undefined,
    reportMetadata(record) {
      metrics.reportCalls += 1;
      reports.push(record);
    },
  };

  return { metrics, reports, options };
}

function minimalReaderOptions() {
  let phase = "access";
  return {
    contentResolver: {
      getType: () => "image/jpeg",
      openInputStream() {
        if (phase === "access") {
          phase = "read";
          return fakeStream([], () => {});
        }
        phase = "access";
        return readStream(JPEG_BYTES);
      },
    },
    parseUri: (uri) => ({ uri }),
    javaBridge: {
      createByteArray: (size) => new Int8Array(size),
      classifyError: () => IMAGE_READER_ERROR_CLASSIFICATIONS.IMAGE_READ_FAILED,
    },
    readerSafetyLimitBytes: 64,
    chunkSizeBytes: 16,
    maxZeroLengthReads: 2,
  };
}

function publicErrorStream(errorCode) {
  switch (errorCode) {
    case IMAGE_INPUT_ERROR_CODES.IMAGE_READ_FAILED:
      return null;
    case IMAGE_INPUT_ERROR_CODES.EMPTY_IMAGE:
      return readStream([]);
    case IMAGE_INPUT_ERROR_CODES.IMAGE_TOO_LARGE:
      return readStream([...JPEG_BYTES, 0x33]);
    case IMAGE_INPUT_ERROR_CODES.UNSUPPORTED_MIME_TYPE:
      return readStream([1, 2, 3, 4, 5, 6]);
    case IMAGE_INPUT_ERROR_CODES.ENCODING_FAILED:
      return readStream(JPEG_BYTES);
    default:
      assert.fail("Unexpected stable public error code");
  }
}

function readStream(bytes) {
  let index = 0;
  const steps = [bytes];
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

function fakeStream(steps, onClose) {
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
    close() {
      onClose();
    },
  };
}

function runtimeError(runtimeClassification) {
  const error = new Error(PRIVATE_MARKER);
  error.runtimeClassification = runtimeClassification;
  return error;
}

function successRecord() {
  return {
    testCaseId: D17_OFFLINE_TEST_CASE_ID,
    requestedImages: 3,
    attemptedImages: 3,
    successfulImages: 3,
    status: "PASS",
    images: [
      {
        mimeType: "image/jpeg",
        sizeBytes: INDEPENDENT_BYTE_COUNT,
        status: "PASS",
      },
      {
        mimeType: "image/jpeg",
        sizeBytes: INDEPENDENT_BYTE_COUNT,
        status: "PASS",
      },
      {
        mimeType: "image/jpeg",
        sizeBytes: INDEPENDENT_BYTE_COUNT,
        status: "PASS",
      },
    ],
    uiResponsive: true,
  };
}

function assertSingleReport(harness, record) {
  assert.equal(harness.metrics.reportCalls, 1);
  assert.equal(harness.reports.length, 1);
  assert.equal(harness.reports[0], record);
  assert.equal(Object.isFrozen(harness.reports[0]), true);
}

function assertSanitized(record) {
  const serialized = JSON.stringify(record);
  for (const uri of SOURCE_URIS) {
    assert.equal(serialized.includes(uri), false);
  }
  assert.equal(serialized.includes(PRIVATE_MARKER), false);

  for (const prohibitedField of [
    "sourceUri",
    "sourceUris",
    "path",
    "filename",
    "bytes",
    "imageBase64",
    "imageContent",
    "exception",
    "message",
    "stack",
    "cause",
    "diagnostic",
  ]) {
    assert.equal(Object.hasOwn(record, prohibitedField), false);
  }
}
