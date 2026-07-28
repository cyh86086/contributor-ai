/**
 * Runtime designation: immutable runtime-neutral manifest for non-production
 * AutoJs6 image-format device-verification launchers.
 */

function defineCase(definition) {
  return Object.freeze(definition);
}

export const D01_FORMAT_CHECK_CASE = defineCase({
  testCaseId: "D01_JPEG",
  pickerMimeType: "image/jpeg",
  expectedMimeType: "image/jpeg",
  requestCode: 6101,
  title: "D01 JPEG 裝置驗證",
  instructionText:
    "請在系統選圖器中選擇一張不含個資、且小於 10 MiB 的 JPEG 圖片。程式只會顯示 MIME、大小與介面回應狀態。",
  sourceEntryPath: "autojs6/source/d01-jpeg-device-check.entry.js",
  generatedPath: "autojs6/d01-jpeg-device-check.js",
});

export const D02_FORMAT_CHECK_CASE = defineCase({
  testCaseId: "D02_PNG",
  pickerMimeType: "image/png",
  expectedMimeType: "image/png",
  requestCode: 6102,
  title: "D02 PNG 裝置驗證",
  instructionText:
    "請在系統選圖器中選擇一張不含個資、且小於 10 MiB 的 PNG 圖片。程式只會顯示 MIME、大小與介面回應狀態。",
  sourceEntryPath: "autojs6/source/d02-png-device-check.entry.js",
  generatedPath: "autojs6/d02-png-device-check.js",
});

export const D03_FORMAT_CHECK_CASE = defineCase({
  testCaseId: "D03_WEBP",
  pickerMimeType: "image/webp",
  expectedMimeType: "image/webp",
  requestCode: 6103,
  title: "D03 WebP 裝置驗證",
  instructionText:
    "請在系統選圖器中選擇一張不含個資、且小於 10 MiB 的 WebP 圖片。程式只會顯示 MIME、大小與介面回應狀態。",
  sourceEntryPath: "autojs6/source/d03-webp-device-check.entry.js",
  generatedPath: "autojs6/d03-webp-device-check.js",
});

export const D04_FORMAT_CHECK_CASE = defineCase({
  testCaseId: "D04_HEIC",
  pickerMimeType: "image/heic",
  expectedMimeType: "image/heic",
  requestCode: 6104,
  title: "D04 HEIC 裝置驗證",
  instructionText:
    "請在系統選圖器中選擇一張不含個資、且小於 10 MiB 的 HEIC 圖片。程式只會顯示 MIME、大小與介面回應狀態。",
  sourceEntryPath: "autojs6/source/d04-heic-device-check.entry.js",
  generatedPath: "autojs6/d04-heic-device-check.js",
});

export const D05_FORMAT_CHECK_CASE = defineCase({
  testCaseId: "D05_HEIF",
  pickerMimeType: "image/heif",
  expectedMimeType: "image/heif",
  requestCode: 6105,
  title: "D05 HEIF 裝置驗證",
  instructionText:
    "請在系統選圖器支援 HEIF 時，選擇一張不含個資、且小於 10 MiB 的 HEIF 圖片。若平台或選圖器不支援，請保留清理後的 FAIL 並停止；程式只會顯示 MIME、大小與介面回應狀態。",
  sourceEntryPath: "autojs6/source/d05-heif-device-check.entry.js",
  generatedPath: "autojs6/d05-heif-device-check.js",
});

export const FORMAT_CHECK_CASES = Object.freeze([
  D01_FORMAT_CHECK_CASE,
  D02_FORMAT_CHECK_CASE,
  D03_FORMAT_CHECK_CASE,
  D04_FORMAT_CHECK_CASE,
  D05_FORMAT_CHECK_CASE,
]);

export const D02_D05_FORMAT_CHECK_CASES = Object.freeze(
  FORMAT_CHECK_CASES.slice(1),
);

export function findFormatCheckCase(testCaseId) {
  return FORMAT_CHECK_CASES.find(
    (formatCase) => formatCase.testCaseId === testCaseId,
  );
}

export function selectFormatCheckCases(testCaseIds) {
  if (testCaseIds === undefined) {
    return FORMAT_CHECK_CASES;
  }

  const selected = testCaseIds.map(findFormatCheckCase);
  if (selected.some((formatCase) => formatCase === undefined)) {
    throw new TypeError("Unknown AutoJs6 format-check case selection.");
  }
  return Object.freeze(selected);
}
