/**
 * Runtime designation: production Android runtime hosted by AutoJs6.
 *
 * This is the main production entry point that wires all adapters together
 * and runs the full microstock automation pipeline.
 *
 * Prerequisites:
 * - Gemini API key stored at /sdcard/contributor-ai/api-key.txt
 * - Contributor app installed on the device
 * - AutoJs6 v6.7.0+ with storage permission granted
 */

import { prepareImageInput } from "../../../src/core/image-input.js";
import { createAutoJs6AndroidImageReader } from "../../../src/autojs6/android-image-reader.js";
import { createAutoJs6HttpCaller } from "../../../src/autojs6/http-caller.js";
import { createGeminiVisionCaller } from "../../../src/autojs6/gemini-vision-caller.js";
import { createContributorUIAdapter } from "../../../src/autojs6/contributor-ui-adapter.js";
import { createLauncher } from "../../../src/core/launcher.js";

// ── Configuration ──────────────────────────────────────────────────────────

const GEMINI_MODEL = "gemini-1.5-pro";
const GEMINI_MAX_IMAGE_BYTES = 20 * 1024 * 1024; // 20 MB
const PORTABLE_MAX_SIZE_BYTES = 20 * 1024 * 1024; // 20 MB
const READER_SAFETY_LIMIT_BYTES = 50 * 1024 * 1024; // 50 MB
const CONTRIBUTOR_PACKAGE_NAME = "com.contributor.app";
const API_KEY_PATH = "/sdcard/contributor-ai/api-key.txt";

// ── API key retrieval ──────────────────────────────────────────────────────

function getGeminiApiKey() {
  const file = new java.io.File(API_KEY_PATH);
  if (!file.exists()) {
    throw new Error(
      `API key file not found at ${API_KEY_PATH}. Please create it.`,
    );
  }
  const reader = new java.io.BufferedReader(new java.io.FileReader(file));
  try {
    const key = reader.readLine();
    if (key == null || key.trim().length === 0) {
      throw new Error("API key file is empty.");
    }
    return key.trim();
  } finally {
    reader.close();
  }
}

// ── Adapter wiring ─────────────────────────────────────────────────────────

// Android image reader
const imageReader = createAutoJs6AndroidImageReader({
  context: context,
  parseUri: (uri) => android.net.Uri.parse(uri),
  javaBridge: {
    createByteArray: (size) => new java.lang.Byte[size](),
    toUint8Array: (javaBytes, count) => {
      const arr = new Uint8Array(count);
      for (let i = 0; i < count; i++) {
        arr[i] = javaBytes[i] & 0xff;
      }
      return arr;
    },
    classifyError: (error) => {
      const msg = String(error && error.message ? error.message : error);
      if (/denied|permission|security/i.test(msg)) {
        return "URI_ACCESS_DENIED";
      }
      return "IMAGE_READ_FAILED";
    },
  },
  openFileReadOnly: (path) => {
    const file = new java.io.File(path);
    if (!file.exists() || !file.canRead()) return null;
    return new java.io.FileInputStream(file);
  },
  readerSafetyLimitBytes: READER_SAFETY_LIMIT_BYTES,
});

// HTTP caller (AutoJs6 http global)
const httpCaller = createAutoJs6HttpCaller({ httpClient: http });

// Gemini vision caller
const providerCaller = createGeminiVisionCaller({
  httpCaller,
  getApiKey: getGeminiApiKey,
  model: GEMINI_MODEL,
});

// Contributor UI adapter
const uiAdapter = createContributorUIAdapter({
  appLauncher: (pkg) => app.launchApp(pkg),
  findDescription: (timeout) => id("description").findOne(timeout),
  findKeywords: (timeout) => id("keywords").findOne(timeout),
  packageName: CONTRIBUTOR_PACKAGE_NAME,
});

// Launcher
const launcher = createLauncher({
  imageReader,
  providerCaller,
  uiAdapter,
  maxImageBytes: GEMINI_MAX_IMAGE_BYTES,
  maxSizeBytes: PORTABLE_MAX_SIZE_BYTES,
  failFast: false,
});

// ── Main execution ─────────────────────────────────────────────────────────

async function main() {
  toast("Contributor AI starting...");

  // Select images from gallery using native Android API
  const intent = new android.content.Intent(
    android.content.Intent.ACTION_OPEN_DOCUMENT,
  );
  intent.addCategory(android.content.Intent.CATEGORY_OPENABLE);
  intent.setType("image/*");
  intent.putExtra(
    android.content.Intent.EXTRA_ALLOW_MULTIPLE,
    java.lang.Boolean.TRUE,
  );

  // Use CountDownLatch to wait for async startActivityForResult result
  const latch = new java.util.concurrent.CountDownLatch(1);
  let resultData = null;

  // Store original onActivityResult if it exists
  const originalOnActivityResult = activity.onActivityResult;

  // Override onActivityResult to capture the result
  activity.onActivityResult = function (requestCode, resultCode, data) {
    if (originalOnActivityResult) {
      originalOnActivityResult.call(activity, requestCode, resultCode, data);
    }
    if (requestCode === 1001 && resultCode === -1) {
      // RESULT_OK = -1
      resultData = data;
    }
    latch.countDown();
  };

  // Launch the image picker
  activity.startActivityForResult(intent, 1001);

  // Wait for result (with timeout)
  latch.await(120, java.util.concurrent.TimeUnit.SECONDS);

  // Restore original handler
  if (originalOnActivityResult) {
    activity.onActivityResult = originalOnActivityResult;
  }

  if (!resultData) {
    toast("No images selected.");
    return;
  }

  const clipData = resultData.getClipData();
  if (!clipData) {
    toast("No images selected.");
    return;
  }

  const images = [];
  for (let i = 0; i < clipData.getItemCount(); i++) {
    const uri = clipData.getItemAt(i).getUri().toString();
    try {
      const imageInput = await prepareImageInput({
        sourceUri: uri,
        reader: imageReader,
        maxSizeBytes: PORTABLE_MAX_SIZE_BYTES,
      });
      images.push(imageInput);
    } catch (_error) {
      console.warn(`Failed to read image: ${uri}`);
    }
  }

  if (images.length === 0) {
    toast("No valid images to process.");
    return;
  }

  toast(`Processing ${images.length} images...`);

  // Run the full pipeline
  const pipelineResult = await launcher.run(images);

  // Report results
  toast(
    `Done: ${pipelineResult.succeeded} succeeded, ${pipelineResult.failed} failed out of ${pipelineResult.totalImages} images.`,
  );

  if (pipelineResult.errors.length > 0) {
    console.warn("Errors:", JSON.stringify(pipelineResult.errors, null, 2));
  }
}

main().catch((error) => {
  console.error("Production pipeline failed:", error);
  toast("An error occurred. Check the console for details.");
});
