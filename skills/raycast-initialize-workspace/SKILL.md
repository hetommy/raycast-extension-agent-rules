---
name: raycast-initialize-workspace
description: >-
  Runs the workspace bootstrap script that git-inits cursor-rules and raycast-extensions when needed,
  copies cursor-rules skills into .cursor/skills/, and npm installs each Raycast extension under
  raycast-extensions/extensions/. Use when cloning or setting up this workspace, syncing skills after
  pulling cursor-rules changes, refreshing extension dependencies, or when the user asks to run
  raycast-initialize-workspace or initialize the Raycast workspace.
---

# Raycast: initialize workspace

Prefer **running the script** over reimplementing its steps manually.

## Prerequisites

- **Node.js** and **npm** on `PATH` (the script is invoked with `node` and runs `npm install` in each extension).

## When to run

- First-time or fresh setup after clone
- After pulling changes under `cursor-rules/skills/` (so Cursor picks up updated skills)
- When extensions need a clean `npm install` across `raycast-extensions/extensions/`
- User mentions raycast-initialize-workspace, workspace setup, or syncing skills

## Command

From the **workspace root** (directory that contains `cursor-rules/`; parent of `cursor-rules`, not inside `cursor-rules/`):

```bash
node cursor-rules/scripts/init-workspace.js
```

The script may also be invoked from `cursor-rules/` (it resolves the workspace root automatically).

## What it does

1. **`git init`** on `cursor-rules` and `raycast-extensions` if those folders exist and are not already git repos (logs and continues if a folder is missing or `git init` fails).

2. **Skills sync**
   - Ensures `.cursor/` and `.cursor/skills/` exist.
   - For each subdirectory of `cursor-rules/skills/` that contains `SKILL.md`, replaces `.cursor/skills/<name>/` with a full copy from source.
   - Subdirectories **without** `SKILL.md` are skipped (logged).

3. **Extensions**
   - For each `raycast-extensions/extensions/<ext>/` with `package.json`, removes `node_modules` if present, then runs `npm install --ignore-engines` with raised ulimits (macOS) to avoid extract issues.
   - **`--ignore-engines` is always used** for extension installs. If **Node 23** is detected, the script logs an extra line explaining why engines are ignored.
   - A failed install for one extension is logged in red; the script **continues** with other extensions.

If `raycast-extensions/extensions/` is missing, that section is skipped. If `cursor-rules/skills/` is missing, skills sync is skipped.

## Success and verification

- Console ends with **`Done.`** and summary lines (git status, skill sync count, extension install count).
- After a run, `.cursor/skills/<skill-name>/` should mirror `cursor-rules/skills/<skill-name>/` for each synced skill.

## Agent notes

- **Do not** hand-copy skill folders unless the script cannot run; default is to execute the command above and read output for errors.
- **`.mdc` rules** under `cursor-rules` are not copied by this script (see `cursor-rules/README.md` if rules need wiring into `.cursor/rules/`).
- For day-to-day work on a single extension after setup, use the **raycast-extension-development** skill (branch, `npm install` in the extension dir, `ray develop` / `npm run dev`).
