import assert from "node:assert/strict";
import test from "node:test";

import {
  IMAGE_INPUT_ERROR_CODES,
  IMAGE_READER_ERROR_CLASSIFICATIONS,
} from "../src/core/index.js";
import {
  D16_OFFLINE_TEST_CASE_ID,
  runD16OfflineAggregateCheck,
} from "./support/d16-offline-aggregate-harness.js";

const SOURCE_URI = ["content:", "", "controlled.invalid", "d16"].join("/");
const PRIVATE_MARKER = "d16-private-runtime-marker";
const INDEPENDENT_BYTE_COUNT = 6;
const JPEG_BYTES = [0xff, 0xd8, 0xff, 0xe0, 0x11, 0x22];
const SUCCESS_FIELDS = [
  "testCaseId",
  "requestedIterations",
  "attemptedIterations",
  "successfulIterations",
  "status",
  "mimeType",
  "sizeBytes",
  "allMetadataEqual",
  "uiResponsive",
];
const FAILURE_FIELDS = [
  "testCaseId",
  "requestedIterations",
  "attemptedIterations",
  "successfulIterations",
  "status",
  "allMetadataEqual",
  "uiResponsive",
  "failureReason",
];

test("D16 requires 10 PASS results from the complete production reader and core path", async () => {
  const harness = createHarness();
  const record = await runD16OfflineAggregateCheck(harness.options);

  assert.deepEqual(record, successRecord(true));
  assert.deepEqual(Object.keys(record), SUCCESS_FIELDS);
  assert.equal(Object.isFrozen(record), true);
  assertSingleIdenticalReport(harness, record);
  assert.equal(harness.metrics.accessCalls, 10);
  assert.equal(harness.metrics.readCalls, 10);
  assert.equal(harness.metrics.getTypeCalls, 10);
  assert.equal(harness.metrics.parseUriCalls, 20);
  assert.deepEqual(
    harness.metrics.parsedSources,
    Array.from({ length: 20 }, () => SOURCE_URI),
  );
  assert.deepEqual(harness.metrics.events, successEvents());
  assertSanitized(record);
});

for (const errorCode of Object.values(IMAGE_INPUT_ERROR_CODES)) {
  test(`D16 iteration 4 preserves stable ${errorCode} and fails fast`, async () => {
    const harness = createHarness({ publicErrorCode: errorCode });
    const record = await runD16OfflineAggregateCheck(harness.options);

    assert.deepEqual(record, publicErrorRecord(errorCode, true));
    assert.deepEqual(Object.keys(record), [...FAILURE_FIELDS, "errorCode"]);
    assert.equal(Object.isFrozen(record), true);
    assertSingleIdenticalReport(harness, record);
    assertFailFastAtIterationFour(harness);
    assertSanitized(record);
  });
}

for (const metadataMismatch of ["mime", "count"]) {
  test(`D16 iteration 4 ${metadataMismatch} mismatch uses METADATA_MISMATCH`, async () => {
    const harness = createHarness({ metadataMismatch });
    const record = await runD16OfflineAggregateCheck(harness.options);

    assert.deepEqual(record, metadataMismatchRecord(true));
    assert.deepEqual(Object.keys(record), FAILURE_FIELDS);
    assert.equal(Object.hasOwn(record, "errorCode"), false);
    assert.equal(Object.isFrozen(record), true);
    assertSingleIdenticalReport(harness, record);
    assertFailFastAtIterationFour(harness);
    assertSanitized(record);
  });
}

test("D16 preserves metadata equality when 10 successes are followed by UI failure", async () => {
  const harness = createHarness({ uiResponsive: false });
  const record = await runD16OfflineAggregateCheck(harness.options);

  assert.deepEqual(record, uiFailureRecord(10, 10, true));
  assert.deepEqual(Object.keys(record), FAILURE_FIELDS);
  assert.equal(Object.hasOwn(record, "errorCode"), false);
  assert.equal(harness.metrics.accessCalls, 10);
  assert.equal(harness.metrics.readCalls, 10);
  assertSingleIdenticalReport(harness, record);
  assertSanitized(record);
});

