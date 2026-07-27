# AutoJs6 D01 JPEG 一鍵裝置驗證

## 這個檢查會做什麼

這是 **D01 JPEG 裝置驗證**，不是 Contributor AI 的正式功能。它只會讓你
從 Android 系統選圖器選一張 JPEG，使用現有的 AutoJs6 圖片讀取器與可攜式
核心讀取圖片，最後顯示 MIME 類型、檔案大小、成功或失敗，以及介面是否保持
回應。

它不會連線、不會上傳圖片、不會呼叫 AI、不會操作 Contributor App，也不會
送出任何內容。尚未在實機上完成驗證；Android Image Input Adapter V1.0
仍是 **NOT YET MIGRATED**。

第一次 Vivo X Fold5／AutoJs6 v6.7.0 測試在解析舊版 generated bundle 時，
因保留關鍵字 `class` 停止；選圖器沒有開啟，也沒有選取或讀取圖片。這不是
D01 PASS。相容性修正已由 PR #9 完成審查並合併；請使用目前 authoritative
main 的 generated bundle 重新測試。合併時的相容性修正 baseline 是
`80717606209f3f01c3bfc232a4d16016bf14c368`。

## 執行前準備

1. 使用 **Vivo X Fold5** 與 **AutoJs6 v6.7.0 `arm64-v8a`**。
2. 準備一張不含個資、可公開且小於 10 MiB 的 JPEG 測試圖。不要使用私人照片。
3. 從本儲存庫取得單一檔案
   `scripts/autojs6/d01-jpeg-device-check.js`，匯入 AutoJs6。
4. 不要修改腳本、加入權限、貼入金鑰，或把圖片複製到其他位置規避權限。

## 一鍵執行

1. 在 AutoJs6 開啟 `d01-jpeg-device-check.js`。
2. 點一次「執行」。
3. 閱讀提示後按「確定」。
4. 在 Android 標準選圖器中，只選一張上述非敏感 JPEG。
5. 等待 AutoJs6 主控台顯示一行 JSON。不要把其他裝置資訊或畫面內容加入紀錄。

取消選圖是安全的，結果會是 `FAIL`，不代表圖片已被讀取。

## 如何判讀

成功只會有以下欄位：

```json
{
  "testCaseId": "D01_JPEG",
  "status": "PASS",
  "mimeType": "image/jpeg",
  "sizeBytes": 12345,
  "uiResponsive": true
}
```

失敗只會有以下欄位：

```json
{
  "testCaseId": "D01_JPEG",
  "status": "FAIL",
  "errorCode": "IMAGE_READ_FAILED",
  "uiResponsive": false
}
```

`errorCode` 只應是以下其中一個：

- `UNSUPPORTED_MIME_TYPE`
- `EMPTY_IMAGE`
- `IMAGE_TOO_LARGE`
- `IMAGE_READ_FAILED`
- `ENCODING_FAILED`
- `URI_ACCESS_DENIED`

只有 `status` 是 `PASS`、`mimeType` 是 `image/jpeg`、`sizeBytes` 是正整數，
且 `uiResponsive` 是 `true`，才算 D01 通過。這只代表單次 D01 結果，不代表
完整模組或裝置相容性已驗證。

## 立即停止的情況

遇到以下任何情況，請停止，不要自行修改腳本或重試其他權限：

- Android 標準選圖器沒有開啟；
- AutoJs6 顯示模組、語法、Java bridge 或 byte array 錯誤；
- 介面卡住、無法操作，或 `uiResponsive` 不是 `true`；
- 輸出不是上述固定欄位；
- 主控台出現圖片內容、Base64、完整 URI、查詢字串、本機路徑、檔名、
  憑證、例外訊息、stack 或 cause；
- 腳本要求網路、AI provider、佇列、Contributor App 或送出操作。

只保留那一行已清理的 JSON 結果，並回報 `D01_JPEG` 與 PASS/FAIL。不要分享
圖片、選圖 URI、路徑、檔名、螢幕中的私人資料或完整錯誤內容。
