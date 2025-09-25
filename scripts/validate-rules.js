#!/usr/bin/env node

/**
 * Validation script for Cursor rules
 * Checks that all .mdc files have proper YAML frontmatter
 */

const fs = require('fs');
const path = require('path');

// ANSI color codes for console output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  reset: '\x1b[0m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function validateRuleFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  
  // Check if file starts with YAML frontmatter
  if (!lines[0].startsWith('---')) {
    return { valid: false, error: 'Missing YAML frontmatter start (---)' };
  }
  
  // Find end of frontmatter
  const endIndex = lines.findIndex((line, index) => index > 0 && line.trim() === '---');
  if (endIndex === -1) {
    return { valid: false, error: 'Missing YAML frontmatter end (---)' };
  }
  
  // Extract frontmatter
  const frontmatter = lines.slice(1, endIndex).join('\n');
  
  // Check for required fields
  const requiredFields = ['description', 'alwaysApply'];
  const missingFields = [];
  
  for (const field of requiredFields) {
    if (!frontmatter.includes(`${field}:`)) {
      missingFields.push(field);
    }
  }
  
  if (missingFields.length > 0) {
    return { 
      valid: false, 
      error: `Missing required fields: ${missingFields.join(', ')}` 
    };
  }
  
  // Check if there's content after frontmatter
  const contentAfterFrontmatter = lines.slice(endIndex + 1).join('\n').trim();
  if (!contentAfterFrontmatter) {
    return { valid: false, error: 'No content after frontmatter' };
  }
  
  return { valid: true };
}

function main() {
  const rulesDir = path.join(__dirname, '..', 'rules');
  const files = fs.readdirSync(rulesDir);
  const mdcFiles = files.filter(file => file.endsWith('.mdc'));
  
  log(`\n🔍 Validating ${mdcFiles.length} AI agent rule files...\n`);
  
  let validCount = 0;
  let invalidCount = 0;
  
  for (const file of mdcFiles) {
    const filePath = path.join(rulesDir, file);
    const result = validateRuleFile(filePath);
    
    if (result.valid) {
      log(`✅ ${file}`, 'green');
      validCount++;
    } else {
      log(`❌ ${file}: ${result.error}`, 'red');
      invalidCount++;
    }
  }
  
  log(`\n📊 Summary:`, 'yellow');
  log(`   Valid files: ${validCount}`, 'green');
  log(`   Invalid files: ${invalidCount}`, invalidCount > 0 ? 'red' : 'green');
  
  if (invalidCount > 0) {
    log(`\n❌ Some files failed validation. Please fix the issues above.`, 'red');
    process.exit(1);
  } else {
    log(`\n🎉 All rule files are valid!`, 'green');
  }
}

if (require.main === module) {
  main();
}

module.exports = { validateRuleFile };
