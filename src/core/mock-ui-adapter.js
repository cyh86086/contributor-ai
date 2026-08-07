// Runtime designation: test-only utility.
// No dependency on Node.js, AutoJs6, Android, Contributor app, or UI automation.

/**
 * Create a mock UI adapter for testing the Contributor Engine.
 *
 * @param {object} [options]
 * @param {boolean} [options.shouldFail=false] - If true, throw on entry
 * @returns {{ uiAdapter: function, getCallCount: function, getLastCall: function, getAllCalls: function, reset: function }}
 */
export function createMockUIAdapter({ shouldFail = false } = {}) {
  const calls = [];

  async function uiAdapter({ description, keywords }) {
    if (shouldFail) {
      throw new Error("Mock UI adapter configured to fail");
    }
    calls.push({ description, keywords });
  }

  function getCallCount() {
    return calls.length;
  }

  function getLastCall() {
    return calls.length > 0 ? calls[calls.length - 1] : null;
  }

  function getAllCalls() {
    return [...calls];
  }

  function reset() {
    calls.length = 0;
  }

  return {
    uiAdapter,
    getCallCount,
    getLastCall,
    getAllCalls,
    reset,
  };
}
