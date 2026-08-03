/**
 * Runtime designation: shared AutoJs6 v6.7.0 adapter for non-production
 * image-format device-verification entries.
 *
 * This adapter performs no network, provider, queue, Contributor app, or
 * submission behavior.
 */

import { IMAGE_INPUT_ERROR_CODES } from "../../src/core/index.js";
import {
  normalizeFormatCheckErrorCode,
  runFormatCheck,
} from "./format-check-launcher-core.js";
import { runExactPortableLimitDeviceCheck } from "./exact-portable-limit-device-check.js";
import { runImageReaderDeviceCheck } from "./image-reader-device-check.js";
import { runMimeFallbackDeviceCheck } from "./mime-fallback-device-check.js";
import { runPortableSizeOverflowDeviceCheck } from "./portable-size-overflow-device-check.js";
import { runReaderSafetyCeilingOverflowDeviceCheck } from "./reader-safety-ceiling-overflow-device-check.js";
import { runMultiImageSequentialDeviceCheck } from "./multi-image-sequential-device-check.js";
import { runRepeatedReadsDeviceCheck } from "./repeated-reads-device-check.js";
import { runResolverMimeDeviceCheck } from "./resolver-mime-device-check.js";

const MAX_SIZE_BYTES = 10 * 1024 * 1024;
const READER_SAFETY_LIMIT_BYTES = 12 * 1024 * 1024;
const UI_HEARTBEAT_TIMEOUT_MILLIS = 1_000;
const CHECK_TIMEOUT_MILLIS = 20_000;

export function runAutoJs6FormatCheck(formatCase, injectedRuntime) {
  const runtime =
    injectedRuntime ??
    (typeof globalThis === "object" ? globalThis : Function("return this")());

  if (formatCase.verificationMode === "multi-image-sequential") {
    return runAutoJs6MultiImageCheck(formatCase, runtime);
  }

  return runFormatCheck(formatCase, {
    showInstructions({ title, instructionText }) {
      return runtime.dialogs.alert(title, instructionText);
    },
    pickSingleImage({ pickerMimeType, requestCode }) {
      return pickSingleImage(runtime, pickerMimeType, requestCode);
    },
    executeOffUiThread(task) {
      return executeOffUiThread(runtime, task);
    },
    prepareSelectedImage(sourceUri, testCaseId) {
      return prepareSelectedImage(runtime, sourceUri, testCaseId, formatCase);
    },
    reportMetadata(record) {
      runtime.console.clear();
      runtime.console.show();
      runtime.console.info(JSON.stringify(record));
    },
  });
}

async function runAutoJs6MultiImageCheck(formatCase, runtime) {
  await runtime.dialogs.alert(formatCase.title, formatCase.instructionText);

  const sourceUris = await pickMultipleImages(
    runtime,
    formatCase.pickerMimeType,
    formatCase.requestCode,
  );

  const reportMetadata = (record) => {
    runtime.console.clear();
    runtime.console.show();
    runtime.console.info(JSON.stringify(record));
  };

  if (!Array.isArray(sourceUris) || sourceUris.length === 0) {
    const record = Object.freeze({
      testCaseId: formatCase.testCaseId,
      requestedImages: formatCase.requestedImages,
      attemptedImages: 0,
      successfulImages: 0,
      status: "FAIL",
      images: [],
      uiResponsive: true,
      failureReason: "NO_IMAGES_SELECTED",
    });
    reportMetadata(record);
    return record;
  }

  const expectedImages = sourceUris.map(() => ({
    mimeType: formatCase.expectedMimeType,
    sizeBytes: formatCase.expectedSizeBytes,
  }));

  const context = runtime.context;
  const contentResolver = context.getContentResolver();
  const parseUri = (value) => runtime.android.net.Uri.parse(value);
  const javaBridge = {
    createByteArray: (size) => runtime.util.java.array("byte", size),
    classifyError: (error) => classifyError(runtime, error),
  };

  return runMultiImageSequentialDeviceCheck({
    sourceUris,
    expectedImages,
    testCaseId: formatCase.testCaseId,
    maxSizeBytes: formatCase.maxSizeBytes,
    readerSafetyLimitBytes: formatCase.readerSafetyLimitBytes,
    context,
    contentResolver,
    parseUri,
    javaBridge,
    isFileUriApproved: () => false,
    reportMetadata,
  });
}

