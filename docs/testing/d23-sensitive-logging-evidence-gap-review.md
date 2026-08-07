# D23 No sensitive logging — evidence-gap review

## Purpose

D23 proves that after successful and failed image-read cases, no sensitive data is written to console logs. While D22 verifies that the sanitized output record contains no Base64, bytes, or URIs, D23 extends this to all console output (info, warn, error) produced during execution. The wrapper captures console output during both success and failure paths and inspects it for prohibited patterns.

## Contract

- **Case ID:** `D23_SENSITIVE_LOGGING`
- **Fixture (success):** `JPEG_REPEAT_VALID` (same 6,406-byte synthetic JPEG used by D13-D22)
- **Picker MIME (success):** `image/jpeg`
- **Expected MIME (success):** `image/jpeg`
- **Expected size (success):** 6,406 bytes
- **maxSizeBytes (success):** 6,406
- **readerSafetyLimitBytes (success):** 12,582,912
- **Grant (success):** one fresh temporary system-picker selection, no reselection
- **Verification mode:** `sensitive-logging`

### Success path verification

The wrapper runs a single complete production-path read of `JPEG_REPEAT_VALID` while capturing all console output. The captured logs must NOT contain:

- File paths (`/sdcard/...`, `/storage/emulated/0/...`)
- Content URIs (`content://...`)
- Base64 strings (`[A-Za-z0-9+/]{20,}={0,2}`)
- Byte array representations (`[ 255, 216, ...]`)
- Exception stack traces (`at ...`, `JavaException:`, `Error:`)
- `sourceUri` or `imageBase64` field names
- Raw image data or hex-encoded content

### Failure path verification

After the success case completes, the wrapper triggers a controlled failure (using an invalid URI) while capturing all console output. The failure logs must NOT contain any of the prohibited patterns listed above.

### Success shape

```json
{
  "testCaseId": "D23_SENSITIVE_LOGGING",
  "status": "PASS",
  "mimeType": "image/jpeg",
  "sizeBytes": 6406,
  "uiResponsive": true,
  "successLogsClean": true,
  "failureLogsClean": true
}
```

### Failure shapes

- **PUBLIC_ERROR**: either case fails with a public error code
- **SENSITIVE_LOG_VIOLATION**: logs contain prohibited sensitive data
- **UI_NOT_RESPONSIVE**: UI becomes unresponsive during execution

## Scope limitations

- D23 inspects console output captured during script execution; it does not prove absence of sensitive data in Android system logs (logcat), filesystem logs, or remote logging services
- D23 uses pattern-matching on captured log strings; it does not prove absence through binary inspection
- D23 covers the wrapper and launcher code paths; it does not prove that future provider adapters or Contributor app integrations maintain the same guarantees
- This is preparation and offline evidence only until device execution
