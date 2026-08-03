# AutoJs6 D16 同一 temporary grant 重複讀取裝置驗證

## 目的

D16 要在同一次 Android 系統選圖器選取與同一個 fresh temporary grant
之下，對同一來源執行恰好 10 次完整 production path：

`canAccess() → read() → portable core → verification reporter path`

成功時，10 次讀取都必須回傳 `PASS`、`image/jpeg`、獨立確認的相同 byte
count，而且第 2–10 次的 MIME 與 count 必須和第 1 次完全一致。腳本只可輸出
一筆 frozen、sanitized aggregate，不得輸出 10 筆逐次紀錄。

本文件只準備後續、另行治理的使用者輔助裝置執行。此 preparation task
不得操作手機、不得使用 Android picker、不得建立 device evidence，也不得
宣稱 D16 PASS。

## 已審閱設定

- Case ID：`D16_REPEATED_READS`
- Fixture ID：`JPEG_REPEAT_VALID`
- Fixture MIME：`image/jpeg`
- 獨立確認大小：`6406` bytes
- 要求讀取次數：`10`
- `maxSizeBytes`：`6406`
- `readerSafetyLimitBytes`：`12582912`
- Grant：一次系統選圖器選取所取得的 fresh temporary grant
- Reselection：禁止

Fixture 是非個人、非敏感的 synthetic JPEG。其大小已在 launcher 與
production reader 之外，以唯讀工具重新量測。Repository 只保留 opaque
fixture ID、MIME 與獨立確認的正整數 count；fixture 的私人對應、來源名稱、
位置、URI、bytes、Base64 與圖片內容均留在 Git 之外。

## 後續執行前

只有在 D16 preparation PR 完成獨立審閱、合併到 `main`，並另行建立明確的
device-execution task 後，才可進行下列操作：

1. 使用 Vivo X Fold5、核准的 Android 版本，以及 AutoJs6 v6.7.0
   `arm64-v8a`。
2. 在 Mac 同步乾淨的 repository `main`，記錄執行當下的精確 SHA，並確認
   working tree 為 clean。
3. 執行 `npm run build:autojs6:d16:check`。
4. 執行 `npm run scan:autojs6:d16`。
5. 執行 `npm run check`。
6. 將私下對應 `JPEG_REPEAT_VALID` 的已確認 fixture 放到手機上可由 Android
   系統選圖器選取的位置。
7. 不得重新儲存、裁切、轉碼、改寫或替換 fixture，否則獨立 byte count
   失效。
8. 將
   `scripts/autojs6/d16-repeated-reads-device-check.js`
   匯入 AutoJs6；不得在手機上修改 generated bundle。
9. 執行前再次確認本次操作屬於另行核准的 device-execution task，而不是
   preparation task。

## 後續裝置執行

1. 開啟並執行 generated D16 腳本。
2. 確認顯示的 case 為 `D16_REPEATED_READS`。
3. 在該次開啟的 Android 系統選圖器中，只選取一次私下對應
   `JPEG_REPEAT_VALID` 的 fixture。
4. 不得取消後重選，不得在 iteration 之間重新開啟 picker，不得要求
   persistable access，也不得新增 broad storage permission。
5. 腳本必須在同一 fresh temporary grant 下，自動執行恰好 10 次完整
   production reader/core 路徑。
6. 不得手動觸發額外讀取，不得在執行期間改動、搬移或重新儲存來源。
7. 等待整個 loop-level responsiveness assessment 完成。
8. 只接受一行 aggregate JSON；不得出現 10 行逐次結果。
9. 確認操作期間 UI 仍可回應。
10. 在分享或保存 evidence 前，先人工檢查輸出沒有敏感或禁止內容。

## 成功結果

只有以下欄位和值全部精確成立時，後續 evidence 才可記錄 D16 PASS：

{
"testCaseId": "D16_REPEATED_READS",
"status": "PASS",
"requestedIterations": 10,
"attemptedIterations": 10,
"successfulIterations": 10,
"mimeType": "image/jpeg",
"sizeBytes": 6406,
"allMetadataEqual": true,
"uiResponsive": true
}

