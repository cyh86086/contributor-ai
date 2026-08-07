/**
 * D24 Empty image — device-check wrapper.
 *
 * Runtime designation: production Android runtime hosted by AutoJs6.
 *
 * This wrapper verifies that when the production reader encounters a
 * zero-byte or controlled empty source, the portable core returns the
 * stable public error code EMPTY_IMAGE with a frozen, sanitized failure record.
 */

export async function runEmptyImageDeviceCheck({
  expectedErrorCode = "EMPTY_IMAGE",
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
        testCaseId: "D24_EMPTY_IMAGE",
        status: "FAIL",
        errorCode,
        uiResponsive: uiResponsive ?? true,
      });
    } else {
      record = Object.freeze({
        testCaseId: "D24_EMPTY_IMAGE",
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
      testCaseId: "D24_EMPTY_IMAGE",
      status: "FAIL",
      errorCode: "HARNESS_EXCEPTION",
      uiResponsive: true,
    });
  }

  reportMetadata(record);
  return record;
}

function safelyReadProperty(value, propertyName) {
  if (
    value === null ||
    (typeof value !== "object" && typeof value !== "function")
  ) {
    return undefined;
  }

  try {
    return value[propertyName];
  } catch {
    return undefined;
  }
}
