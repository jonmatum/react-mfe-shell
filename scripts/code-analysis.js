#!/usr/bin/env node

/**
 * Code Analysis Script using scc
 * Node.js version for cross-platform compatibility
 * 
 * Usage: node scripts/code-analysis.js [options]
 * Options:
 *   --detailed    Show detailed file-by-file breakdown
 *   --complexity  Focus on complexity analysis
 *   --json        Output in JSON format
 *   --help        Show this help message
 */

import { execSync } from 'child_process';
import { basename } from 'path';
import process from 'process';

// Colors for output
const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  purple: '\x1b[35m',
  cyan: '\x1b[36m',
  reset: '\x1b[0m',
  bright: '\x1b[1m'
};

// Parse command line arguments
const args = process.argv.slice(2);
const options = {
  detailed: args.includes('--detailed'),
  complexity: args.includes('--complexity'),
  json: args.includes('--json'),
  help: args.includes('--help')
};

// Show help
if (options.help) {
  console.log(`${colors.blue}Code Analysis Script${colors.reset}`);
  console.log('');
  console.log('Usage: node scripts/code-analysis.js [options]');
  console.log('');
  console.log('Options:');
  console.log('  --detailed    Show detailed file-by-file breakdown');
  console.log('  --complexity  Focus on complexity analysis');
  console.log('  --json        Output in JSON format');
  console.log('  --help        Show this help message');
  console.log('');
  console.log('Examples:');
  console.log('  node scripts/code-analysis.js                    # Basic analysis');
  console.log('  node scripts/code-analysis.js --detailed         # Detailed breakdown');
  console.log('  node scripts/code-analysis.js --complexity       # Complexity focus');
  console.log('  node scripts/code-analysis.js --json > stats.json # JSON output');
  process.exit(0);
}

// Check if scc is installed
function checkSccInstalled() {
  try {
    execSync('scc --version', { stdio: 'pipe' });
    return true;
  } catch (error) {
    console.error(`${colors.red}Error: scc is not installed${colors.reset}`);
    console.log('Install it with: brew install scc (macOS) or go install github.com/boyter/scc/v3@latest');
    process.exit(1);
  }
}

// Print section header
function printHeader(title) {
  console.log(`\n${colors.blue}═══════════════════════════════════════════════════════════════════════════════${colors.reset}`);
  console.log(`${colors.blue}${title}${colors.reset}`);
  console.log(`${colors.blue}═══════════════════════════════════════════════════════════════════════════════${colors.reset}`);
}

// Execute scc command and return output
function runScc(args = '') {
  try {
    return execSync(`scc ${args}`, { encoding: 'utf8' });
  } catch (error) {
    console.error(`${colors.red}Error running scc: ${error.message}${colors.reset}`);
    process.exit(1);
  }
}

// Parse scc output to extract totals
function parseSccOutput(output) {
  const lines = output.split('\n');
  const totalLine = lines.find(line => line.startsWith('Total'));
  
  if (!totalLine) return null;
  
  const parts = totalLine.trim().split(/\s+/);
  return {
    files: parseInt(parts[1]) || 0,
    lines: parseInt(parts[2]) || 0,
    blanks: parseInt(parts[3]) || 0,
    comments: parseInt(parts[4]) || 0,
    code: parseInt(parts[5]) || 0,
    complexity: parseInt(parts[6]) || 0
  };
}

// Calculate and display quality metrics
function calculateMetrics(totals) {
  if (!totals || totals.code === 0) return;
  
  const commentRatio = (totals.comments * 100 / totals.code).toFixed(1);
  const blankRatio = (totals.blanks * 100 / totals.lines).toFixed(1);
  const complexityPerLine = (totals.complexity / totals.code).toFixed(2);
  
  console.log(`${colors.cyan}Code Quality Metrics:${colors.reset}`);
  console.log(`  Comment Ratio: ${colors.yellow}${commentRatio}%${colors.reset} (Industry standard: 10-20%)`);
  console.log(`  Blank Line Ratio: ${colors.yellow}${blankRatio}%${colors.reset} (Good readability: 15-25%)`);
  console.log(`  Complexity per Line: ${colors.yellow}${complexityPerLine}${colors.reset} (Lower is better)`);
  
  // Quality assessment
  console.log(`\n${colors.cyan}Quality Assessment:${colors.reset}`);
  
  if (parseFloat(commentRatio) < 10) {
    console.log(`  Comments: ${colors.red}Low${colors.reset} - Consider adding more documentation`);
  } else if (parseFloat(commentRatio) > 20) {
    console.log(`  Comments: ${colors.yellow}High${colors.reset} - Good documentation, check for over-commenting`);
  } else {
    console.log(`  Comments: ${colors.green}Good${colors.reset} - Well documented code`);
  }
  
  if (parseFloat(complexityPerLine) < 0.1) {
    console.log(`  Complexity: ${colors.green}Low${colors.reset} - Very maintainable code`);
  } else if (parseFloat(complexityPerLine) > 0.2) {
    console.log(`  Complexity: ${colors.red}High${colors.reset} - Consider refactoring complex functions`);
  } else {
    console.log(`  Complexity: ${colors.yellow}Moderate${colors.reset} - Reasonably maintainable`);
  }
}

