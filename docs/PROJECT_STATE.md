# Project state

Last updated: 2026-08-03

## Authority

`cyh86086/contributor-ai` is the single source of truth for Contributor AI.
Chat history, generated ZIP archives, local examples, and other uncommitted
artifacts are non-authoritative unless they are reviewed and committed to this
repository.

GitHub is the authoritative code history and release history. Codex performs
repository implementation, tests, commits, branch management, and pull request
work. Repository changes become authoritative only through Git history; Codex
conversation output by itself is not project state.

Every new development task must begin by reading this document,
[`DECISIONS.md`](DECISIONS.md), [`NEXT_ACTION.md`](NEXT_ACTION.md), and
[`PROJECT_GOVERNANCE.md`](PROJECT_GOVERNANCE.md). The mandatory preflight must
also verify the latest `main` SHA, open pull requests, existing implementation,
current blockers, and repository write access before any development begins.

## Product definition

Contributor AI is an Android AutoJs6 microstock automation application. It is
not a GitHub repository-contribution automation product.

The production flow is:

1. The user selects multiple photos from the Android gallery.
2. AutoJs6 reads Android `content://` image URIs.
3. Images are sent to an AI Vision provider.
4. The provider returns:
   - an English microstock description under 2,000 characters;
   - exactly seven English keywords.
5. AutoJs6 opens the Contributor Android app.
6. It fills the Description and Keywords fields.
7. The user reviews and manually confirms submission.

## Runtime architecture

- **Production runtime:** Android and AutoJs6.
- **Runtime-neutral modules:** portable business logic with no dependency on
  Android, AutoJs6, Node.js, a remote provider SDK, or the Contributor app.
- **Node.js:** offline tests, linting, formatting, local deterministic
  validation, and CI only. Node.js is not the production runtime.
- **Remote providers:** OpenAI or Gemini may supply AI Vision metadata through
  a future production adapter. No remote provider adapter is implemented yet.
- **Development environment:** GitHub stores authoritative code and release
  history; Codex carries out repository and version-control work.

See [`runtime-matrix.md`](runtime-matrix.md) for detailed boundaries.

## Current phase

**Phase: D01-D08 scoped device validation passed; D09-D10 are blocked by the
platform; D11 is blocked by unproven classification; D12 fake-only offline
contract is proved; D13 has scoped device validation; D14 has a scoped expected
application-failure observation; D15 has a scoped expected application-failure
observation; D16 has scoped device validation PASS; D17 has scoped device
validation PASS; D18-D26 remain pending.**

PR #11 merged the deterministic D02 PNG, D03 WebP, D04 HEIC, and D05 HEIF
verification launchers as authoritative main SHA
`ad52d122e239e0431c9fd2d3c2cdedf383f8b0da`. All four launchers subsequently
passed on Vivo X Fold5 with AutoJs6 v6.7.0 `arm64-v8a` against that exact SHA.
The scoped evidence is recorded in
[`testing/device-validation/d02-d05-vivo-x-fold5-autojs6-v6.7.0.md`](testing/device-validation/d02-d05-vivo-x-fold5-autojs6-v6.7.0.md).

D01 remains scoped to its recorded SHA and evidence file. D02-D05 are scoped to
`ad52d12...` and their evidence file. These five PASS results do not establish
MIME fallback, permission failure, missing source, size boundaries, cleanup,
repetition, memory behavior, complete device compatibility, provider behavior,
queue behavior, Contributor app automation, or module migration.

The D06 evidence-gap review found that D01-D05 final MIME records could not
prove MIME provenance because `prepareImageInput()` may use byte-signature
fallback. PR #14 added an evidence-only D06 launcher that calls the existing
production reader directly, and PR #15 reconciled every generated bundle.
D06 then passed on Vivo X Fold5 with Android 16 and AutoJs6 v6.7.0 `arm64-v8a`
against authoritative main SHA
`6704ed97553f1bba60b7bf9120d6ba84d44715ca`. The independently confirmed
6,406-byte JPEG fixture returned `image/jpeg` with `uiResponsive: true`. The
scoped evidence is recorded in
[`testing/device-validation/d06-vivo-x-fold5-autojs6-v6.7.0.md`](testing/device-validation/d06-vivo-x-fold5-autojs6-v6.7.0.md).

