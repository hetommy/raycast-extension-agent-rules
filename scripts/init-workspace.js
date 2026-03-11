#!/usr/bin/env node

/**
 * Initialize the workspace: cursor-rules and raycast-extensions.
 * Run from repo root (parent of cursor-rules and raycast-extensions) or from cursor-rules/.
 *
 * - cursor-rules: validates rules, then syncs rules into .cursor/rules so Cursor picks them up.
 * - raycast-extensions: runs npm install in each extension that has a package.json.
 */

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const colors = {
  green: "\x1b[32m",
  red: "\x1b[31m",
  yellow: "\x1b[33m",
  cyan: "\x1b[36m",
  reset: "\x1b[0m",
};

function log(msg, color = "reset") {
  console.log(`${colors[color]}${msg}${colors.reset}`);
}

function getWorkspaceRoot() {
  const scriptDir = __dirname;
  const cursorRulesDir = path.dirname(scriptDir);
  const cursorRulesName = path.basename(cursorRulesDir);
  if (cursorRulesName === "cursor-rules") {
    return path.dirname(cursorRulesDir);
  }
  return cursorRulesDir;
}

function initCursorRules(workspaceRoot) {
  const cursorRulesDir = path.join(workspaceRoot, "cursor-rules");
  const rulesDir = path.join(cursorRulesDir, "rules");
  const cursorDir = path.join(workspaceRoot, ".cursor");
  const cursorRulesDest = path.join(cursorDir, "rules");

  if (!fs.existsSync(rulesDir)) {
    log("cursor-rules/rules not found; skipping cursor-rules init.", "yellow");
    return;
  }

  log("\n--- cursor-rules ---", "cyan");
  const validateScript = path.join(cursorRulesDir, "scripts", "validate-rules.js");
  if (fs.existsSync(validateScript)) {
    try {
      execSync(`node "${validateScript}"`, {
        cwd: cursorRulesDir,
        stdio: "inherit",
      });
    } catch {
      log("Rule validation failed; continuing with sync.", "yellow");
    }
  }

  if (!fs.existsSync(cursorDir)) {
    fs.mkdirSync(cursorDir, { recursive: true });
  }
  if (!fs.existsSync(cursorRulesDest)) {
    fs.mkdirSync(cursorRulesDest, { recursive: true });
  }

  const files = fs.readdirSync(rulesDir).filter((f) => f.endsWith(".mdc"));
  for (const file of files) {
    const src = path.join(rulesDir, file);
    const dest = path.join(cursorRulesDest, file);
    fs.copyFileSync(src, dest);
    log(`  Synced ${file} -> .cursor/rules/`, "green");
  }
  log("cursor-rules: validated and synced to .cursor/rules", "green");
}

function initRaycastExtensions(workspaceRoot) {
  const extRoot = path.join(workspaceRoot, "raycast-extensions", "extensions");
  if (!fs.existsSync(extRoot)) {
    log("raycast-extensions/extensions not found; skipping.", "yellow");
    return;
  }

  const nodeMajor = parseInt(process.version.slice(1).split(".")[0], 10);
  if (nodeMajor === 23) {
    log("Node 23 detected: using --ignore-engines for npm install (some deps expect 20/22/24).", "yellow");
  }

  log("\n--- raycast-extensions ---", "cyan");
  const dirs = fs.readdirSync(extRoot, { withFileTypes: true }).filter((d) => d.isDirectory());
  let count = 0;
  for (const dir of dirs) {
    const pkgPath = path.join(extRoot, dir.name, "package.json");
    if (!fs.existsSync(pkgPath)) continue;
    const cwd = path.join(extRoot, dir.name);
    const nodeModules = path.join(cwd, "node_modules");
    if (fs.existsSync(nodeModules)) {
      fs.rmSync(nodeModules, { recursive: true });
    }
    try {
      // Raise ulimits to avoid EFBIG "file too large" during npm extract on macOS
      const cmd =
        "ulimit -n 10240 2>/dev/null; ulimit -f unlimited 2>/dev/null; npm install --ignore-engines";
      execSync(cmd, { cwd, stdio: "pipe", encoding: "utf8", shell: true });
      log(`  npm install: extensions/${dir.name}`, "green");
      count++;
    } catch (e) {
      log(`  npm install failed: extensions/${dir.name}`, "red");
      const out = [e.stdout, e.stderr].filter(Boolean).join("\n");
      if (out) console.error(out.trim());
    }
  }
  log(`raycast-extensions: npm install in ${count} extension(s)`, "green");
}

function main() {
  const workspaceRoot = getWorkspaceRoot();
  log(`Workspace root: ${workspaceRoot}`, "cyan");
  initCursorRules(workspaceRoot);
  initRaycastExtensions(workspaceRoot);
  log("\nDone.", "cyan");
}

main();
