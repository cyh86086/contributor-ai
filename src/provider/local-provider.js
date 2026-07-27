import { Provider } from "./provider.js";

/**
 * Deterministic provider used for local development and tests.
 */
export class LocalProvider extends Provider {
  async generate({ prompt }) {
    return {
      content: `Local provider received: ${prompt}`,
      model: "local-deterministic",
    };
  }
}
