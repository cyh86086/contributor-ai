/**
 * Runtime designation: AutoJs6 v6.7.0 device-verification entry source.
 *
 * The generated one-click script is verification support only. It performs no
 * network, provider, queue, Contributor app, or submission behavior.
 */

import { D01_TEST_CASE_ID, runD01OneClick } from "../d01-launcher-core.js";
import { runImageReaderDeviceCheck } from "../image-reader-device-check.js";
import { IMAGE_INPUT_ERROR_CODES } from "../../../src/core/index.js";

const MAX_SIZE_BYTES = 10 * 1024 * 1024;
const READER_SAFETY_LIMIT_BYTES = 12 * 1024 * 1024;
const PICK_REQUEST_CODE = 6101;
const UI_HEARTBEAT_TIMEOUT_MILLIS = 1_000;
const CHECK_TIMEOUT_MILLIS = 20_000;

const runtime =
  typeof globalThis === "object" ? globalThis : Function("return this")();

void runD01OneClick({
  showInstructions,
  pickSingleJpeg,
  executeOffUiThread,
  prepareSelectedImage,
  reportMetadata,
});

function showInstructions() {
  return runtime.dialogs.alert(
    "D01 JPEG 裝置驗證",
    "請在系統選圖器中選擇一張不含個資、且小於 10 MiB 的 JPEG 圖片。程式只會顯示 MIME、大小與介面回應狀態。",
  );
}

function pickSingleJpeg() {
  return new Promise((resolve) => {
    let settled = false;
    const listener = (requestCode, resultCode, data) => {
      if (requestCode !== PICK_REQUEST_CODE || settled) {
        return;
      }

      settled = true;
      removeActivityResultListener(listener);

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
      intent.setType("image/jpeg");
      intent.addCategory(runtime.android.content.Intent.CATEGORY_OPENABLE);
      runtime.activity.startActivityForResult(intent, PICK_REQUEST_CODE);
    } catch {
      settled = true;
      removeActivityResultListener(listener);
      resolve(null);
    }
  });
}

function removeActivityResultListener(listener) {
  if (typeof runtime.ui.emitter.removeListener === "function") {
    runtime.ui.emitter.removeListener("activity_result", listener);
  }
}

function executeOffUiThread(task) {
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
            const errorCode = publicErrorCode(error);
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

function prepareSelectedImage(sourceUri) {
  const context = runtime.context;
  const contentResolver = context.getContentResolver();

  return runImageReaderDeviceCheck({
    testCaseId: D01_TEST_CASE_ID,
    sourceUri,
    maxSizeBytes: MAX_SIZE_BYTES,
    readerSafetyLimitBytes: READER_SAFETY_LIMIT_BYTES,
    context,
    contentResolver,
    parseUri: (value) => runtime.android.net.Uri.parse(value),
    javaBridge: {
      createByteArray: (size) => runtime.util.java.array("byte", size),
      classifyError,
    },
    isFileUriApproved: () => false,
    reportMetadata: () => {},
  });
}

function classifyError(error) {
  try {
    const candidate = error?.javaException ?? error;
    return candidate instanceof runtime.java.lang.SecurityException
      ? IMAGE_INPUT_ERROR_CODES.URI_ACCESS_DENIED
      : IMAGE_INPUT_ERROR_CODES.IMAGE_READ_FAILED;
  } catch {
    return IMAGE_INPUT_ERROR_CODES.IMAGE_READ_FAILED;
  }
}

function publicErrorCode(error) {
  return Object.values(IMAGE_INPUT_ERROR_CODES).includes(error?.code)
    ? error.code
    : IMAGE_INPUT_ERROR_CODES.IMAGE_READ_FAILED;
}

function reportMetadata(record) {
  runtime.console.clear();
  runtime.console.show();
  runtime.console.info(JSON.stringify(record));
}
