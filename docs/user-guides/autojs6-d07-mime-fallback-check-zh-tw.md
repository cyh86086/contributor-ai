# AutoJs6 D07 MIME 簽章 fallback 裝置驗證

## 目的

D07 要確認：當 evidence-only wrapper 將 production reader 回傳的 MIME
刻意設為缺失時，既有 portable core 能依圖片 bytes 的 JPEG 簽章辨識出
`image/jpeg`。

此案例仍使用既有 production image reader 讀取 Android `content://` URI。
它不建立第二套 reader、MIME map 或 signature detector，也不會連線、上傳、
呼叫 AI、操作 Contributor App 或送出內容。

## 執行前

1. 使用 Vivo X Fold5、Android 16 與 AutoJs6 v6.7.0 `arm64-v8a`。
2. 在 Mac 確認 repository 位於乾淨且同步的 `main`，記錄精確 SHA。
3. 執行：

   ```bash
   npm run build:autojs6:d07:check
   npm run scan:autojs6:d07
   ```

4. 使用一張不含個資且小於 10 MiB 的 JPEG。
5. 執行前在 repository 外確認精確 byte 數；fixture ID 使用
   `JPEG_MIME_FALLBACK_VALID`，不要記錄真實檔名、路徑或 URI。
6. 將 `scripts/autojs6/d07-mime-fallback-device-check.js` 匯入 AutoJs6，
   不要在手機修改內容。

## 執行

1. 在 AutoJs6 開啟 generated D07 腳本並執行一次。
2. 確認畫面標題為 `D07 MIME 簽章 fallback 裝置驗證`。
3. 在 Android 標準選圖器只選一張已確認 byte 數的 JPEG。
4. 等待一行 JSON，並確認 UI 仍可回應。
5. 不得回傳 URI、路徑、檔名、bytes、Base64、圖片內容、錯誤細節、
   stack、credential 或其他 metadata。

## PASS 條件

```json
{
  "testCaseId": "D07_MIME_FALLBACK",
  "status": "PASS",
  "mimeType": "image/jpeg",
  "sizeBytes": 12345,
  "uiResponsive": true
}
```

`sizeBytes` 必須精確等於執行前獨立記錄的 fixture byte 數。取消選圖、
無法讀取、非 JPEG bytes、大小不符或 UI 無回應都不得改寫為 PASS。

## 回傳資料

只回傳精確 repository SHA、Android 版本、AutoJs6 版本與 ABI、fixture ID、
執行前 byte 數、一行 sanitized JSON、PASS/FAIL 與不含敏感內容的備註。
