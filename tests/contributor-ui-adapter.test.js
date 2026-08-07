import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { createContributorUIAdapter } from "../src/autojs6/contributor-ui-adapter.js";
import { enterContributorMetadata } from "../src/core/contributor-engine.js";

const VALID_DESC = "A sunset over the ocean";
const VALID_KEYWORDS = [
  "sunset",
  "ocean",
  "sky",
  "nature",
  "water",
  "horizon",
  "colors",
];

function createMockDeps({
  launchThrows = false,
  descNotFound = false,
  kwNotFound = false,
  descSetTextThrows = false,
  kwSetTextThrows = false,
  descNoSetText = false,
  kwNoSetText = false,
} = {}) {
  const calls = {
    launched: false,
    launchedWith: null,
    descSetText: null,
    kwSetText: null,
  };

  const appLauncher = (pkg) => {
    calls.launched = true;
    calls.launchedWith = pkg;
    if (launchThrows) throw new Error("App not installed");
  };

  const findDescription = async () => {
    if (descNotFound) throw new Error("Element not found");
    return {
      setText: descNoSetText
        ? undefined
        : (text) => {
            if (descSetTextThrows) throw new Error("setText failed");
            calls.descSetText = text;
          },
    };
  };

  const findKeywords = async () => {
    if (kwNotFound) throw new Error("Element not found");
    return {
      setText: kwNoSetText
        ? undefined
        : (text) => {
            if (kwSetTextThrows) throw new Error("setText failed");
            calls.kwSetText = text;
          },
    };
  };

  return { appLauncher, findDescription, findKeywords, calls };
}

