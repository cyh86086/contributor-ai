# Launcher V1.3 specification

## Status

- Historical target module: Launcher V1.3
- Migration status: **NOT YET MIGRATED**
- Specification status: authoritative; this document
- Production runtime: Android and AutoJs6
- Portable core: runtime-neutral, no Android, AutoJs6, or provider dependencies

## Purpose

Launcher V1.3 defines the application entry point. It accepts runtime
configuration, wires all modules together, and starts the production flow.

The launcher does not select images, call AI providers, manage queues, or
fill the Contributor app directly. It is the composition root that
initializes the module dependency graph.

## Production flow position

```text
User / AutoJs6 script entry
  -> Launcher V1.3              <- this module (entry point)
  -> Android Image Input Adapter V1.0
  -> Queue-AI Orchestrator V1.0
  -> Contributor Engine V1.0
  -> user review → manual submission
```

## Module composition

The launcher wires all already-migrated modules:

1. **Android Image Input Adapter V1.0**: reads images from URIs.
2. **Vision Provider Interface V1.0**: sends images to AI provider.
3. **AutoJs6 HTTP Adapter V1.0**: HTTP transport for provider calls.
4. **AI Engine V1.0**: per-image AI processing.
5. **Queue Engine V1.0**: sequential queue management.
6. **Queue-AI Orchestrator V1.0**: batch orchestration.
7. **Contributor Engine V1.0**: Contributor app field entry.
8. **Mock UI Adapter**: test double (production uses AutoJs6 UI adapter).

## Portable core contract

### createLauncher(config)

| Field            | Type       | Description                          |
| ---------------- | ---------- | ------------------------------------ |
| `imageReader`    | `object`   | Image reader with `read()` method    |
| `providerCaller` | `function` | Production provider caller           |
| `uiAdapter`      | `function` | UI field entry adapter               |
| `maxImageBytes`  | `number`   | Provider maximum image size          |
| `maxSizeBytes`   | `number`   | Portable core maximum image size     |
| `failFast`       | `boolean`  | Stop on first error (default: false) |

### Returns

A launcher with:

| Method        | Returns   | Description                      |
| ------------- | --------- | -------------------------------- |
| `run(images)` | `Promise` | Execute the full production flow |

### run(images) output

| Field         | Type       | Description            |
| ------------- | ---------- | ---------------------- |
| `totalImages` | `number`   | Total images processed |
| `succeeded`   | `number`   | Successful images      |
| `failed`      | `number`   | Failed images          |
| `results`     | `object[]` | Metadata results       |
| `errors`      | `object[]` | Error records          |

## Error codes

The launcher does not define its own error codes. Errors from composed
modules propagate through their respective error contracts.

Launcher-level validation errors (missing config fields) are `TypeError`
exceptions.

## Runtime designation

- **Portable core:** `src/core/launcher.js` is runtime-neutral. It has no
  dependency on Node.js, AutoJs6, Android, provider SDKs, or the Contributor
  app.
- **Production adapter:** The production launcher wires real Android
  adapters. No production adapter is implemented yet.

## Security rules

1. The launcher never stores API keys or credentials.
2. Configuration is validated before wiring.
3. The launcher delegates all security rules to composed modules.

## Test coverage

Offline tests verify:

- Valid configuration creates a working launcher.
- `run()` with empty images returns zero counts.
- `run()` processes images through the full pipeline.
- Missing config fields throw `TypeError`.
- Error propagation from composed modules.

## Migration completion criteria

The Launcher V1.3 module is **MIGRATED** when all of the following exist in
GitHub:

1. the reviewed portable core source (`src/core/launcher.js`);
2. the offline tests;
3. an explicit runtime designation in the source file;
4. integration documentation;
5. passing repository checks;
6. a commit containing the verified migration;
7. a pull request containing that commit;
8. device verification is deferred until production adapter implementation.
