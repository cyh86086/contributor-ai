/**
 * D22 No image or Base64 persistence — offline tests.
 */

import { strict as assert } from "node:assert";
import { test } from "node:test";
import { runD22OfflineHarness } from "./support/d22-offline-no-persistence-harness.js";

test("D22 PASS with clean success and failure outputs", async () => {
  const record = await runD22OfflineHarness();

  assert.equal(record.testCaseId, "D22_NO_PERSISTENCE");
  assert.equal(record.status, "PASS");
  assert.equal(record.mimeType, "image/jpeg");
  assert.equal(record.sizeBytes, 6_406);
  assert.equal(record.uiResponsive, true);
  assert.equal(record.successOutputClean, true);
  assert.equal(record.failureOutputClean, true);
});

test("D22 FAIL with PERSISTENCE_VIOLATION on success output", async () => {
  const record = await runD22OfflineHarness({
    prepareSelectedImage: async (invalidUri) => {
      if (invalidUri) {
        return { status: "FAIL", errorCode: "URI_ACCESS_DENIED" };
      }
      return {
        status: "PASS",
        mimeType: "image/jpeg",
        sizeBytes: 6_406,
        imageBase64: "dGVzdA==",
      };
    },
  });

  assert.equal(record.testCaseId, "D22_NO_PERSISTENCE");
  assert.equal(record.status, "FAIL");
  assert.equal(record.failureReason, "PERSISTENCE_VIOLATION");
  assert.equal(record.successOutputClean, false);
  assert.equal(record.failureOutputClean, true);
});

test("D22 FAIL with PERSISTENCE_VIOLATION on failure output", async () => {
  const record = await runD22OfflineHarness({
    prepareSelectedImage: async (invalidUri) => {
      if (invalidUri) {
        return {
          status: "FAIL",
          errorCode: "URI_ACCESS_DENIED",
          sourceUri: "content://test/uri",
        };
      }
      return { status: "PASS", mimeType: "image/jpeg", sizeBytes: 6_406 };
    },
  });

  assert.equal(record.testCaseId, "D22_NO_PERSISTENCE");
  assert.equal(record.status, "FAIL");
  assert.equal(record.failureReason, "PERSISTENCE_VIOLATION");
  assert.equal(record.successOutputClean, true);
  assert.equal(record.failureOutputClean, false);
});

test("D22 FAIL with METADATA_MISMATCH on wrong size", async () => {
  const record = await runD22OfflineHarness({
    successRecord: {
      status: "PASS",
      mimeType: "image/jpeg",
      sizeBytes: 6_407,
    },
  });

  assert.equal(record.testCaseId, "D22_NO_PERSISTENCE");
  assert.equal(record.status, "FAIL");
  assert.equal(record.failureReason, "METADATA_MISMATCH");
});

test("D22 rejects invalid expectedSizeBytes", async () => {
  await assert.rejects(runD22OfflineHarness({ expectedSizeBytes: -1 }), {
    name: "TypeError",
    message: "expectedSizeBytes must be a positive safe integer",
  });
});

test("D22 rejects missing prepareSelectedImage", async () => {
  const { runNoPersistenceDeviceCheck } =
    await import("../scripts/autojs6/no-persistence-device-check.js");

  await assert.rejects(
    runNoPersistenceDeviceCheck({
      expectedSizeBytes: 6_406,
      prepareSelectedImage: undefined,
    }),
    {
      name: "TypeError",
      message: "prepareSelectedImage must be a function",
    },
  );
});

test("D22 handles prepareSelectedImage throwing on success", async () => {
  const record = await runD22OfflineHarness({
    prepareSelectedImage: async (invalidUri) => {
      if (invalidUri) {
        return { status: "FAIL", errorCode: "URI_ACCESS_DENIED" };
      }
      throw new Error("Simulated success failure");
    },
  });

  assert.equal(record.testCaseId, "D22_NO_PERSISTENCE");
  assert.equal(record.status, "FAIL");
  assert.equal(record.failureReason, "METADATA_MISMATCH");
});
