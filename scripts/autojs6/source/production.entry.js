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

import { createAutoJs6AndroidImageReader } from "../../../src/autojs6/android-image-reader.js";
import { createContributorUIAdapter } from "../../../src/autojs6/contributor-ui-adapter.js";
import { createGeminiVisionCaller } from "../../../src/autojs6/gemini-vision-caller.js";
import { createAutoJs6HttpCaller } from "../../../src/autojs6/http-caller.js";
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
  console.warn(`[DEBUG] API key file exists: ${file.exists()}`);
  if (!file.exists()) {
    throw new Error(
      `API key file not found at ${API_KEY_PATH}. Please create it.`,
    );
  }
  const reader = new java.io.BufferedReader(new java.io.FileReader(file));
  try {
    const key = reader.readLine();
    console.warn(`[DEBUG] API key read, length: ${key ? key.length : 0}`);
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
const httpCaller = createAutoJs6HttpCaller({
  httpClient: http,
  logger: {
    warn: (msg) => console.warn(`[HTTP] ${msg}`),
  },
});

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

// ── Main execution ────────────────────────────────────────────────────────

function main() {
  console.warn("[DEBUG] main() started");
  toast("Contributor AI starting...");

  // Use dialogs.rawInput to get image path from user
  var defaultPath = "/storage/emulated/0/DCIM/Camera/IMG_20260809_093300.jpg";
  var input = dialogs.rawInput("Enter image file path:", defaultPath);

  if (!input || input.replace(/^\s+|\s+$/g, "").length === 0) {
    toast("No path entered. Exiting.");
    console.warn("[DEBUG] No path entered");
    return;
  }

  var filePath = input.replace(/^\s+|\s+$/g, "");
  console.warn(`[DEBUG] User entered path: ${filePath}`);
  toast(`Processing: ${filePath}`);

  // Process the single image
  var paths = [filePath];

  console.warn(`[DEBUG] Parsed paths count: ${paths.length}`);
  console.warn(`[DEBUG] Path[0]: ${paths[0]}`);

  if (paths.length === 0) {
    toast("No valid paths found.");
    return;
  }

  // Save reference to AutoJs6 global images module before shadowing
  var autoJsImages = images;
  var imageInputs = [];
  var i;
  var currentPath;
  var img;
  var bitmap;
  var byteArrayOutputStream;
  var bytes;
  var base64;
  var imageInput;
  var e;
  var err;

  for (i = 0; i < paths.length; i++) {
    currentPath = paths[i];
    try {
      console.warn(`[DEBUG] Reading image: ${currentPath}`);
      img = autoJsImages.read(currentPath);
      if (!img) {
        console.warn(`Failed to read: ${currentPath}`);
        continue;
      }
      console.warn(`[DEBUG] Image read successfully`);

      // Convert AutoJs6 Image to base64 for our pipeline
      bitmap = img.getBitmap();
      console.warn(
        `[DEBUG] Bitmap obtained, size: ${bitmap.getWidth()}x${bitmap.getHeight()}`,
      );
      byteArrayOutputStream = new java.io.ByteArrayOutputStream();
      bitmap.compress(
        android.graphics.Bitmap.CompressFormat.JPEG,
        90,
        byteArrayOutputStream,
      );
      bytes = byteArrayOutputStream.toByteArray();
      console.warn(`[DEBUG] Bytes length: ${bytes.length}`);
      base64 = android.util.Base64.encodeToString(
        bytes,
        android.util.Base64.NO_WRAP,
      );
      console.warn(`[DEBUG] Base64 length: ${base64.length}`);

      // Create ImageInput compatible with our portable core
      imageInput = {
        sourceUri: `file://${currentPath}`,
        mimeType: "image/jpeg",
        imageBase64: base64,
        sizeBytes: bytes.length,
      };
      imageInputs.push(imageInput);
      console.warn(`[DEBUG] ImageInput created`);

      bitmap.recycle();
      img.recycle();
    } catch (error) {
      console.warn(`Error processing ${currentPath}: ${error.message}`);
      console.warn(`[DEBUG] Error stack: ${error.stack}`);
    }
  }

  if (imageInputs.length === 0) {
    toast("No valid images loaded.");
    return;
  }

  toast(`Loaded ${imageInputs.length} image(s). Processing...`);

  // Run the full pipeline
  console.warn(`[DEBUG] Starting pipeline with ${imageInputs.length} image(s)`);
  launcher
    .run(imageInputs)
    .then((pipelineResult) => {
      console.warn(
        `[DEBUG] Pipeline result: ${JSON.stringify(pipelineResult, null, 2)}`,
      );
      toast(
        `Done: ${pipelineResult.succeeded} succeeded, ${pipelineResult.failed} failed out of ${pipelineResult.totalImages} images.`,
      );

      if (pipelineResult.errors.length > 0) {
        for (e = 0; e < pipelineResult.errors.length; e++) {
          err = pipelineResult.errors[e];
          console.warn(
            `[DEBUG] Error[${e}]: index=${err.index}, code=${err.code}, message=${err.error ? err.error.message || String(err.error) : "unknown"}`,
          );
        }
      }
    })
    .catch((error) => {
      toast(`Error: ${error.message}`);
      console.warn(`[DEBUG] Pipeline error: ${error.message}`);
      console.warn(`[DEBUG] Pipeline error stack: ${error.stack}`);
    });
}

main();
