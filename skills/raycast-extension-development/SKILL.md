---
name: raycast-extension-development
description: >-
  Starts and structures Raycast extension work: locate the extension folder, sync git, create a
  feature branch, install deps, and run dev from the extension directory (ray develop or npm run dev).
  Use when beginning work on a Raycast extension, after the user names an extension or says to start
  development, or when fixing "cannot read package manifest" / wrong cwd issues.
---

# Raycast extension development (start workflow)

## Project layout (typical)

```
extension-name/
├── package.json
├── src/           # e.g. index.tsx, components/, lib/, types/
├── assets/
├── .eslintrc.js
├── tsconfig.json
└── README.md
```

Monorepos often nest extensions as `extensions/<extension-name>/` or similar—resolve with search, do not assume a single global path.

## Assistant workflow (order is mandatory)

1. **Find the extension** – Search for `**/<extension-name>/package.json` (or equivalent). If multiple matches, ask which directory.
2. **Verify** – That folder is the extension root (valid `package.json` with Raycast metadata).
3. **Before any code changes:**
  - **Ask** what feature, bug, or improvement to implement.
  - **Pull** latest from the default remote branch (usually `main`; use repo convention if different).
  - **Create and check out** a new branch (`feature/…`, `bugfix/…`, `improvement/…`, or `hotfix/…`).
4. **Setup** – `npm install` in the **extension** directory.
5. **Run dev** – From that same directory: `ray develop` **or** `npm run dev` (whichever the project uses).
6. **Confirm** – Extension appears in Raycast; smoke-test and hot reload.
7. **Then** implement the requested work.

**Never** implement changes before: user goal is stated, branch exists, and latest upstream is integrated (per team practice).

## User / shell workflow (reference)

```bash
cd /path/to/extension-name   # extension root only

git pull origin main         # or the repo’s default branch
git checkout -b feature/short-description

npm install
ray develop                  # preferred if Raycast CLI installed
# or: npm run dev
```

**Critical:** Run `ray develop` / `npm run dev` / `npm run build` only inside the extension directory. From a parent repo root, Raycast may error with cannot read package manifest / package.json.

## Branch naming


| Prefix         | Use            | Example                   |
| -------------- | -------------- | ------------------------- |
| `feature/`     | New capability | `feature/add-preferences` |
| `bugfix/`      | Fixes          | `bugfix/fix-search-error` |
| `improvement/` | Refactor, deps | `improvement/update-deps` |
| `hotfix/`      | Urgent         | `hotfix/security-patch`   |


## Commands (extension directory)


| Task    | Command                             |
| ------- | ----------------------------------- |
| Deps    | `npm install`                       |
| Dev     | `ray develop` or `npm run dev`      |
| Build   | `npm run build`                     |
| Lint    | `npm run lint` / `npm run fix-lint` |
| Types   | `npm run type-check`                |
| Publish | `npm run publish`                   |


## Conventions

- **TypeScript** for new code; strict config; types for props and state.
- **React:** functional components, hooks; follow Raycast UI patterns.
- **Commits:** conventional prefixes—`feat:`, `fix:`, `docs:`, `style:`, `refactor:`, `test:`, `chore:`.

## Minimal API reminders

```tsx
import { ActionPanel, Action, List, Form, getPreferenceValues, LocalStorage, Clipboard } from "@raycast/api";
// List + ActionPanel for commands; Form + Action.SubmitForm for forms;
// getPreferenceValues<T>(); LocalStorage.setItem/getItem; Clipboard.copy/paste
```

See [Raycast API](https://developers.raycast.com/) for full component and API details.

## Testing and quality

- Cover main flows, failures (network, bad input), and basic performance.
- Before publish: TS clean, lint clean, build succeeds, README and assets updated, preferences and errors handled.

## Troubleshooting


| Symptom                             | Likely cause                | Fix                                      |
| ----------------------------------- | --------------------------- | ---------------------------------------- |
| Cannot read package.json / manifest | Commands run from repo root | `cd` to extension root, rerun            |
| Extension not found                 | Name ≠ directory            | Search for `package.json`; confirm path  |
| Dev won’t start                     | Missing deps / wrong cwd    | `npm install` in extension dir           |
| `git pull` conflicts                | Local vs remote             | Stash, pull, pop, or resolve per team    |
| Branch exists                       | Name collision              | Rename branch or delete old local branch |


Debug: Raycast developer tools / console; ensure API calls and cwd are correct.

## Publishing checklist

- No TypeScript errors; lint passes; build passes  
- Behavior tested; README and assets updated  
- Preferences and error handling verified

For Store requirements and manifest review, use the project skill **raycast-extension-review** (fetches current developer docs).