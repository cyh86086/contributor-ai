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
import { runImageReaderDeviceCheck } from "./image-reader-device-check.js";
import { runResolverMimeDeviceCheck } from "./resolver-mime-device-check.js";

const MAX_SIZE_BYTES = 10 * 1024 * 1024;
const READER_SAFETY_LIMIT_BYTES = 12 * 1024 * 1024;
const UI_HEARTBEAT_TIMEOUT_MILLIS = 1_000;
const CHECK_TIMEOUT_MILLIS = 20_000;

export function runAutoJs6FormatCheck(formatCase, injectedRuntime) {
  const runtime =
    injectedRuntime ??
    (typeof globalThis === "object" ? globalThis : Function("return this")());

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
