# Next action

Last reviewed: 2026-08-07
Execution baseline: resolve the live `main` SHA during mandatory preflight.

## Active task

**D26-PREPARATION.** D25 device validation complete with platform observation
(`IMAGE_READ_FAILED` for non-image sources on Vivo X Fold5 / Android 16). The
next step is D26 (Controlled encoding failure → `ENCODING_FAILED`) preparation.

D26 verifies that when a controlled encoding failure is injected after a valid
read, the portable core returns the stable public error code `ENCODING_FAILED`
with a frozen, sanitized failure record.