function pickMultipleImages(runtime, pickerMimeType, requestCode) {
  return new Promise((resolve) => {
    let settled = false;
    const listener = (receivedRequestCode, resultCode, data) => {
      if (receivedRequestCode !== requestCode || settled) {
        return;
      }

      settled = true;
      removeActivityResultListener(runtime, listener);

      if (
        resultCode !== runtime.android.app.Activity.RESULT_OK ||
        data == null ||
        typeof data.getClipData !== "function"
      ) {
        resolve([]);
        return;
      }

      const clipData = data.getClipData();
      if (clipData == null || typeof clipData.getItemCount !== "function") {
        resolve([]);
        return;
      }

      const uris = [];
      const count = clipData.getItemCount();
      for (let i = 0; i < count; i += 1) {
        const item = clipData.getItemAt(i);
        if (item != null && typeof item.getUri === "function") {
          const uri = item.getUri();
          if (uri != null) {
            uris.push(String(uri.toString()));
          }
        }
      }
      resolve(uris);
    };

    runtime.ui.emitter.on("activity_result", listener);

    try {
      const intent = new runtime.android.content.Intent(
        runtime.android.content.Intent.ACTION_GET_CONTENT,
      );
      intent.setType(pickerMimeType);
      intent.addCategory(runtime.android.content.Intent.CATEGORY_OPENABLE);
      intent.putExtra(
        runtime.android.content.Intent.EXTRA_ALLOW_MULTIPLE,
        true,
      );
      runtime.activity.startActivityForResult(intent, requestCode);
    } catch {
      settled = true;
      removeActivityResultListener(runtime, listener);
      resolve([]);
    }
  });
}

function pickSingleImage(runtime, pickerMimeType, requestCode) {
  return new Promise((resolve) => {
    let settled = false;
    const listener = (receivedRequestCode, resultCode, data) => {
      if (receivedRequestCode !== requestCode || settled) {
        return;
      }

      settled = true;
      removeActivityResultListener(runtime, listener);

      if (
        resultCode !== runtime.android.app.Activity.RESULT_OK ||
        data == null ||
        typeof data.getData !== "function"
      ) {
        resolve(null);
        return;
      }

      const uri = data.getData();
      resolve(uri == null ? null : String(uri.toString()));
    };

    runtime.ui.emitter.on("activity_result", listener);

    try {
      const intent = new runtime.android.content.Intent(
        runtime.android.content.Intent.ACTION_GET_CONTENT,
      );
      intent.setType(pickerMimeType);
      intent.addCategory(runtime.android.content.Intent.CATEGORY_OPENABLE);
      runtime.activity.startActivityForResult(intent, requestCode);
    } catch {
      settled = true;
      removeActivityResultListener(runtime, listener);
      resolve(null);
    }
  });
}

function removeActivityResultListener(runtime, listener) {
  if (typeof runtime.ui.emitter.removeListener === "function") {
    runtime.ui.emitter.removeListener("activity_result", listener);
  }
}

function executeOffUiThread(runtime, task) {
  return new Promise((resolve) => {
    const completed = new runtime.java.util.concurrent.atomic.AtomicBoolean(
      false,
    );
    const heartbeat = new runtime.java.util.concurrent.atomic.AtomicBoolean(
      false,
    );
    let worker = null;

    const finish = (execution) => {
      if (completed.compareAndSet(false, true)) {
        resolve(execution);
      }
    };

    runtime.ui.post(() => {
      if (completed.compareAndSet(false, true)) {
        if (worker != null && typeof worker.interrupt === "function") {
          worker.interrupt();
        }
        resolve({ uiResponsive: false });
      }
    }, CHECK_TIMEOUT_MILLIS);

    try {
      worker = runtime.threads.start(() => {
        if (runtime.ui.isUiThread()) {
          runtime.ui.post(() => finish({ uiResponsive: false }));
          return;
        }

        runtime.ui.post(() => heartbeat.set(true));
        const deadline = Date.now() + UI_HEARTBEAT_TIMEOUT_MILLIS;
        while (!heartbeat.get() && Date.now() < deadline) {
          runtime.java.lang.Thread.sleep(10);
        }

        if (!heartbeat.get()) {
          runtime.ui.post(() => finish({ uiResponsive: false }));
          return;
        }

        Promise.resolve()
          .then(task)
          .then((value) => {
            runtime.ui.post(() => finish({ value, uiResponsive: true }));
          })
          .catch((error) => {
            const errorCode = normalizeFormatCheckErrorCode(error);
            runtime.ui.post(() =>
              finish({
                value: { status: "FAIL", errorCode },
                uiResponsive: true,
              }),
            );
          });
      });
    } catch {
      finish({ uiResponsive: false });
    }
  });
}