The D07 evidence-gap review then confirmed that the existing portable and
fake-resolver tests prove the fallback contract but do not constitute distinct
Android / AutoJs6 device evidence. The reviewed minimal evidence-only wrapper
preserves production-reader access and exact bytes, removes only the returned
MIME, and passes the wrapper into the existing `prepareImageInput()` fallback
path. D07 subsequently passed on Vivo X Fold5 with Android 16 and AutoJs6
v6.7.0 `arm64-v8a` against authoritative main SHA
`9a189085c8b5f7727a61a0c244040c8d4d5131bc`. The independently confirmed
6,406-byte JPEG fixture returned `image/jpeg` with `uiResponsive: true`. The
scoped evidence is recorded in
[`testing/device-validation/d07-vivo-x-fold5-autojs6-v6.7.0.md`](testing/device-validation/d07-vivo-x-fold5-autojs6-v6.7.0.md).

The D08 case-specific launcher delegates unchanged to the existing fresh system
picker, production reader, portable core, and sanitized reporter path. D08 has
a scoped PASS for the recorded Vivo X Fold5 execution and authoritative
launcher SHA; no new reader or permission logic was added. The review and
device evidence are recorded in
[`testing/d08-permission-granted-evidence-gap-review.md`](testing/d08-permission-granted-evidence-gap-review.md)
and
[`testing/device-validation/d08-vivo-x-fold5-autojs6-device-validation.md`](testing/device-validation/d08-vivo-x-fold5-autojs6-device-validation.md).

The D09 feasibility task is complete with classification `BLOCKED_PLATFORM`.
On Vivo X Fold5 with Android 16 and AutoJs6 v6.7.0 `arm64-v8a`, the temporary
system-picker grant was initially readable. The platform revocation call
returned normally, but the following permission check was not denied and a new
read remained available. The repository-external feasibility tool was not a
repository launcher. D09 has no PASS or `URI_ACCESS_DENIED` claim, and a D09
launcher must not be implemented. The scoped record is
[`testing/device-validation/d09-vivo-x-fold5-autojs6-revocation-feasibility.md`](testing/device-validation/d09-vivo-x-fold5-autojs6-revocation-feasibility.md).

The D10 evidence-gap review confirmed that the portable core awaits
`canAccess()` before calling `read()`, and that the production reader closes the
probe stream before opening a new stream for the read. The repository contains
no reviewed hook at that boundary. More importantly, D09 established that the
available platform revocation call did not invalidate the real temporary picker
grant in the scoped Vivo X Fold5 environment. Changing the timing of that same
ineffective operation cannot establish D10. D10 is therefore
`BLOCKED_PLATFORM`; no launcher, PASS, or `URI_ACCESS_DENIED` device claim is
authorized. The review is recorded in
[`testing/d10-permission-revoked-between-access-and-read-evidence-gap-review.md`](testing/d10-permission-revoked-between-access-and-read-evidence-gap-review.md).

The D11 evidence-gap review confirmed that formal deletion occurs before the
production access probe. The reader's `canAccess()` collapses a `null` stream or
any open failure to `false`, which the portable core maps to
`URI_ACCESS_DENIED` without calling `read()`. `IMAGE_READ_FAILED` is available
only when the probe first succeeds and a later non-permission read failure
occurs. The system picker and provider do not establish that ordering or a
provider-independent missing-source result. D11 is therefore
`BLOCKED_UNPROVEN_CLASSIFICATION`; no launcher or device-result claim is
authorized. The review is recorded in
[`testing/d11-missing-source-evidence-gap-review.md`](testing/d11-missing-source-evidence-gap-review.md).

