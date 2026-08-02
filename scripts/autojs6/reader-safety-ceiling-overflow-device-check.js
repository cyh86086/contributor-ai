/**
 * Runtime designation: non-production D15 evidence harness for the existing
 * reader safety-ceiling overflow boundary in AutoJs6.
 *
 * This wrapper validates only the independently counted D15 fixture ordering,
 * then delegates unchanged to the production reader and portable core through
 * runImageReaderDeviceCheck(). It preserves the sanitized underlying result so
 * accidental success and non-target public failures remain distinguishable.
 */

import { runImageReaderDeviceCheck } from "./image-reader-device-check.js";

export async function runReaderSafetyCeilingOverflowDeviceCheck({
  expectedSizeBytes,
  maxSizeBytes,
  readerSafetyLimitBytes,
  reportMetadata = () => {},
  ...readerOptions
}) {
  validateLimits({
    expectedSizeBytes,
    maxSizeBytes,
    readerSafetyLimitBytes,
    reportMetadata,
  });

  const record = await runImageReaderDeviceCheck({
    ...readerOptions,
    maxSizeBytes,
    readerSafetyLimitBytes,
    reportMetadata: () => {},
  });

  reportMetadata(record);
  return record;
}

function validateLimits({
  expectedSizeBytes,
  maxSizeBytes,
  readerSafetyLimitBytes,
  reportMetadata,
}) {
  if (
    !Number.isSafeInteger(expectedSizeBytes) ||
    expectedSizeBytes <= 0 ||
    !Number.isSafeInteger(maxSizeBytes) ||
    maxSizeBytes < expectedSizeBytes
  ) {
    throw new TypeError(
      "D15 maxSizeBytes must be a positive safe integer at or above expectedSizeBytes",
    );
  }
  if (
    !Number.isSafeInteger(readerSafetyLimitBytes) ||
    readerSafetyLimitBytes <= 0 ||
    readerSafetyLimitBytes >= expectedSizeBytes
  ) {
    throw new TypeError(
      "D15 readerSafetyLimitBytes must be a positive safe integer below expectedSizeBytes",
    );
  }
  if (typeof reportMetadata !== "function") {
    throw new TypeError("reportMetadata must be a function");
  }
}
