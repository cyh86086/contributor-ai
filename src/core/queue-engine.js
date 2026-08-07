// Runtime designation: runtime-neutral portable core.
// No dependency on Node.js, AutoJs6, Android, provider SDKs, or Contributor app.

/**
 * Process a queue of items sequentially through an injected processor.
 *
 * @param {object} options
 * @param {object[]} options.items - Array of items to process
 * @param {function} options.processor - Per-item processor function
 * @param {boolean} [options.failFast=false] - Stop on first error
 * @returns {Promise<{totalItems: number, processed: number, succeeded: number, failed: number, results: object[], errors: object[]}>}
 */
export async function processQueue({ items, processor, failFast = false }) {
  validateQueueInput({ items, processor });

  const results = [];
  const errors = [];
  let succeeded = 0;
  let failed = 0;

  for (let i = 0; i < items.length; i++) {
    try {
      const result = await processor(items[i]);
      results.push(result);
      succeeded++;
    } catch (error) {
      failed++;
      errors.push({
        index: i,
        error,
        code: error?.code ?? null,
      });

      if (failFast) {
        break;
      }
    }
  }

  return {
    totalItems: items.length,
    processed: succeeded + failed,
    succeeded,
    failed,
    results,
    errors,
  };
}

function validateQueueInput({ items, processor }) {
  if (!Array.isArray(items)) {
    throw new TypeError("items must be an array");
  }
  if (typeof processor !== "function") {
    throw new TypeError("processor must be a function");
  }
}