function prepareSelectedImage(runtime, sourceUri, testCaseId, formatCase) {
  const context = runtime.context;
  const contentResolver = context.getContentResolver();
  const parseUri = (value) => runtime.android.net.Uri.parse(value);
  const javaBridge = {
    createByteArray: (size) => runtime.util.java.array("byte", size),
    classifyError(error) {
      return classifyError(runtime, error);
    },
  };

  if (formatCase.verificationMode === "repeated-reads") {
    return runRepeatedReadsDeviceCheck({
      testCaseId,
      sourceUri,
      expectedSizeBytes: formatCase.expectedSizeBytes,
      maxSizeBytes: formatCase.maxSizeBytes,
      readerSafetyLimitBytes: formatCase.readerSafetyLimitBytes,
      context,
      contentResolver,
      parseUri,
      javaBridge,
      isFileUriApproved: () => false,
      reportMetadata: () => {},
    });
  }

  if (formatCase.verificationMode === "reader-safety-ceiling-overflow") {
    return runReaderSafetyCeilingOverflowDeviceCheck({
      testCaseId,
      sourceUri,
      expectedSizeBytes: formatCase.expectedSizeBytes,
      maxSizeBytes: formatCase.maxSizeBytes,
      readerSafetyLimitBytes: formatCase.readerSafetyLimitBytes,
      context,
      contentResolver,
      parseUri,
      javaBridge,
      isFileUriApproved: () => false,
      reportMetadata: () => {},
    });
  }

  if (formatCase.verificationMode === "exact-portable-limit") {
    return runExactPortableLimitDeviceCheck({
      testCaseId,
      sourceUri,
      expectedSizeBytes: formatCase.expectedSizeBytes,
      maxSizeBytes: formatCase.maxSizeBytes,
      readerSafetyLimitBytes: formatCase.readerSafetyLimitBytes,
      context,
      contentResolver,
      parseUri,
      javaBridge,
      isFileUriApproved: () => false,
      reportMetadata: () => {},
    });
  }

  if (formatCase.verificationMode === "portable-size-overflow") {
    return runPortableSizeOverflowDeviceCheck({
      testCaseId,
      sourceUri,
      expectedSizeBytes: formatCase.expectedSizeBytes,
      maxSizeBytes: formatCase.maxSizeBytes,
      readerSafetyLimitBytes: formatCase.readerSafetyLimitBytes,
      context,
      contentResolver,
      parseUri,
      javaBridge,
      isFileUriApproved: () => false,
      reportMetadata: () => {},
    });
  }

  if (formatCase.verificationMode === "mime-fallback") {
    return runMimeFallbackDeviceCheck({
      testCaseId,
      sourceUri,
      maxSizeBytes: MAX_SIZE_BYTES,
      readerSafetyLimitBytes: READER_SAFETY_LIMIT_BYTES,
      context,
      contentResolver,
      parseUri,
      javaBridge,
      isFileUriApproved: () => false,
      reportMetadata: () => {},
    });
  }

  if (formatCase.verificationMode === "resolver-mime") {
    return runResolverMimeDeviceCheck({
      testCaseId,
      sourceUri,
      expectedMimeType: formatCase.expectedMimeType,
      maxSizeBytes: MAX_SIZE_BYTES,
      readerSafetyLimitBytes: READER_SAFETY_LIMIT_BYTES,
      context,
      contentResolver,
      parseUri,
      javaBridge,
      isFileUriApproved: () => false,
      reportMetadata: () => {},
    });
  }

  return runImageReaderDeviceCheck({
    testCaseId,
    sourceUri,
    maxSizeBytes: MAX_SIZE_BYTES,
    readerSafetyLimitBytes: READER_SAFETY_LIMIT_BYTES,
    context,
    contentResolver,
    parseUri,
    javaBridge,
    isFileUriApproved: () => false,
    reportMetadata: () => {},
  });
}

function classifyError(runtime, error) {
  try {
    const candidate = error?.javaException ?? error;
    return candidate instanceof runtime.java.lang.SecurityException
      ? IMAGE_INPUT_ERROR_CODES.URI_ACCESS_DENIED
      : IMAGE_INPUT_ERROR_CODES.IMAGE_READ_FAILED;
  } catch {
    return IMAGE_INPUT_ERROR_CODES.IMAGE_READ_FAILED;
  }
}
