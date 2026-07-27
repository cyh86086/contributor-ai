# Product scope

## Purpose

Contributor AI helps an Android user prepare English microstock metadata for
multiple selected photos. AutoJs6 coordinates Android gallery input, AI Vision
metadata generation, and field entry in the Contributor Android app.

## Required outcome per photo

For every selected image, the AI Vision provider must return:

- one English microstock description that is non-empty and shorter than 2,000
  characters;
- exactly seven English keywords.

The generated values are drafts. The user reviews them in the Contributor app
and manually confirms submission.

## In scope

- selecting multiple images through the Android gallery;
- handling Android `content://` image URIs through AutoJs6;
- sending image content to a user-configured AI Vision provider;
- validating the description and keyword count;
- opening the Contributor Android app;
- filling its Description and Keywords fields;
- preserving a human review and confirmation step.

## Out of scope for the product

- automatic final submission;
- bypassing Android permissions or app security;
- silently uploading images;
- storing provider credentials in the repository;
- generating non-English metadata.

## Out of scope for this bootstrap

- production AutoJs6 automation;
- real Android gallery or content-resolver access;
- real AI Vision network calls;
- Contributor app UI selectors or interaction logic;
- reconstruction of historical/versioned modules;
- credential storage or provider-specific configuration.

The current Node.js code is limited to an offline harness for validating
runtime-neutral rules.
