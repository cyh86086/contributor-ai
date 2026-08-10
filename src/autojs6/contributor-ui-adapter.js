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
  logger = { warn() {} },
} = {}) {
  validateAppLauncher(appLauncher);
  validateFinder(findDescription, "findDescription");
  validateFinder(findKeywords, "findKeywords");
  validateWaitMs(waitMs);

  const log = (msg) => {
    if (logger && typeof logger.warn === "function") {
      logger.warn(msg);
    }
  };

  return async function uiAdapter({ description, keywords }) {
    log(`[UI] Launching app: ${packageName}`);
    try {
      appLauncher(packageName);
      log("[UI] App launched");
    } catch (e) {
      log(`[UI] App launch failed: ${e.message}`);
      throw new Error("Could not launch the Contributor app.");
    }

    log(`[UI] Finding description field (timeout=${waitMs}ms)`);
    let descField;
    try {
      descField = await findDescription(waitMs);
      log(`[UI] Description field found: ${descField ? "yes" : "no"}`);
    } catch (e) {
      log(`[UI] Description field find failed: ${e.message}`);
      throw new Error("Could not find the Description field.");
    }

    if (!descField || typeof descField.setText !== "function") {
      log(
        `[UI] Description field invalid: descField=${!!descField}, hasSetText=${descField ? typeof descField.setText : "N/A"}`,
      );
      throw new Error("The Description field does not support text entry.");
    }

    log(`[UI] Setting description (length=${description.length})`);
    try {
      descField.setText(description);
      log("[UI] Description set");
    } catch (e) {
      log(`[UI] Description set failed: ${e.message}`);
      throw new Error("Could not enter the description.");
    }

    log(`[UI] Finding keywords field (timeout=${waitMs}ms)`);
    let kwField;
    try {
      kwField = await findKeywords(waitMs);
      log(`[UI] Keywords field found: ${kwField ? "yes" : "no"}`);
    } catch (e) {
      log(`[UI] Keywords field find failed: ${e.message}`);
      throw new Error("Could not find the Keywords field.");
    }

    if (!kwField || typeof kwField.setText !== "function") {
      log(
        `[UI] Keywords field invalid: kwField=${!!kwField}, hasSetText=${kwField ? typeof kwField.setText : "N/A"}`,
      );
      throw new Error("The Keywords field does not support text entry.");
    }

    const keywordsText = Array.isArray(keywords)
      ? keywords.join(", ")
      : String(keywords);

    log(`[UI] Setting keywords (length=${keywordsText.length})`);
    try {
      kwField.setText(keywordsText);
      log("[UI] Keywords set");
    } catch (e) {
      log(`[UI] Keywords set failed: ${e.message}`);
      throw new Error("Could not enter the keywords.");
    }
    log("[UI] All fields populated successfully");
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
