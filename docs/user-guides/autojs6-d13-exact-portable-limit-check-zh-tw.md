# AutoJs6 D13 portable size 上限等值裝置驗證

## 目的

D13 要確認既有 production reader 讀取的完整大小精確等於 portable
`maxSizeBytes` 時，既有 portable core 仍走成功路徑，並由 shared reporter
只輸出 sanitized metadata。

本程序不新增 production reader、portable core、picker、permission 或應用程式
行為，也不代表 D13 已有 Android 或裝置 PASS。

## 已審閱設定

- Case ID：`D13_EXACT_PORTABLE_LIMIT`
- Fixture ID：`AT_PORTABLE_LIMIT`
- Fixture MIME：`image/jpeg`
- 獨立確認大小：`6406` bytes
- `maxSizeBytes`：`6406`
- `readerSafetyLimitBytes`：`12582912`

大小是在 launcher 與 production reader 之外，以唯讀 local byte-count 工具
重新量測。Repository 只保留 opaque fixture ID 與正整數；fixture 的私人對應、
原始檔名、路徑與內容均留在 Git 之外。此數字不是從 D01-D08 result 推導。

## 執行前

1. 等待 D13 preparation PR 完成獨立審閱並合併。
2. 使用 Vivo X Fold5、Android 16 與 AutoJs6 v6.7.0 `arm64-v8a`。
3. 在 Mac 同步乾淨的 repository `main`，記錄執行當下的精確 SHA。
4. 執行：

   ```bash
   npm run build:autojs6:d13:check
   npm run scan:autojs6:d13
   ```

5. 將私下對應 `AT_PORTABLE_LIMIT` 的已確認 fixture 放到手機上可由 Android
   系統選圖器選取的位置。不要改寫、重新儲存、裁切或轉碼，否則 byte count
   會失效。
6. 將 `scripts/autojs6/d13-exact-portable-limit-device-check.js` 匯入
   AutoJs6；不要在手機上修改內容。

## 執行

1. 開啟並執行 generated D13 腳本。
2. 確認標題為 `D13 portable size 上限等值裝置驗證`。
3. 在該次開啟的 Android 系統選圖器中選取私下對應
   `AT_PORTABLE_LIMIT` 的 fixture，取得 fresh temporary grant。
4. 讓腳本在 off-UI-thread worker 中完成，不要保存或重用 URI。
5. 等待一行 JSON，並確認 UI 仍可回應。
6. 不得回傳 URI、路徑、檔名、bytes、Base64、圖片內容、錯誤細節、stack、
   credential 或其他 metadata。

## 唯一 PASS 條件

```json
{
  "testCaseId": "D13_EXACT_PORTABLE_LIMIT",
  "status": "PASS",
  "mimeType": "image/jpeg",
  "sizeBytes": 6406,
  "uiResponsive": true
}
```

`sizeBytes` 必須同時精確等於獨立確認大小與 `maxSizeBytes`。任何其他大小、
取消選圖、MIME 不符、讀取失敗、permission failure 或 UI 無回應都不得改寫
為 PASS。

## 回傳資料

只回傳：

- 執行用 repository SHA；
- 裝置、Android、AutoJs6 版本與 ABI；
- fixture ID `AT_PORTABLE_LIMIT`；
- `maxSizeBytes: 6406`；
- `readerSafetyLimitBytes: 12582912`；
- 一行 sanitized JSON；
- PASS 或 FAIL，以及不含敏感內容的簡短備註。

D13 結果不得挪用為 D14 portable overflow 或 D15 reader-ceiling overflow
證據。
