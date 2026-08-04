# D21 UI 回應性裝置驗證程序

## 適用範圍

- **Device:** Vivo X Fold5
- **Android version:** 16
- **AutoJs6 version:** v6.7.0 `arm64-v8a`
- **Authoritative SHA:** 待 preparation PR merge 後更新
- **Fixture ID:** `JPEG_REPEAT_VALID`
- **Independently verified size:** 6,406 bytes

## 前置作業

1. 從 GitHub `main` branch 下載最新生成的 bundle：
   `scripts/autojs6/d21-ui-responsiveness-device-check.js`
2. 確認檔案大小與 SHA 與 repository 一致
3. 準備 `JPEG_REPEAT_VALID` fixture（6,406 bytes JPEG）

## 執行步驟

1. 在 AutoJs6 中載入 `d21-ui-responsiveness-device-check.js`
2. 執行腳本
3. 閱讀彈出的指示對話框
4. 在 Android 系統選圖器中選擇 `JPEG_REPEAT_VALID`（6,406 bytes JPEG）
5. 等待腳本完成 10 次讀取 + heartbeat 監控
6. 記錄 console 輸出的 sanitized JSON

## 預期結果

### PASS

```json
{
  "testCaseId": "D21_UI_RESPONSIVENESS",
  "status": "PASS",
  "mimeType": "image/jpeg",
  "sizeBytes": 6406,
  "requestedIterations": 10,
  "attemptedIterations": 10,
  "successfulIterations": 10,
  "allMetadataEqual": true,
  "uiResponsive": true,
  "heartbeatCount": 9
}
```

### FAIL - PUBLIC_ERROR

```json
{
  "testCaseId": "D21_UI_RESPONSIVENESS",
  "status": "FAIL",
  "failureReason": "PUBLIC_ERROR",
  "errorCode": "IMAGE_READ_FAILED",
  "requestedIterations": 10,
  "attemptedIterations": 1,
  "successfulIterations": 0,
  "allMetadataEqual": false,
  "uiResponsive": true,
  "heartbeatCount": 0
}
```

### FAIL - UI_NOT_RESPONSIVE

```json
{
  "testCaseId": "D21_UI_RESPONSIVENESS",
  "status": "FAIL",
  "failureReason": "UI_NOT_RESPONSIVE",
  "requestedIterations": 10,
  "attemptedIterations": 10,
  "successfulIterations": 10,
  "allMetadataEqual": true,
  "uiResponsive": false,
  "heartbeatCount": 0
}
```

## 結果記錄

將 sanitized JSON 輸出記錄到：
`docs/testing/device-validation/d21-vivo-x-fold5-autojs6-v6.7.0.md`

## 注意事項

- 此為 evidence-only 案例，不修改 production reader
- 只選擇一次，不得重新選圖
- 不得記錄 `content://` URI、bytes、Base64 或圖片內容
- heartbeat 間隔為 200ms，共 9 次 heartbeat（10 次讀取之間）
- 此案例不證明 D22/D23 persistence 或 logging guarantees
