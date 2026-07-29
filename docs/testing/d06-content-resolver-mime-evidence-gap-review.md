# D06 ContentResolver MIME evidence-gap review

## Status

Reviewed against live `main` during the 2026-07-29 repository preflight.

Conclusion: the existing D01-D05 device records could not independently
satisfy D06. The minimal evidence-only D06 launcher was implemented and the
required Vivo X Fold5 execution subsequently passed. See the
[D06 device-validation record](device-validation/d06-vivo-x-fold5-autojs6-v6.7.0.md).

## Repository trace

The production reader obtains the content MIME directly through
`ContentResolver.getType()` in `src/autojs6/android-image-reader.js` and returns
that value with the bytes.

The D01-D05 verification path then calls `prepareImageInput()` through
`scripts/autojs6/image-reader-device-check.js`. The portable core normalizes a
supported reader MIME but falls back to byte-signature detection when the MIME
is absent, generic, or unsupported.

Therefore, a final D01-D05 PASS record proves the resulting supported MIME but
does not prove whether it came from `ContentResolver` or the signature fallback.

## Minimum change

D06 uses the existing production reader directly through
`scripts/autojs6/resolver-mime-device-check.js`.

The D06 harness:

- does not create a second Android image reader;
- does not call `prepareImageInput()`;
- does not invoke byte-signature MIME detection;
- requires a normalized `image/jpeg` returned by the production reader;
- verifies exact positive bytes and the configured size boundary;
- emits metadata only;
- never emits URI, path, filename, bytes, Base64, image content, exception
  detail, stack, credentials, or unrelated metadata.

## Evidence boundary

Offline tests prove the harness contract, deterministic build, generated bundle
freshness, and legacy syntax compatibility. They do not establish Android or
AutoJs6 behavior.

D06 remains pending until a scoped device record identifies:

- exact authoritative repository SHA;
- Vivo X Fold5;
- Android version;
- AutoJs6 version and ABI;
- opaque fixture ID and expected byte count;
- one sanitized D06 output record;
- UI responsiveness;
- result and sanitized notes.
