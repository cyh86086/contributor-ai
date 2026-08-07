# Contributor UI Adapter V1.0 integration

## Status

- Runtime designation: **production Android runtime hosted by AutoJs6**
- Adapter source: `src/autojs6/contributor-ui-adapter.js`
- Portable core dependency: `src/core/contributor-engine.js`
- Offline tests: `tests/contributor-ui-adapter.test.js` (14/14 pass)
- Specification: `docs/modules/contributor-ui-adapter-v1.md`

## Overview

Contributor UI Adapter V1.0 bridges the portable core's
`enterContributorMetadata()` to the Contributor Android app through
AutoJs6 UI automation. It satisfies the `uiAdapter` injection contract.

```
┌─────────────────────────────────────────────────────────┐
│  AutoJs6 / Android production runtime                    │
│                                                          │
│  Portable core: contributor-engine.js                    │
│  ────────────────────────────────────────────────────┐  │
│  │ • Metadata validation                               │  │
│  │ • FIELD_ENTRY_FAILED / METADATA_INVALID errors      │  │
│  └────────────────────────────────────────────────────  │
│                          ↓ uiAdapter (injected)           │
│  ┌────────────────────────────────────────────────────┐  │
│  │  Contributor UI Adapter V1.0 (this adapter)         │  │
│  │  createContributorUIAdapter({                        │  │
│  │    appLauncher, findDescription, findKeywords        │  │
│  │  })                                                  │  │
│  │  • Launch Contributor app                            │  │
│  │  • Find Description field → setText                  │  │
│  │  • Find Keywords field → setText (comma-joined)      │  │
│  └────────────────────────────────────────────────────  │
│                          ↓ AutoJs6 UI automation          │
│  ┌────────────────────────────────────────────────────┐  │
│  │  Contributor Android app                             │  │
│  │  Description field → populated                       │  │
│  │  Keywords field → populated                          │  │
│  │  → User review → manual submission                   │  │
│  └────────────────────────────────────────────────────  │
└─────────────────────────────────────────────────────────┘
```

## Usage

```javascript
import { enterContributorMetadata } from "./src/core/contributor-engine.js";
import { createContributorUIAdapter } from "./src/autojs6/contributor-ui-adapter.js";

// Create the adapter with AutoJs6 UI automation dependencies
const uiAdapter = createContributorUIAdapter({
  appLauncher: (pkg) => app.launchApp(pkg),
  findDescription: (timeout) => id("desc_field").findOne(timeout),
  findKeywords: (timeout) => id("kw_field").findOne(timeout),
});

// Use with the portable core
const result = await enterContributorMetadata({
  description: "A sunset over the ocean",
  keywords: ["sunset", "ocean", "sky", "nature", "water", "horizon", "colors"],
  uiAdapter,
});
// result: { entered: true, pendingReview: true }
// → User reviews and manually confirms submission
```

## Module relationship

| Module                                | Location                                | Role                               |
| ------------------------------------- | --------------------------------------- | ---------------------------------- |
| Contributor Engine (portable core)    | `src/core/contributor-engine.js`        | Metadata validation, error mapping |
| Contributor UI Adapter (this adapter) | `src/autojs6/contributor-ui-adapter.js` | App launch, field population       |
| Mock UI Adapter (test utility)        | `src/core/mock-ui-adapter.js`           | Test-only mock of this contract    |

## Test coverage

- Successful field entry (launch + setText for both fields)
- Custom package name
- Keywords joined with commas
- App launch failure
- Description field not found
- Keywords field not found
- Description setText failure
- Keywords setText failure
- Description field missing setText method
- Portable core integration (enterContributorMetadata)
- Portable core error mapping (FIELD_ENTRY_FAILED)
- Input validation (missing dependencies)
- Error sanitization (no metadata in messages)