// Show language breakdown with percentages
function showLanguageBreakdown(output, totalCode) {
  console.log(`${colors.cyan}Language Distribution:${colors.reset}`);
  
  const lines = output.split('\n');
  const dataLines = lines.filter(line => 
    line.trim() && 
    !line.includes('─') && 
    !line.startsWith('Language') && 
    !line.startsWith('Total') &&
    !line.includes('Estimated') &&
    !line.includes('Processed')
  );
  
  dataLines.forEach(line => {
    const parts = line.trim().split(/\s+/);
    if (parts.length >= 6) {
      const lang = parts[0];
      const code = parseInt(parts[5]);
      if (!isNaN(code) && totalCode > 0) {
        const percentage = (code * 100 / totalCode).toFixed(1);
        console.log(`  ${lang}: ${colors.yellow}${percentage}%${colors.reset} (${code} lines)`);
      }
    }
  });
}

// Main analysis function
function runAnalysis() {
  checkSccInstalled();
  
  const projectName = basename(process.cwd());
  
  printHeader(`Code Analysis Report for: ${projectName}`);
  console.log(`Generated on: ${colors.yellow}${new Date().toLocaleString()}${colors.reset}`);
  console.log(`Directory: ${colors.yellow}${process.cwd()}${colors.reset}`);
  
  if (options.json) {
    printHeader('Raw Data (JSON Format)');
    const jsonOutput = runScc('--format json');
    console.log(jsonOutput);
    return;
  }
  
  // Get basic scc output
  const basicOutput = runScc();
  const totals = parseSccOutput(basicOutput);
  
  printHeader('Basic Statistics');
  console.log(basicOutput);
  
  // Calculate and show metrics
  if (totals) {
    printHeader('Quality Metrics');
    calculateMetrics(totals);
    
    // Show language breakdown
    printHeader('Language Breakdown');
    showLanguageBreakdown(basicOutput, totals.code);
  }
  
  if (options.complexity) {
    printHeader('Complexity Analysis');
    console.log(`${colors.cyan}Most Complex Files:${colors.reset}`);
    const complexityOutput = runScc('--by-file --sort complexity');
    const lines = complexityOutput.split('\n').slice(0, 20);
    console.log(lines.join('\n'));
    
    console.log(`\n${colors.cyan}Complexity by Language:${colors.reset}`);
    const langComplexity = runScc('--sort complexity');
    console.log(langComplexity);
  }
  
  if (options.detailed) {
    printHeader('Detailed File Breakdown');
    console.log(`${colors.cyan}Largest Files by Code Lines:${colors.reset}`);
    const detailedOutput = runScc('--by-file --sort code');
    const lines = detailedOutput.split('\n').slice(0, 20);
    console.log(lines.join('\n'));
    
    console.log(`\n${colors.cyan}Files with Most Comments:${colors.reset}`);
    const commentOutput = runScc('--by-file --sort comments');
    const commentLines = commentOutput.split('\n').slice(0, 10);
    console.log(commentLines.join('\n'));
  }
  
  // Project insights
  if (totals) {
    printHeader('Project Insights');
    const avgLinesPerFile = Math.round(totals.code / totals.files);
    
    console.log(`${colors.cyan}Project Size Assessment:${colors.reset}`);
    if (totals.code < 1000) {
      console.log(`  Size: ${colors.green}Small${colors.reset} (${totals.code} lines) - Easy to maintain`);
    } else if (totals.code < 10000) {
      console.log(`  Size: ${colors.yellow}Medium${colors.reset} (${totals.code} lines) - Well manageable`);
    } else if (totals.code < 100000) {
      console.log(`  Size: ${colors.yellow}Large${colors.reset} (${totals.code} lines) - Requires good organization`);
    } else {
      console.log(`  Size: ${colors.red}Very Large${colors.reset} (${totals.code} lines) - Consider modularization`);
    }
    
    console.log(`  Average lines per file: ${colors.yellow}${avgLinesPerFile}${colors.reset}`);
    if (avgLinesPerFile < 100) {
      console.log(`  File organization: ${colors.green}Excellent${colors.reset} - Small, focused files`);
    } else if (avgLinesPerFile < 300) {
      console.log(`  File organization: ${colors.yellow}Good${colors.reset} - Reasonable file sizes`);
    } else {
      console.log(`  File organization: ${colors.red}Consider refactoring${colors.reset} - Large files detected`);
    }
    
    // Recommendations
    printHeader('Recommendations');
    const commentRatio = totals.comments * 100 / totals.code;
    
    if (commentRatio < 10) {
      console.log(`  ${colors.yellow}•${colors.reset} Add more inline comments and documentation`);
    }
    
    if (totals.files > 50 && avgLinesPerFile > 200) {
      console.log(`  ${colors.yellow}•${colors.reset} Consider breaking down larger files into smaller modules`);
    }
    
    console.log(`  ${colors.green}•${colors.reset} Run with --detailed for file-by-file analysis`);
    console.log(`  ${colors.green}•${colors.reset} Run with --complexity to identify complex code areas`);
    console.log(`  ${colors.green}•${colors.reset} Use --json to export data for further analysis`);
  }
}

// Run the analysis
runAnalysis();
