/**
 * D22 No image or Base64 persistence — offline harness.
 *
 * This harness provides Node.js-compatible mocks for D22 device-check testing.
 */

import { runNoPersistenceDeviceCheck } from "../../scripts/autojs6/no-persistence-device-check.js";

export async function runD22OfflineHarness({
  expectedSizeBytes = 6_406,
  successRecord = {
    status: "PASS",
    mimeType: "image/jpeg",
    sizeBytes: 6_406,
  },
  failureRecord = {
    status: "FAIL",
    errorCode: "URI_ACCESS_DENIED",
  },
  prepareSelectedImage,
} = {}) {
  const defaultPrepareSelectedImage = async (invalidUri) => {
    if (invalidUri) {
      return failureRecord;
    }
    return successRecord;
  };

  return runNoPersistenceDeviceCheck({
    expectedSizeBytes,
    reportMetadata: () => {},
    prepareSelectedImage: prepareSelectedImage ?? defaultPrepareSelectedImage,
  });
}
