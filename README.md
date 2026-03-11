# AI Agent Rules for Raycast Extensions

This repository contains AI agent rules specifically designed for working with Raycast extensions. These rules help streamline the development, testing, and review process for Raycast extensions.

## 🎯 Available Rules

### 1. **Testing Raycast Extensions** (`rules/testing.mdc`)
- **Purpose**: Ensures proper testing workflow when working with Raycast extensions
- **Key Features**:
  - Critical directory navigation guidance
  - Common mistake prevention
  - Step-by-step verification process
  - Integration with PR review workflow

### 2. **Reviewing Raycast Extension PRs** (`rules/reviews.mdc`)
- **Purpose**: Streamlines the PR review process for Raycast extensions
- **Key Features**:
  - Automated PR URL parsing
  - Sparse checkout for efficient cloning
  - Complete setup workflow
  - Publishing guidance
  - Troubleshooting tips

### 3. **Raycast Extension Development** (`rules/start development.mdc`)
- **Purpose**: General development best practices and patterns
- **Key Features**:
  - Project structure guidelines
  - Essential commands and workflows
  - Common React/TypeScript patterns
  - API usage examples
  - Publishing checklist

### 4. **Troubleshooting Guide** (`rules/troubleshooting.mdc`)
- **Purpose**: Comprehensive troubleshooting for common issues
- **Key Features**:
  - Common problems and solutions
  - Debug tools and techniques
  - Performance monitoring
  - Getting help resources

## 🚀 Usage

These rules are designed to be used with AI agents and assistants. They provide context-aware guidance for:

- **Extension Development**: Proper setup and testing workflows
- **PR Reviews**: Efficient review and testing of extension changes
- **Publishing**: Safe deployment of extension updates

## 📦 Installation

1. Clone this repository to your local machine
2. (Optional) From the **workspace root** (parent of `cursor-rules` and `raycast-extensions`), run:
   ```bash
   node cursor-rules/scripts/init-workspace.js
   ```
   This validates rules, syncs them to `.cursor/rules`, and runs `npm install` in each Raycast extension.
3. These rules will be automatically available when working in Raycast extension projects with AI agents
4. The rules are designed to be context-aware and will activate based on your current task

## ✅ Validation

To validate that all rule files are properly formatted:

```bash
node scripts/validate-rules.js
```

## 📁 File Structure

```
raycast-extension-agent-rules/
├── README.md              # This file
├── rules/                 # AI agent rules directory
│   ├── testing.mdc           # Testing workflow rules
│   ├── reviews.mdc           # PR review workflow rules
│   ├── start development.mdc # Development best practices
│   └── troubleshooting.mdc   # Troubleshooting guide
├── scripts/               # Utility scripts
│   ├── init-workspace.js     # Init cursor-rules + raycast-extensions
│   └── validate-rules.js     # Rule validation script
└── .gitignore             # Git ignore file
```

## 🤝 Contributing

We welcome contributions! When adding new rules:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/your-rule-name`
3. **Add your rule**: Create a new `.mdc` file with a descriptive name
4. **Follow the format**: Use YAML frontmatter with `description` and `alwaysApply` fields
5. **Test your rule**: Run `node scripts/validate-rules.js` to ensure it's properly formatted
6. **Update documentation**: Update this README to document the new rule
7. **Submit a PR**: Create a pull request with a clear description

## 📝 Rule Format

Each rule file follows this structure:

```yaml
---
description: Brief description of the rule
alwaysApply: false
---

# Rule Title

## Section 1
Content with code examples and explanations

## Section 2
More content...
```

## 🎨 Best Practices

- Keep rules focused on specific workflows
- Include practical code examples
- Provide troubleshooting guidance
- Use clear, actionable language
- Test rules in real scenarios before committing
- Follow the existing naming conventions

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🔗 Links

- **Repository**: [raycast-extension-agent-rules](https://github.com/hetommy/raycast-extension-agent-rules)
- **Issues**: [Report a bug or request a feature](https://github.com/hetommy/raycast-extension-agent-rules/issues)
- **Discussions**: [Join the conversation](https://github.com/hetommy/raycast-extension-agent-rules/discussions)

---

**Made with ❤️ for the Raycast extension development community**