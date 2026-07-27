/**
 * Base contract for text generation providers.
 */
export class Provider {
  /**
   * @param {{ prompt: string, context?: Record<string, unknown> }} _request
   * @returns {Promise<{ content: string, model: string }>}
   */
  async generate(_request) {
    void _request;
    throw new Error("Provider.generate must be implemented");
  }
}
