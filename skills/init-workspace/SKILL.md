---
name: init-workspace
description: >-
  Runs the workspace bootstrap script that git-inits cursor-rules and raycast-extensions when needed,
  copies cursor-rules skills into .cursor/skills/, and npm installs each Raycast extension under
  raycast-extensions/extensions/. Use when cloning or setting up this workspace, syncing skills after
  pulling cursor-rules changes, refreshing extension dependencies, or when the user asks to run
  init-workspace or initialize the Raycast workspace.
---

# Init workspace (script)

Prefer **running the script** over reimplementing its steps manually.

## When to run

- First-time or fresh setup after clone
- After pulling changes under `cursor-rules/skills/` (so Cursor picks up updated skills)
- When extensions need a clean `npm install` across `raycast-extensions/extensions/`
- User mentions init-workspace, workspace setup, or syncing skills

## Command

From the **workspace root** (directory that contains `cursor-rules/`; parent of `cursor-rules`, not inside `cursor-rules/`):

```bash
node cursor-rules/scripts/init-workspace.js
```

The script may also be invoked from `cursor-rules/` (it resolves the workspace root automatically).

## What it does

1. **`git init`** on `cursor-rules` and `raycast-extensions` if those folders exist and are not already git repos
2. **Skills sync**: for each subdirectory of `cursor-rules/skills/` that contains `SKILL.md`, replaces `.cursor/skills/<name>/` with a copy from source
3. **Extensions**: for each `raycast-extensions/extensions/<ext>/` with `package.json`, removes `node_modules` if present and runs `npm install` (with engine ignores and raised ulimits as implemented in the script)

If Node 23 is in use, the script may log that `--ignore-engines` is applied for extension installs.

## Agent notes

- **Do not** hand-copy skill folders unless the script cannot run; default is to execute the command above and read output for errors.
- If `raycast-extensions/extensions/` is missing, the script skips that section; if `cursor-rules/skills/` is missing, skills sync is skipped.
