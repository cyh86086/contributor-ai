# Next action

Last reviewed: 2026-08-07
Execution baseline: resolve the live `main` SHA during mandatory preflight.

## Active task

**D24-DEVICE-VALIDATION.** D24 preparation complete. The next step is
user-assisted device execution on Vivo X Fold5 / AutoJs6 v6.7.0 `arm64-v8a`
following the procedure in the D24 user guide (to be created).
The evidence-gap review is in
[`testing/d24-empty-image-evidence-gap-review.md`](testing/d24-empty-image-evidence-gap-review.md).

Note: D24 requires selecting a 0-byte file from the Android system picker.
If the picker rejects empty files, D24 becomes a controlled-fake offline
contract only (similar to D12).