test("D16 UI failure overrides an earlier stable public error", async () => {
  const harness = createHarness({
    publicErrorCode: IMAGE_INPUT_ERROR_CODES.IMAGE_READ_FAILED,
    uiResponsive: false,
  });
  const record = await runD16OfflineAggregateCheck(harness.options);

  assert.deepEqual(record, uiFailureRecord(4, 3, false));
  assert.deepEqual(Object.keys(record), FAILURE_FIELDS);
  assert.equal(Object.hasOwn(record, "errorCode"), false);
  assertFailFastAtIterationFour(harness);
  assertSingleIdenticalReport(harness, record);
  assertSanitized(record);
});

test("D16 UI failure overrides an earlier metadata mismatch", async () => {
  const harness = createHarness({
    metadataMismatch: "mime",
    uiResponsive: false,
  });
  const record = await runD16OfflineAggregateCheck(harness.options);

  assert.deepEqual(record, uiFailureRecord(4, 3, false));
  assert.deepEqual(Object.keys(record), FAILURE_FIELDS);
  assert.equal(Object.hasOwn(record, "errorCode"), false);
  assertFailFastAtIterationFour(harness);
  assertSingleIdenticalReport(harness, record);
  assertSanitized(record);
});

test("D16 failure reasons remain outside production error and reader sets", () => {
  const publicCodes = new Set(Object.values(IMAGE_INPUT_ERROR_CODES));
  const readerClassifications = new Set(
    Object.values(IMAGE_READER_ERROR_CLASSIFICATIONS),
  );

  for (const failureReason of [
    "PUBLIC_ERROR",
    "METADATA_MISMATCH",
    "UI_NOT_RESPONSIVE",
  ]) {
    assert.equal(publicCodes.has(failureReason), false);
    assert.equal(readerClassifications.has(failureReason), false);
  }
});

