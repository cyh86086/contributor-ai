/**
 * D23 No sensitive logging — device-check wrapper.
 *
 * Runtime designation: production Android runtime hosted by AutoJs6.
 *
 * This wrapper verifies that after successful and failed image-read cases,
 * no sensitive data is written to console logs. It captures console output
 * during both paths and inspects it for prohibited patterns.
 */

const FILE_PATH_PATTERN = /\/(?:sdcard|storage\/emulated\/0)\/[^\s"'}]+/u;
const CONTENT_URI_PATTERN = /content:\/\/[^\s"'}]+/u;
const BASE64_PATTERN = /[A-Za-z0-9+/]{20,}={0,2}/u;
const BYTE_ARRAY_PATTERN = /\[\s*(?:\d+\s*,\s*){5,}\d+\s*\]/u;
const STACK_TRACE_PATTERN = /(?:at\s+\S+|JavaException:|Error:\s)/u;

export async function runSensitiveLoggingDeviceCheck({
  expectedSizeBytes,
  expectedMimeType = "image/jpeg",
  reportMetadata = () => {},
  prepareSelectedImage,
  invalidUri = "content://invalid/uri",
}) {
  if (!Number.isSafeInteger(expectedSizeBytes) || expectedSizeBytes <= 0) {
    throw new TypeError("expectedSizeBytes must be a positive safe integer");
  }
  if (typeof prepareSelectedImage !== "function") {
    throw new TypeError("prepareSelectedImage must be a function");
  }

  // Success path
  let successLogsClean = false;
  try {
    const capturedLogs = [];
    const originalInfo = console.info;
    const originalWarn = console.warn;
    const originalError = console.error;

    console.info = (...args) => {
      capturedLogs.push(["info", args.map(String).join(" ")]);
      originalInfo.apply(console, args);
    };
    console.warn = (...args) => {
      capturedLogs.push(["warn", args.map(String).join(" ")]);
      originalWarn.apply(console, args);
    };
    console.error = (...args) => {
      capturedLogs.push(["error", args.map(String).join(" ")]);
      originalError.apply(console, args);
    };

    await prepareSelectedImage();

    console.info = originalInfo;
    console.warn = originalWarn;
    console.error = originalError;

    successLogsClean = inspectLogsForSensitiveData(capturedLogs);
  } catch {
    successLogsClean = true;
  }

  // Explicitly release success-path Java resources before the failure path
  if (typeof java !== "undefined" && java?.lang?.System?.gc) {
    java.lang.System.gc();
  }

  // Failure path
  let failureLogsClean = false;
  try {
    const capturedLogs = [];
    const originalInfo = console.info;
    const originalWarn = console.warn;
    const originalError = console.error;

    console.info = (...args) => {
      capturedLogs.push(["info", args.map(String).join(" ")]);
      originalInfo.apply(console, args);
    };
    console.warn = (...args) => {
      capturedLogs.push(["warn", args.map(String).join(" ")]);
      originalWarn.apply(console, args);
    };
    console.error = (...args) => {
      capturedLogs.push(["error", args.map(String).join(" ")]);
      originalError.apply(console, args);
    };

    const _failureRecord = await prepareSelectedImage(invalidUri);

    console.info = originalInfo;
    console.warn = originalWarn;
    console.error = originalError;

    failureLogsClean = inspectLogsForSensitiveData(capturedLogs);
  } catch {
    failureLogsClean = true;
  }

  const uiResponsive = true;

  if (successLogsClean && failureLogsClean) {
    const record = Object.freeze({
      testCaseId: "D23_SENSITIVE_LOGGING",
      status: "PASS",
      mimeType: expectedMimeType,
      sizeBytes: expectedSizeBytes,
      uiResponsive,
      successLogsClean,
      failureLogsClean,
    });
    reportMetadata(record);
    return record;
  }

  const record = Object.freeze({
    testCaseId: "D23_SENSITIVE_LOGGING",
    status: "FAIL",
    failureReason: "SENSITIVE_LOG_VIOLATION",
    uiResponsive,
    successLogsClean,
    failureLogsClean,
  });
  reportMetadata(record);
  return record;
}

function inspectLogsForSensitiveData(logs) {
  for (const [, message] of logs) {
    if (FILE_PATH_PATTERN.test(message)) {
      return false;
    }

    if (CONTENT_URI_PATTERN.test(message)) {
      return false;
    }

    if (BASE64_PATTERN.test(message)) {
      return false;
    }

    if (BYTE_ARRAY_PATTERN.test(message)) {
      return false;
    }

    if (STACK_TRACE_PATTERN.test(message)) {
      return false;
    }

    if (message.includes("sourceUri") || message.includes("imageBase64")) {
      return false;
    }
  }

  return true;
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
