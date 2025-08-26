#!/usr/bin/env node

/**
 * Image Generation Script for React MFE Shell
 * Generates favicons, screenshots, and basic social images
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Colors
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  bold: '\x1b[1m'
};

function log(message, color = 'white') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function runCommand(command, options = {}) {
  try {
    return execSync(command, { 
      encoding: 'utf8', 
      stdio: options.silent ? 'pipe' : 'inherit',
      ...options 
    });
  } catch (error) {
    if (!options.silent) {
      log(`Error running command: ${command}`, 'red');
      log(error.message, 'red');
    }
    throw error;
  }
}

function checkDependencies() {
  log('🔍 Checking dependencies...', 'blue');
  
  const requiredPackages = [
    'puppeteer',
    'sharp'
  ];
  
  const missingPackages = [];
  
  for (const pkg of requiredPackages) {
    try {
      require.resolve(pkg);
      log(`  ✅ ${pkg} found`, 'green');
    } catch (error) {
      missingPackages.push(pkg);
      log(`  ❌ ${pkg} missing`, 'red');
    }
  }
  
  if (missingPackages.length > 0) {
    log('\n📦 Installing missing dependencies...', 'yellow');
    const installCommand = `npm install --save-dev ${missingPackages.join(' ')}`;
    log(`Running: ${installCommand}`, 'cyan');
    runCommand(installCommand);
    log('✅ Dependencies installed!', 'green');
  }
}

async function generateFavicons() {
  log('\n🎨 Generating favicons...', 'blue');
  
  try {
    const sharp = require('sharp');
    const svgPath = path.join(process.cwd(), 'public/favicon.svg');
    const publicDir = path.join(process.cwd(), 'public');
    
    if (!fs.existsSync(svgPath)) {
      log('❌ favicon.svg not found', 'red');
      return;
    }
    
    const svgBuffer = fs.readFileSync(svgPath);
    
    // Generate PNG favicons
    const sizes = [
      { size: 16, name: 'favicon-16x16.png' },
      { size: 32, name: 'favicon-32x32.png' },
      { size: 48, name: 'favicon-48x48.png' },
      { size: 180, name: 'apple-touch-icon.png' }
    ];
    
    for (const { size, name } of sizes) {
      await sharp(svgBuffer)
        .resize(size, size)
        .png()
        .toFile(path.join(publicDir, name));
      log(`  ✅ Generated ${name} (${size}x${size})`, 'green');
    }
    
    // Generate ICO file (multi-size) - Alternative approach
    try {
      // Try using ico-endec if available
      const ico = require('ico-endec');
      const images = [];
      
      for (const size of [16, 32, 48]) {
        const pngBuffer = await sharp(svgBuffer)
          .resize(size, size)
          .png()
          .toBuffer();
        images.push({ width: size, height: size, data: pngBuffer });
      }
      
      const icoBuffer = ico.encode(images);
      fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoBuffer);
      log('  ✅ Generated favicon.ico (multi-size)', 'green');
    } catch (error) {
      // Fallback: Create a simple ICO by copying the 32x32 PNG
      try {
        const png32Path = path.join(publicDir, 'favicon-32x32.png');
        const icoPath = path.join(publicDir, 'favicon.ico');
        
        if (fs.existsSync(png32Path)) {
          // Simple fallback: copy 32x32 PNG as ICO (browsers will handle it)
          fs.copyFileSync(png32Path, icoPath);
          log('  ✅ Generated favicon.ico (32x32 fallback)', 'green');
        } else {
          log('  ⚠️  ICO generation skipped (install ico-endec for proper multi-size ICO)', 'yellow');
        }
      } catch (fallbackError) {
        log('  ⚠️  ICO generation failed (install ico-endec for ICO support)', 'yellow');
      }
    }
    
  } catch (error) {
    log(`❌ Favicon generation failed: ${error.message}`, 'red');
  }
}

async function generateScreenshots() {
  log('\n📸 Generating screenshots...', 'blue');
  
  try {
    const puppeteer = require('puppeteer');
    
    // Start the dev server
    log('  🚀 Starting dev server...', 'cyan');
    const serverProcess = require('child_process').spawn('npm', ['run', 'dev:demo'], {
      stdio: 'pipe',
      detached: true
    });
    
    // Wait for server to start
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    
    // Desktop screenshot
    await page.setViewport({ width: 1280, height: 720 });
    await page.goto('http://localhost:3001', { waitUntil: 'networkidle0' });
    await page.screenshot({
      path: path.join(process.cwd(), 'public/screenshot-desktop.png'),
      fullPage: false
    });
    log('  ✅ Generated screenshot-desktop.png (1280x720)', 'green');
    
    // Mobile screenshot
    await page.setViewport({ width: 390, height: 844 });
    await page.reload({ waitUntil: 'networkidle0' });
    await page.screenshot({
      path: path.join(process.cwd(), 'public/screenshot-mobile.png'),
      fullPage: false
    });
    log('  ✅ Generated screenshot-mobile.png (390x844)', 'green');
    
    await browser.close();
    
    // Kill the server process
    process.kill(-serverProcess.pid);
    
  } catch (error) {
    log(`❌ Screenshot generation failed: ${error.message}`, 'red');
    log('  💡 Make sure the dev server can start on port 3001', 'yellow');
  }
}

async function generateBasicSocialImages() {
  log('\n🎭 Generating basic social images...', 'blue');
  
  try {
    const sharp = require('sharp');
    const publicDir = path.join(process.cwd(), 'public');
    
    // Create a simple social image using SVG
    const socialSvg = `
      <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#2563eb;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#1d4ed8;stop-opacity:1" />
          </linearGradient>
        </defs>
        <rect width="1200" height="630" fill="url(#grad)"/>
        <text x="600" y="200" font-family="Arial, sans-serif" font-size="64" font-weight="bold" text-anchor="middle" fill="white">
          React MFE Shell
        </text>
        <text x="600" y="280" font-family="Arial, sans-serif" font-size="32" text-anchor="middle" fill="#e2e8f0">
          Production-Ready Micro Frontend Components
        </text>
        <text x="600" y="380" font-family="Arial, sans-serif" font-size="24" text-anchor="middle" fill="#cbd5e1">
          22 Components • TypeScript • Tailwind CSS • Zero Config
        </text>
        <text x="600" y="450" font-family="Arial, sans-serif" font-size="24" text-anchor="middle" fill="#cbd5e1">
          539 Tests • 75% Coverage • WCAG AA Compliant
        </text>
        <rect x="450" y="500" width="300" height="60" rx="30" fill="rgba(255,255,255,0.2)"/>
        <text x="600" y="540" font-family="Arial, sans-serif" font-size="20" font-weight="bold" text-anchor="middle" fill="white">
          github.com/jonmatum/react-mfe-shell
        </text>
      </svg>
    `;
    
    // Generate OG image
    await sharp(Buffer.from(socialSvg))
      .png()
      .toFile(path.join(publicDir, 'og-image.png'));
    log('  ✅ Generated og-image.png (1200x630)', 'green');
    
    // Generate Twitter image (slightly different dimensions)
    const twitterSvg = socialSvg.replace('height="630"', 'height="600"');
    await sharp(Buffer.from(twitterSvg))
      .resize(1200, 600)
      .png()
      .toFile(path.join(publicDir, 'twitter-image.png'));
    log('  ✅ Generated twitter-image.png (1200x600)', 'green');
    
  } catch (error) {
    log(`❌ Social image generation failed: ${error.message}`, 'red');
  }
}

function generateImageManifest() {
  log('\n📋 Generating image manifest...', 'blue');
  
  const publicDir = path.join(process.cwd(), 'public');
  const images = [];
  
  const imageFiles = [
    'favicon.svg',
    'favicon-16x16.png',
    'favicon-32x32.png',
    'favicon-48x48.png',
    'favicon.ico',
    'apple-touch-icon.svg',
    'apple-touch-icon.png',
    'og-image.png',
    'twitter-image.png',
    'screenshot-desktop.png',
    'screenshot-mobile.png'
  ];
  
  for (const file of imageFiles) {
    const filePath = path.join(publicDir, file);
    if (fs.existsSync(filePath)) {
      const stats = fs.statSync(filePath);
      images.push({
        name: file,
        size: `${(stats.size / 1024).toFixed(1)}KB`,
        exists: true
      });
    } else {
      images.push({
        name: file,
        size: 'Missing',
        exists: false
      });
    }
  }
  
  log('\n📊 Image Generation Summary:', 'cyan');
  log('================================', 'cyan');
  
  for (const img of images) {
    const status = img.exists ? '✅' : '❌';
    const color = img.exists ? 'green' : 'red';
    log(`${status} ${img.name.padEnd(25)} ${img.size}`, color);
  }
  
  const generated = images.filter(img => img.exists).length;
  const total = images.length;
  
  log('================================', 'cyan');
  log(`📈 Generated: ${generated}/${total} images`, generated === total ? 'green' : 'yellow');
  
  if (generated < total) {
    log('\n💡 Missing images can be generated with GenAI or manual creation', 'yellow');
    log('   Recommended: Use Canva, Figma, or AI tools for professional social images', 'yellow');
  }
}

async function main() {
  log('🎨 React MFE Shell - Image Generation Script', 'bold');
  log('============================================', 'cyan');
  
  try {
    // Check and install dependencies
    checkDependencies();
    
    // Generate images
    await generateFavicons();
    await generateScreenshots();
    await generateBasicSocialImages();
    
    // Show summary
    generateImageManifest();
    
    log('\n🎉 Image generation complete!', 'green');
    log('💡 For professional social media images, consider using:', 'yellow');
    log('   • Canva (canva.com) - Easy templates', 'yellow');
    log('   • Figma (figma.com) - Professional design', 'yellow');
    log('   • DALL-E/Midjourney - AI-generated images', 'yellow');
    
  } catch (error) {
    log(`\n❌ Script failed: ${error.message}`, 'red');
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { main };
