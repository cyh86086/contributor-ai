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

// ── Main execution ────────────────────────────────────────────────────────

async function main() {
  toast("Contributor AI starting...");

  // Open gallery for user to browse (no result capture)
  const galleryIntent = new android.content.Intent(
    android.content.Intent.ACTION_VIEW,
    android.provider.MediaStore.Images.Media.EXTERNAL_CONTENT_URI,
  );
  app.startActivity(galleryIntent);

  toast("Please note the image file path from gallery, then enter it below.");
  sleep(2000);

  // Ask user to input image file path(s), comma-separated for multiple
  const pathInput = dialogs.rawInput(
    "Enter image file path(s)\n(comma-separated for multiple):",
    "/storage/emulated/0/DCIM/Camera/",
  );

  if (!pathInput || pathInput.trim().length === 0) {
    toast("No paths entered.");
    return;
  }

  // Parse paths and read images using AutoJs6 images module
  const paths = pathInput
    .split(",")
    .map((p) => p.trim())
    .filter((p) => p.length > 0);
  const images = [];

  for (const filePath of paths) {
    try {
      const img = images.read(filePath);
      if (!img) {
        console.warn(`Failed to read: ${filePath}`);
        continue;
      }

      // Convert AutoJs6 Image to base64 for our pipeline
      const bitmap = img.getBitmap();
      const byteArrayOutputStream = new java.io.ByteArrayOutputStream();
      bitmap.compress(
        android.graphics.Bitmap.CompressFormat.JPEG,
        90,
        byteArrayOutputStream,
      );
      const bytes = byteArrayOutputStream.toByteArray();
      const base64 = android.util.Base64.encodeToString(
        bytes,
        android.util.Base64.NO_WRAP,
      );

      // Create ImageInput compatible with our portable core
      const imageInput = {
        sourceUri: `file://${filePath}`,
        mimeType: "image/jpeg",
        data: base64,
        byteLength: bytes.length,
      };
      images.push(imageInput);

      bitmap.recycle();
      img.recycle();
    } catch (error) {
      console.warn(`Error processing ${filePath}: ${error.message}`);
    }
  }

  if (images.length === 0) {
    toast("No valid images loaded.");
    return;
  }

  toast(`Loaded ${images.length} image(s). Processing...`);

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
