# D21 UI responsiveness and blocking — evidence-gap review

## Purpose

D21 proves that the production reader does not block the UI thread during
repeated reads. D16 proved 10 repeated full reads succeed with equal metadata
and loop-level `uiResponsive: true`; D20 added coarse memory monitoring. D21
extends D16 by requiring active UI interaction during the repeated reads to
verify no UI blocking occurs.

## Contract

- **Case ID:** `D21_UI_RESPONSIVENESS`
- **Fixture:** `JPEG_REPEAT_VALID` (same 6,406-byte synthetic JPEG used by
  D13-D20)
- **Picker MIME:** `image/jpeg`
- **Expected MIME:** `image/jpeg`
- **Expected size:** 6,406 bytes
- **maxSizeBytes:** 6,406
- **readerSafetyLimitBytes:** 12,582,912
- **Iterations:** 10 complete production-path reads
- **UI interaction interval:** 200ms between iterations
- **Grant:** one fresh temporary system-picker selection, no reselection
- **Verification mode:** `ui-responsiveness`

### UI interaction mechanism

During the 10-iteration loop, the wrapper posts a heartbeat to the UI thread
every 200ms. The heartbeat sets a flag that is checked after all iterations
complete. If any heartbeat fails to execute within the timeout, the test
reports `UI_NOT_RESPONSIVE`.

### Success shape

```json
{
  "testCaseId": "D21_UI_RESPONSIVENESS",
  "status": "PASS",
  "mimeType": "image/jpeg",
  "sizeBytes": 6406,
  "requestedIterations": 10,
  "attemptedIterations": 10,
  "successfulIterations": 10,
  "allMetadataEqual": true,
  "uiResponsive": true,
  "heartbeatCount": 10
}
```

### Failure shapes

- **PUBLIC_ERROR**: any iteration fails with a public error code
- **METADATA_MISMATCH**: iterations return unequal metadata
- **UI_NOT_RESPONSIVE**: heartbeat fails to execute within timeout

## Scope limitations

- D21 uses a heartbeat mechanism to verify UI thread availability; it does not
  prove touch event handling, animation smoothness, or input latency
- D21 does not prove D22/D23 persistence or logging guarantees
- This is preparation and offline evidence only until device execution