成功代表同一 fresh temporary grant 下的 10 次完整讀取都符合已審閱的 MIME、
count 與 equality contract。它只證明該次 scoped D16 repeated-read execution，
不證明 D17 multi-image、D18/D19 cleanup instrumentation、D20 memory、D21
一般 UI-blocking、provider、queue、Contributor app 或完整 production
workflow。

## 失敗結果

失敗 aggregate 只可使用以下 shape：

{
"testCaseId": "D16_REPEATED_READS",
"status": "FAIL",
"requestedIterations": 10,
"attemptedIterations": "<1-10>",
"successfulIterations": "<0-10>",
"allMetadataEqual": "<true-or-false>",
"uiResponsive": "<true-or-false>",
"failureReason": "<PUBLIC_ERROR | METADATA_MISMATCH | UI_NOT_RESPONSIVE>",
"errorCode": "<只有 failureReason 為 PUBLIC_ERROR 時才可存在>"
}

Failure precedence 必須依下列順序判定：

1. `uiResponsive === false`：
   `failureReason: "UI_NOT_RESPONSIVE"`，不得包含 `errorCode`。
2. UI 可回應且存在 stable public error：
   `failureReason: "PUBLIC_ERROR"`，保留原 stable public `errorCode`。
3. UI 可回應且 MIME、count 或跨 iteration equality 不符：
   `failureReason: "METADATA_MISMATCH"`，不得包含 `errorCode`。

`PUBLIC_ERROR`、`METADATA_MISMATCH` 與 `UI_NOT_RESPONSIVE` 都只是 D16
evidence-only failure reason，不是新的 production error code 或 reader
classification。

腳本必須 fail fast：產生 public error 或 metadata mismatch 的 iteration 要計入
`attemptedIterations`，但不得計入 `successfulIterations`；後續尚未開始的
iterations 不得計入 attempted。Fail-fast 後仍須安全完成一次 loop-level
responsiveness assessment，再輸出唯一 aggregate。

## 立即停止條件

遇到以下任何情況，立即停止並只記錄 sanitized observation，不得自行變更
腳本或測試條件：

- preparation PR 尚未合併或沒有另行核准的 device-execution task；
- repository SHA、clean-tree 狀態、fixture provenance 或獨立 count 不明；
- generated bundle freshness、legacy syntax scan 或完整 checks 未通過；
- Android 系統選圖器未開啟或不是一次 fresh selection；
- 使用者取消後需要重新選取；
- 腳本要求 persistable access、broad storage permission 或來源複製；
- AutoJs6 無法載入腳本或出現未審閱的 syntax/runtime 行為；
- 輸出超過一筆 aggregate，或出現逐 iteration records；
- counters 超出核准範圍或 shape 不符合正式 contract；
- UI responsiveness 無法證明；
- URI、path、filename、bytes、Base64、圖片內容、exception detail、message、
  stack、cause、credential 或其他 uncontrolled value 出現在輸出或 log；
- 必須修改 production reader、portable core、permission 或 application
  architecture 才能繼續。

不得在手機上臨時修改 bundle、硬編碼 URI、複製來源到 workaround path、
增加權限、重選圖片、弱化檢查或把任何失敗改寫成 PASS。

## 後續可保留的 evidence

只可保留：

- 執行用 repository SHA 與 clean-tree 確認；
- 裝置、Android、AutoJs6 版本與 ABI；
- case ID `D16_REPEATED_READS`；
- fixture ID `JPEG_REPEAT_VALID`；
- fixture MIME `image/jpeg`；
- 獨立 count `6406`；
- `requestedIterations: 10`；
- 一行 sanitized aggregate JSON；
- 不含敏感內容的 scoped result 與簡短備註。

不得保留或分享 URI、query string、來源位置、來源名稱、圖片 bytes、Base64、
圖片內容、exception detail、stack、cause、credential、personal metadata、
逐 iteration records 或私人 fixture mapping。
