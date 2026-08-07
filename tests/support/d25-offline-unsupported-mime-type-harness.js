import { runUnsupportedMimeTypeDeviceCheck } from "../../scripts/autojs6/unsupported-mime-type-device-check.js";

/**
 * D25 offline harness.
 *
 * Provides controlled-fake injection for D25 device validation tests.
 */

export function createD25OfflineHarness() {
  return {
    /**
     * Simulate UNSUPPORTED_MIME_TYPE result.
     */
    unsupportedMimeType() {
      return runUnsupportedMimeTypeDeviceCheck({
        expectedErrorCode: "UNSUPPORTED_MIME_TYPE",
        reportMetadata: () => {},
        prepareSelectedImage: async () =>
          Object.freeze({
            status: "FAIL",
            errorCode: "UNSUPPORTED_MIME_TYPE",
            uiResponsive: true,
          }),
      });
    },

    /**
     * Simulate unexpected result (wrong error code).
     */
    unexpectedResult() {
      return runUnsupportedMimeTypeDeviceCheck({
        expectedErrorCode: "UNSUPPORTED_MIME_TYPE",
        reportMetadata: () => {},
        prepareSelectedImage: async () =>
          Object.freeze({
            status: "FAIL",
            errorCode: "IMAGE_READ_FAILED",
            uiResponsive: true,
          }),
      });
    },

    /**
     * Simulate harness exception.
     */
    harnessException() {
      return runUnsupportedMimeTypeDeviceCheck({
        expectedErrorCode: "UNSUPPORTED_MIME_TYPE",
        reportMetadata: () => {},
        prepareSelectedImage: async () => {
          throw new Error("Simulated harness failure");
        },
      });
    },

    /**
     * Simulate non-responsive UI.
     */
    nonResponsiveUi() {
      return runUnsupportedMimeTypeDeviceCheck({
        expectedErrorCode: "UNSUPPORTED_MIME_TYPE",
        reportMetadata: () => {},
        prepareSelectedImage: async () =>
          Object.freeze({
            status: "FAIL",
            errorCode: "UNSUPPORTED_MIME_TYPE",
            uiResponsive: false,
          }),
      });
    },

    /**
     * Invalid prepareSelectedImage (not a function).
     */
    invalidPrepareSelectedImage() {
      return runUnsupportedMimeTypeDeviceCheck({
        expectedErrorCode: "UNSUPPORTED_MIME_TYPE",
        reportMetadata: () => {},
        prepareSelectedImage: "not a function",
      });
    },
  };
}
