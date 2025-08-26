#!/usr/bin/env node

/**
 * Metrics Validation Script
 * Validates that demo metrics are accurate and up-to-date
 */

const fs = require('fs');
const path = require('path');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function validateMetricsFile() {
  const metricsPath = path.join(process.cwd(), 'demo/utils/metrics.ts');
  const jsonPath = path.join(process.cwd(), 'metrics.json');
  
  if (!fs.existsSync(metricsPath)) {
    log('❌ Metrics file not found. Run "npm run generate:metrics"', 'red');
    return false;
  }

  if (!fs.existsSync(jsonPath)) {
    log('❌ JSON metrics file not found. Run "npm run generate:metrics"', 'red');
    return false;
  }

  // Check if metrics are recent (within last 24 hours)
  const stats = fs.statSync(metricsPath);
  const ageHours = (Date.now() - stats.mtime.getTime()) / (1000 * 60 * 60);
  
  if (ageHours > 24) {
    log(`⚠️  Metrics are ${Math.round(ageHours)} hours old. Consider regenerating.`, 'yellow');
  }

  return true;
}

function validateBundleSizes() {
  const jsonPath = path.join(process.cwd(), 'metrics.json');
  const metrics = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  
  const { bundle } = metrics;
  let valid = true;

  // Validate ESM bundle size (should be reasonable)
  if (!bundle.esm || bundle.esm.size < 50000 || bundle.esm.size > 200000) {
    log(`❌ ESM bundle size seems unreasonable: ${bundle.esm?.size || 'undefined'} bytes`, 'red');
    valid = false;
  }

  // Validate gzipped size is smaller than raw
  if (bundle.esm && bundle.esm.gzipped >= bundle.esm.size) {
    log('❌ Gzipped size should be smaller than raw size', 'red');
    valid = false;
  }

  // Validate standalone CSS exists and is reasonable
  if (!bundle.standalone || bundle.standalone.size < 5000 || bundle.standalone.size > 50000) {
    log(`❌ Standalone CSS size seems unreasonable: ${bundle.standalone?.size || 'undefined'} bytes`, 'red');
    valid = false;
  }

  if (valid) {
    log('✅ Bundle sizes are valid', 'green');
  }

  return valid;
}

function validateTestMetrics() {
  const jsonPath = path.join(process.cwd(), 'metrics.json');
  const metrics = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  
  const { tests } = metrics;
  let valid = true;

  // Validate test count
  if (!tests.totalTests || tests.totalTests < 100) {
    log(`❌ Test count seems too low: ${tests.totalTests}`, 'red');
    valid = false;
  }

  // Validate coverage
  if (tests.coverage < 50) {
    log(`❌ Test coverage seems too low: ${tests.coverage}%`, 'red');
    valid = false;
  }

  // Validate pass rate
  if (tests.passRate !== 100) {
    log(`❌ Not all tests are passing: ${tests.passRate}%`, 'red');
    valid = false;
  }

  if (valid) {
    log('✅ Test metrics are valid', 'green');
  }

  return valid;
}

function validateDRYMetrics() {
  const jsonPath = path.join(process.cwd(), 'metrics.json');
  const metrics = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  
  const { dry } = metrics;
  let valid = true;

  // Validate DRY score
  if (!dry.score || dry.score < 5 || dry.score > 10) {
    log(`❌ DRY score seems unreasonable: ${dry.score}`, 'red');
    valid = false;
  }

  // Validate components analyzed
  if (!dry.componentsAnalyzed || dry.componentsAnalyzed < 10) {
    log(`❌ Too few components analyzed: ${dry.componentsAnalyzed}`, 'red');
    valid = false;
  }

  if (valid) {
    log('✅ DRY metrics are valid', 'green');
  }

  return valid;
}

function validateSCCMetrics() {
  const jsonPath = path.join(process.cwd(), 'metrics.json');
  const metrics = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  
  const { scc } = metrics;
  let valid = true;

  // Validate estimated cost is reasonable
  if (!scc.estimatedCost || scc.estimatedCost < 100000 || scc.estimatedCost > 2000000) {
    log(`❌ Estimated cost seems unreasonable: ${scc.estimatedCostFormatted}`, 'red');
    valid = false;
  }

  // Validate schedule is reasonable
  if (!scc.scheduleMonths || scc.scheduleMonths < 3 || scc.scheduleMonths > 24) {
    log(`❌ Schedule estimate seems unreasonable: ${scc.scheduleMonthsFormatted}`, 'red');
    valid = false;
  }

  // Validate people required is reasonable
  if (!scc.peopleRequired || scc.peopleRequired < 1 || scc.peopleRequired > 10) {
    log(`❌ People required seems unreasonable: ${scc.peopleRequiredFormatted}`, 'red');
    valid = false;
  }

  // Validate code lines exist
  if (!scc.codeLines || scc.codeLines < 5000) {
    log(`❌ Code lines count seems too low: ${scc.codeLines}`, 'red');
    valid = false;
  }

  if (valid) {
    log('✅ SCC development cost metrics are valid', 'green');
  }

  return valid;
}

function validateDemoFiles() {
  const appPath = path.join(process.cwd(), 'demo/App.tsx');
  const utilityPath = path.join(process.cwd(), 'demo/components/UtilityShowcase.tsx');
  
  let valid = true;

  // Check if App.tsx uses METRICS
  if (fs.existsSync(appPath)) {
    const appContent = fs.readFileSync(appPath, 'utf8');
    if (!appContent.includes('import { METRICS }') || !appContent.includes('METRICS.bundle')) {
      log('❌ App.tsx is not using METRICS properly', 'red');
      valid = false;
    }
  }

  // Check if UtilityShowcase.tsx uses METRICS
  if (fs.existsSync(utilityPath)) {
    const utilityContent = fs.readFileSync(utilityPath, 'utf8');
    if (!utilityContent.includes('import { METRICS }') || !utilityContent.includes('METRICS.dry')) {
      log('❌ UtilityShowcase.tsx is not using METRICS properly', 'red');
      valid = false;
    }
  }

  if (valid) {
    log('✅ Demo files are using metrics correctly', 'green');
  }

  return valid;
}

function main() {
  log('🔍 Validating Demo Metrics', 'bright');
  log('================================', 'cyan');

  let allValid = true;

  allValid &= validateMetricsFile();
  allValid &= validateBundleSizes();
  allValid &= validateTestMetrics();
  allValid &= validateDRYMetrics();
  allValid &= validateSCCMetrics();
  allValid &= validateDemoFiles();

  log('================================', 'cyan');
  
  if (allValid) {
    log('✅ All metrics validation passed!', 'green');
    log('🎯 Demo is showing accurate, up-to-date metrics', 'blue');
  } else {
    log('❌ Metrics validation failed!', 'red');
    log('🔧 Run "npm run generate:metrics" to fix issues', 'yellow');
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { main };
