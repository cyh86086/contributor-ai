# AutoJs6 D06 ContentResolver MIME 裝置驗證

## 目的

D06 要確認輸出的 MIME 是 Android `ContentResolver` 直接回傳的值，而不是
根據圖片位元組簽章推導出的 fallback。

本案例使用既有 production image reader，不建立第二套 reader，也不會連線、
上傳圖片、呼叫 AI、操作 Contributor App 或送出內容。

## 執行前

1. 使用 Vivo X Fold5 與 AutoJs6 v6.7.0 `arm64-v8a`。
2. 在電腦確認 repository 位於乾淨的 `main`，並記錄精確 SHA。
3. 執行：

   ```bash
   npm run build:autojs6:d06:check
   npm run scan:autojs6:d06
   ```

4. 準備一張不含個資、可公開且小於 10 MiB 的 JPEG。
5. 在 repository 外記錄其精確 byte 數，fixture ID 使用
   `JPEG_RESOLVER_MIME_VALID`；不要記錄檔名、路徑或 URI。
6. 將
   `scripts/autojs6/d06-resolver-mime-device-check.js`
   匯入 AutoJs6，不要在手機上修改腳本。

## 執行

1. 在 AutoJs6 開啟 D06 generated 腳本。
2. 點一次「執行」。
3. 確認對話框顯示 `D06 ContentResolver MIME 裝置驗證`。
4. 在 Android 標準選圖器只選一張準備好的 JPEG。
5. 等待主控台顯示一行 JSON。
6. 檢查輸出沒有 URI、路徑、檔名、圖片內容、bytes、Base64、錯誤細節、
   stack 或 credential。

## PASS 條件

只有以下條件全部成立才是 PASS：

```json
{
  "testCaseId": "D06_RESOLVER_MIME",
  "status": "PASS",
  "mimeType": "image/jpeg",
  "sizeBytes": 12345,
  "uiResponsive": true
}
```

其中 `sizeBytes` 必須精確等於 repository 外記錄的 fixture byte 數。

取消選圖、MIME 缺失、MIME 不是 `image/jpeg`、無法讀取、大小不正確，或
`uiResponsive` 不是 `true`，都不得改寫為 PASS。

## 回傳資料

只回傳：

- 精確 repository SHA；
- Android 版本；
- AutoJs6 版本與 ABI；
- fixture ID；
- 預期 byte 數；
- 一行清理後 JSON；
- PASS/FAIL；
- 不含敏感內容的簡短備註。
