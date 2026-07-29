# Contributor AI

Contributor AI is an Android automation application for preparing microstock
metadata. It is intended to run in AutoJs6, work with photos selected from the
Android gallery, request metadata from an AI Vision provider, and enter the
generated metadata into the Contributor Android app for human review.

Contributor AI does **not** submit content automatically. The user remains
responsible for reviewing the generated description and keywords and manually
confirming submission in the Contributor app.

`cyh86086/contributor-ai` is the single source of truth. Chat history,
generated ZIPs, and local examples are non-authoritative unless committed to
this repository.

## Intended workflow

1. The user selects multiple photos from the Android gallery.
2. AutoJs6 receives and reads the selected `content://` image URIs.
3. Contributor AI sends each image to a configured AI Vision provider.
4. The provider returns:
   - one English microstock description under 2,000 characters;
   - exactly seven English keywords.
5. AutoJs6 opens the Contributor Android app.
6. Contributor AI fills the Description and Keywords fields.
7. The user reviews the values and manually confirms submission.

## Repository status

This repository is still an early product implementation. It contains scoped
runtime-neutral image-input logic, an AutoJs6 Android image reader, and
verification support, but it does not contain the complete production
workflow. Its historical/versioned target modules remain **NOT YET MIGRATED**.
In particular, the repository has not recreated or completed:

- Launcher V1.3
- Queue Engine V1.0
- AI Engine V1.0
- Queue-AI Orchestrator V1.0
- Contributor Engine V1.0
- Mock UI Adapter
- Vision Provider Interface V1.0
- AutoJs6 HTTP Adapter
- Android Image Input Adapter V1.0

The JavaScript currently executable through npm is a **Node.js offline test
harness**, not the production runtime. It validates runtime-neutral metadata
rules without accessing Android, AutoJs6, gallery content, AI services, or the
Contributor app.

## Device-validation status

`D01_JPEG` passed on Vivo X Fold5 with AutoJs6 v6.7.0 `arm64-v8a` using
authoritative main SHA
`5720caa5015eaee9277c9ec6b8d38dc85e5ed2c9`. The Android picker, JPEG reader,
MIME detection, UI responsiveness, and metadata-only output passed. No Base64,
complete URI, path, filename, image content, stack trace, or credential was
observed in the script output.

This is a single scoped device result, not full Android Image Input Adapter
V1.0 migration or complete device compatibility. See the
[D01 device-validation record](docs/testing/device-validation/d01-vivo-x-fold5-autojs6-v6.7.0.md).

`D02_PNG`, `D03_WEBP`, `D04_HEIC`, and `D05_HEIF` also passed on the
same Vivo X Fold5 and AutoJs6 runtime using authoritative main SHA
`ad52d122e239e0431c9fd2d3c2cdedf383f8b0da`. The scoped results are recorded in
the [D02-D05 device-validation record](docs/testing/device-validation/d02-d05-vivo-x-fold5-autojs6-v6.7.0.md).

D01-D05 are scoped format cases only. The remaining D06-D26 matrix and complete
Android Image Input Adapter V1.0 migration remain pending.

## Project layout

```text
.
├── assets/                    Static project assets
├── docs/                      Product and architecture documentation
├── release/                   Release guidance
├── scripts/                   Repository checks
├── src/
│   ├── autojs6_adapters/      Reserved Android boundary documentation
│   ├── core/                  Runtime-neutral data validation
│   └── offline_harness/       Node.js-only local test harness
└── tests/                     Offline harness and core tests
```

See:

- [Current authoritative project state](docs/PROJECT_STATE.md)
- [Binding architectural decisions](docs/DECISIONS.md)
- [Product scope](docs/product-scope.md)
- [Architecture](docs/architecture.md)
- [Runtime matrix](docs/runtime-matrix.md)

## Offline development

Requirements:

- Node.js 20 or newer
- npm 10 or newer

```bash
npm install
npm run check
npm start
```

`npm start` runs deterministic sample data through the offline harness. It does
not contact an AI provider and does not control an Android device.

## Security

No API keys are included. Future provider credentials must be supplied at
runtime through an appropriate secret mechanism and must never be committed.
Image data and generated metadata should be sent only to providers explicitly
selected and authorized by the user.

## Contributing

Keep runtime-neutral rules independent of Node.js and AutoJs6 APIs. Place
Node-specific development utilities in `src/offline_harness/`. Do not add or
infer historical module implementations without an authoritative
specification. Every development task must first read
[`docs/PROJECT_STATE.md`](docs/PROJECT_STATE.md) and
[`docs/DECISIONS.md`](docs/DECISIONS.md).
