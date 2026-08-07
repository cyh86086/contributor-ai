/**
 * D24 Empty image — offline harness.
 *
 * This harness provides Node.js-compatible mocks for D24 device-check testing.
 */

import { runEmptyImageDeviceCheck } from "../../scripts/autojs6/empty-image-device-check.js";

export async function runD24OfflineHarness({ prepareSelectedImage } = {}) {
  const defaultPrepareSelectedImage = async () => {
    return {
      status: "FAIL",
      errorCode: "EMPTY_IMAGE",
      uiResponsive: true,
    };
  };

  return runEmptyImageDeviceCheck({
    expectedErrorCode: "EMPTY_IMAGE",
    reportMetadata: () => {},
    prepareSelectedImage: prepareSelectedImage ?? defaultPrepareSelectedImage,
  });
}
