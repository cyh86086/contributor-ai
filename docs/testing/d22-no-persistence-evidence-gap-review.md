# D22 No image or Base64 persistence — evidence-gap review

## Purpose

D22 proves that after successful and failed image-read cases, no image bytes or Base64 data is persisted in output, logs, or any approved storage location. Existing launchers (D01-D21) already sanitize output by removing `sourceUri` and `imageBase64` from the reported record. D22 adds explicit verification that the sanitized output contains no raw bytes, no Base64 strings, and no encoded image content.

## Contract

- **Case ID:** `D22_NO_PERSISTENCE`
- **Fixture (success):** `JPEG_REPEAT_VALID` (same 6,406-byte synthetic JPEG used by D13-D21)
- **Picker MIME (success):** `image/jpeg`
- **Expected MIME (success):** `image/jpeg`
- **Expected size (success):** 6,406 bytes
- **maxSizeBytes (success):** 6,406
- **readerSafetyLimitBytes (success):** 12,582,912
- **Grant (success):** one fresh temporary system-picker selection, no reselection
- **Verification mode:** `no-persistence`

### Success path verification

The wrapper runs a single complete production-path read of `JPEG_REPEAT_VALID`, then inspects the sanitized output record. The output must contain only:

- `testCaseId`
- `status`
- `mimeType`
- `sizeBytes`
- `uiResponsive`

The output must NOT contain:

- `sourceUri` (redacted)
- `imageBase64` (redacted)
- Any Base64 string pattern (`[A-Za-z0-9+/]{20,}={0,2}`)
- Any raw byte array representation
- Any hex-encoded image content

### Failure path verification

After the success case completes, the wrapper triggers a controlled failure (using an invalid URI or permission-denied condition) and inspects the failure output. The failure output must contain only:

- `testCaseId`
- `status: "FAIL"`
- `errorCode`
- `uiResponsive`

The failure output must NOT contain any image bytes, Base64 strings, or source URIs.

### Success shape

```json
{
  "testCaseId": "D22_NO_PERSISTENCE",
  "status": "PASS",
  "mimeType": "image/jpeg",
  "sizeBytes": 6406,
  "uiResponsive": true,
  "successOutputClean": true,
  "failureOutputClean": true
}
```

### Failure shapes

- **PUBLIC_ERROR**: either case fails with a public error code
- **PERSISTENCE_VIOLATION**: output contains Base64, bytes, or URIs
- **UI_NOT_RESPONSIVE**: UI becomes unresponsive during execution

## Scope limitations

- D22 inspects console/log output only; it does not prove filesystem-level persistence, database writes, network transmission, or clipboard contents
- D22 uses pattern-matching on output strings; it does not prove absence through binary inspection of all storage locations
- D22 does not prove D23 sensitive-logging guarantees beyond Base64/bytes/URIs
- This is preparation and offline evidence only until device execution
