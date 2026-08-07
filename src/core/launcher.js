// Runtime designation: runtime-neutral portable core.
// No dependency on Node.js, AutoJs6, Android, provider SDKs, or Contributor app.

import { orchestrateBatchAI } from "./queue-ai-orchestrator.js";
import { enterContributorMetadata } from "./contributor-engine.js";

/**
 * Create the application launcher that wires all modules together.
 *
 * @param {object} config
 * @param {object} config.imageReader - Image reader with read() method
 * @param {function} config.providerCaller - Production provider caller
 * @param {function} config.uiAdapter - UI field entry adapter
 * @param {number} config.maxImageBytes - Provider maximum image size
 * @param {number} config.maxSizeBytes - Portable core maximum image size
 * @param {boolean} [config.failFast=false] - Stop on first error
 * @returns {{ run: function }}
 */
export function createLauncher({
  imageReader,
  providerCaller,
  uiAdapter,
  maxImageBytes,
  maxSizeBytes,
  failFast = false,
}) {
  validateLauncherConfig({
    imageReader,
    providerCaller,
    uiAdapter,
    maxImageBytes,
    maxSizeBytes,
  });

  async function run(images) {
    if (!Array.isArray(images)) {
      throw new TypeError("images must be an array");
    }

    const batchResult = await orchestrateBatchAI({
      images,
      providerCaller,
      maxImageBytes,
      failFast,
    });

    const contributorResults = [];
    const contributorErrors = [];

    for (const result of batchResult.results) {
      try {
        const entry = await enterContributorMetadata({
          description: result.description,
          keywords: result.keywords,
          uiAdapter,
        });
        contributorResults.push(entry);
      } catch (error) {
        contributorErrors.push({
          error,
          code: error?.code ?? null,
        });
      }
    }

    return {
      totalImages: batchResult.totalImages,
      succeeded: batchResult.succeeded,
      failed: batchResult.failed + contributorErrors.length,
      results: contributorResults,
      errors: [...batchResult.errors, ...contributorErrors],
    };
  }

  return { run };
}

function validateLauncherConfig({
  imageReader,
  providerCaller,
  uiAdapter,
  maxImageBytes,
  maxSizeBytes,
}) {
  if (!imageReader || typeof imageReader.read !== "function") {
    throw new TypeError("imageReader must be an object with a read() method");
  }
  if (typeof providerCaller !== "function") {
    throw new TypeError("providerCaller must be a function");
  }
  if (typeof uiAdapter !== "function") {
    throw new TypeError("uiAdapter must be a function");
  }
  if (!Number.isSafeInteger(maxImageBytes) || maxImageBytes <= 0) {
    throw new TypeError("maxImageBytes must be a positive safe integer");
  }
  if (!Number.isSafeInteger(maxSizeBytes) || maxSizeBytes <= 0) {
    throw new TypeError("maxSizeBytes must be a positive safe integer");
  }
}
