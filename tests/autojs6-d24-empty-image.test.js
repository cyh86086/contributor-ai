/**
 * D24 Empty image — offline tests.
 */

import { strict as assert } from "node:assert";
import { test } from "node:test";
import { runD24OfflineHarness } from "./support/d24-offline-empty-image-harness.js";

test("D24 PASS with EMPTY_IMAGE error code", async () => {
  const record = await runD24OfflineHarness();

  assert.equal(record.testCaseId, "D24_EMPTY_IMAGE");
  assert.equal(record.status, "FAIL");
  assert.equal(record.errorCode, "EMPTY_IMAGE");
  assert.equal(record.uiResponsive, true);
});

test("D24 FAIL with UNEXPECTED_RESULT on wrong error code", async () => {
  const record = await runD24OfflineHarness({
    prepareSelectedImage: async () => {
      return {
        status: "FAIL",
        errorCode: "IMAGE_READ_FAILED",
        uiResponsive: true,
      };
    },
  });

  assert.equal(record.testCaseId, "D24_EMPTY_IMAGE");
  assert.equal(record.status, "FAIL");
  assert.equal(record.errorCode, "UNEXPECTED_RESULT");
  assert.equal(record.expectedErrorCode, "EMPTY_IMAGE");
  assert.equal(record.actualErrorCode, "IMAGE_READ_FAILED");
});

test("D24 FAIL with UNEXPECTED_RESULT on PASS status", async () => {
  const record = await runD24OfflineHarness({
    prepareSelectedImage: async () => {
      return {
        status: "PASS",
        mimeType: "image/jpeg",
        sizeBytes: 6406,
        uiResponsive: true,
      };
    },
  });

  assert.equal(record.testCaseId, "D24_EMPTY_IMAGE");
  assert.equal(record.status, "FAIL");
  assert.equal(record.errorCode, "UNEXPECTED_RESULT");
  assert.equal(record.actualStatus, "PASS");
});

test("D24 handles prepareSelectedImage throwing", async () => {
  const record = await runD24OfflineHarness({
    prepareSelectedImage: async () => {
      throw new Error("Simulated failure");
    },
  });

  assert.equal(record.testCaseId, "D24_EMPTY_IMAGE");
  assert.equal(record.status, "FAIL");
  assert.equal(record.errorCode, "HARNESS_EXCEPTION");
  assert.equal(record.uiResponsive, true);
});

test("D24 rejects missing prepareSelectedImage", async () => {
  const { runEmptyImageDeviceCheck } =
    await import("../scripts/autojs6/empty-image-device-check.js");

  await assert.rejects(
    runEmptyImageDeviceCheck({
      expectedErrorCode: "EMPTY_IMAGE",
      prepareSelectedImage: undefined,
    }),
    {
      name: "TypeError",
      message: "prepareSelectedImage must be a function",
    },
  );
});
