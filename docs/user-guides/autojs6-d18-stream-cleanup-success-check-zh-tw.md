# AutoJs6 D18 成功讀取後 Stream 清理裝置驗證

## 目的

D18 要在成功讀取圖片後，確認 stream 被正確清理。腳本 instrument
ContentResolver 的 `openInputStream()` 回傳 proxied stream，計算 `close()`
呼叫次數。成功時，`closeCount` 應為 2（`canAccess()` probe 一次 + `read()`
一次）。

本文件只準備後續、另行治理的使用者輔助裝置執行。

## 已審閱設定

- Case ID：`D18_STREAM_CLEANUP_SUCCESS`
- Fixture ID：`JPEG_REPEAT_VALID`
- Fixture MIME：`image/jpeg`
- 獨立確認大小：`6406` bytes
- `maxSizeBytes`：`6406`
- `readerSafetyLimitBytes`：`12582912`
- Grant：一次系統選圖器選取所取得的 fresh temporary grant
- Reselection：禁止

## 裝置執行步驟

1. 在 AutoJs6 v6.7.0 中載入
   `scripts/autojs6/d18-stream-cleanup-success-device-check.js`。
2. 按下「執行」。
3. 腳本會彈出指示對話框。按下「確定」。
4. 在 Android 系統選圖器中選取私下對應 `JPEG_REPEAT_VALID` 的圖片。
5. 處理完成後，AutoJs6 console 會顯示 sanitized JSON。

## 成功結果 shape

```json
{
  "testCaseId": "D18_STREAM_CLEANUP_SUCCESS",
  "status": "PASS",
  "mimeType": "image/jpeg",
  "sizeBytes": 6406,
  "closeCount": 2
}
```

`closeCount: 2` 代表 `canAccess()` probe 一次 close + `read()` 一次 close。

## 失敗結果 shape

### Public error

```json
{
  "testCaseId": "D18_STREAM_CLEANUP_SUCCESS",
  "status": "FAIL",
  "errorCode": "...",
  "closeCount": 0
}
```

### Cleanup failed

```json
{
  "testCaseId": "D18_STREAM_CLEANUP_SUCCESS",
  "status": "FAIL",
  "mimeType": "image/jpeg",
  "sizeBytes": 6406,
  "closeCount": 3,
  "errorCode": "CLEANUP_FAILED"
}
```

## 停止條件

- 如果 `status` 為 `FAIL`，保留清理後的 FAIL 紀錄並停止。
- 不得重新選圖、重試或修改腳本。

## 可保留的 evidence

只有 sanitized aggregate JSON 可保留為 evidence。不得保留任何
`content://` URI、bytes、Base64 或圖片內容。