function createHarness({
  publicErrorCode,
  metadataMismatch,
  uiResponsive = true,
} = {}) {
  const reports = [];
  const metrics = {
    accessCalls: 0,
    readCalls: 0,
    getTypeCalls: 0,
    parseUriCalls: 0,
    parsedSources: [],
    uiAssessmentCalls: 0,
    reportCalls: 0,
    events: [],
    currentIteration: 0,
    expectedStage: "access",
  };

  const contentResolver = {
    getType() {
      assert.equal(metrics.expectedStage, "mime");
      metrics.getTypeCalls += 1;
      metrics.events.push(`mime:${metrics.currentIteration}`);
      metrics.expectedStage = "read";
      return metadataMismatch === "mime" && metrics.currentIteration === 4
        ? "image/png"
        : publicErrorCode === IMAGE_INPUT_ERROR_CODES.UNSUPPORTED_MIME_TYPE &&
            metrics.currentIteration === 4
          ? undefined
          : "image/jpeg";
    },
    openInputStream() {
      if (metrics.expectedStage === "access") {
        metrics.currentIteration += 1;
        metrics.accessCalls += 1;
        metrics.events.push(`access:${metrics.currentIteration}`);
        metrics.expectedStage = "mime";
        return fakeStream([], () => {
          metrics.events.push(`access-close:${metrics.currentIteration}`);
        });
      }

      assert.equal(metrics.expectedStage, "read");
      metrics.readCalls += 1;
      metrics.events.push(`read:${metrics.currentIteration}`);
      metrics.expectedStage = "access";

      if (metrics.currentIteration === 4 && publicErrorCode) {
        return publicErrorStream(publicErrorCode, metrics);
      }

      const iterationBytes =
        metrics.currentIteration === 4 && metadataMismatch === "count"
          ? JPEG_BYTES.slice(0, -1)
          : JPEG_BYTES;
      return readStream(iterationBytes, metrics);
    },
  };

  const options = {
    sourceUri: SOURCE_URI,
    independentlyVerifiedByteCount: INDEPENDENT_BYTE_COUNT,
    maxSizeBytes: INDEPENDENT_BYTE_COUNT,
    readerOptions: {
      contentResolver,
      parseUri(uri) {
        metrics.parseUriCalls += 1;
        metrics.parsedSources.push(uri);
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
            if (metrics.currentIteration === 4) {
              throw new Error(PRIVATE_MARKER);
            }
            return "offline-encoded";
          }
        : undefined,
    async assessUiResponsive() {
      metrics.uiAssessmentCalls += 1;
      metrics.events.push("ui");
      return uiResponsive;
    },
    reportMetadata(record) {
      metrics.reportCalls += 1;
      metrics.events.push("report");
      reports.push(record);
    },
  };

  return { metrics, reports, options };
}

function publicErrorStream(errorCode, metrics) {
  switch (errorCode) {
    case IMAGE_INPUT_ERROR_CODES.URI_ACCESS_DENIED:
      throw runtimeError(IMAGE_READER_ERROR_CLASSIFICATIONS.URI_ACCESS_DENIED);
    case IMAGE_INPUT_ERROR_CODES.IMAGE_READ_FAILED:
      return null;
    case IMAGE_INPUT_ERROR_CODES.EMPTY_IMAGE:
      return readStream([], metrics);
    case IMAGE_INPUT_ERROR_CODES.IMAGE_TOO_LARGE:
      return readStream([...JPEG_BYTES, 0x33], metrics);
    case IMAGE_INPUT_ERROR_CODES.UNSUPPORTED_MIME_TYPE:
      return readStream([1, 2, 3, 4, 5, 6], metrics);
    case IMAGE_INPUT_ERROR_CODES.ENCODING_FAILED:
      return readStream(JPEG_BYTES, metrics);
    default:
      assert.fail("Unexpected stable public error code");
  }
}

function readStream(bytes, metrics) {
  return fakeStream([bytes], () => {
    metrics.events.push(`read-close:${metrics.currentIteration}`);
  });
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

function successRecord(uiResponsive) {
  return {
    testCaseId: D16_OFFLINE_TEST_CASE_ID,
    requestedIterations: 10,
    attemptedIterations: 10,
    successfulIterations: 10,
    status: "PASS",
    mimeType: "image/jpeg",
    sizeBytes: INDEPENDENT_BYTE_COUNT,
    allMetadataEqual: true,
    uiResponsive,
  };
}

function publicErrorRecord(errorCode, uiResponsive) {
  return {
    testCaseId: D16_OFFLINE_TEST_CASE_ID,
    requestedIterations: 10,
    attemptedIterations: 4,
    successfulIterations: 3,
    status: "FAIL",
    allMetadataEqual: false,
    uiResponsive,
    failureReason: "PUBLIC_ERROR",
    errorCode,
  };
}

function metadataMismatchRecord(uiResponsive) {
  return {
    testCaseId: D16_OFFLINE_TEST_CASE_ID,
    requestedIterations: 10,
    attemptedIterations: 4,
    successfulIterations: 3,
    status: "FAIL",
    allMetadataEqual: false,
    uiResponsive,
    failureReason: "METADATA_MISMATCH",
  };
}

function uiFailureRecord(
  attemptedIterations,
  successfulIterations,
  allMetadataEqual,
) {
  return {
    testCaseId: D16_OFFLINE_TEST_CASE_ID,
    requestedIterations: 10,
    attemptedIterations,
    successfulIterations,
    status: "FAIL",
    allMetadataEqual,
    uiResponsive: false,
    failureReason: "UI_NOT_RESPONSIVE",
  };
}

function assertSingleIdenticalReport(harness, record) {
  assert.equal(harness.metrics.uiAssessmentCalls, 1);
  assert.equal(harness.metrics.reportCalls, 1);
  assert.equal(harness.reports.length, 1);
  assert.equal(harness.reports[0], record);
  assert.equal(Object.isFrozen(harness.reports[0]), true);
  assert.deepEqual(harness.metrics.events.slice(-2), ["ui", "report"]);
}

function assertFailFastAtIterationFour(harness) {
  assert.equal(harness.metrics.accessCalls, 4);
  assert.equal(harness.metrics.readCalls, 4);
  assert.equal(harness.metrics.getTypeCalls, 4);
  assert.equal(harness.metrics.currentIteration, 4);
  assert.equal(harness.metrics.events.includes("access:5"), false);
}

function assertSanitized(record) {
  const serialized = JSON.stringify(record);
  assert.equal(serialized.includes(SOURCE_URI), false);
  assert.equal(serialized.includes(PRIVATE_MARKER), false);

  for (const prohibitedField of [
    "sourceUri",
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
    "iterations",
  ]) {
    assert.equal(Object.hasOwn(record, prohibitedField), false);
  }
}

function successEvents() {
  const events = [];
  for (let iteration = 1; iteration <= 10; iteration += 1) {
    events.push(
      `access:${iteration}`,
      `access-close:${iteration}`,
      `mime:${iteration}`,
      `read:${iteration}`,
      `read-close:${iteration}`,
    );
  }
  events.push("ui", "report");
  return events;
}
