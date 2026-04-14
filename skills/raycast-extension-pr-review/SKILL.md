---
name: raycast-extension-pr-review
description: >-
  Checks out and runs Raycast extensions from github.com/raycast/extensions pull requests via sparse
  clone of the contributor fork, then npm install and dev. Use when reviewing extension PRs,
  testing a fork locally, or when the user shares a Raycast extensions PR URL or needs the checkout
  workflow.
---

# Raycast extension PR review (local checkout)

## Goal

Review an extension change by running it locally from the PR’s fork and branch, without cloning the full [raycast/extensions](https://github.com/raycast/extensions) repo.

## Prerequisites

- **Extensions root**: Directory where individual extension folders live (parent of each `extension-name/`). Set `RAYCAST_EXTENSIONS_ROOT` for the session, or substitute a concrete path (see project/workspace rules if documented).
- **Values for the PR** (from the PR UI if not using automation):
  - **FORK_URL**: Contributor repo HTTPS URL (PR → compare branch → **Code** on the incoming ref).
  - **BRANCH**: Head branch name (shown next to the ref).
  - **EXTENSION_NAME**: Folder under `extensions/` changed in **Files changed** (e.g. `notion`).

Optional: use [GitHub CLI](https://cli.github.com/) to read `headRepository.url` / `headRefName` from `gh pr view <url> --json headRepository,headRefName`. Extension folder name may still require inspecting **Files changed**.

## Checkout and run

```bash
# Set per PR (and extensions root)
RAYCAST_EXTENSIONS_ROOT="${RAYCAST_EXTENSIONS_ROOT:?set to your local extensions parent directory}"
BRANCH="ext/example-branch"
FORK_URL="https://github.com/contributor/raycast-extensions.git"
EXTENSION_NAME="example-extension"

rm -rf "${RAYCAST_EXTENSIONS_ROOT:?}/${EXTENSION_NAME}"

git clone -n --depth=1 --filter=tree:0 -b "${BRANCH}" "${FORK_URL}" temp-pr
cd temp-pr
git sparse-checkout set --no-cone "extensions/${EXTENSION_NAME}"
git checkout

mv "extensions/${EXTENSION_NAME}" "${RAYCAST_EXTENSIONS_ROOT}/" && cd "${RAYCAST_EXTENSIONS_ROOT}" && rm -rf temp-pr

cd "${EXTENSION_NAME}"
npm install && npm run dev
```

**Git for publish** (only if needed; extension must be in a git repo to publish):

```bash
if [ ! -d ".git" ]; then
  git init
  git add .
  git commit -m "Initial commit"
fi
```

## Verify

- Current directory lists extension files (package.json, src, etc.).
- In Raycast, the extension loads from this folder after `npm run dev`.

## Publishing (when ready)

From the extension directory: `npm run publish` (requires confirmation). Must be inside a git repository.

## Troubleshooting

- **Nested or wrong folder**: Confirm `EXTENSION_NAME` matches `extensions/<name>` on the fork.
- **Sparse checkout fails**: Fall back to a full clone of the fork, then copy `extensions/<EXTENSION_NAME>` out.
- **`npm install` fails**: Confirm cwd is the extension root (where `package.json` is).
- **`git init` issues**: Run only from the extension directory.

## Review tips

- `git diff` against default branch when comparing to upstream expectations.
- Exercise real workflows and edge cases in Raycast.
- `npm run lint` and `npm run build` when available.

## PR URL convention

Users may reference PRs like:

```text
@https://github.com/raycast/extensions/pull/PR_NUMBER
```

Extract PR number and resolve fork URL, branch, and extension folder as above.
