/**
 * D23 No sensitive logging — offline harness.
 *
 * This harness provides Node.js-compatible mocks for D23 device-check testing.
 */

import { runSensitiveLoggingDeviceCheck } from "../../scripts/autojs6/sensitive-logging-device-check.js";

export async function runD23OfflineHarness({
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

  return runSensitiveLoggingDeviceCheck({
    expectedSizeBytes,
    reportMetadata: () => {},
    prepareSelectedImage: prepareSelectedImage ?? defaultPrepareSelectedImage,
  });
}
