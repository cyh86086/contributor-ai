# D20 Memory behavior — evidence-gap review

## Purpose

D20 proves that the production reader does not exhibit unsafe sustained memory
growth during repeated reads. D16 proved 10 repeated full reads succeed with
equal metadata; D20 adds coarse memory monitoring before, during, and after
those reads, with a stabilization interval.

## Contract

- **Case ID:** `D20_MEMORY_BEHAVIOR`
- **Fixture:** `JPEG_REPEAT_VALID` (same 6,406-byte synthetic JPEG used by
  D13-D19)
- **Picker MIME:** `image/jpeg`
- **Expected MIME:** `image/jpeg`
- **Expected size:** 6,406 bytes
- **maxSizeBytes:** 6,406
- **readerSafetyLimitBytes:** 12,582,912
- **Iterations:** 10 complete production-path reads
- **Stabilization interval:** 500ms after all reads complete
- **Grant:** one fresh temporary system-picker selection, no reselection
- **Verification mode:** `memory-behavior`

### Memory measurement

Memory is measured using `Runtime.getRuntime()` coarse heap metrics:

- `memoryBefore`: used heap bytes before any reads
- `memoryAfterEach`: array of used heap bytes after each of the 10 reads
- `memoryAfterStabilization`: used heap bytes after 500ms stabilization
- `peakMemory`: maximum used heap bytes observed during the test
- `memoryGrowth`: `memoryAfterStabilization - memoryBefore`

### Success shape

```json
{
  "testCaseId": "D20_MEMORY_BEHAVIOR",
  "status": "PASS",
  "mimeType": "image/jpeg",
  "sizeBytes": 6406,
  "requestedIterations": 10,
  "attemptedIterations": 10,
  "successfulIterations": 10,
  "allMetadataEqual": true,
  "memoryBefore": 12345678,
  "memoryAfterEach": [12346000, 12346100, ...],
  "memoryAfterStabilization": 12346500,
  "peakMemory": 12347000,
  "memoryGrowth": 722,
  "uiResponsive": true
}
```

### Failure shapes

- **PUBLIC_ERROR**: any iteration fails with a public error code
- **METADATA_MISMATCH**: iterations return unequal metadata
- **UNSAFE_MEMORY_GROWTH**: `memoryGrowth` exceeds a threshold (e.g., 2x
  fixture size per iteration = 128,120 bytes for 10 iterations)

## Scope limitations

- D20 uses coarse heap metrics (`Runtime.getRuntime()`); it does not prove
  native memory, GC behavior, or memory profiling
- D20 does not prove D21 UI-blocking behavior during extended work
- D20 does not prove D22/D23 persistence or logging guarantees
- This is preparation and offline evidence only until device execution
