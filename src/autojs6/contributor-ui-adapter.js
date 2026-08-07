/**
 * Runtime designation: production Android runtime hosted by AutoJs6.
 *
 * This adapter opens the Contributor Android app and populates the
 * Description and Keywords fields through AutoJs6 UI automation.
 * All dependencies are injected so the behavior can be tested offline
 * without treating Node.js as the production runtime.
 *
 * The returned function satisfies the `uiAdapter` contract required by
 * the portable core's `enterContributorMetadata()`.
 */

const DEFAULT_WAIT_MS = 10_000;
const DEFAULT_PACKAGE_NAME = "com.contributor.app";

export function createContributorUIAdapter({
  appLauncher,
  findDescription,
  findKeywords,
  packageName = DEFAULT_PACKAGE_NAME,
  waitMs = DEFAULT_WAIT_MS,
} = {}) {
  validateAppLauncher(appLauncher);
  validateFinder(findDescription, "findDescription");
  validateFinder(findKeywords, "findKeywords");
  validateWaitMs(waitMs);

  return async function uiAdapter({ description, keywords }) {
    try {
      appLauncher(packageName);
    } catch {
      throw new Error("Could not launch the Contributor app.");
    }

    let descField;
    try {
      descField = await findDescription(waitMs);
    } catch {
      throw new Error("Could not find the Description field.");
    }

    if (!descField || typeof descField.setText !== "function") {
      throw new Error("The Description field does not support text entry.");
    }

    try {
      descField.setText(description);
    } catch {
      throw new Error("Could not enter the description.");
    }

    let kwField;
    try {
      kwField = await findKeywords(waitMs);
    } catch {
      throw new Error("Could not find the Keywords field.");
    }

    if (!kwField || typeof kwField.setText !== "function") {
      throw new Error("The Keywords field does not support text entry.");
    }

    const keywordsText = Array.isArray(keywords)
      ? keywords.join(", ")
      : String(keywords);

    try {
      kwField.setText(keywordsText);
    } catch {
      throw new Error("Could not enter the keywords.");
    }
  };
}

function validateAppLauncher(appLauncher) {
  if (typeof appLauncher !== "function") {
    throw new TypeError("appLauncher must be a function");
  }
}

function validateFinder(finder, name) {
  if (typeof finder !== "function") {
    throw new TypeError(`${name} must be a function`);
  }
}

function validateWaitMs(waitMs) {
  if (!Number.isSafeInteger(waitMs) || waitMs <= 0) {
    throw new TypeError("waitMs must be a positive safe integer");
  }
}
