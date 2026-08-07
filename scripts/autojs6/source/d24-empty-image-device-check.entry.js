/**
 * D24 Empty image — source entry for AutoJs6 bundle generation.
 *
 * This entry is consumed by the esbuild + Babel pipeline to produce the
 * generated bundle at scripts/autojs6/d24-empty-image-device-check.js.
 */

import { D24_EMPTY_IMAGE_CHECK_CASE } from "../format-check-case-manifest.js";
import { runAutoJs6FormatCheck } from "../format-check-runtime.js";

void runAutoJs6FormatCheck(D24_EMPTY_IMAGE_CHECK_CASE);
