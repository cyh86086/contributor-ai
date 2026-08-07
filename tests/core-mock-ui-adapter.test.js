import assert from "node:assert/strict";
import test from "node:test";

import { createMockUIAdapter } from "../src/core/index.js";

test("successful entry records the call", async () => {
  const mock = createMockUIAdapter();

  await mock.uiAdapter({
    description: "A sunset",
    keywords: [
      "sunset",
      "sky",
      "ocean",
      "waves",
      "rocks",
      "colorful",
      "nature",
    ],
  });

  assert.equal(mock.getCallCount(), 1);
  assert.equal(mock.getLastCall().description, "A sunset");
});

test("shouldFail true causes the adapter to throw", async () => {
  const mock = createMockUIAdapter({ shouldFail: true });

  await assert.rejects(
    () =>
      mock.uiAdapter({
        description: "A sunset",
        keywords: ["a", "b", "c", "d", "e", "f", "g"],
      }),
    (err) => {
      assert.match(err.message, /Mock UI adapter configured to fail/);
      return true;
    },
  );

  assert.equal(mock.getCallCount(), 0);
});

test("getCallCount returns correct count", async () => {
  const mock = createMockUIAdapter();

  await mock.uiAdapter({
    description: "First",
    keywords: ["a", "b", "c", "d", "e", "f", "g"],
  });
  await mock.uiAdapter({
    description: "Second",
    keywords: ["a", "b", "c", "d", "e", "f", "g"],
  });

  assert.equal(mock.getCallCount(), 2);
});

test("getLastCall returns the most recent entry", async () => {
  const mock = createMockUIAdapter();

  await mock.uiAdapter({
    description: "First",
    keywords: ["a", "b", "c", "d", "e", "f", "g"],
  });
  await mock.uiAdapter({
    description: "Second",
    keywords: ["h", "i", "j", "k", "l", "m", "n"],
  });

  assert.equal(mock.getLastCall().description, "Second");
});

test("getLastCall returns null when no calls", () => {
  const mock = createMockUIAdapter();
  assert.equal(mock.getLastCall(), null);
});

test("getAllCalls returns all entries", async () => {
  const mock = createMockUIAdapter();

  await mock.uiAdapter({
    description: "First",
    keywords: ["a", "b", "c", "d", "e", "f", "g"],
  });
  await mock.uiAdapter({
    description: "Second",
    keywords: ["h", "i", "j", "k", "l", "m", "n"],
  });

  const all = mock.getAllCalls();
  assert.equal(all.length, 2);
  assert.equal(all[0].description, "First");
  assert.equal(all[1].description, "Second");
});

test("reset clears recorded calls", async () => {
  const mock = createMockUIAdapter();

  await mock.uiAdapter({
    description: "First",
    keywords: ["a", "b", "c", "d", "e", "f", "g"],
  });
  assert.equal(mock.getCallCount(), 1);

  mock.reset();
  assert.equal(mock.getCallCount(), 0);
  assert.equal(mock.getLastCall(), null);
});

test("multiple calls are recorded in order", async () => {
  const mock = createMockUIAdapter();

  for (let i = 0; i < 5; i++) {
    await mock.uiAdapter({
      description: `Entry ${i}`,
      keywords: ["a", "b", "c", "d", "e", "f", "g"],
    });
  }

  assert.equal(mock.getCallCount(), 5);
  const all = mock.getAllCalls();
  for (let i = 0; i < 5; i++) {
    assert.equal(all[i].description, `Entry ${i}`);
  }
});
