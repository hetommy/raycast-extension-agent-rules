# AI Agent Rules for Raycast Extensions

This repository contains Cursor **rules** (`.mdc`) and **agent skills** for working with Raycast extensions: development, testing, review, and Store readiness.

## Rules (`rules/`)

These `.mdc` files are reference material for AI agents. Wire them into Cursor manually (for example copy or symlink into your project’s `.cursor/rules/`, or attach them per task)—they are **not** copied by `init-workspace.js`.

### 1. **Testing Raycast Extensions** (`rules/testing.mdc`)

- Testing workflow, directory navigation, and verification steps.

### 2. **Reviewing Raycast Extension PRs** (`rules/reviews.mdc`)

- PR URLs, sparse checkout, local run, publishing notes, troubleshooting.

### 3. **Raycast Extension Development** (`rules/start development.mdc`)

- Project layout, git workflow, commands, patterns, publishing checklist.

### 4. **Troubleshooting Guide** (`rules/troubleshooting.mdc`)

- Common issues, debugging, performance, getting help.

## Agent skills (`skills/`)

Each skill is a directory with a `SKILL.md` file (YAML frontmatter + instructions). They are designed for Cursor’s **Skills** feature.


| Skill                           | Purpose                                                                              |
| ------------------------------- | ------------------------------------------------------------------------------------ |
| `raycast-initialize-workspace`  | Runs `scripts/init-workspace.js`: git init, skills → `.cursor/skills/`, `npm install` in extensions. |
| `raycast-extension-review`      | Store/manifest review using current Raycast developer docs (fetched live).           |
| `raycast-extension-pr-review`   | Check out and run extensions from `github.com/raycast/extensions` PRs locally.       |
| `raycast-extension-development` | Start-of-workflow: locate extension, branch, install, `ray develop` / `npm run dev`. |


Run `**init-workspace.js`** from your **workspace root** (parent of `cursor-rules` and `raycast-extensions`) to copy these into `.cursor/skills/` so Cursor can discover them. The **`raycast-initialize-workspace`** skill tells the agent to execute that script instead of redoing the steps by hand.

## Usage

- **Rules**: Use as project or ad hoc context in Cursor (see above).
- **Skills**: Sync with `init-workspace.js`, then use or @-mention them in the agent as needed.

## Installation

1. Clone this repository.
2. (Optional) From the **workspace root**, run:
  ```bash
   node cursor-rules/scripts/init-workspace.js
  ```
   This script:
  - Runs `git init` on `cursor-rules` and `raycast-extensions` when the folder exists and is not already a Git repository.
  - Copies each valid skill under `cursor-rules/skills/<name>/` (must contain `SKILL.md`) to `.cursor/skills/<name>/`.
  - Runs `npm install` in each extension under `raycast-extensions/extensions/` that has a `package.json`.

## File structure

```
cursor-rules/
├── README.md                 # This file
├── rules/                    # .mdc rules (manual install into .cursor/rules if desired)
│   ├── testing.mdc
│   ├── reviews.mdc
│   ├── start development.mdc
│   └── troubleshooting.mdc
├── skills/                   # Cursor agent skills (synced by init-workspace.js)
│   ├── raycast-initialize-workspace/
│   ├── raycast-extension-review/
│   ├── raycast-extension-pr-review/
│   └── raycast-extension-development/
├── scripts/
│   └── init-workspace.js     # Git init, skills → .cursor/skills, npm install in extensions
└── .gitignore
```

## Contributing

**Rules**

1. Fork and create a branch: `git checkout -b feature/your-rule-name`
2. Add a `.mdc` file under `rules/` with YAML frontmatter (`description`, `alwaysApply`, etc.).
3. Update this README if you add a new rule.

**Skills**

1. Add a directory under `skills/<skill-name>/` with a `SKILL.md`. Follow [Agent Skills](https://cursor.com/docs/context/skills) for frontmatter and layout.
2. Keep the description field specific (third person, what + when).
3. Run `node cursor-rules/scripts/init-workspace.js` from the workspace root to verify sync, or copy `skills/<name>/` to `.cursor/skills/<name>/` manually.

## Rule format (`.mdc`)

```yaml
---
description: Brief description of the rule
alwaysApply: false
---

# Rule Title

## Section 1
Content with code examples and explanations
```

## Best practices

- Keep rules and skills focused on one workflow each.
- Prefer linking official Raycast docs over duplicating API details.
- Test changes against a real extension when possible.

## License

This project is open source and available under the [MIT License](LICENSE).

## Links

- **Repository**: [raycast-extension-agent-rules](https://github.com/hetommy/raycast-extension-agent-rules)
- **Issues**: [Report a bug or request a feature](https://github.com/hetommy/raycast-extension-agent-rules/issues)
- **Discussions**: [Join the conversation](https://github.com/hetommy/raycast-extension-agent-rules/discussions)

---

Made for the Raycast extension development community.