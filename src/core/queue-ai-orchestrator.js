// Runtime designation: runtime-neutral portable core.
// No dependency on Node.js, AutoJs6, Android, provider SDKs, or Contributor app.

import { processQueue } from "./queue-engine.js";
import { processImageWithAI } from "./ai-engine.js";

/**
 * Orchestrate batch AI processing of multiple images.
 * Wires the Queue Engine to the AI Engine.
 *
 * @param {object} options
 * @param {object[]} options.images - Array of image inputs
 * @param {function} options.providerCaller - Injected production provider caller
 * @param {number} options.maxImageBytes - Provider maximum image size limit
 * @param {boolean} [options.failFast=false] - Stop on first error
 * @returns {Promise<{totalImages: number, processed: number, succeeded: number, failed: number, results: object[], errors: object[]}>}
 */
export async function orchestrateBatchAI({
  images,
  providerCaller,
  maxImageBytes,
  failFast = false,
}) {
  validateOrchestratorInput({ images, providerCaller, maxImageBytes });

  const processor = (image) =>
    processImageWithAI({
      sourceUri: image.sourceUri,
      mimeType: image.mimeType,
      sizeBytes: image.sizeBytes,
      imageBase64: image.imageBase64,
      providerCaller,
      maxImageBytes,
    });

  const queueResult = await processQueue({
    items: images,
    processor,
    failFast,
  });

  return {
    totalImages: queueResult.totalItems,
    processed: queueResult.processed,
    succeeded: queueResult.succeeded,
    failed: queueResult.failed,
    results: queueResult.results,
    errors: queueResult.errors,
  };
}

function validateOrchestratorInput({ images, providerCaller, maxImageBytes }) {
  if (!Array.isArray(images)) {
    throw new TypeError("images must be an array");
  }
  if (typeof providerCaller !== "function") {
    throw new TypeError("providerCaller must be a function");
  }
  if (!Number.isSafeInteger(maxImageBytes) || maxImageBytes <= 0) {
    throw new TypeError("maxImageBytes must be a positive safe integer");
  }
}
