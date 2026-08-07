/**
 * D26 Controlled encoding failure device check.
 *
 * Verifies that when a controlled encoding failure is injected after a valid
 * read, the portable core returns the stable public error code ENCODING_FAILED
 * with a frozen, sanitized failure record.
 *
 * @param {object} options
 * @param {string} options.expectedErrorCode - Expected error code (default: "ENCODING_FAILED")
 * @param {function} options.reportMetadata - Metadata reporting callback
 * @param {function} options.prepareSelectedImage - Callback that executes the production reader
 * @returns {Promise<object>} Frozen sanitized record
 */
export async function runControlledEncodingFailureDeviceCheck({
  expectedErrorCode = "ENCODING_FAILED",
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
        testCaseId: "D26_CONTROLLED_ENCODING_FAILURE",
        status: "FAIL",
        errorCode,
        uiResponsive: uiResponsive ?? true,
      });
    } else {
      record = Object.freeze({
        testCaseId: "D26_CONTROLLED_ENCODING_FAILURE",
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
      testCaseId: "D26_CONTROLLED_ENCODING_FAILURE",
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
