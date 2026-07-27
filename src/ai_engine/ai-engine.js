import { assertNonEmptyString } from "../utils/validation.js";

export class AiEngine {
  constructor({ provider }) {
    if (!provider || typeof provider.generate !== "function") {
      throw new TypeError("AiEngine requires a provider with generate()");
    }

    this.provider = provider;
  }

  async execute({ prompt, context = {} }) {
    assertNonEmptyString(prompt, "prompt");
    return this.provider.generate({ prompt: prompt.trim(), context });
  }
}