The D12 evidence-gap review preserved D12 as a fake-only offline contract. The
separately governed `tests/autojs6-d12-null-stream.test.js` now proves the exact
sequence in one execution: a closable first probe makes `canAccess()` succeed,
the read-stage second resolver open returns `null`, and the existing production
reader, portable core, and shared reporter produce one frozen, sanitized
`IMAGE_READ_FAILED` record. No buffer allocation or runtime-error
classification occurs on that null path. This is repository offline-contract
evidence only; it is not an Android, provider, device, D11, or private-cache
result, and no D12 launcher or device execution is authorized. The review and
resolved coverage are recorded in
[`testing/d12-null-stream-evidence-gap-review.md`](testing/d12-null-stream-evidence-gap-review.md).

The D13 evidence-gap review confirmed that the portable core accepts equality
at `maxSizeBytes`, rejects only a greater byte length as `IMAGE_TOO_LARGE`, and
uses the production reader's complete returned array length rather than URI
metadata. Existing offline coverage includes a production-reader-to-core exact
boundary execution and a separate complete reader/core/reporter success
execution. No single test combines all three with exact equality, but that
additional test is not a prerequisite for device-procedure preparation. The
preparation task independently measured the privately mapped
`AT_PORTABLE_LIMIT` JPEG as 6,406 bytes with a read-only local tool outside the
launcher and production reader. The evidence-only D13 launcher pins
`maxSizeBytes` to 6,406 and the separately higher reader safety ceiling to
12,582,912, delegates to the existing system picker, production reader,
portable core, and sanitized reporter, and rejects any non-equal success size.
The fixture mapping remains outside Git. D13 subsequently passed on Vivo X
Fold5 with Android 16 and AutoJs6 v6.7.0 `arm64-v8a` against authoritative main
SHA `a3de20a96ad326df921efa80dd264a4774e905a3`. The production reader returned
the exact 6,406-byte equality boundary as `image/jpeg` with
`uiResponsive: true`. The review, procedure, and scoped evidence are recorded
in the
[`testing/d13-exact-portable-limit-evidence-gap-review.md`](testing/d13-exact-portable-limit-evidence-gap-review.md)
review,
[`user-guides/autojs6-d13-exact-portable-limit-check-zh-tw.md`](user-guides/autojs6-d13-exact-portable-limit-check-zh-tw.md)
procedure, and
[`testing/device-validation/d13-vivo-x-fold5-autojs6-v6.7.0.md`](testing/device-validation/d13-vivo-x-fold5-autojs6-v6.7.0.md)
device record.

The D14 evidence-gap review confirmed that the production reader returns a
complete in-memory byte array when the controlled source remains below a
separately higher reader safety ceiling. The portable core then compares that
array's actual length with `maxSizeBytes` and produces `IMAGE_TOO_LARGE` when
the length is greater, before MIME fallback or encoding. The preparation task
independently measured the privately mapped `OVER_PORTABLE` JPEG anew as 6,406
bytes outside the launcher and production reader. The evidence-only D14 wrapper
statically enforces a 6,405-byte portable limit and a 12,582,912-byte reader
ceiling, delegates to the existing picker, production reader, portable core,
and sanitized reporter, and accepts only the expected `IMAGE_TOO_LARGE`
failure record. The scoped Vivo X Fold5 execution against authoritative SHA
`e648b57e8b756017b5716f3e8e145ff95de14683` observed that exact stable
application failure with `uiResponsive: true`. Its public `status: "FAIL"` is
retained and is not called PASS. The private mapping remains outside Git. The
review, procedure, and scoped device record are recorded in the
[`testing/d14-portable-size-overflow-evidence-gap-review.md`](testing/d14-portable-size-overflow-evidence-gap-review.md)
review,
[`user-guides/autojs6-d14-portable-size-overflow-check-zh-tw.md`](user-guides/autojs6-d14-portable-size-overflow-check-zh-tw.md)
procedure, and
[`testing/device-validation/d14-vivo-x-fold5-autojs6-v6.7.0.md`](testing/device-validation/d14-vivo-x-fold5-autojs6-v6.7.0.md)
device record.

