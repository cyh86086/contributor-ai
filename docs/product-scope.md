# Product scope

## Product definition

Contributor AI is an Android AutoJs6 microstock automation application. It
helps a user prepare English descriptions and keywords for multiple photos and
enter them into the Contributor Android app. It does not perform GitHub
repository-contribution automation.

## Target user workflow

1. The user selects multiple photos from the Android gallery.
2. AutoJs6 reads the selected Android `content://` image URIs.
3. Contributor AI sends the images to a user-authorized AI Vision provider.
4. The provider returns an English microstock description under 2,000
   characters and exactly seven English keywords for each photo.
5. AutoJs6 opens the Contributor Android app.
6. Contributor AI fills the Description and Keywords fields.
7. The user reviews the generated values and manually confirms submission.

## Required AI result

The provider response for each image has this JSON shape:

```json
{
  "description": "English text under 2000 characters",
  "keywords": ["exactly", "7", "English", "keywords", "..."]
}
```

The ellipsis above documents the array shape; it is not a literal keyword.
Every actual result must contain exactly seven strings. A valid example is:

```json
{
  "description": "Colorful wildflowers growing in a sunlit meadow under a clear sky.",
  "keywords": [
    "wildflowers",
    "meadow",
    "nature",
    "sunlight",
    "summer",
    "landscape",
    "outdoors"
  ]
}
```

Contract rules:

- `description` is non-empty English text with fewer than 2,000 characters;
- `keywords` is an array containing exactly seven English keyword strings;
- the result is treated as a draft until the user reviews it.

## In scope

- selecting multiple photos through the Android gallery;
- reading Android `content://` image URIs through AutoJs6;
- sending authorized image data to an OpenAI or Gemini AI Vision provider;
- receiving and validating the required JSON result per image;
- opening the Contributor Android app;
- filling its Description and Keywords fields;
- pausing for user review and manual confirmation;
- portable validation rules shared across runtime boundaries.

## Out of scope

- GitHub repository-contribution automation;
- automatic final submission under the current approved scope;
- bypassing Android permissions, security controls, or user consent;
- silently uploading or retaining images;
- committing API keys, tokens, credentials, or secrets;
- treating Node.js as the production application;
- claiming unverified historical modules are migrated or complete.

Automatic final submission may enter scope only if the user explicitly enables
it later through a reviewed repository decision. Until then, every final
submission must be manually confirmed.

## Bootstrap limitations

The current repository does not implement:

- production AutoJs6 automation;
- real Android gallery or content-resolver access;
- remote OpenAI or Gemini calls;
- Contributor app selectors or field-entry behavior;
- historical target modules.

The current executable Node.js code is only an offline harness for
runtime-neutral validation.
