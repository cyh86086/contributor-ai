# Next action

Last reviewed: 2026-08-07
Execution baseline: resolve the live `main` SHA during mandatory preflight.

## Active task

**D25-DEVICE-VALIDATION.** D25 preparation complete. The next step is
user-assisted device execution on Vivo X Fold5 / AutoJs6 v6.7.0 `arm64-v8a`
following the procedure in the D25 user guide.

The evidence-gap review is in
[`testing/d25-unsupported-mime-type-evidence-gap-review.md`](testing/d25-unsupported-mime-type-evidence-gap-review.md).

Note: D25 requires selecting a non-image file (e.g., `.txt`) from the Android
system picker. If the picker rejects non-image files, D25 becomes a
controlled-fake offline contract only (similar to D12, D24).
