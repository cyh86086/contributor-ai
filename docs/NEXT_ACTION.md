# Next action

Last reviewed: 2026-08-07
Execution baseline: resolve the live `main` SHA during mandatory preflight.

## Active task

**D25-PREPARATION.** D24 device validation complete with platform observation
(`URI_ACCESS_DENIED` for empty sources on Vivo X Fold5 / Android 16). The next
step is D25 (Unsupported non-image source → `UNSUPPORTED_MIME_TYPE`) preparation.

D25 verifies that when the production reader encounters a non-image source
(e.g., a text file), the portable core returns the stable public error code
`UNSUPPORTED_MIME_TYPE` with a frozen, sanitized failure record.
