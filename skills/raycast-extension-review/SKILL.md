---
name: raycast-extension-review
description: >-
  Creates and reviews Raycast extensions against official Store requirements. Use when building new
  Raycast extensions, preparing for Store submission, reviewing package.json/manifest, or when the
  user asks about Raycast extension guidelines. Fetches latest docs to stay current.
---

# Raycast Extension Review

## Workflow

When creating or reviewing a Raycast extension:

1. **Fetch the current guidelines** – Use the environment’s URL fetch tool (e.g. `WebFetch`) to load the latest content from:
   - [Prepare for Store](https://developers.raycast.com/basics/prepare-an-extension-for-store)
   - [Manifest reference](https://developers.raycast.com/information/manifest)

2. **Apply the fetched guidelines** – Do not rely on hardcoded rules. Use only what the fetched pages specify. If the docs conflict with prior knowledge, follow the docs.

3. **Report findings** – Structure feedback as compliant / must fix / optional, and cite the source URL for each point.

## Principles

- **Source of truth** – The Raycast developer docs are authoritative. When in doubt, fetch again.
- **Cite sources** – When giving guidance, reference the URL (and section if applicable) so the user can verify.
