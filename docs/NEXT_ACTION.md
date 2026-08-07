# Next action

Last reviewed: 2026-08-07
Execution baseline: resolve the live `main` SHA during mandatory preflight.

## Active task

**AutoJs6 HTTP Adapter V1.0 MIGRATION COMPLETE.** The portable core
(`src/core/http-adapter.js`), offline tests (19/19 pass), specification, and
integration documentation are complete. The integration contract is recorded in
[`modules/autojs6-http-adapter-v1-integration.md`](modules/autojs6-http-adapter-v1-integration.md).
Device verification is deferred until production adapter implementation.

## Next phase

Six historical modules remain **NOT YET MIGRATED**:

| Module                     | Status           |
| -------------------------- | ---------------- |
| Launcher V1.3              | NOT YET MIGRATED |
| Queue Engine V1.0          | NOT YET MIGRATED |
| AI Engine V1.0             | NOT YET MIGRATED |
| Queue-AI Orchestrator V1.0 | NOT YET MIGRATED |
| Contributor Engine V1.0    | NOT YET MIGRATED |
| Mock UI Adapter            | NOT YET MIGRATED |

No new task has been approved. Any future task requires a new repository
decision, scoped review, and explicit user authorization before work begins.
