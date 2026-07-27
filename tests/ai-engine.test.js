import assert from "node:assert/strict";
import test from "node:test";

import { AiEngine } from "../src/ai_engine/index.js";

test("AiEngine trims a prompt and delegates to its provider", async () => {
  const requests = [];
  const provider = {
    async generate(request) {
      requests.push(request);
      return { content: "ok", model: "test" };
    },
  };
  const engine = new AiEngine({ provider });

  const result = await engine.execute({ prompt: "  propose a change  " });

  assert.deepEqual(result, { content: "ok", model: "test" });
  assert.equal(requests[0].prompt, "propose a change");
});

test("AiEngine rejects an empty prompt", async () => {
  const engine = new AiEngine({
    provider: { generate: async () => ({ content: "", model: "test" }) },
  });

  await assert.rejects(() => engine.execute({ prompt: " " }), {
    name: "TypeError",
  });
});
