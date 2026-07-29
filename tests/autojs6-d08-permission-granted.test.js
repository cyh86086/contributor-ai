import assert from "node:assert/strict";
import test from "node:test";

import { D08_PERMISSION_GRANTED_CHECK_CASE } from "../scripts/autojs6/format-check-case-manifest.js";
import { runImageReaderDeviceCheck } from "../scripts/autojs6/image-reader-device-check.js";

const TEST_CASE_ID = "D08_PERMISSION_GRANTED";
const CONTENT_URI =
  "content://private.provider/fresh-selection/808?token=private";
const JPEG_BYTES = [0xff, 0xd8, 0xff, 0xe0, 0x11, 0x22];

test("D08 is a pure shared-runtime case alias", () => {
  assert.deepEqual(
    {
      testCaseId: D08_PERMISSION_GRANTED_CHECK_CASE.testCaseId,
      pickerMimeType: D08_PERMISSION_GRANTED_CHECK_CASE.pickerMimeType,
      expectedMimeType: D08_PERMISSION_GRANTED_CHECK_CASE.expectedMimeType,
      requestCode: D08_PERMISSION_GRANTED_CHECK_CASE.requestCode,
      verificationMode:
        D08_PERMISSION_GRANTED_CHECK_CASE.verificationMode ?? null,
    },
    {
      testCaseId: TEST_CASE_ID,
      pickerMimeType: "image/jpeg",
      expectedMimeType: "image/jpeg",
      requestCode: 6108,
      verificationMode: null,
    },
  );
});

test("D08 normal path reads a currently accessible fresh selection", async () => {
  const reports = [];
  const metrics = {
    getTypeCalls: 0,
    openInputStreamCalls: 0,
  };

  const contentResolver = {
    getType() {
      metrics.getTypeCalls += 1;
      return "image/jpeg";
    },
    openInputStream() {
      metrics.openInputStreamCalls += 1;
      if (metrics.openInputStreamCalls === 1) {
        return fakeStream([]);
      }
      return fakeStream([JPEG_BYTES]);
    },
  };

  const record = await runImageReaderDeviceCheck({
    testCaseId: TEST_CASE_ID,
    sourceUri: CONTENT_URI,
    maxSizeBytes: 64,
    readerSafetyLimitBytes: 128,
    contentResolver,
    parseUri: (uri) => ({ uri }),
    javaBridge: {
      createByteArray(size) {
        return new Int8Array(size);
      },
      classifyError() {
        return "IMAGE_READ_FAILED";
      },
    },
    reportMetadata: (value) => reports.push(value),
  });

  assert.deepEqual(record, {
    testCaseId: TEST_CASE_ID,
    status: "PASS",
    mimeType: "image/jpeg",
    sizeBytes: JPEG_BYTES.length,
  });
  assert.deepEqual(reports, [record]);
  assert.equal(metrics.getTypeCalls, 1);
  assert.equal(metrics.openInputStreamCalls, 2);
  assert.equal(JSON.stringify(record).includes(CONTENT_URI), false);
  assert.equal(JSON.stringify(record).includes("private"), false);
});

test("D08 inaccessible fresh selection fails closed without URI leakage", async () => {
  const reports = [];
  const record = await runImageReaderDeviceCheck({
    testCaseId: TEST_CASE_ID,
    sourceUri: CONTENT_URI,
    maxSizeBytes: 64,
    readerSafetyLimitBytes: 128,
    contentResolver: {
      getType() {
        return "image/jpeg";
      },
      openInputStream() {
        return null;
      },
    },
    parseUri: (uri) => ({ uri }),
    javaBridge: {
      createByteArray(size) {
        return new Int8Array(size);
      },
      classifyError() {
        return "URI_ACCESS_DENIED";
      },
    },
    reportMetadata: (value) => reports.push(value),
  });

  assert.deepEqual(record, {
    testCaseId: TEST_CASE_ID,
    status: "FAIL",
    errorCode: "URI_ACCESS_DENIED",
  });
  assert.deepEqual(reports, [record]);
  assert.equal(JSON.stringify(record).includes(CONTENT_URI), false);
});

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
