import assert from "node:assert/strict";
import test from "node:test";

import { createApp } from "../src/launcher/app.js";

test("application composes a contribution workflow", async () => {
  const messages = [];
  const app = createApp({
    provider: {
      async generate({ prompt }) {
        return { content: prompt, model: "test-provider" };
      },
    },
    ui: {
      showResult(result) {
        messages.push(result.content);
      },
      showError() {},
    },
  });

  const result = await app.run({
    repository: "owner/repository",
    goal: "Improve the documentation",
  });

  assert.equal(result.model, "test-provider");
  assert.match(result.content, /owner\/repository/);
  assert.deepEqual(messages, [result.content]);
});
