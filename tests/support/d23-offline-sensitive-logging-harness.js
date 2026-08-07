/**
 * D23 No sensitive logging — offline harness.
 *
 * This harness provides Node.js-compatible mocks for D23 device-check testing.
 */

import { runSensitiveLoggingDeviceCheck } from "../../scripts/autojs6/sensitive-logging-device-check.js";

export async function runD23OfflineHarness({
  expectedSizeBytes = 6_406,
  expectedMimeType = "image/jpeg",
  prepareSelectedImage,
} = {}) {
  const defaultPrepareSelectedImage = async (invalidUri) => {
    if (invalidUri) {
      return { status: "FAIL", errorCode: "URI_ACCESS_DENIED" };
    }
    return {
      status: "PASS",
      mimeType: expectedMimeType,
      sizeBytes: expectedSizeBytes,
    };
  };

  return runSensitiveLoggingDeviceCheck({
    expectedSizeBytes,
    expectedMimeType,
    reportMetadata: () => {},
    prepareSelectedImage: prepareSelectedImage ?? defaultPrepareSelectedImage,
  });
}
