# D07 absent-MIME signature-fallback evidence-gap review

## Status

Reviewed against authoritative `main` SHA
`93d74cd276e6cac6ed34bdef6d51de0fa6cef014`.

**Conclusion:** existing repository tests establish the portable fallback
contract, but they do not independently satisfy D07 device evidence. D07 needs
a minimal controlled AutoJs6 evidence harness before any device PASS can be
claimed.

## Repository trace

1. `src/autojs6/android-image-reader.js` is the production Android reader. It
   obtains the raw MIME through Android `ContentResolver.getType()` and returns
   that value with the exact bytes.
2. `src/core/image-input.js` normalizes a supported reported MIME; when the
   reported MIME is absent, generic, or unsupported, it calls the existing
   `detectImageMimeType(bytes)` signature detector.
3. `tests/image-input-core.test.js` already proves the runtime-neutral
   absent-MIME fallback contract.
4. `tests/autojs6-android-image-reader.test.js` proves integration with a fake
   Android resolver whose `getType()` returns no MIME.
5. D06 deliberately bypasses `prepareImageInput()` so signature fallback cannot
   satisfy D06. Its device PASS therefore proves the direct resolver-MIME path,
   not D07.

## Evidence gap

The existing D07-relevant tests execute under Node.js with fake resolver
objects. They prove deterministic logic and adapter contracts, but they are not
Android / AutoJs6 device evidence.

The D01-D05 records retain only the final supported MIME after
`prepareImageInput()`, so they cannot distinguish resolver MIME from signature
fallback. D06 requires a present resolver MIME and therefore cannot prove the
absent-MIME branch.

Consequently, no current device record establishes all of the following in one
scoped execution:

- real Vivo X Fold5 / AutoJs6 byte reading through the production reader;
- a deterministic controlled absent MIME at the portable-core boundary;
- fallback to the existing JPEG signature detector;
- exact fixture byte count;
- responsive UI;
- metadata-only sanitized output.

## Minimum non-duplicative harness

The smallest acceptable D07 harness should:

1. create the existing production AutoJs6 Android reader;
2. preserve its `canAccess()` behavior and exact byte read;
3. wrap only the returned read result so `mimeType` is explicitly absent while
   the original bytes remain unchanged;
4. pass that wrapped reader into the existing `prepareImageInput()` portable
   core;
5. require the final MIME to be `image/jpeg`, the exact positive fixture byte
   count, and responsive UI;
6. emit only the existing sanitized metadata contract.

This is an evidence-only injection point. It must not add a production switch,
a second reader, a second signature detector, or a second MIME mapping table.

## Evidence boundary

Offline tests for the future harness may prove controlled MIME removal,
unchanged bytes, deterministic bundle generation, privacy, and legacy syntax.
They must not be represented as Android proof.

The reviewed minimal harness was implemented as an evidence-only wrapper
around the existing production reader and portable core. The generated launcher
subsequently passed on the recorded Vivo X Fold5 / AutoJs6 runtime with scoped
evidence bound to an exact authoritative SHA. See the
[D07 device-validation record](device-validation/d07-vivo-x-fold5-autojs6-v6.7.0.md).