The D15 evidence-gap review confirmed that the production reader checks
`sizeBytes + count > readerSafetyLimitBytes` before converting the crossing
buffer, appending it, advancing the local count, or combining chunks. On
overflow it throws classified `IMAGE_READ_FAILED`, closes the stream in
`finally`, and returns no byte array to the portable core. Existing offline
tests cover exact ceiling equality, overflow, partial reads, cleanup, public
mapping, sanitized reporting, and privacy sufficiently for procedure
preparation, but are not Android or device evidence. Because
`IMAGE_READ_FAILED` is a shared public category, a future procedure must combine
an independently counted source, a deliberately lower static reader ceiling, a
portable limit at or above the source count, an unchanged clean launcher, a
fresh picker grant, and the exact public result. It must preserve accidental
success and non-target failures rather than coercing them to the target code.
D15 is ready for governed device-procedure preparation; no launcher, private
fixture mapping, device result, or PASS claim exists. The review is recorded in
[`testing/d15-reader-safety-ceiling-overflow-evidence-gap-review.md`](testing/d15-reader-safety-ceiling-overflow-evidence-gap-review.md).

The D15 preparation task independently measured the privately mapped
`OVER_READER_CEILING` JPEG anew as 6,406 bytes with a trusted read-only tool
outside the launcher and production reader. The evidence-only D15 manifest
pins `readerSafetyLimitBytes` to 6,405 and `maxSizeBytes` to 6,406, so the
controlled complete source crosses the reader ceiling before it could cross the
portable limit. Its wrapper only validates that static ordering and delegates
unchanged to the existing system picker, production reader, portable core,
shared sanitized reporter, and off-UI-thread path. It returns the underlying
sanitized result unchanged, so accidental success and non-target public
failures remain visible. Offline tests cover target overflow, stream cleanup,
success and permission-denial preservation, manifest ordering, source entry,
deterministic bundle freshness, and legacy syntax compatibility; they are not
Android evidence. The fixture mapping remains outside Git. The scoped Vivo X
Fold5 execution against authoritative SHA
`9826a438b41582b594a692e9ff88214b2f75193b` observed the exact reviewed
`FAIL / IMAGE_READ_FAILED` application result with `uiResponsive: true`. The
public code is shared by multiple non-permission read failures, so the record
is scoped to the reviewed static ordering and does not claim unique internal
cause or PASS. The procedure and scoped evidence are recorded in
[`user-guides/autojs6-d15-reader-safety-ceiling-overflow-check-zh-tw.md`](user-guides/autojs6-d15-reader-safety-ceiling-overflow-check-zh-tw.md)
and
[`testing/device-validation/d15-vivo-x-fold5-autojs6-v6.7.0.md`](testing/device-validation/d15-vivo-x-fold5-autojs6-v6.7.0.md).

The D16 evidence-gap review confirmed that each production
`prepareImageInput()` invocation performs a fresh access probe followed by a
fresh read, closing both streams independently. On 2026-08-02 the user
explicitly approved the full D16 contract: exactly 10 complete reads of the
dedicated synthetic `JPEG_REPEAT_VALID` fixture through the full path, using
one fresh temporary picker grant; independent positive byte-count
verification; MIME/count equality; one loop-level responsiveness result;
fail-fast behavior; and one frozen sanitized aggregate record. The formal
contract also records the approved attempted/successful counter rules, equality
behavior, and exact UI/public-error/metadata-mismatch precedence. The original
review is recorded in
[`testing/d16-repeated-reads-evidence-gap-review.md`](testing/d16-repeated-reads-evidence-gap-review.md).

The post-clarification readiness review and dedicated offline coverage prove
the approved aggregate semantics through the existing production reader and
portable core. The preparation package now adds the reviewed D16 manifest,
verification-only repeated-read wrapper, shared-launcher integration,
deterministic generated bundle, tests, and Traditional Chinese future-execution
procedure. The privately mapped synthetic JPEG was independently remeasured as
6,406 bytes outside Git, the launcher, and the production reader; only its
opaque fixture ID, MIME, and verified count are retained. All authoritative
repository checks pass. This remains preparation and offline evidence only: no
phone, Android picker, device evidence, temporary-grant lifetime result, or
D16 PASS exists. PR #45 must satisfy the repository review gate and merge
before the next separately governed task, `D16-DEVICE-VALIDATION`. The gate may
be independent human review or the expressly non-independent solo-project
exception when all of its strict conditions are met. The readiness review and
future procedure are recorded in
[`testing/d16-post-clarification-readiness-review.md`](testing/d16-post-clarification-readiness-review.md)
and
[`user-guides/autojs6-d16-repeated-reads-check-zh-tw.md`](user-guides/autojs6-d16-repeated-reads-check-zh-tw.md).

