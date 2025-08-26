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
    
    // Generate CSS using Tailwind CLI
    const outputPath = path.join(distDir, 'styles.css');
    
    execSync(`npx tailwindcss -i ${tempInputPath} -o ${outputPath} --minify`, {
      stdio: 'inherit'
    });
    
    // Clean up temp file
    fs.unlinkSync(tempInputPath);
    
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
    const sourcePath = path.join(srcDir, 'styles.css');
    const destPath = path.join(distDir, 'styles.css');
    
    fs.copyFileSync(sourcePath, destPath);
    
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
  
  if (!fs.existsSync(cssPath)) {
    console.error('ERROR: No CSS file generated');
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
  
  const size = (fs.statSync(cssPath).size / 1024).toFixed(2);
  console.log(`CSS validation complete: ${size}KB`);
  
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
