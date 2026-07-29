# D08 active-permission evidence-gap review

## Status

Reviewed against authoritative `main` SHA
`f49c88bf9d20762aa8c1fd32896138883952e5be`.

**Authoritative requirement:** D08 is `Permission granted`. The execution must
run a freshly selected URI while its grant is active, and the expected result
is success metadata.

**Conclusion:** D01-D07 contain successful picker-driven device executions, but
their committed claims are deliberately scoped to format, resolver-MIME, or
signature-fallback cases. They do not contain a D08 case ID or an explicit
D08-scoped record that the selected URI was freshly granted and immediately
read. They must not be silently expanded into a D08 PASS.

D08 therefore needs one distinct device execution. It does **not** need a new
reader, permission implementation, or evidence helper.

## Existing implementation boundary

The existing shared AutoJs6 format-check runtime already supplies the complete
D08 behavior:

1. Android's system picker returns one newly selected `content://` URI.
2. The runtime immediately passes that in-memory URI to
   `runImageReaderDeviceCheck()`.
3. The harness creates the existing production
   `createAutoJs6AndroidImageReader()`.
4. `canAccess()` probes the URI while the temporary grant is active.
5. `prepareImageInput()` performs the production read and portable validation.
6. The shared launcher emits only sanitized success or stable failure metadata.

D01 already exercises this normal path. D06 and D07 intentionally alter the
MIME-evidence boundary and are not the preferred D08 launcher basis.

## Evidence gap

A successful prior read implies that a usable grant existed during that
execution, but the repository's evidence discipline requires claims to remain
within their recorded case scope. The current records do not independently
identify:

- test case `D08_PERMISSION_GRANTED`;
- a fresh selection made specifically for D08;
- immediate execution while that new grant remains active;
- D08-scoped sanitized success metadata tied to an exact authoritative SHA.

For that reason, existing D01-D07 records remain valid but do not close D08.

## Minimum non-duplicative evidence path

The smallest acceptable preparation is a case-specific launcher alias using the
existing shared runtime:

- add manifest case `D08_PERMISSION_GRANTED`;
- use JPEG picker and expected MIME `image/jpeg`;
- use request code `6108`;
- use the existing normal format-check verification path without a new
  `verificationMode`;
- add only a source entry, deterministic generated bundle, manifest/build/syntax
  coverage, contract tests, and a Traditional Chinese execution guide;
- execute one freshly selected non-sensitive JPEG immediately after selection;
- require exact success metadata, exact fixture byte count, and responsive UI.

No production source, reader, permission API, MIME detector, MIME map, error
classification, or metadata reporter needs to change.

## Evidence boundary

Offline tests may prove that the D08 case delegates unchanged to the shared
runtime, has deterministic generated output, remains privacy-safe, and passes
legacy syntax checks. They are not Android permission evidence.

D08 remains pending until the case-specific launcher is reviewed, merged, and
executed on the recorded Vivo X Fold5 / AutoJs6 runtime with evidence bound to
an exact authoritative SHA.
