# Next action

Last reviewed: 2026-08-02
Execution baseline: resolve the live `main` SHA during mandatory preflight.

## Active task

**Task ID:** `D14-EVIDENCE-GAP-REVIEW`

**Objective:** Perform a repository-first, documentation-only evidence-gap
review for formal matrix case D14, portable size overflow.

Formal D14 runs fixture ID `OVER_PORTABLE` with its complete byte length greater
than `maxSizeBytes` while a separately higher `readerSafetyLimitBytes` allows
the production reader to return the complete source. The expected stable public
result is `IMAGE_TOO_LARGE`.

## Required work

1. Complete mandatory preflight from live `main` and re-read the formal D14
   matrix definition.
2. Inspect the existing production reader, portable core, stable error mapping,
   shared reporter, and sanitization boundary for the D14 sequence.
3. Inventory every relevant fake, injected, reader/core integration, portable
   overflow, reporter, and privacy test. State exactly what each proves and why
   offline coverage is not Android or device evidence.
4. Determine whether D14 can safely use one privately mapped, non-sensitive
   controlled fixture whose exact positive count is measured independently,
   with `maxSizeBytes` deliberately lower and `readerSafetyLimitBytes`
   deliberately higher than that count.
5. Determine whether the existing path can prove that the complete source was
   read before the portable core returns `IMAGE_TOO_LARGE`, without recording
   source data or adding source-copy behavior.
6. Distinguish D14 from D13 equality and D15 reader-ceiling overflow. Evidence
   from either neighboring case must not be reused as D14 evidence.
7. Add a scoped D14 evidence-gap review and update project state. If a safe,
   reproducible device procedure is feasible, advance only to a separately
   governed preparation task; otherwise record the existing governed blocker
   accurately.

## Acceptance criteria

- The review answers whether production-reader completion, portable overflow
  classification, and stable sanitized reporting are already covered along the
  required path.
- Fixture provenance, exact-count requirements, and the strict ordering of
  `maxSizeBytes < source size <= readerSafetyLimitBytes` are explicit.
- The conclusion is one supported by existing repository terminology; no PASS,
  classification, acceptance criterion, or device behavior is invented.
- `PROJECT_STATE.md`, this file, and the D14 review agree on one next task.
- All changed files are Markdown and repository verification passes.

## Prohibited scope

Do not create a D14 launcher, test, fixture, device result, or PASS claim during
this review. Do not run a phone test, reuse the D13 result, or treat a D15 reader
failure as portable overflow evidence.

Do not add production reader or portable-core behavior, source-copy
architecture, permission manager, persistable grant, broad storage permission,
provider, network, queue, Contributor app, credential, submission, or unrelated
module work. Do not record any URI, path, filename, source bytes, Base64, image
content, exception detail, stack, credential, or private fixture mapping.

## Stop conditions

Stop and report when:

- an open pull request or branch already owns D14 review work;
- repository state conflicts;
- the formal D14 contract or controlled fixture provenance is ambiguous;
- a reliable procedure would require production architecture or permission
  changes;
- sensitive data may have appeared;
- write access is unavailable.
