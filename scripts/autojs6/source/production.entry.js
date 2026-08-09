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

function main() {
  toast("Contributor AI starting...");

  // Write instructions to a file for user to edit
  var configPath = "/sdcard/contributor-ai/image-paths.txt";
  var instructions =
    "# Enter image file paths, one per line or comma-separated\n" +
    "# Example:\n" +
    "/storage/emulated/0/DCIM/Camera/IMG_20260809_093300.jpg\n";

  files.write(configPath, instructions);
  toast(`Please edit: ${configPath}`);

  // Use setInterval to keep script alive and poll for file changes
  var originalContent = files.read(configPath);
  var timeout = 120000; // 2 minutes
  var waitStart = Date.now();
  var processed = false;

  var keepAliveInterval = setInterval(() => {
    if (processed) {
      clearInterval(keepAliveInterval);
      return;
    }

    if (Date.now() - waitStart >= timeout) {
      clearInterval(keepAliveInterval);
      toast("Timeout: no file changes detected.");
      return;
    }

    var currentContent = files.read(configPath);
    if (currentContent === originalContent) {
      return; // File not changed yet, keep waiting
    }

    // File changed - stop polling and process
    clearInterval(keepAliveInterval);
    processed = true;

    // Process paths
    if (!currentContent || currentContent.length === 0) {
      toast("No paths entered.");
      return;
    }

    // Parse paths - filter out comment lines
    // Also handle text editors that insert newlines mid-path (word wrap)
    var lines = currentContent.split("\n");
    var paths = [];
    var j;
    var line;
    var parts;
    var k;
    var trimmed;
    var currentPath;
    for (j = 0; j < lines.length; j++) {
      line = lines[j];
      // Skip comment lines
      if (line.charAt(0) === "#") {
        continue;
      }
      // Skip empty lines
      if (line.length === 0) {
        continue;
      }
      // If line starts with /, it's a new path
      if (line.charAt(0) === "/") {
        // Push previous path if exists
        if (currentPath && currentPath.length > 0) {
          paths.push(currentPath);
        }
        currentPath = line;
      } else {
        // Line doesn't start with / - it's a continuation of previous path
        // (text editor inserted newline mid-path due to word wrap)
        if (currentPath) {
          currentPath = currentPath + line;
        } else {
          // Orphan continuation line - treat as standalone path
          currentPath = line;
        }
      }
    }
    // Push last path
    if (currentPath && currentPath.length > 0) {
      paths.push(currentPath);
    }

    // Handle comma-separated paths within each path entry
    var finalPaths = [];
    for (j = 0; j < paths.length; j++) {
      parts = paths[j].split(",");
      for (k = 0; k < parts.length; k++) {
        trimmed = parts[k].replace(/^\s+|\s+$/g, "");
        if (trimmed.length > 0) {
          finalPaths.push(trimmed);
        }
      }
    }
    paths = finalPaths;

    console.warn(`[DEBUG] Parsed paths count: ${paths.length}`);
    for (j = 0; j < paths.length; j++) {
      console.warn(`[DEBUG] Path[${j}]: ${paths[j]}`);
    }

    if (paths.length === 0) {
      toast("No valid paths found.");
      return;
    }

    // Save reference to AutoJs6 global images module before shadowing
    var autoJsImages = images;
    var imageInputs = [];
    var i;
    var filePath;
    var img;
    var bitmap;
    var byteArrayOutputStream;
    var bytes;
    var base64;
    var imageInput;
    for (i = 0; i < paths.length; i++) {
      filePath = paths[i];
      try {
        console.warn(`[DEBUG] Reading image: ${filePath}`);
        img = autoJsImages.read(filePath);
        if (!img) {
          console.warn(`Failed to read: ${filePath}`);
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
          sourceUri: `file://${filePath}`,
          mimeType: "image/jpeg",
          data: base64,
          byteLength: bytes.length,
        };
        imageInputs.push(imageInput);
        console.warn(`[DEBUG] ImageInput created`);

        bitmap.recycle();
        img.recycle();
      } catch (error) {
        console.warn(`Error processing ${filePath}: ${error.message}`);
        console.warn(`[DEBUG] Error stack: ${error.stack}`);
      }
    }

    if (imageInputs.length === 0) {
      toast("No valid images loaded.");
      return;
    }

    toast(`Loaded ${imageInputs.length} image(s). Processing...`);

    // Run the full pipeline
    console.warn(
      `[DEBUG] Starting pipeline with ${imageInputs.length} image(s)`,
    );
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
          console.warn(
            "Errors:",
            JSON.stringify(pipelineResult.errors, null, 2),
          );
        }
      })
      .catch((error) => {
        toast(`Error: ${error.message}`);
        console.warn(`[DEBUG] Pipeline error: ${error.message}`);
        console.warn(`[DEBUG] Pipeline error stack: ${error.stack}`);
      });
  }, 2000); // Check every 2 seconds
}

main();
