# Cursor Rules for Raycast Extensions

This repository contains Cursor rules specifically designed for working with Raycast extensions. These rules help streamline the development, testing, and review process for Raycast extensions.

## Available Rules

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

### 3. **Raycast Extension Development** (`rules/development.mdc`)
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

## Usage

These rules are designed to be used with Cursor's AI assistant. They provide context-aware guidance for:

- **Extension Development**: Proper setup and testing workflows
- **PR Reviews**: Efficient review and testing of extension changes
- **Publishing**: Safe deployment of extension updates

## Installation

1. Clone this repository to your local machine
2. In Cursor, these rules will be automatically available when working in Raycast extension projects
3. The rules are designed to be context-aware and will activate based on your current task

## File Structure

```
raycast-extension-cursor-rules/
├── README.md          # This file
├── rules/             # Cursor rules directory
│   ├── testing.mdc        # Testing workflow rules
│   ├── reviews.mdc        # PR review workflow rules
│   ├── development.mdc    # Development best practices
│   └── troubleshooting.mdc # Troubleshooting guide
├── scripts/           # Utility scripts
│   └── validate-rules.js  # Rule validation script
├── package.json       # Project metadata
└── .gitignore         # Git ignore file
```

## Contributing

When adding new rules:

1. Create a new `.mdc` file with a descriptive name
2. Use the YAML frontmatter format with `description` and `alwaysApply` fields
3. Structure the content with clear headings and code examples
4. Update this README to document the new rule

## Rule Format

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

## Best Practices

- Keep rules focused on specific workflows
- Include practical code examples
- Provide troubleshooting guidance
- Use clear, actionable language
- Test rules in real scenarios before committing

## License

This project is open source and available under the MIT License.
