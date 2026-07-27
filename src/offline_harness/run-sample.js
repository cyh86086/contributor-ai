import {
  validateAndroidImageUri,
  validateVisionMetadata,
} from "../core/index.js";
import { createSampleVisionResult } from "./sample-vision.js";

export function runOfflineSample({
  imageUris = ["content://media/external/images/media/sample"],
} = {}) {
  return imageUris.map((imageUri) => ({
    imageUri: validateAndroidImageUri(imageUri),
    metadata: validateVisionMetadata(createSampleVisionResult()),
  }));
}
