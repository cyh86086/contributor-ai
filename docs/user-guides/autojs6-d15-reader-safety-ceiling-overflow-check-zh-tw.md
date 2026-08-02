# AutoJs6 D15 reader safety ceiling 超限裝置驗證

## 目的

D15 要確認受控來源的完整大小大於刻意降低的
`readerSafetyLimitBytes` 時，既有 production reader 會在回傳任何 byte
array 前輸出穩定的 `IMAGE_READ_FAILED`，shared reporter 只保留 sanitized
failure metadata。

本程序不新增 production reader、portable core、picker、permission 或應用程式
行為，也不代表 D15 已有 Android 或裝置結果。

## 已審閱設定

- Case ID：`D15_READER_SAFETY_CEILING_OVERFLOW`
- Fixture ID：`OVER_READER_CEILING`
- Fixture MIME：`image/jpeg`
- 獨立確認大小：`6406` bytes
- `readerSafetyLimitBytes`：`6405`
- `maxSizeBytes`：`6406`
- 預期 public result：`IMAGE_READ_FAILED`

大小是在 launcher 與 production reader 之外，以唯讀 local byte-count 工具
重新量測，不引用 D13 或 D14 的計數或裝置結果。Repository 只保留 opaque
fixture ID 與數值；fixture 的私人對應、來源名稱、位置與內容均留在 Git
之外。

## 執行前

1. 等待 D15 preparation PR 完成獨立審閱並合併。
2. 使用 Vivo X Fold5、Android 16 與 AutoJs6 v6.7.0 `arm64-v8a`。
3. 在 Mac 同步乾淨的 repository `main`，記錄執行當下的精確 SHA。
4. 執行：

   ```bash
   npm run build:autojs6:d15:check
   npm run scan:autojs6:d15
   ```

5. 將私下對應 `OVER_READER_CEILING` 的已確認 fixture 放到手機上可由
   Android 系統選圖器選取的位置。不要改寫、重新儲存、裁切或轉碼，否則
   獨立 count 會失效。
6. 將
   `scripts/autojs6/d15-reader-safety-ceiling-overflow-device-check.js`
   匯入 AutoJs6；不要在手機上修改內容。

## 執行

1. 開啟並執行 generated D15 腳本。
2. 確認標題為 `D15 reader safety ceiling 超限裝置驗證`。
3. 在該次開啟的 Android 系統選圖器中選取私下對應
   `OVER_READER_CEILING` 的 fixture，取得 fresh temporary grant。
4. 讓腳本在 off-UI-thread worker 中完成，不要保存或重用來源參照。
5. 等待一行 JSON，並確認 UI 仍可回應。
6. 不得回傳來源 URI、位置、名稱、bytes、Base64、圖片內容、錯誤細節、
   stack、credential 或其他 metadata。

## 唯一接受結果

```json
{
  "testCaseId": "D15_READER_SAFETY_CEILING_OVERFLOW",
  "status": "FAIL",
  "errorCode": "IMAGE_READ_FAILED",
  "uiResponsive": true
}
```

`status: "FAIL"` 是 production path 的預期 public result，不得改寫成
`status: "PASS"`。只有在完整來源已獨立確認為 6,406 bytes、reader ceiling
保持 6,405 bytes、portable limit 保持 6,406 bytes，且回傳值精確符合上方
shape 時，後續 evidence 才可記錄「預期 D15 結果已觀察到」。

`IMAGE_READ_FAILED` 是多個 non-permission read failure 共用的 stable public
code，不是唯一內部原因 telemetry。任何 scoped evidence 都必須同時保留本程序
的靜態 ordering、fixture provenance、乾淨 execution SHA 與 fresh picker grant
限制，不得宣稱 public code 單獨證明內部 reader-ceiling 分支。

任何 accidental success、其他 error code、取消選圖、permission failure、
設定不符或 UI 無回應都必須原樣記錄，不得改寫為 D15 預期結果。

## 回傳資料

只回傳：

- 執行用 repository SHA；
- 裝置、Android、AutoJs6 版本與 ABI；
- fixture ID `OVER_READER_CEILING`；
- 獨立 count `6406`；
- `readerSafetyLimitBytes: 6405`；
- `maxSizeBytes: 6406`；
- 一行 sanitized JSON；
- 是否觀察到預期結果，以及不含敏感內容的簡短備註。

D15 結果不得挪用為 D13 equality、D14 portable overflow、一般 read failure、
D11 missing-source 或 D12 fake null-stream 證據。
