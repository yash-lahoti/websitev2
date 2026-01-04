#!/usr/bin/env node

/**
 * CSS Class Extraction and Comparison Tool
 * 
 * This script extracts CSS class names from:
 * 1. React App CSS files (src/index.css, src components with .scss)
 * 2. SnapFolio CSS file (public/snapfolio/assets/css/main.css)
 * 
 * Usage: node extract-css-classes.js
 */

const fs = require('fs');
const path = require('path');

// Colors for terminal output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

function extractClassesFromCSS(cssContent, filePath) {
  const classes = new Set();
  
  // Match CSS class selectors: .class-name, .class-name:hover, etc.
  const classRegex = /\.([a-zA-Z0-9_-]+)(?::[a-zA-Z-]+)?(?:\s|,|{)/g;
  
  let match;
  while ((match = classRegex.exec(cssContent)) !== null) {
    const className = match[1];
    // Skip pseudo-classes and pseudo-elements that might be captured
    if (!className.startsWith('_') && !className.includes('::')) {
      classes.add(className);
    }
  }
  
  // Also extract from nested selectors like .parent .child
  const nestedRegex = /\.([a-zA-Z0-9_-]+)\s+\.([a-zA-Z0-9_-]+)/g;
  while ((match = nestedRegex.exec(cssContent)) !== null) {
    classes.add(match[1]);
    classes.add(match[2]);
  }
  
  return classes;
}

function readFile(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch (error) {
    console.error(`${colors.red}Error reading ${filePath}: ${error.message}${colors.reset}`);
    return '';
  }
}

function getAllFiles(dir, extensions = ['.css', '.scss']) {
  const files = [];
  
  function walkDir(currentPath) {
    const entries = fs.readdirSync(currentPath, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(currentPath, entry.name);
      
      if (entry.isDirectory()) {
        // Skip node_modules and dist
        if (!['node_modules', 'dist', '.git'].includes(entry.name)) {
          walkDir(fullPath);
        }
      } else if (entry.isFile()) {
        const ext = path.extname(entry.name);
        if (extensions.includes(ext)) {
          files.push(fullPath);
        }
      }
    }
  }
  
  walkDir(dir);
  return files;
}

function main() {
  console.log(`${colors.cyan}=== CSS Class Extraction and Comparison ===${colors.reset}\n`);
  
  const reactAppClasses = new Set();
  const snapfolioClasses = new Set();
  
  // Extract from React App CSS files
  console.log(`${colors.blue}Extracting classes from React App...${colors.reset}`);
  const reactFiles = [
    'src/index.css',
    ...getAllFiles('src', ['.scss', '.css'])
  ];
  
  reactFiles.forEach(file => {
    if (fs.existsSync(file)) {
      const content = readFile(file);
      const classes = extractClassesFromCSS(content, file);
      classes.forEach(cls => reactAppClasses.add(cls));
      console.log(`  ${colors.green}✓${colors.reset} ${file} (${classes.size} classes)`);
    }
  });
  
  // Extract from SnapFolio CSS
  console.log(`\n${colors.blue}Extracting classes from SnapFolio...${colors.reset}`);
  const snapfolioFile = 'public/snapfolio/assets/css/main.css';
  if (fs.existsSync(snapfolioFile)) {
    const content = readFile(snapfolioFile);
    const classes = extractClassesFromCSS(content, snapfolioFile);
    classes.forEach(cls => snapfolioClasses.add(cls));
    console.log(`  ${colors.green}✓${colors.reset} ${snapfolioFile} (${classes.size} classes)`);
  }
  
  // Find common classes
  const commonClasses = new Set();
  reactAppClasses.forEach(cls => {
    if (snapfolioClasses.has(cls)) {
      commonClasses.add(cls);
    }
  });
  
  // Find React-only classes
  const reactOnly = new Set();
  reactAppClasses.forEach(cls => {
    if (!snapfolioClasses.has(cls)) {
      reactOnly.add(cls);
    }
  });
  
  // Find SnapFolio-only classes
  const snapfolioOnly = new Set();
  snapfolioClasses.forEach(cls => {
    if (!reactAppClasses.has(cls)) {
      snapfolioOnly.add(cls);
    }
  });
  
  // Print results
  console.log(`\n${colors.cyan}=== Results ===${colors.reset}\n`);
  console.log(`React App Classes: ${colors.yellow}${reactAppClasses.size}${colors.reset}`);
  console.log(`SnapFolio Classes: ${colors.yellow}${snapfolioClasses.size}${colors.reset}`);
  console.log(`Common Classes: ${colors.red}${commonClasses.size}${colors.reset}`);
  console.log(`React-Only Classes: ${colors.green}${reactOnly.size}${colors.reset}`);
  console.log(`SnapFolio-Only Classes: ${colors.magenta}${snapfolioOnly.size}${colors.reset}`);
  
  // Print common classes (potential conflicts)
  if (commonClasses.size > 0) {
    console.log(`\n${colors.red}⚠️  COMMON CLASSES (Potential Conflicts):${colors.reset}`);
    const sortedCommon = Array.from(commonClasses).sort();
    sortedCommon.forEach(cls => {
      console.log(`  ${colors.yellow}•${colors.reset} .${cls}`);
    });
  }
  
  // Print top React-only classes
  if (reactOnly.size > 0) {
    console.log(`\n${colors.green}React-Only Classes (Sample - first 20):${colors.reset}`);
    const sortedReact = Array.from(reactOnly).sort().slice(0, 20);
    sortedReact.forEach(cls => {
      console.log(`  ${colors.green}•${colors.reset} .${cls}`);
    });
    if (reactOnly.size > 20) {
      console.log(`  ${colors.blue}... and ${reactOnly.size - 20} more${colors.reset}`);
    }
  }
  
  // Print top SnapFolio-only classes
  if (snapfolioOnly.size > 0) {
    console.log(`\n${colors.magenta}SnapFolio-Only Classes (Sample - first 30):${colors.reset}`);
    const sortedSnapfolio = Array.from(snapfolioOnly).sort().slice(0, 30);
    sortedSnapfolio.forEach(cls => {
      console.log(`  ${colors.magenta}•${colors.reset} .${cls}`);
    });
    if (snapfolioOnly.size > 30) {
      console.log(`  ${colors.blue}... and ${snapfolioOnly.size - 30} more${colors.reset}`);
    }
  }
  
  // Save detailed report
  const report = {
    summary: {
      reactAppClasses: reactAppClasses.size,
      snapfolioClasses: snapfolioClasses.size,
      commonClasses: commonClasses.size,
      reactOnlyClasses: reactOnly.size,
      snapfolioOnlyClasses: snapfolioOnly.size,
    },
    commonClasses: Array.from(commonClasses).sort(),
    reactOnlyClasses: Array.from(reactOnly).sort(),
    snapfolioOnlyClasses: Array.from(snapfolioOnly).sort(),
  };
  
  fs.writeFileSync(
    'css-classes-report.json',
    JSON.stringify(report, null, 2)
  );
  
  console.log(`\n${colors.green}✓${colors.reset} Detailed report saved to ${colors.cyan}css-classes-report.json${colors.reset}`);
  console.log(`\n${colors.yellow}💡 Tip: Review common classes for potential conflicts!${colors.reset}\n`);
}

main();

