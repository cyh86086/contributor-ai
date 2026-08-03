# AutoJs6 D17 多張圖片依序讀取裝置驗證

## 目的

D17 要在同一次 Android 系統選圖器多選與同一個 fresh temporary grant
之下，依序處理恰好 3 張獨立選取的圖片：

`pick multiple → for each URI: canAccess() → read() → portable core`

成功時，3 張圖片都必須回傳 `PASS`、`image/jpeg`、獨立確認的相同 byte
count。腳本只可輸出一筆 frozen、sanitized aggregate，包含每張圖片的
per-image record，不得輸出逐張獨立紀錄。

本文件只準備後續、另行治理的使用者輔助裝置執行。此 preparation task
不得操作手機、不得使用 Android picker、不得建立 device evidence，也不得
宣稱 D17 PASS。

## 已審閱設定

- Case ID：`D17_MULTI_IMAGE_SEQUENTIAL`
- Fixture ID：`JPEG_REPEAT_VALID`（3 張均使用同一 fixture）
- Fixture MIME：`image/jpeg`
- 獨立確認大小：`6406` bytes
- 要求圖片數量：`3`
- `maxSizeBytes`：`6406`
- `readerSafetyLimitBytes`：`12582912`
- Grant：一次系統選圖器多選所取得的 fresh temporary grant
- Reselection：禁止

Fixture 是非個人、非敏感的 synthetic JPEG。其大小已在 launcher 與
production reader 之外，以唯讀工具重新量測。Repository 只保留 opaque
fixture ID、MIME 與獨立確認的正整數 count；fixture 的私人對應、來源名稱、
位置、URI、bytes、Base64 與圖片內容均留在 Git 之外。

## 後續執行前

只有在 D17 preparation PR 完成獨立審閱、合併到 `main`，並另行建立明確的
device-execution task 後，才可進行下列操作：

1. 使用 Vivo X Fold5、核准的 Android 版本，以及 AutoJs6 v6.7.0
   `arm64-v8a`。
2. 在 Mac 同步乾淨的 repository `main`，記錄執行當下的精確 SHA，並確認
   working tree 為 clean。
3. 執行 `npm run build:autojs6:d17:check`。
4. 執行 `npm run scan:autojs6:d17`。
5. 執行 `npm run check`。
6. 將私下對應 `JPEG_REPEAT_VALID` 的已確認 fixture 複製 3 份，放到手機上
   可由 Android 系統選圖器多選的位置。
7. 不得重新儲存、裁切、轉碼、改寫或替換 fixture，否則獨立 byte count
   失效。

## 裝置執行步驟

1. 在 AutoJs6 v6.7.0 中載入
   `scripts/autojs6/d17-multi-image-sequential-device-check.js`。
2. 按下「執行」。
3. 腳本會彈出指示對話框，說明需要在系統選圖器中選取恰好 3 張
   `JPEG_REPEAT_VALID` 圖片。按下「確定」。
4. Android 系統選圖器會以多選模式開啟。選取恰好 3 張私下對應
   `JPEG_REPEAT_VALID` 的圖片。
5. 選取完成後，腳本會在同一 fresh temporary grant 下依序處理每張 URI。
6. 處理完成後，AutoJs6 console 會顯示一筆 sanitized aggregate JSON。

## 成功結果 shape

```json
{
  "testCaseId": "D17_MULTI_IMAGE_SEQUENTIAL",
  "requestedImages": 3,
  "attemptedImages": 3,
  "successfulImages": 3,
  "status": "PASS",
  "images": [
    { "mimeType": "image/jpeg", "sizeBytes": 6406, "status": "PASS" },
    { "mimeType": "image/jpeg", "sizeBytes": 6406, "status": "PASS" },
    { "mimeType": "image/jpeg", "sizeBytes": 6406, "status": "PASS" }
  ],
  "uiResponsive": true
}
```

所有 3 張 `images` 記錄必須為 `PASS`、`image/jpeg`、`6406` bytes。
`requestedImages` 必須為 `3`，`attemptedImages` 與 `successfulImages`
均必須為 `3`。

## 失敗結果 shape

### Public error（第 2 張失敗為例）

```json
{
  "testCaseId": "D17_MULTI_IMAGE_SEQUENTIAL",
  "requestedImages": 3,
  "attemptedImages": 2,
  "successfulImages": 1,
  "status": "FAIL",
  "images": [
    { "mimeType": "image/jpeg", "sizeBytes": 6406, "status": "PASS" },
    {
      "mimeType": null,
      "sizeBytes": null,
      "status": "FAIL",
      "errorCode": "..."
    }
  ],
  "uiResponsive": true,
  "failureReason": "PUBLIC_ERROR",
  "errorCode": "..."
}
```

### Metadata mismatch（第 2 張 MIME 或大小不符為例）

```json
{
  "testCaseId": "D17_MULTI_IMAGE_SEQUENTIAL",
  "requestedImages": 3,
  "attemptedImages": 2,
  "successfulImages": 1,
  "status": "FAIL",
  "images": [
    { "mimeType": "image/jpeg", "sizeBytes": 6406, "status": "PASS" },
    { "mimeType": "...", "sizeBytes": "...", "status": "FAIL" }
  ],
  "uiResponsive": true,
  "failureReason": "METADATA_MISMATCH"
}
```

## 停止條件

- 如果 aggregate `status` 為 `FAIL`，保留清理後的 FAIL 紀錄並停止。
- 如果選圖器未提供多選模式、或選取的圖片數量不是 3 張，保留清理後的
  FAIL 紀錄並停止。
- 不得重新選圖、重試或修改腳本。

## 可保留的 evidence

只有 sanitized aggregate JSON 可保留為 evidence。不得保留：

- 任何 `content://` URI
- 任何 bytes、Base64 或圖片內容
- 任何 fixture 來源名稱或路徑
- 任何 credentials 或 session tokens