The repository uses `NEXT_ACTION.md` as the single active-task register and
`PROJECT_GOVERNANCE.md` as the mandatory execution protocol.

The repository currently has one eligible human maintainer. Governance now
defines a last-resort solo-project exception with a fresh isolated review,
complete exact-SHA diff coverage, full checks, risk/evidence recording, explicit
`NOT INDEPENDENT HUMAN REVIEW` labeling, and automatic invalidation. It does not
count as independent approval and cannot establish device or production
evidence. PR #45 is the bootstrap adoption candidate and must carry a compliant
exact-head PASS record before merge; otherwise it remains blocked.

## Current branch and pull request

- Authoritative branch: `main`
- Governance baseline established by
  [#12 — Repair project governance and record D02-D05 evidence](https://github.com/cyh86086/contributor-ai/pull/12)
- PR #12 state: squash-merged
- Governance baseline merge SHA:
  `8eeef1642e33853e75938dd16d7bbbbc1627a9ee`
- PR #12 source branch `docs/project-governance-repair-v1`: deleted after merge
- Open pull-request snapshot immediately after PR #46 merge: none
- The live `main` SHA is fetched during every mandatory preflight; it is not
  duplicated here as a self-referential current-state invariant.
- Release status: no production release

Historical PR detail remains available in Git history and PRs #1-#11. This
snapshot records current state rather than repeating every completed branch.

## Historical target module status

All historical target modules are **NOT YET MIGRATED**:

| Historical target module                                                      | Status           |
| ----------------------------------------------------------------------------- | ---------------- |
| Launcher V1.3                                                                 | NOT YET MIGRATED |
| Queue Engine V1.0                                                             | NOT YET MIGRATED |
| AI Engine V1.0                                                                | NOT YET MIGRATED |
| Queue-AI Orchestrator V1.0                                                    | NOT YET MIGRATED |
| Contributor Engine V1.0                                                       | NOT YET MIGRATED |
| Mock UI Adapter                                                               | NOT YET MIGRATED |
| Vision Provider Interface V1.0                                                | NOT YET MIGRATED |
| AutoJs6 HTTP Adapter                                                          | NOT YET MIGRATED |
| [Android Image Input Adapter V1.0](modules/android-image-input-adapter-v1.md) | NOT YET MIGRATED |

No historical module may be marked complete unless all of the following exist
in GitHub:

1. the module source;
2. module tests;
3. an explicit runtime designation;
4. integration documentation;
5. passing repository checks;
6. a commit containing the verified migration;
7. a pull request containing that commit.

A module mentioned in chat, a generated ZIP, or a local example does not
satisfy these requirements.

## Current blockers

- D06 has a scoped PASS for the exact recorded device, runtime, SHA, fixture,
  resolver MIME, byte count, and UI-responsiveness result.
- D07 has a scoped PASS for the exact recorded device, runtime, SHA, fixture,
  controlled absent-MIME condition, JPEG signature fallback, byte count, and UI
  responsiveness.
- D08 has a scoped PASS for the recorded Vivo X Fold5 execution,
  authoritative launcher SHA, fresh temporary-picker grant, final JPEG MIME,
  exact production-reader byte count, and UI responsiveness. Runtime fields
  that were not supplied remain explicitly recorded as not supplied. The scoped
  evidence is recorded in
  [`testing/device-validation/d08-vivo-x-fold5-autojs6-device-validation.md`](testing/device-validation/d08-vivo-x-fold5-autojs6-device-validation.md).
- D09 feasibility is complete with classification `BLOCKED_PLATFORM`. The
  scoped device observation did not identify a platform-supported way to
  invalidate the selected temporary grant before `canAccess()`. No D09 launcher
  may be implemented, and no D09 PASS or `URI_ACCESS_DENIED` claim is made. The
  evidence-gap review, blocker disposition, and scoped evidence are recorded in
  [`testing/d09-permission-revoked-evidence-gap-review.md`](testing/d09-permission-revoked-evidence-gap-review.md),
  [`testing/d09-revocation-feasibility-blocker.md`](testing/d09-revocation-feasibility-blocker.md),
  and
  [`testing/device-validation/d09-vivo-x-fold5-autojs6-revocation-feasibility.md`](testing/device-validation/d09-vivo-x-fold5-autojs6-revocation-feasibility.md).
- D10 evidence-gap review is complete with classification `BLOCKED_PLATFORM`.
  Existing fake and injected offline tests prove the two-open sequence, error
  mapping, and sanitization contracts, but not real Android grant invalidation.
  No D10 launcher may be implemented, and no D10 PASS or `URI_ACCESS_DENIED`
  device claim is made. A repository-external private-cache lifecycle
  exploration is not formal D10 evidence. The review is recorded in
  [`testing/d10-permission-revoked-between-access-and-read-evidence-gap-review.md`](testing/d10-permission-revoked-between-access-and-read-evidence-gap-review.md).
- D11 evidence-gap review is complete with classification
  `BLOCKED_UNPROVEN_CLASSIFICATION`. A real deleted picker source may fail or
  remain readable at either of the production stream opens. Failure at
  `canAccess()` becomes `URI_ACCESS_DENIED`; only a later non-permission failure
  during `read()` becomes `IMAGE_READ_FAILED`. Existing fake and injected tests
  do not prove which path occurs on the scoped device and provider. No D11
  launcher or device-result claim is authorized. The review is recorded in
  [`testing/d11-missing-source-evidence-gap-review.md`](testing/d11-missing-source-evidence-gap-review.md).
- D12's fake-only offline contract is proved by one exact
  production-reader, portable-core, and reporter test in which the access probe
  succeeds and the read-stage resolver open returns `null`. The stable result
  is `IMAGE_READ_FAILED`, with one frozen allowlisted record and no source or
  diagnostic fields. This is not Android, provider, device, D11, or
  private-cache evidence; D12 requires no device execution. The review is
  recorded in
  [`testing/d12-null-stream-evidence-gap-review.md`](testing/d12-null-stream-evidence-gap-review.md).
- D13 evidence-gap review, device-procedure preparation, and scoped device
  validation are complete. The user-approved `AT_PORTABLE_LIMIT` JPEG was
  independently measured anew as 6,406 bytes outside the launcher and
  production reader; only the opaque ID and count are retained. The reviewed
  evidence-only launcher used that exact
  portable limit, a 12,582,912-byte reader ceiling, the existing fresh picker,
  production reader, portable core, and sanitized reporter path. The scoped
  Vivo X Fold5 execution returned PASS with `image/jpeg`, exact
  `sizeBytes: 6406`, and `uiResponsive: true`. The review, procedure, and
  evidence are recorded in the
  [`testing/d13-exact-portable-limit-evidence-gap-review.md`](testing/d13-exact-portable-limit-evidence-gap-review.md)
  review,
  [`user-guides/autojs6-d13-exact-portable-limit-check-zh-tw.md`](user-guides/autojs6-d13-exact-portable-limit-check-zh-tw.md)
  procedure, and
  [`testing/device-validation/d13-vivo-x-fold5-autojs6-v6.7.0.md`](testing/device-validation/d13-vivo-x-fold5-autojs6-v6.7.0.md)
  device record.
- D14 evidence-gap review, device-procedure preparation, and scoped device
  validation are complete. The user-approved, privately mapped `OVER_PORTABLE`
  JPEG was independently measured anew as 6,406 bytes; only the opaque ID and
  count are retained. The reviewed evidence-only launcher used a 6,405-byte
  portable limit, a 12,582,912-byte reader ceiling, the existing fresh picker,
  production reader, portable core, and sanitized reporter path. The scoped
  Vivo X Fold5 execution observed the stable `IMAGE_TOO_LARGE` application
  failure with `uiResponsive: true`. Its public `status: "FAIL"` remains exact
  and is not called PASS. No D13 or D15 result is reused. The review, procedure,
  and evidence are recorded in
  [`testing/d14-portable-size-overflow-evidence-gap-review.md`](testing/d14-portable-size-overflow-evidence-gap-review.md)
  review,
  [`user-guides/autojs6-d14-portable-size-overflow-check-zh-tw.md`](user-guides/autojs6-d14-portable-size-overflow-check-zh-tw.md)
  procedure, and
  [`testing/device-validation/d14-vivo-x-fold5-autojs6-v6.7.0.md`](testing/device-validation/d14-vivo-x-fold5-autojs6-v6.7.0.md)
  device record.
- D15 evidence-gap review, device-procedure preparation, and scoped device
  validation are complete. The
  user-approved, privately mapped `OVER_READER_CEILING` JPEG was independently
  measured anew as 6,406 bytes; only the opaque ID and count are retained. The
  evidence-only launcher used a 6,405-byte reader ceiling and a
  6,406-byte portable limit with the existing fresh picker, production reader,
  portable core, sanitized reporter, and off-UI-thread path. The wrapper
  preserves accidental success and non-target failures rather than coercing
  them to `IMAGE_READ_FAILED`. The scoped Vivo X Fold5 execution against
  authoritative SHA `9826a438b41582b594a692e9ff88214b2f75193b` observed the
  exact reviewed `FAIL / IMAGE_READ_FAILED` result with positive UI
  responsiveness and no truncated success metadata. Because that public code
  is not unique internal telemetry, the record is limited to the reviewed
  static ordering and does not call the application failure PASS. The review,
  procedure, and evidence are recorded in
  [`testing/d15-reader-safety-ceiling-overflow-evidence-gap-review.md`](testing/d15-reader-safety-ceiling-overflow-evidence-gap-review.md)
  and
  [`user-guides/autojs6-d15-reader-safety-ceiling-overflow-check-zh-tw.md`](user-guides/autojs6-d15-reader-safety-ceiling-overflow-check-zh-tw.md)
  and
  [`testing/device-validation/d15-vivo-x-fold5-autojs6-v6.7.0.md`](testing/device-validation/d15-vivo-x-fold5-autojs6-v6.7.0.md).
- D16 evidence-gap review, post-clarification readiness review, device-procedure
  preparation, and scoped device validation are complete. The user explicitly
  approved the full D16 contract on 2026-08-02: 10 full-path reads of
  `JPEG_REPEAT_VALID` under one fresh temporary grant; independently re-measured
  byte count; exact MIME/count equality; loop-level responsiveness; fail-fast;
  and one sanitized aggregate record. The preparation PR was reviewed under the
  solo-project exception and merged to `main`. The scoped Vivo X Fold5 execution
  against authoritative SHA
  `9caf03c3532c2d051f4e8cd85a4c019cb35ce9e5` returned the approved PASS
  aggregate: `requestedIterations: 10`, `attemptedIterations: 10`,
  `successfulIterations: 10`, `mimeType: "image/jpeg"`, `sizeBytes: 6406`,
  `allMetadataEqual: true`, `uiResponsive: true`. The review, procedure, and
  scoped evidence are recorded in
  [`testing/d16-repeated-reads-evidence-gap-review.md`](testing/d16-repeated-reads-evidence-gap-review.md),
  [`testing/d16-post-clarification-readiness-review.md`](testing/d16-post-clarification-readiness-review.md),
  [`user-guides/autojs6-d16-repeated-reads-check-zh-tw.md`](user-guides/autojs6-d16-repeated-reads-check-zh-tw.md),
  and
  [`testing/device-validation/d16-vivo-x-fold5-autojs6-v6.7.0.md`](testing/device-validation/d16-vivo-x-fold5-autojs6-v6.7.0.md).
- D17 evidence-gap review, device-procedure preparation, and scoped device
  validation are complete. The reviewed D17 contract requires exactly 3
  sequential full-path reads of `JPEG_REPEAT_VALID` through the production
  reader and portable core under one fresh temporary multi-select picker grant;
  per-image frozen records; an aggregate frozen sanitized record; fail-fast on
  any non-success; and independently verified byte count. The preparation PR
  was reviewed under the solo-project exception and merged to `main`. The
  scoped Vivo X Fold5 execution against authoritative SHA `1ef3dc4` returned
  the approved PASS aggregate: `requestedImages: 3`, `attemptedImages: 3`,
  `successfulImages: 3`, all 3 per-image records with `mimeType: "image/jpeg"`,
  `sizeBytes: 6406`, `status: "PASS"`, and `uiResponsive: true`. The review,
  procedure, and scoped evidence are recorded in
  [`testing/d17-multi-image-sequential-evidence-gap-review.md`](testing/d17-multi-image-sequential-evidence-gap-review.md),
  [`user-guides/autojs6-d17-multi-image-sequential-check-zh-tw.md`](user-guides/autojs6-d17-multi-image-sequential-check-zh-tw.md),
  and
  [`testing/device-validation/d17-vivo-x-fold5-autojs6-v6.7.0.md`](testing/device-validation/d17-vivo-x-fold5-autojs6-v6.7.0.md).
- D18-D26 still require scoped review, preparation, and in several cases
  user-assisted Vivo X Fold5 evidence.
- Android Image Input Adapter V1.0 remains **NOT YET MIGRATED** until every
  repository migration and device-verification criterion is satisfied.
- Remote provider, network transport, queue, Contributor app integration, and
  submission behavior remain unimplemented and outside the current milestone.
- No provider credential strategy has been approved. Secrets must remain
  outside Git.
- Repository write access: an approved local GitHub CLI workflow is available.
  The 2026-08-02 preflight authenticated `gh` as the repository owner and
  confirmed `ADMIN` repository permission. GitHub Connector repository reads
  succeed, but pull-request creation and Ready-for-review writes returned HTTP 403. The Connector remains read-only for those writes, so the confirmed local
  CLI workflow is used for branch, push, pull-request, and merge operations.
- Independent human review is currently unavailable because the repository has
  one eligible human maintainer. The solo-project exception process remains
  available and is explicitly non-independent.

## Next planned actions

The only active task is defined in [`NEXT_ACTION.md`](NEXT_ACTION.md).
At this snapshot it is `None`. D17 device validation completed on 2026-08-03
against authoritative SHA `1ef3dc4` with a scoped PASS on Vivo X Fold5 /
Android 16 / AutoJs6 v6.7.0 `arm64-v8a`.

No new task has been approved. Any future task requires a new repository
decision, scoped review, and explicit user authorization before work begins.

## Verification rules

- Run `npm run check` for every repository change that affects code,
  configuration, or executable examples.
- Run the repository secret-pattern scan before every commit and pull request
  update.
- Keep runtime-neutral modules free of Node.js, AutoJs6, Android, provider SDK,
  and Contributor app dependencies.
- Keep Node.js code isolated as offline development and CI tooling.
- Verify production integrations in Android and AutoJs6; Node.js tests cannot
  establish production-runtime completion.
- Do not claim a historical module is migrated or complete unless it satisfies
  every requirement in the historical target module status section.
- Do not claim a release exists unless its source, version, checks, and release
  record exist in GitHub.
- Require user review and manual confirmation for every final submission.

## Future user intervention

The user must:

- assist with the remaining Vivo X Fold5 and AutoJs6 device-verification
  matrix and provide only sanitized results;
- grant Android permissions and select photos;
- choose and authorize any remote AI Vision provider;
- supply provider credentials outside the repository when provider support
  exists;
- review generated descriptions and keywords;
- manually confirm every final submission in the Contributor app;
- provide or approve authoritative historical module sources and
  specifications before migration;
- explicitly approve any future proposal to automate final submission, because
  it is outside the current approved scope.

## Required state maintenance

Update this document in the same pull request whenever any of the following
changes:

- module status;
- project phase;
- a blocker;
- runtime architecture;
- next milestone or planned action;
- release status.
