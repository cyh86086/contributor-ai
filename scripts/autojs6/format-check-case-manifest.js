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

export const D13_EXACT_PORTABLE_LIMIT_CHECK_CASE = defineCase({
  testCaseId: "D13_EXACT_PORTABLE_LIMIT",
  fixtureId: "AT_PORTABLE_LIMIT",
  pickerMimeType: "image/jpeg",
  expectedMimeType: "image/jpeg",
  expectedSizeBytes: 6_406,
  maxSizeBytes: 6_406,
  readerSafetyLimitBytes: 12 * 1024 * 1024,
  requestCode: 6113,
  verificationMode: "exact-portable-limit",
  title: "D13 portable size 上限等值裝置驗證",
  instructionText:
    "請在 Android 系統選圖器中選擇私下對應 AT_PORTABLE_LIMIT、且已獨立確認為 6,406 bytes 的非敏感 JPEG。此 evidence-only 案例只接受 production reader 回報大小精確等於 maxSizeBytes，並只輸出 sanitized metadata。",
  sourceEntryPath:
    "autojs6/source/d13-exact-portable-limit-device-check.entry.js",
  generatedPath: "autojs6/d13-exact-portable-limit-device-check.js",
});

export const D14_PORTABLE_SIZE_OVERFLOW_CHECK_CASE = defineCase({
  testCaseId: "D14_PORTABLE_SIZE_OVERFLOW",
  fixtureId: "OVER_PORTABLE",
  pickerMimeType: "image/jpeg",
  expectedMimeType: "image/jpeg",
  expectedSizeBytes: 6_406,
  maxSizeBytes: 6_405,
  readerSafetyLimitBytes: 12 * 1024 * 1024,
  requestCode: 6114,
  verificationMode: "portable-size-overflow",
  title: "D14 portable size 超限裝置驗證",
  instructionText:
    "請在 Android 系統選圖器中選擇私下對應 OVER_PORTABLE、且已重新獨立確認為 6,406 bytes 的非敏感 JPEG。此 evidence-only 案例以 6,405 bytes portable 上限與較高 reader ceiling 執行，只接受 sanitized IMAGE_TOO_LARGE 結果，不得改寫為 PASS。",
  sourceEntryPath:
    "autojs6/source/d14-portable-size-overflow-device-check.entry.js",
  generatedPath: "autojs6/d14-portable-size-overflow-device-check.js",
});

export const D15_READER_SAFETY_CEILING_OVERFLOW_CHECK_CASE = defineCase({
  testCaseId: "D15_READER_SAFETY_CEILING_OVERFLOW",
  fixtureId: "OVER_READER_CEILING",
  pickerMimeType: "image/jpeg",
  expectedMimeType: "image/jpeg",
  expectedSizeBytes: 6_406,
  maxSizeBytes: 6_406,
  readerSafetyLimitBytes: 6_405,
  requestCode: 6115,
  verificationMode: "reader-safety-ceiling-overflow",
  title: "D15 reader safety ceiling 超限裝置驗證",
  instructionText:
    "請在 Android 系統選圖器中選擇私下對應 OVER_READER_CEILING、且已重新獨立確認為 6,406 bytes 的非敏感 JPEG。此 evidence-only 案例以 6,405 bytes reader ceiling 與 6,406 bytes portable 上限執行；預期 public result 是 IMAGE_READ_FAILED，不得改寫為 PASS，且其他結果必須原樣保留。",
  sourceEntryPath:
    "autojs6/source/d15-reader-safety-ceiling-overflow-device-check.entry.js",
  generatedPath: "autojs6/d15-reader-safety-ceiling-overflow-device-check.js",
});

export const D16_REPEATED_READS_CHECK_CASE = defineCase({
  testCaseId: "D16_REPEATED_READS",
  fixtureId: "JPEG_REPEAT_VALID",
  pickerMimeType: "image/jpeg",
  expectedMimeType: "image/jpeg",
  expectedSizeBytes: 6_406,
  maxSizeBytes: 6_406,
  readerSafetyLimitBytes: 12 * 1024 * 1024,
  requestCode: 6116,
  verificationMode: "repeated-reads",
  title: "D16 JPEG 重複讀取裝置驗證",
  instructionText:
    "請在 Android 系統選圖器中只選取一次私下對應 JPEG_REPEAT_VALID、且已獨立確認為 6,406 bytes 的非敏感 JPEG。腳本會在同一 fresh temporary grant 下執行恰好 10 次完整 production reader 與 portable core 路徑；不得重新選圖，且只輸出一筆 sanitized aggregate metadata。",
  sourceEntryPath: "autojs6/source/d16-repeated-reads-device-check.entry.js",
  generatedPath: "autojs6/d16-repeated-reads-device-check.js",
});

