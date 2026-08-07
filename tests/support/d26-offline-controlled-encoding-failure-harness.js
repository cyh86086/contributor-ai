import { runControlledEncodingFailureDeviceCheck } from "../../scripts/autojs6/controlled-encoding-failure-device-check.js";

/**
 * D26 offline harness.
 *
 * Provides controlled-fake injection for D26 device validation tests.
 */

export function createD26OfflineHarness() {
  return {
    /**
     * Simulate ENCODING_FAILED result.
     */
    encodingFailed() {
      return runControlledEncodingFailureDeviceCheck({
        expectedErrorCode: "ENCODING_FAILED",
        reportMetadata: () => {},
        prepareSelectedImage: async () =>
          Object.freeze({
            status: "FAIL",
            errorCode: "ENCODING_FAILED",
            uiResponsive: true,
          }),
      });
    },

    /**
     * Simulate unexpected result (wrong error code).
     */
    unexpectedResult() {
      return runControlledEncodingFailureDeviceCheck({
        expectedErrorCode: "ENCODING_FAILED",
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
      return runControlledEncodingFailureDeviceCheck({
        expectedErrorCode: "ENCODING_FAILED",
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
      return runControlledEncodingFailureDeviceCheck({
        expectedErrorCode: "ENCODING_FAILED",
        reportMetadata: () => {},
        prepareSelectedImage: async () =>
          Object.freeze({
            status: "FAIL",
            errorCode: "ENCODING_FAILED",
            uiResponsive: false,
          }),
      });
    },

    /**
     * Invalid prepareSelectedImage (not a function).
     */
    invalidPrepareSelectedImage() {
      return runControlledEncodingFailureDeviceCheck({
        expectedErrorCode: "ENCODING_FAILED",
        reportMetadata: () => {},
        prepareSelectedImage: "not a function",
      });
    },
  };
}
