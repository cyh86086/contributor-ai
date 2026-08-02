# D11 missing-source evidence-gap review

## Review result

**BLOCKED_UNPROVEN_CLASSIFICATION** for the reviewed Vivo X Fold5 / Android 16 /
AutoJs6 v6.7.0 scope.

The formal D11 result remains `IMAGE_READ_FAILED`, but the current production
sequence cannot reliably distinguish a missing selected source from an
inaccessible selected source before `read()` begins. No D11 launcher was
created, no device result is claimed, and no production behavior was changed.

## Authoritative scope

- **Preflight live `main` SHA:**
  `e6aff7418132446197266a18a7ee070f732507d0`
- **Formal case:** the source is selected through the Android system picker,
  then deleted while authorization history remains
- **Formal expected public code:** `IMAGE_READ_FAILED`
- **Reviewed runtime:** Vivo X Fold5, Android 16, AutoJs6 v6.7.0,
  `arm64-v8a`

This was a repository evidence review, not a device execution.

## Controlled-fixture and deletion review

A privacy-safe candidate can be created: use a newly generated, non-sensitive
fixture in a user-controlled local media collection, select it through the
Android system picker, and delete the exact selected media item through the
owning gallery or another user-confirmed owner path. The private-cache
exploration is not an acceptable source, and a cloud-backed or otherwise
provider-managed item would add uncontrolled lifecycle behavior.

The repository does not yet establish that this candidate is a reproducible
formal D11 procedure. In particular, it has no reviewed way to prove all of the
following at once:

1. the picker-selected provider object is the exact object that was deleted;
2. permanent deletion completed before the production access probe;
3. authorization history remained independently observable after deletion;
4. the provider did not retain, cache, transform, or remotely serve the selected
   content; and
5. the failure represented missing content rather than access denial.

Only the opaque case ID, completion booleans, stable public result, and UI
responsiveness could be retained in future evidence. No source identifier,
storage location, fixture label, media content, payload, runtime diagnostic, or
credential may be recorded.

Android's official photo-picker documentation establishes selected-item access
but also permits cloud media providers. The official `ContentResolver`
contract says `openInputStream()` can throw `FileNotFoundException` when a
source cannot be opened and can return `null` after a provider crash. The
official MediaStore deletion API can complete a user-confirmed deletion before
returning its result, but the repository has no approved mapping from the
picker result to such an owned deletion operation. These contracts permit a
safe experiment; they do not guarantee a provider-independent D11 outcome.

References:

- [Android photo picker](https://developer.android.com/training/data-storage/shared/photo-picker)
- [`ContentResolver.openInputStream()`](<https://developer.android.com/reference/android/content/ContentResolver#openInputStream(android.net.Uri)>)
- [`MediaStore.createDeleteRequest()`](<https://developer.android.com/reference/android/provider/MediaStore#createDeleteRequest(android.content.ContentResolver,java.util.Collection%3Candroid.net.Uri%3E)>)

## Production sequence and classification boundary

The current repository establishes this order:

1. `prepareImageInput()` awaits `reader.canAccess()`.
2. The production `canAccess()` opens a probe stream. A `null` result or any
   thrown failure becomes `false`; the original failure class is not retained.
3. The portable core maps every non-`true` access result to
   `URI_ACCESS_DENIED` and does not call `read()`.
4. Only after a successful access probe does the core call `reader.read()`,
   which opens a second stream and classifies its failure.

Consequently, the formal delete-before-run sequence does not provide a stable
route to the required D11 result:

| Observed runtime condition                                                                                      | Production stage                  | Stable public result under current code                                     |
| --------------------------------------------------------------------------------------------------------------- | --------------------------------- | --------------------------------------------------------------------------- |
| `FileNotFoundException`, `null` stream, ordinary open failure, `SecurityException`, or permission-check failure | `canAccess()`                     | `URI_ACCESS_DENIED` because every access-probe failure collapses to `false` |
| `FileNotFoundException` classified as a non-permission failure                                                  | `read()` after a successful probe | `IMAGE_READ_FAILED`                                                         |
| `null` stream or ordinary I/O failure                                                                           | `read()` after a successful probe | `IMAGE_READ_FAILED`                                                         |
| `SecurityException` or another classified permission failure                                                    | `read()` after a successful probe | `URI_ACCESS_DENIED`                                                         |
| Provider retains or serves the selected content after source deletion                                           | Either stream open                | May remain readable; provider-specific behavior                             |

The reader therefore maps missing-source behavior to `IMAGE_READ_FAILED` only
when `canAccess()` first succeeds and the later `read()` failure is classified
as non-permission. Formal D11 does not provide a governed hook or platform
guarantee that creates that sequence. Injecting it would be fake evidence, and
deleting between the two opens would change the case into a D10-style timing
case.

## D11 and D12 boundary

D11 requires real system-picker selection, real deletion of the selected
source, retained authorization history, and real provider behavior. D12 is a
controlled fake-only case in which an injected resolver returns `null` and the
expected contract result is `IMAGE_READ_FAILED`.

A D12 null-stream injection cannot demonstrate that a real deleted source
returns `null`, cannot establish the deletion or authorization state, and must
not be promoted to D11 device evidence.

## Existing offline evidence

| Repository evidence                                                                     | What it proves                                                                                                                                                                                    | What it does not prove                                                                               |
| --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `tests/autojs6-android-image-reader.test.js`                                            | A fake null stream and injected ordinary I/O or `FileNotFoundException` during `read()` map to `IMAGE_READ_FAILED`; injected `SecurityException` maps to `URI_ACCESS_DENIED`.                     | A real selected source was deleted, which production stage fails first, or Vivo/provider behavior.   |
| `tests/image-input-core.test.js`                                                        | Access failure maps to `URI_ACCESS_DENIED`; ordinary or classified non-permission read failure maps to `IMAGE_READ_FAILED`; classified access denial during `read()` remains `URI_ACCESS_DENIED`. | Android exception type, provider lifecycle, deletion, or authorization history.                      |
| `tests/autojs6-d06-resolver-mime.test.js` and `tests/autojs6-d07-mime-fallback.test.js` | Sanitized wrappers preserve injected access-denial and ordinary read-failure classifications.                                                                                                     | Missing-source semantics or a real delete-after-selection procedure.                                 |
| `tests/autojs6-d08-permission-granted.test.js`                                          | A fake success path opens two streams; a fake first-open `null` fails closed as `URI_ACCESS_DENIED`.                                                                                              | That a deleted system-picker source remains accessible for the probe and fails only during the read. |

The tests are valid offline contract evidence. Fake deletion, an injected
exception, an injected null stream, and the private-cache exploration are not
formal D11 device evidence.

## Governed outcome

- Close `D11-EVIDENCE-GAP-REVIEW` as
  `BLOCKED_UNPROVEN_CLASSIFICATION`.
- Do not implement a D11 launcher, add a deletion hook, or claim D11 PASS,
  `IMAGE_READ_FAILED`, or any other device result.
- Do not add broad storage permission, persistable grants, a permission manager,
  source-copy architecture, or production-reader behavior.
- Move the single active task to `D12-EVIDENCE-GAP-REVIEW`, the next formal
  verification-matrix row.

No Vivo X Fold5 device probe is requested under the next active task. A future
review may reopen D11 only after it defines how to prove source deletion and
authorization history separately and how the current production boundary can
produce an unambiguous stable classification without fake timing.
