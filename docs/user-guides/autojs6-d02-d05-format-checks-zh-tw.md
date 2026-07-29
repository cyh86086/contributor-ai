# AutoJs6 D02–D05 圖片格式裝置驗證

## 這些檢查會做什麼

這些腳本是 Vivo X Fold5／AutoJs6 v6.7.0 `arm64-v8a` 的
**非正式功能、僅供裝置驗證**工具：

| 測試案例   | 圖片格式 | AutoJs6 腳本               |
| ---------- | -------- | -------------------------- |
| `D02_PNG`  | PNG      | `d02-png-device-check.js`  |
| `D03_WEBP` | WebP     | `d03-webp-device-check.js` |
| `D04_HEIC` | HEIC     | `d04-heic-device-check.js` |
| `D05_HEIF` | HEIF     | `d05-heif-device-check.js` |

每次執行只會開啟 Android 系統選圖器，讀取一張指定格式的圖片，並顯示
測試案例、PASS/FAIL、MIME、檔案大小與介面回應狀態。它們不會連線、不會
上傳圖片、不會呼叫 AI、不會操作 Contributor App，也不會送出任何內容。

這些腳本已完成離線 build、freshness、legacy syntax、輸出合約測試，
並已在 Vivo X Fold5／AutoJs6 v6.7.0 `arm64-v8a`、authoritative main SHA
`ad52d122e239e0431c9fd2d3c2cdedf383f8b0da` 完成 D02–D05 範圍內的實機
PASS。證據記錄見
[`../testing/device-validation/d02-d05-vivo-x-fold5-autojs6-v6.7.0.md`](../testing/device-validation/d02-d05-vivo-x-fold5-autojs6-v6.7.0.md)。

這些結果不代表完整裝置矩陣或模組遷移完成；Android Image Input Adapter
V1.0 仍是 **NOT YET MIGRATED**。

## 執行前準備

1. 使用 Vivo X Fold5 與 AutoJs6 v6.7.0 `arm64-v8a`。
2. 記錄裝置 Android 版本、AutoJs6 版本、ABI、精確的 authoritative
   `main` SHA，並確認 working tree clean。
3. 準備四張不含個資、可公開且小於 10 MiB 的合成測試圖：
   `PNG_VALID`、`WEBP_VALID`、`HEIC_VALID`、`HEIF_VALID`。在儲存庫外記錄
   每張圖的精確 bytes；不要記錄檔名、路徑或 URI。
4. 從同一個已驗證 SHA 取得 `scripts/autojs6/` 下四個 generated 腳本，
   分別匯入 AutoJs6。
5. 不要修改腳本、重新命名圖片來偽裝格式、加入廣泛權限、貼入金鑰，或把
   圖片複製到其他位置規避權限。

## 依序執行

請依 D02、D03、D04、D05 順序一次執行一個腳本：

1. 在 AutoJs6 開啟目前案例的 generated 腳本。
2. 點一次「執行」，確認對話框顯示正確的案例與格式。
3. 按「確定」後，在 Android 標準選圖器中只選一張對應的合成測試圖。
4. 等待 AutoJs6 主控台顯示一行 JSON。
5. 確認輸出沒有敏感內容，再記錄案例、結果、MIME、bytes 與
   `uiResponsive`。
6. 完成目前案例後才進行下一個案例。

取消選圖會產生安全的 FAIL。取消、選圖器找不到指定格式、或平台不支援，
都不代表 PASS。

## PASS 判定

成功輸出只能包含以下五個欄位。D02 範例：

```json
{
  "testCaseId": "D02_PNG",
  "status": "PASS",
  "mimeType": "image/png",
  "sizeBytes": 12345,
  "uiResponsive": true
}
```

各案例必須精確符合：

| 測試案例   | 必須回傳的 MIME |
| ---------- | --------------- |
| `D02_PNG`  | `image/png`     |
| `D03_WEBP` | `image/webp`    |
| `D04_HEIC` | `image/heic`    |
| `D05_HEIF` | `image/heif`    |

只有 MIME 完全相同、`sizeBytes` 是大於零的安全整數，而且
`uiResponsive` 是 `true`，才能記為該案例 PASS。

## FAIL 判定

失敗輸出只能包含以下四個欄位：

```json
{
  "testCaseId": "D02_PNG",
  "status": "FAIL",
  "errorCode": "IMAGE_READ_FAILED",
  "uiResponsive": true
}
```

`errorCode` 只應是：

- `UNSUPPORTED_MIME_TYPE`
- `EMPTY_IMAGE`
- `IMAGE_TOO_LARGE`
- `IMAGE_READ_FAILED`
- `ENCODING_FAILED`
- `URI_ACCESS_DENIED`

錯誤 MIME、零 bytes、負數、非整數、不安全整數、讀取失敗或
`uiResponsive` 不是 `true`，都不能記為 PASS。

## D05 HEIF 限制

如果 Vivo X Fold5 的系統選圖器或 gallery 不提供 `image/heif`：

1. 不要改選 HEIC；
2. 不要修改 MIME filter 或重新命名檔案；
3. 記錄精確 SHA、裝置/runtime、`D05_HEIF`、清理後的 FAIL/停止結果，以及
   「選圖器未提供 HEIF」這類不含私人資訊的觀察；
4. 停止 D05，等待 repository review。

平台限制不是 PASS。只有取得 HEIF、回傳 `image/heif`、bytes 合法且 UI
保持回應時，D05 才能 PASS。

## 立即停止的情況

遇到以下任何情況，請停止，不要自行修改腳本：

- Android 標準選圖器沒有開啟；
- 對話框、腳本或回傳 MIME 與目前案例不符；
- AutoJs6 顯示模組、語法、Java bridge 或 byte array 錯誤；
- 介面卡住或 `uiResponsive` 不是 `true`；
- 輸出欄位超出固定 PASS/FAIL 合約；
- 主控台出現 URI、路徑、檔名、Base64、圖片 bytes、圖片內容、例外訊息、
  stack、cause、憑證或其他 metadata；
- 腳本要求網路、AI provider、佇列、Contributor App 或送出操作。

只分享已清理的單行 JSON、精確 SHA、裝置/runtime 資訊、opaque fixture ID
與不含私人內容的觀察。不要分享圖片、URI、路徑、檔名或完整錯誤內容。
