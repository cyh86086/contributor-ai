# AutoJs6 D19 讀取失敗後 Stream 清理裝置驗證

## 目的

D19 要在讀取圖片中途發生受控失敗後，確認 stream 仍被正確清理。腳本
instrument ContentResolver 的 `openInputStream()` 回傳 proxied stream，計算
`close()` 呼叫次數，同時在讀取超過指定 byte 數後注入失敗。失敗時，
`closeCount` 應為 1（只有 `read()` 階段的 stream 被 close）。

本文件只準備後續、另行治理的使用者輔助裝置執行。

## 已審閱設定

- Case ID：`D19_CLEANUP_AFTER_FAILURE`
- Fixture ID：`JPEG_REPEAT_VALID`
- Fixture MIME：`image/jpeg`
- 獨立確認大小：`6406` bytes
- `maxSizeBytes`：`6406`
- `readerSafetyLimitBytes`：`12582912`
- `failureAfterBytes`：`3203`（約 fixture 大小的一半）
- Grant：一次系統選圖器選取所取得的 fresh temporary grant
- Reselection：禁止

## 裝置執行步驟

1. 在 AutoJs6 v6.7.0 中載入
   `scripts/autojs6/d19-cleanup-after-failure-device-check.js`。
2. 按下「執行」。
3. 腳本會彈出指示對話框。按下「確定」。
4. 在 Android 系統選圖器中選取私下對應 `JPEG_REPEAT_VALID` 的圖片。
5. 處理完成後，AutoJs6 console 會顯示 sanitized JSON。

## 預期結果 shape

D19 預期讀取中途失敗，因此 `status` 為 `FAIL`，`errorCode` 為
`IMAGE_READ_FAILED`，`closeCount` 為 `1`。

```json
{
  "testCaseId": "D19_CLEANUP_AFTER_FAILURE",
  "status": "FAIL",
  "errorCode": "IMAGE_READ_FAILED",
  "closeCount": 1,
  "uiResponsive": true
}
```

`closeCount: 1` 代表只有 `read()` 階段的 stream 被 close 了一次。
D19 wrapper 不呼叫 `canAccess()`，因此沒有 probe stream。

## 失敗結果 shape

### Cleanup failed

```json
{
  "testCaseId": "D19_CLEANUP_AFTER_FAILURE",
  "status": "FAIL",
  "errorCode": "CLEANUP_FAILED",
  "closeCount": 0
}
```

### Unexpected success

```json
{
  "testCaseId": "D19_CLEANUP_AFTER_FAILURE",
  "status": "FAIL",
  "failureReason": "UNEXPECTED_SUCCESS",
  "closeCount": 1
}
```

## 停止條件

- 如果 `closeCount !== 1`，保留清理後的 FAIL 紀錄並停止。
- 不得重新選圖、重試或修改腳本。

## 可保留的 evidence

只有 sanitized aggregate JSON 可保留為 evidence。不得保留任何
`content://` URI、bytes、Base64 或圖片內容。
