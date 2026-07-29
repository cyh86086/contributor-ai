# AutoJs6 D08 有效權限裝置驗證

## 目的

D08 要確認：Android 系統選圖器剛回傳的 `content://` URI，在該次臨時
grant 仍有效時，可以立即由既有 production reader 成功讀取並輸出
sanitized success metadata。

此案例是既有正常 picker/read 路徑的獨立證據別名。它不新增 permission
manager、persistable grant、第二套 picker、第二套 reader、MIME detector
或 production 行為。

## 執行前

1. 使用 Vivo X Fold5、Android 16 與 AutoJs6 v6.7.0 `arm64-v8a`。
2. 在 Mac 確認 repository 位於乾淨且同步的 `main`，記錄精確 SHA。
3. 執行：

   ```bash
   npm run build:autojs6:d08:check
   npm run scan:autojs6:d08
   ```

4. 準備一張不含個資且小於 10 MiB 的 JPEG。
5. 在執行腳本前獨立確認精確 byte 數；fixture ID 使用
   `JPEG_PERMISSION_GRANTED_VALID`，不要記錄真實檔名、路徑或 URI。
6. 將 `scripts/autojs6/d08-permission-granted-device-check.js` 匯入
   AutoJs6，不要在手機修改內容。

## 執行

1. 開啟並執行 generated D08 腳本。
2. 確認標題為 `D08 有效權限裝置驗證`。
3. 必須在本次開啟的 Android 系統選圖器中重新選擇 fixture，不得重用
   舊腳本內保存的 URI。
4. 選取後不要切換 App、等待或撤銷權限；讓腳本立即繼續讀取。
5. 等待一行 JSON，並確認 UI 仍可回應。
6. 不得回傳 URI、路徑、檔名、bytes、Base64、圖片內容、錯誤細節、
   stack、credential 或其他 metadata。

## PASS 條件

```json
{
  "testCaseId": "D08_PERMISSION_GRANTED",
  "status": "PASS",
  "mimeType": "image/jpeg",
  "sizeBytes": 12345,
  "uiResponsive": true
}
```

`sizeBytes` 必須精確等於執行前獨立記錄的 fixture byte 數。取消選圖、
無法存取、讀取失敗、MIME 不符、大小不符或 UI 無回應都不得改寫為
PASS。

## 回傳資料

只回傳精確 repository SHA、裝置、Android 版本、AutoJs6 版本與 ABI、
fixture ID、執行前 byte 數、一行 sanitized JSON、PASS/FAIL 與不含敏感
內容的備註。
