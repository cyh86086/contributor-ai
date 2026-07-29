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

export const D06_RESOLVER_MIME_CHECK_CASE = defineCase({
  testCaseId: "D06_RESOLVER_MIME",
  pickerMimeType: "image/jpeg",
  expectedMimeType: "image/jpeg",
  requestCode: 6106,
  verificationMode: "resolver-mime",
  title: "D06 ContentResolver MIME 裝置驗證",
  instructionText:
    "請在系統選圖器中選擇一張不含個資、且小於 10 MiB 的 JPEG 圖片。此案例只接受 Android ContentResolver 直接回傳的 MIME，不使用位元組簽章 fallback。",
  sourceEntryPath: "autojs6/source/d06-resolver-mime-device-check.entry.js",
  generatedPath: "autojs6/d06-resolver-mime-device-check.js",
});

export const D07_MIME_FALLBACK_CHECK_CASE = defineCase({
  testCaseId: "D07_MIME_FALLBACK",
  pickerMimeType: "image/jpeg",
  expectedMimeType: "image/jpeg",
  requestCode: 6107,
  verificationMode: "mime-fallback",
  title: "D07 MIME 簽章 fallback 裝置驗證",
  instructionText:
    "請選擇一張不含個資、且小於 10 MiB 的 JPEG。此 evidence-only 案例保留 production reader 的原始 bytes，但刻意移除 reader MIME，確認既有 portable core 能依 JPEG 位元組簽章 fallback。",
  sourceEntryPath: "autojs6/source/d07-mime-fallback-device-check.entry.js",
  generatedPath: "autojs6/d07-mime-fallback-device-check.js",
});

export const D08_PERMISSION_GRANTED_CHECK_CASE = defineCase({
  testCaseId: "D08_PERMISSION_GRANTED",
  pickerMimeType: "image/jpeg",
  expectedMimeType: "image/jpeg",
  requestCode: 6108,
  title: "D08 有效權限裝置驗證",
  instructionText:
    "請在 Android 系統選圖器中重新選擇一張不含個資、且小於 10 MiB 的 JPEG。選取後腳本會在該次臨時 grant 仍有效時立即使用既有 production reader 讀取，並只輸出 sanitized success metadata。",
  sourceEntryPath:
    "autojs6/source/d08-permission-granted-device-check.entry.js",
  generatedPath: "autojs6/d08-permission-granted-device-check.js",
});

export const FORMAT_CHECK_CASES = Object.freeze([
  D01_FORMAT_CHECK_CASE,
  D02_FORMAT_CHECK_CASE,
  D03_FORMAT_CHECK_CASE,
  D04_FORMAT_CHECK_CASE,
  D05_FORMAT_CHECK_CASE,
  D06_RESOLVER_MIME_CHECK_CASE,
  D07_MIME_FALLBACK_CHECK_CASE,
  D08_PERMISSION_GRANTED_CHECK_CASE,
]);

export const D02_D05_FORMAT_CHECK_CASES = Object.freeze([
  D02_FORMAT_CHECK_CASE,
  D03_FORMAT_CHECK_CASE,
  D04_FORMAT_CHECK_CASE,
  D05_FORMAT_CHECK_CASE,
]);

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
