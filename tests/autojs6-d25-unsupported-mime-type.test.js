import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { createD25OfflineHarness } from "./support/d25-offline-unsupported-mime-type-harness.js";

describe("D25 Unsupported MIME type offline tests", () => {
  const harness = createD25OfflineHarness();

  it("returns UNSUPPORTED_MIME_TYPE when production reader encounters non-image source", async () => {
    const record = await harness.unsupportedMimeType();
    assert.equal(record.testCaseId, "D25_UNSUPPORTED_MIME_TYPE");
    assert.equal(record.status, "FAIL");
    assert.equal(record.errorCode, "UNSUPPORTED_MIME_TYPE");
    assert.equal(record.uiResponsive, true);
    assert.ok(Object.isFrozen(record));
  });

  it("returns UNEXPECTED_RESULT when error code does not match", async () => {
    const record = await harness.unexpectedResult();
    assert.equal(record.testCaseId, "D25_UNSUPPORTED_MIME_TYPE");
    assert.equal(record.status, "FAIL");
    assert.equal(record.errorCode, "UNEXPECTED_RESULT");
    assert.equal(record.expectedErrorCode, "UNSUPPORTED_MIME_TYPE");
    assert.equal(record.actualErrorCode, "IMAGE_READ_FAILED");
    assert.equal(record.uiResponsive, true);
    assert.ok(Object.isFrozen(record));
  });

  it("returns HARNESS_EXCEPTION when prepareSelectedImage throws", async () => {
    const record = await harness.harnessException();
    assert.equal(record.testCaseId, "D25_UNSUPPORTED_MIME_TYPE");
    assert.equal(record.status, "FAIL");
    assert.equal(record.errorCode, "HARNESS_EXCEPTION");
    assert.equal(record.uiResponsive, true);
    assert.ok(Object.isFrozen(record));
  });

  it("preserves uiResponsive: false when reported", async () => {
    const record = await harness.nonResponsiveUi();
    assert.equal(record.testCaseId, "D25_UNSUPPORTED_MIME_TYPE");
    assert.equal(record.status, "FAIL");
    assert.equal(record.errorCode, "UNSUPPORTED_MIME_TYPE");
    assert.equal(record.uiResponsive, false);
    assert.ok(Object.isFrozen(record));
  });

  it("throws TypeError when prepareSelectedImage is not a function", async () => {
    await assert.rejects(
      () => harness.invalidPrepareSelectedImage(),
      (err) => {
        assert.ok(err instanceof TypeError);
        assert.match(err.message, /prepareSelectedImage must be a function/);
        return true;
      },
    );
  });
});
