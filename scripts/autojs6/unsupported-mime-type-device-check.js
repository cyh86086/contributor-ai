/**
 * D25 Unsupported MIME type device check.
 *
 * Verifies that when the production reader encounters a non-image source,
 * the portable core returns the stable public error code UNSUPPORTED_MIME_TYPE
 * with a frozen, sanitized failure record.
 *
 * @param {object} options
 * @param {string} options.expectedErrorCode - Expected error code (default: "UNSUPPORTED_MIME_TYPE")
 * @param {function} options.reportMetadata - Metadata reporting callback
 * @param {function} options.prepareSelectedImage - Callback that executes the production reader
 * @returns {Promise<object>} Frozen sanitized record
 */
export async function runUnsupportedMimeTypeDeviceCheck({
  expectedErrorCode = "UNSUPPORTED_MIME_TYPE",
  reportMetadata = () => {},
  prepareSelectedImage,
}) {
  if (typeof prepareSelectedImage !== "function") {
    throw new TypeError("prepareSelectedImage must be a function");
  }

  let record;

  try {
    const result = await prepareSelectedImage();

    const status = safelyReadProperty(result, "status");
    const errorCode = safelyReadProperty(result, "errorCode");
    const uiResponsive = safelyReadProperty(result, "uiResponsive");

    if (status === "FAIL" && errorCode === expectedErrorCode) {
      record = Object.freeze({
        testCaseId: "D25_UNSUPPORTED_MIME_TYPE",
        status: "FAIL",
        errorCode,
        uiResponsive: uiResponsive ?? true,
      });
    } else {
      record = Object.freeze({
        testCaseId: "D25_UNSUPPORTED_MIME_TYPE",
        status: "FAIL",
        errorCode: "UNEXPECTED_RESULT",
        expectedErrorCode,
        actualStatus: status,
        actualErrorCode: errorCode,
        uiResponsive: uiResponsive ?? true,
      });
    }
  } catch {
    record = Object.freeze({
      testCaseId: "D25_UNSUPPORTED_MIME_TYPE",
      status: "FAIL",
      errorCode: "HARNESS_EXCEPTION",
      uiResponsive: true,
    });
  }

  reportMetadata(record);
  return record;
}

function safelyReadProperty(value, propertyName) {
  if (value === null || value === undefined || typeof value !== "object") {
    return undefined;
  }
  return value[propertyName];
}