describe("Contributor UI Adapter V1.0", () => {
  it("launches app and fills both fields successfully", async () => {
    const deps = createMockDeps();
    const adapter = createContributorUIAdapter({
      appLauncher: deps.appLauncher,
      findDescription: deps.findDescription,
      findKeywords: deps.findKeywords,
    });

    await adapter({ description: VALID_DESC, keywords: VALID_KEYWORDS });

    assert.equal(deps.calls.launched, true);
    assert.equal(deps.calls.launchedWith, "com.contributor.app");
    assert.equal(deps.calls.descSetText, VALID_DESC);
    assert.equal(deps.calls.kwSetText, VALID_KEYWORDS.join(", "));
  });

  it("uses custom package name when provided", async () => {
    const deps = createMockDeps();
    const adapter = createContributorUIAdapter({
      appLauncher: deps.appLauncher,
      findDescription: deps.findDescription,
      findKeywords: deps.findKeywords,
      packageName: "com.custom.contributor",
    });

    await adapter({ description: VALID_DESC, keywords: VALID_KEYWORDS });

    assert.equal(deps.calls.launchedWith, "com.custom.contributor");
  });

  it("joins keywords array with commas", async () => {
    const deps = createMockDeps();
    const adapter = createContributorUIAdapter({
      appLauncher: deps.appLauncher,
      findDescription: deps.findDescription,
      findKeywords: deps.findKeywords,
    });

    await adapter({
      description: VALID_DESC,
      keywords: ["one", "two", "three"],
    });

    assert.equal(deps.calls.kwSetText, "one, two, three");
  });

  it("throws when app launch fails", async () => {
    const deps = createMockDeps({ launchThrows: true });
    const adapter = createContributorUIAdapter({
      appLauncher: deps.appLauncher,
      findDescription: deps.findDescription,
      findKeywords: deps.findKeywords,
    });

    await assert.rejects(
      () => adapter({ description: VALID_DESC, keywords: VALID_KEYWORDS }),
      (error) => {
        assert.match(error.message, /launch/i);
        return true;
      },
    );
  });

  it("throws when Description field is not found", async () => {
    const deps = createMockDeps({ descNotFound: true });
    const adapter = createContributorUIAdapter({
      appLauncher: deps.appLauncher,
      findDescription: deps.findDescription,
      findKeywords: deps.findKeywords,
    });

    await assert.rejects(
      () => adapter({ description: VALID_DESC, keywords: VALID_KEYWORDS }),
      (error) => {
        assert.match(error.message, /Description/i);
        return true;
      },
    );
  });

  it("throws when Keywords field is not found", async () => {
    const deps = createMockDeps({ kwNotFound: true });
    const adapter = createContributorUIAdapter({
      appLauncher: deps.appLauncher,
      findDescription: deps.findDescription,
      findKeywords: deps.findKeywords,
    });

    await assert.rejects(
      () => adapter({ description: VALID_DESC, keywords: VALID_KEYWORDS }),
      (error) => {
        assert.match(error.message, /Keywords/i);
        return true;
      },
    );
  });

  it("throws when Description setText fails", async () => {
    const deps = createMockDeps({ descSetTextThrows: true });
    const adapter = createContributorUIAdapter({
      appLauncher: deps.appLauncher,
      findDescription: deps.findDescription,
      findKeywords: deps.findKeywords,
    });

    await assert.rejects(
      () => adapter({ description: VALID_DESC, keywords: VALID_KEYWORDS }),
      (error) => {
        assert.match(error.message, /description/i);
        return true;
      },
    );
  });

  it("throws when Keywords setText fails", async () => {
    const deps = createMockDeps({ kwSetTextThrows: true });
    const adapter = createContributorUIAdapter({
      appLauncher: deps.appLauncher,
      findDescription: deps.findDescription,
      findKeywords: deps.findKeywords,
    });

    await assert.rejects(
      () => adapter({ description: VALID_DESC, keywords: VALID_KEYWORDS }),
      (error) => {
        assert.match(error.message, /keywords/i);
        return true;
      },
    );
  });

  it("throws when Description field has no setText method", async () => {
    const deps = createMockDeps({ descNoSetText: true });
    const adapter = createContributorUIAdapter({
      appLauncher: deps.appLauncher,
      findDescription: deps.findDescription,
      findKeywords: deps.findKeywords,
    });

    await assert.rejects(
      () => adapter({ description: VALID_DESC, keywords: VALID_KEYWORDS }),
      (error) => {
        assert.match(error.message, /Description/i);
        return true;
      },
    );
  });

  it("integrates with portable core enterContributorMetadata", async () => {
    const deps = createMockDeps();
    const adapter = createContributorUIAdapter({
      appLauncher: deps.appLauncher,
      findDescription: deps.findDescription,
      findKeywords: deps.findKeywords,
    });

    const result = await enterContributorMetadata({
      description: VALID_DESC,
      keywords: VALID_KEYWORDS,
      uiAdapter: adapter,
    });

    assert.equal(result.entered, true);
    assert.equal(result.pendingReview, true);
    assert.equal(deps.calls.descSetText, VALID_DESC);
    assert.equal(deps.calls.kwSetText, VALID_KEYWORDS.join(", "));
  });

  it("portable core maps UI adapter failure to FIELD_ENTRY_FAILED", async () => {
    const deps = createMockDeps({ launchThrows: true });
    const adapter = createContributorUIAdapter({
      appLauncher: deps.appLauncher,
      findDescription: deps.findDescription,
      findKeywords: deps.findKeywords,
    });

    await assert.rejects(
      () =>
        enterContributorMetadata({
          description: VALID_DESC,
          keywords: VALID_KEYWORDS,
          uiAdapter: adapter,
        }),
      (error) => {
        assert.equal(error.code, "FIELD_ENTRY_FAILED");
        assert.equal(error.name, "ContributorEngineError");
        return true;
      },
    );
  });

  it("throws TypeError when appLauncher is missing", () => {
    assert.throws(
      () =>
        createContributorUIAdapter({
          findDescription: async () => ({}),
          findKeywords: async () => ({}),
        }),
      (error) => {
        assert.ok(error instanceof TypeError);
        assert.match(error.message, /appLauncher/);
        return true;
      },
    );
  });

  it("throws TypeError when findDescription is missing", () => {
    assert.throws(
      () =>
        createContributorUIAdapter({
          appLauncher: () => {},
          findKeywords: async () => ({}),
        }),
      (error) => {
        assert.ok(error instanceof TypeError);
        assert.match(error.message, /findDescription/);
        return true;
      },
    );
  });

  it("error messages do not contain metadata content", async () => {
    const deps = createMockDeps({ launchThrows: true });
    const adapter = createContributorUIAdapter({
      appLauncher: deps.appLauncher,
      findDescription: deps.findDescription,
      findKeywords: deps.findKeywords,
    });

    try {
      await adapter({
        description: "secret description text",
        keywords: ["secret1", "secret2", "secret3", "s4", "s5", "s6", "s7"],
      });
      assert.fail("Should have thrown");
    } catch (error) {
      assert.ok(!error.message.includes("secret description"));
      assert.ok(!error.message.includes("secret1"));
    }
  });
});
