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

  // Write instructions to a file for user to edit
  var configPath = "/sdcard/contributor-ai/image-paths.txt";
  var instructions =
    "# Enter image file paths, one per line or comma-separated\n" +
    "# Example:\n" +
    "/storage/emulated/0/DCIM/Camera/IMG_20260809_093300.jpg\n";

  files.write(configPath, instructions);
  toast(`Please edit: ${configPath}`);

  // Wait for user to edit the file using background thread
  var originalContent = files.read(configPath);
  var waitStart = Date.now();
  var timeout = 120000; // 2 minutes
  var currentContent;
  var line;
  var parts;
  var k;
  var trimmed;

  // Use threads to poll without blocking UI
  var pollingThread = threads.start(() => {
    while (Date.now() - waitStart < timeout) {
      sleep(1000);
      currentContent = files.read(configPath);
      if (currentContent !== originalContent) {
        break;
      }
    }
  });

  // Wait for thread to finish or timeout
  pollingThread.join(timeout);

  // Read the edited content
  var pathContent = files.read(configPath);
  if (!pathContent || pathContent.length === 0) {
    toast("No paths entered.");
    return;
  }

  // Parse paths - filter out comment lines
  var lines = pathContent.split("\n");
  var paths = [];
  var j;
  for (j = 0; j < lines.length; j++) {
    line = lines[j];
    // Skip comments and empty lines
    if (line.charAt(0) === "#" || line.length === 0) {
      continue;
    }
    // Handle comma-separated on same line
    parts = line.split(",");
    for (k = 0; k < parts.length; k++) {
      trimmed = parts[k].replace(/^\s+|\s+$/g, "");
      if (trimmed.length > 0) {
        paths.push(trimmed);
      }
    }
  }

  console.warn(`[DEBUG] Parsed paths count: ${paths.length}`);
  for (j = 0; j < paths.length; j++) {
    console.warn(`[DEBUG] Path[${j}]: ${paths[j]}`);
  }

  // Save reference to AutoJs6 global images module before shadowing
  const autoJsImages = images;
  const imageInputs = [];
  let i;
  let filePath;
  for (i = 0; i < paths.length; i++) {
    filePath = paths[i];
    try {
      const img = autoJsImages.read(filePath);
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
      imageInputs.push(imageInput);

      bitmap.recycle();
      img.recycle();
    } catch (error) {
      console.warn(`Error processing ${filePath}: ${error.message}`);
    }
  }

  if (imageInputs.length === 0) {
    toast("No valid images loaded.");
    return;
  }

  toast(`Loaded ${imageInputs.length} image(s). Processing...`);

  // Run the full pipeline
  const pipelineResult = await launcher.run(imageInputs);

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
