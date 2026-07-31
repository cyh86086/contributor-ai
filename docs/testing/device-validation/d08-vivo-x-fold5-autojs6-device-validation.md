# D08 Vivo X Fold5 / AutoJs6 device validation

## Result

**PASS** for the exact scoped D08 execution described below.

## Evidence scope

- **Case:** `D08_PERMISSION_GRANTED`
- **Authoritative repository SHA:**
  `8ce3b6d95d8b1e36c88ff5304201f40080ddd2ba`
- **Repository state:** D08 launcher source was authoritative at the SHA above.
- **Device:** Vivo X Fold5
- **Android version:** not supplied
- **Runtime:** AutoJs6 version and ABI not supplied in the sanitized D08 result
- **Fixture ID:** not supplied
- **Expected size:** 656,352 bytes, reported by the existing production reader
  during the same fresh-picker run
- **Execution date:** not supplied
- **Observed result time:** not supplied
- **Observed script duration:** approximately 15.101 seconds

## Sanitized output

```json
{
  "testCaseId": "D08_PERMISSION_GRANTED",
  "status": "PASS",
  "mimeType": "image/jpeg",
  "sizeBytes": 656352,
  "uiResponsive": true
}
```

The exact positive `sizeBytes` value was returned by the existing production
reader during the same fresh system-picker run. The Android information UI
showed only a rounded display size and was not treated as an independent
exact-byte source.

## What this proves

The generated D08 launcher executed successfully on the supplied Vivo X Fold5
result. The JPEG was freshly selected through the Android system picker and was
read immediately while the temporary picker grant remained active. The existing
production reader returned sanitized success metadata with a final JPEG MIME,
an exact positive byte count, and a responsive UI result.

This is scoped evidence that the active temporary picker grant was usable for
that single recorded D08 execution. It does not establish persistable
permission, broad storage access, repeated access after the temporary grant
expires, or any additional reader or permission-management behavior.

## Privacy review

The reviewed output contained only the case ID, PASS status, final MIME, byte
count, and UI responsiveness. No URI, query string, file path, filename, image
bytes, Base64, image content, exception detail, stack trace, credential, or
unrelated metadata was recorded.

## Scope limits

This is one scoped execution on one Vivo X Fold5, one supplied runtime result,
one repository SHA, and one non-sensitive JPEG fixture. Android version,
AutoJs6 version, ABI, fixture ID, execution date, and local result time were not
supplied and are not reconstructed. This PASS does not establish D09-D26, full
device compatibility, production workflow completion, provider behavior, queue
behavior, Contributor app automation, or complete Android Image Input Adapter
V1.0 migration.