export const D17_MULTI_IMAGE_SEQUENTIAL_CHECK_CASE = defineCase({
  testCaseId: "D17_MULTI_IMAGE_SEQUENTIAL",
  fixtureId: "JPEG_REPEAT_VALID",
  pickerMimeType: "image/*",
  expectedMimeType: "image/jpeg",
  expectedSizeBytes: 6_406,
  maxSizeBytes: 6_406,
  readerSafetyLimitBytes: 12 * 1024 * 1024,
  requestCode: 6117,
  verificationMode: "multi-image-sequential",
  requestedImages: 3,
  title: "D17 多張圖片依序讀取裝置驗證",
  instructionText:
    "請在 Android 系統選圖器中選取恰好 3 張私下對應 JPEG_REPEAT_VALID、且已獨立確認為 6,406 bytes 的非敏感 JPEG。選圖器必須啟用多選模式。腳本會在同一 fresh temporary grant 下依序處理每張 URI，並只輸出一筆 sanitized aggregate metadata。",
  sourceEntryPath:
    "autojs6/source/d17-multi-image-sequential-device-check.entry.js",
  generatedPath: "autojs6/d17-multi-image-sequential-device-check.js",
});

export const D18_STREAM_CLEANUP_SUCCESS_CHECK_CASE = defineCase({
  testCaseId: "D18_STREAM_CLEANUP_SUCCESS",
  fixtureId: "JPEG_REPEAT_VALID",
  pickerMimeType: "image/jpeg",
  expectedMimeType: "image/jpeg",
  expectedSizeBytes: 6_406,
  maxSizeBytes: 6_406,
  readerSafetyLimitBytes: 12 * 1024 * 1024,
  requestCode: 6118,
  verificationMode: "stream-cleanup-success",
  title: "D18 成功讀取後 stream 清理裝置驗證",
  instructionText:
    "請在 Android 系統選圖器中選擇私下對應 JPEG_REPEAT_VALID、且已獨立確認為 6,406 bytes 的非敏感 JPEG。此 evidence-only 案例 instrument stream close 行為，確認成功讀取後恰好一次 close，並輸出含 closeCount 的 sanitized metadata。",
  sourceEntryPath:
    "autojs6/source/d18-stream-cleanup-success-device-check.entry.js",
  generatedPath: "autojs6/d18-stream-cleanup-success-device-check.js",
});

export const D19_CLEANUP_AFTER_FAILURE_CHECK_CASE = defineCase({
  testCaseId: "D19_CLEANUP_AFTER_FAILURE",
  fixtureId: "JPEG_REPEAT_VALID",
  pickerMimeType: "image/jpeg",
  expectedMimeType: "image/jpeg",
  expectedSizeBytes: 6_406,
  maxSizeBytes: 6_406,
  readerSafetyLimitBytes: 12 * 1024 * 1024,
  failureAfterBytes: 3_203,
  requestCode: 6119,
  verificationMode: "cleanup-after-failure",
  title: "D19 讀取失敗後 stream 清理裝置驗證",
  instructionText:
    "請在 Android 系統選圖器中選擇私下對應 JPEG_REPEAT_VALID、且已獨立確認為 6,406 bytes 的非敏感 JPEG。此 evidence-only 案例在讀取中途注入受控失敗，確認失敗後 stream 仍被正確清理，並輸出含 closeCount 的 sanitized metadata。",
  sourceEntryPath:
    "autojs6/source/d19-cleanup-after-failure-device-check.entry.js",
  generatedPath: "autojs6/d19-cleanup-after-failure-device-check.js",
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
  D13_EXACT_PORTABLE_LIMIT_CHECK_CASE,
  D14_PORTABLE_SIZE_OVERFLOW_CHECK_CASE,
  D15_READER_SAFETY_CEILING_OVERFLOW_CHECK_CASE,
  D16_REPEATED_READS_CHECK_CASE,
  D17_MULTI_IMAGE_SEQUENTIAL_CHECK_CASE,
  D18_STREAM_CLEANUP_SUCCESS_CHECK_CASE,
  D19_CLEANUP_AFTER_FAILURE_CHECK_CASE,
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
