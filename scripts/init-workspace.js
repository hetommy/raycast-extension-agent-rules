#!/usr/bin/env node

/**
 * Initialize the workspace: cursor-rules and raycast-extensions.
 * Run from repo root (parent of cursor-rules and raycast-extensions) or from cursor-rules/.
 *
 * - cursor-rules / raycast-extensions: git init if the folder exists and is not already a repo.
 * - cursor-rules: syncs skills (directories under cursor-rules/skills/) into .cursor/skills/.
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

function gitInitIfNeeded(repoPath, label) {
  if (!fs.existsSync(repoPath)) {
    log(`${label}: not found; skipping git init.`, "yellow");
    return;
  }
  const gitDir = path.join(repoPath, ".git");
  if (fs.existsSync(gitDir)) {
    log(`  ${label}: already a git repository`, "green");
    return;
  }
  try {
    execSync("git init", { cwd: repoPath, stdio: "inherit" });
    log(`  ${label}: git init`, "green");
  } catch {
    log(`  ${label}: git init failed`, "red");
  }
}

function initCursorSkills(workspaceRoot) {
  const cursorRulesDir = path.join(workspaceRoot, "cursor-rules");
  const skillsSrcRoot = path.join(cursorRulesDir, "skills");
  const cursorDir = path.join(workspaceRoot, ".cursor");
  const skillsDestRoot = path.join(cursorDir, "skills");

  if (!fs.existsSync(skillsSrcRoot)) {
    log("cursor-rules/skills not found; skipping skills sync.", "yellow");
    return;
  }

  log("\n--- cursor-rules (skills) ---", "cyan");

  if (!fs.existsSync(cursorDir)) {
    fs.mkdirSync(cursorDir, { recursive: true });
  }
  if (!fs.existsSync(skillsDestRoot)) {
    fs.mkdirSync(skillsDestRoot, { recursive: true });
  }

  const entries = fs.readdirSync(skillsSrcRoot, { withFileTypes: true }).filter((d) => d.isDirectory());
  let synced = 0;
  for (const entry of entries) {
    const name = entry.name;
    const src = path.join(skillsSrcRoot, name);
    const skillMd = path.join(src, "SKILL.md");
    if (!fs.existsSync(skillMd)) {
      log(`  Skip ${name}/ (no SKILL.md)`, "yellow");
      continue;
    }
    const dest = path.join(skillsDestRoot, name);
    if (fs.existsSync(dest)) {
      fs.rmSync(dest, { recursive: true, force: true });
    }
    fs.cpSync(src, dest, { recursive: true });
    log(`  Synced skills/${name}/ -> .cursor/skills/${name}/`, "green");
    synced++;
  }
  log(`cursor-rules: ${synced} skill(s) synced to .cursor/skills`, "green");
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

  log("\n--- git (workspace repos) ---", "cyan");
  gitInitIfNeeded(path.join(workspaceRoot, "cursor-rules"), "cursor-rules");
  gitInitIfNeeded(path.join(workspaceRoot, "raycast-extensions"), "raycast-extensions");

  initCursorSkills(workspaceRoot);
  initRaycastExtensions(workspaceRoot);
  log("\nDone.", "cyan");
}

main();
