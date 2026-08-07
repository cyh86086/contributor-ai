/**
 * D23 No sensitive logging — offline tests.
 */

import { strict as assert } from "node:assert";
import { test } from "node:test";
import { runD23OfflineHarness } from "./support/d23-offline-sensitive-logging-harness.js";

test("D23 PASS with clean success and failure logs", async () => {
  const record = await runD23OfflineHarness();

  assert.equal(record.testCaseId, "D23_SENSITIVE_LOGGING");
  assert.equal(record.status, "PASS");
  assert.equal(record.mimeType, "image/jpeg");
  assert.equal(record.sizeBytes, 6_406);
  assert.equal(record.uiResponsive, true);
  assert.equal(record.successLogsClean, true);
  assert.equal(record.failureLogsClean, true);
});

test("D23 FAIL with SENSITIVE_LOG_VIOLATION on success logs", async () => {
  const record = await runD23OfflineHarness({
    prepareSelectedImage: async (invalidUri) => {
      if (invalidUri) {
        return { status: "FAIL", errorCode: "URI_ACCESS_DENIED" };
      }
      console.info("Image path: /sdcard/Download/test.jpeg");
      return {
        status: "PASS",
        mimeType: "image/jpeg",
        sizeBytes: 6_406,
      };
    },
  });

  assert.equal(record.testCaseId, "D23_SENSITIVE_LOGGING");
  assert.equal(record.status, "FAIL");
  assert.equal(record.failureReason, "SENSITIVE_LOG_VIOLATION");
  assert.equal(record.successLogsClean, false);
  assert.equal(record.failureLogsClean, true);
});

test("D23 FAIL with SENSITIVE_LOG_VIOLATION on failure logs", async () => {
  const record = await runD23OfflineHarness({
    prepareSelectedImage: async (invalidUri) => {
      if (invalidUri) {
        console.error("Error: content://test/uri not found");
        return {
          status: "FAIL",
          errorCode: "URI_ACCESS_DENIED",
        };
      }
      return { status: "PASS", mimeType: "image/jpeg", sizeBytes: 6_406 };
    },
  });

  assert.equal(record.testCaseId, "D23_SENSITIVE_LOGGING");
  assert.equal(record.status, "FAIL");
  assert.equal(record.failureReason, "SENSITIVE_LOG_VIOLATION");
  assert.equal(record.successLogsClean, true);
  assert.equal(record.failureLogsClean, false);
});

test("D23 FAIL with METADATA_MISMATCH on wrong size", async () => {
  const record = await runD23OfflineHarness({
    successRecord: {
      status: "PASS",
      mimeType: "image/jpeg",
      sizeBytes: 6_407,
    },
  });

  assert.equal(record.testCaseId, "D23_SENSITIVE_LOGGING");
  assert.equal(record.status, "FAIL");
  assert.equal(record.failureReason, "METADATA_MISMATCH");
});

test("D23 rejects invalid expectedSizeBytes", async () => {
  await assert.rejects(runD23OfflineHarness({ expectedSizeBytes: -1 }), {
    name: "TypeError",
    message: "expectedSizeBytes must be a positive safe integer",
  });
});

test("D23 rejects missing prepareSelectedImage", async () => {
  const { runSensitiveLoggingDeviceCheck } =
    await import("../scripts/autojs6/sensitive-logging-device-check.js");

  await assert.rejects(
    runSensitiveLoggingDeviceCheck({
      expectedSizeBytes: 6_406,
      prepareSelectedImage: undefined,
    }),
    {
      name: "TypeError",
      message: "prepareSelectedImage must be a function",
    },
  );
});

test("D23 handles prepareSelectedImage throwing on success", async () => {
  const record = await runD23OfflineHarness({
    prepareSelectedImage: async (invalidUri) => {
      if (invalidUri) {
        return { status: "FAIL", errorCode: "URI_ACCESS_DENIED" };
      }
      throw new Error("Simulated success failure");
    },
  });

  assert.equal(record.testCaseId, "D23_SENSITIVE_LOGGING");
  assert.equal(record.status, "FAIL");
  assert.equal(record.failureReason, "METADATA_MISMATCH");
});
