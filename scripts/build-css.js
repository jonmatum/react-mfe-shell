#!/usr/bin/env node

/**
 * CSS Build Script - Dynamic CSS Generation
 * 
 * This script generates CSS dynamically based on:
 * 1. Current Tailwind configuration
 * 2. Design tokens
 * 3. Component usage patterns
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const srcDir = path.join(__dirname, '../src');
const distDir = path.join(__dirname, '../dist');

console.log('Building CSS dynamically...\n');

/**
 * Step 1: Check if Tailwind CLI is available
 */
function hasTailwindCLI() {
  try {
    execSync('npx tailwindcss --help', { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

/**
 * Step 2: Generate CSS using Tailwind CLI if available
 */
async function generateTailwindCSS() {
  if (!hasTailwindCLI()) {
    console.log('Tailwind CLI not available, using static CSS copy...');
    return false;
  }

  try {
    console.log('Generating CSS with Tailwind CLI...');
    
    // Read and include our custom styles directly
    const customStyles = fs.readFileSync(path.join(srcDir, 'styles.css'), 'utf8');
    
    // Create input CSS file that includes our styles
    const inputCSS = `
/* Custom styles and design tokens */
${customStyles}

@tailwind base;
@tailwind components;
@tailwind utilities;
`;
    
    const tempInputPath = path.join(__dirname, '../temp-input.css');
    fs.writeFileSync(tempInputPath, inputCSS, 'utf8');
    
    // Generate main styles.css using Tailwind CLI
    const outputPath = path.join(distDir, 'styles.css');
    
    execSync(`npx tailwindcss -i ${tempInputPath} -o ${outputPath} --minify`, {
      stdio: 'inherit'
    });
    
    // Clean up temp file
    fs.unlinkSync(tempInputPath);
    
    // Copy standalone.css (zero-config option)
    const standaloneSrc = path.join(srcDir, 'styles', 'standalone.css');
    const standaloneDest = path.join(distDir, 'standalone.css');
    
    if (fs.existsSync(standaloneSrc)) {
      fs.copyFileSync(standaloneSrc, standaloneDest);
      console.log('SUCCESS: Standalone CSS copied');
    } else {
      console.warn('WARNING: standalone.css not found in src/styles/');
    }
    
    // Copy and fix preset.cjs (Tailwind preset)
    const presetSrc = path.join(srcDir, 'styles', 'tailwind-preset.js');
    const presetDest = path.join(distDir, 'preset.cjs');
    
    if (fs.existsSync(presetSrc)) {
      // Read the preset file and fix the import path
      let presetContent = fs.readFileSync(presetSrc, 'utf8');
      
      // Replace the relative import with the correct import for the built package
      presetContent = presetContent.replace(
        "const { tokens } = require('../utils/tokens');",
        "const { tokens } = require('./index.cjs');"
      );
      
      fs.writeFileSync(presetDest, presetContent, 'utf8');
      console.log('SUCCESS: Tailwind preset copied and fixed');
    } else {
      console.warn('WARNING: tailwind-preset.js not found in src/styles/');
    }
    
    console.log('SUCCESS: Dynamic CSS generated with Tailwind CLI\n');
    return true;
  } catch (error) {
    console.error('ERROR: Tailwind CSS generation failed:', error.message);
    return false;
  }
}

/**
 * Step 3: Fallback to static copy
 */
function copyStaticCSS() {
  try {
    console.log('Using static CSS copy as fallback...');
    
    // Copy main styles.css
    const sourcePath = path.join(srcDir, 'styles.css');
    const destPath = path.join(distDir, 'styles.css');
    fs.copyFileSync(sourcePath, destPath);
    
    // Copy standalone.css
    const standaloneSrc = path.join(srcDir, 'styles', 'standalone.css');
    const standaloneDest = path.join(distDir, 'standalone.css');
    
    if (fs.existsSync(standaloneSrc)) {
      fs.copyFileSync(standaloneSrc, standaloneDest);
      console.log('SUCCESS: Standalone CSS copied');
    } else {
      console.warn('WARNING: standalone.css not found in src/styles/');
    }
    
    // Copy and fix preset.cjs
    const presetSrc = path.join(srcDir, 'styles', 'tailwind-preset.js');
    const presetDest = path.join(distDir, 'preset.cjs');
    
    if (fs.existsSync(presetSrc)) {
      // Read the preset file and fix the import path
      let presetContent = fs.readFileSync(presetSrc, 'utf8');
      
      // Replace the relative import with the correct import for the built package
      presetContent = presetContent.replace(
        "const { tokens } = require('../utils/tokens');",
        "const { tokens } = require('./index.cjs');"
      );
      
      fs.writeFileSync(presetDest, presetContent, 'utf8');
      console.log('SUCCESS: Tailwind preset copied and fixed');
    } else {
      console.warn('WARNING: tailwind-preset.js not found in src/styles/');
    }
    
    const size = (fs.statSync(destPath).size / 1024).toFixed(2);
    console.log(`SUCCESS: Static CSS copied: ${size}KB\n`);
    return true;
  } catch (error) {
    console.error('ERROR: Static CSS copy failed:', error.message);
    return false;
  }
}

/**
 * Step 4: Validate CSS output
 */
function validateCSS() {
  const cssPath = path.join(distDir, 'styles.css');
  const standalonePath = path.join(distDir, 'standalone.css');
  const presetPath = path.join(distDir, 'preset.cjs');
  
  if (!fs.existsSync(cssPath)) {
    console.error('ERROR: No styles.css file generated');
    return false;
  }
  
  if (!fs.existsSync(standalonePath)) {
    console.error('ERROR: No standalone.css file generated');
    return false;
  }
  
  if (!fs.existsSync(presetPath)) {
    console.error('ERROR: No preset.cjs file generated');
    return false;
  }
  
  const content = fs.readFileSync(cssPath, 'utf8');
  
  // Check for essential CSS custom properties
  const requiredTokens = [
    '--color-primary-600',
    '--color-success-600',
    '--color-background-primary'
  ];
  
  const missingTokens = requiredTokens.filter(token => !content.includes(token));
  
  if (missingTokens.length > 0) {
    console.warn('WARNING: Missing design tokens:', missingTokens.join(', '));
  }
  
  const stylesSize = (fs.statSync(cssPath).size / 1024).toFixed(2);
  const standaloneSize = (fs.statSync(standalonePath).size / 1024).toFixed(2);
  const presetSize = (fs.statSync(presetPath).size / 1024).toFixed(2);
  
  console.log(`CSS validation complete:`);
  console.log(`  - styles.css: ${stylesSize}KB`);
  console.log(`  - standalone.css: ${standaloneSize}KB`);
  console.log(`  - preset.cjs: ${presetSize}KB`);
  
  return true;
}

/**
 * Main execution
 */
async function main() {
  // Ensure dist directory exists
  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
  }
  
  // Try dynamic generation first, fallback to static copy
  const dynamicSuccess = await generateTailwindCSS();
  
  if (!dynamicSuccess) {
    const staticSuccess = copyStaticCSS();
    if (!staticSuccess) {
      console.error('ERROR: Both dynamic and static CSS generation failed');
      process.exit(1);
    }
  }
  
  // Validate the output
  if (!validateCSS()) {
    console.error('ERROR: CSS validation failed');
    process.exit(1);
  }
  
  console.log('CSS build complete!');
}

main().catch(error => {
  console.error('ERROR: CSS build failed:', error);
  process.exit(1);
});
