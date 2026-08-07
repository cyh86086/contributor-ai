// Runtime designation: runtime-neutral portable core.
// No dependency on Node.js, AutoJs6, Android, Contributor app, or UI automation.

import { validateVisionMetadata } from "./metadata.js";

export const CONTRIBUTOR_ENGINE_ERROR_CODES = Object.freeze({
  FIELD_ENTRY_FAILED: "FIELD_ENTRY_FAILED",
  METADATA_INVALID: "METADATA_INVALID",
});

const ERROR_MESSAGES = Object.freeze({
  [CONTRIBUTOR_ENGINE_ERROR_CODES.FIELD_ENTRY_FAILED]:
    "The UI adapter could not populate the Contributor app fields.",
  [CONTRIBUTOR_ENGINE_ERROR_CODES.METADATA_INVALID]:
    "The metadata does not pass validation.",
});

export class ContributorEngineError extends Error {
  constructor(code) {
    super(ERROR_MESSAGES[code]);
    this.name = "ContributorEngineError";
    this.code = code;
  }
}

/**
 * Enter validated AI metadata into the Contributor app through an injected
 * UI adapter.
 *
 * @param {object} options
 * @param {string} options.description - English description < 2000 chars
 * @param {string[]} options.keywords - Exactly 7 English keywords
 * @param {function} options.uiAdapter - Injected UI field entry adapter
 * @returns {Promise<{entered: boolean, pendingReview: boolean}>}
 */
export async function enterContributorMetadata({
  description,
  keywords,
  uiAdapter,
}) {
  validateUiAdapter(uiAdapter);

  let validated;
  try {
    validated = validateVisionMetadata({ description, keywords });
  } catch {
    throw new ContributorEngineError(
      CONTRIBUTOR_ENGINE_ERROR_CODES.METADATA_INVALID,
    );
  }

  try {
    await uiAdapter({
      description: validated.description,
      keywords: validated.keywords,
    });
  } catch {
    throw new ContributorEngineError(
      CONTRIBUTOR_ENGINE_ERROR_CODES.FIELD_ENTRY_FAILED,
    );
  }

  return { entered: true, pendingReview: true };
}

function validateUiAdapter(uiAdapter) {
  if (typeof uiAdapter !== "function") {
    throw new TypeError("uiAdapter must be a function");
  }
}
