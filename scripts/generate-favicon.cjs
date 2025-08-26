#!/usr/bin/env node

/**
 * Professional Favicon Generator for React MFE Shell
 * Creates a modern, scalable favicon with React/component theming
 */

const fs = require('fs');
const path = require('path');

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

// Design options for the favicon
const faviconDesigns = {
  1: {
    name: "React Component Blocks",
    description: "Modern geometric blocks representing components",
    svg: `<svg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#3b82f6;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#1d4ed8;stop-opacity:1" />
        </linearGradient>
        <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#06b6d4;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#0891b2;stop-opacity:1" />
        </linearGradient>
      </defs>
      
      <!-- Background circle -->
      <circle cx="32" cy="32" r="30" fill="url(#grad1)" stroke="#1e40af" stroke-width="2"/>
      
      <!-- Component blocks -->
      <rect x="12" y="12" width="16" height="16" rx="3" fill="white" opacity="0.9"/>
      <rect x="36" y="12" width="16" height="16" rx="3" fill="url(#grad2)" opacity="0.8"/>
      <rect x="12" y="36" width="16" height="16" rx="3" fill="url(#grad2)" opacity="0.8"/>
      <rect x="36" y="36" width="16" height="16" rx="3" fill="white" opacity="0.9"/>
      
      <!-- Connection lines -->
      <line x1="28" y1="20" x2="36" y2="20" stroke="white" stroke-width="2" opacity="0.7"/>
      <line x1="20" y1="28" x2="20" y2="36" stroke="white" stroke-width="2" opacity="0.7"/>
      <line x1="28" y1="44" x2="36" y2="44" stroke="white" stroke-width="2" opacity="0.7"/>
      <line x1="44" y1="28" x2="44" y2="36" stroke="white" stroke-width="2" opacity="0.7"/>
    </svg>`
  },
  
  2: {
    name: "React Atom Symbol",
    description: "Modern take on React's atomic design with MFE elements",
    svg: `<svg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#2563eb;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#1e40af;stop-opacity:1" />
        </linearGradient>
        <radialGradient id="centerGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" style="stop-color:#ffffff;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#e2e8f0;stop-opacity:1" />
        </radialGradient>
      </defs>
      
      <!-- Background -->
      <circle cx="32" cy="32" r="30" fill="url(#bgGrad)" stroke="#1e40af" stroke-width="2"/>
      
      <!-- Electron orbits -->
      <ellipse cx="32" cy="32" rx="24" ry="12" fill="none" stroke="white" stroke-width="2" opacity="0.6"/>
      <ellipse cx="32" cy="32" rx="24" ry="12" fill="none" stroke="white" stroke-width="2" opacity="0.6" transform="rotate(60 32 32)"/>
      <ellipse cx="32" cy="32" rx="24" ry="12" fill="none" stroke="white" stroke-width="2" opacity="0.6" transform="rotate(120 32 32)"/>
      
      <!-- Center nucleus -->
      <circle cx="32" cy="32" r="6" fill="url(#centerGrad)" stroke="#1e40af" stroke-width="1"/>
      
      <!-- Electrons (components) -->
      <circle cx="56" cy="32" r="3" fill="#06b6d4"/>
      <circle cx="20" cy="20" r="3" fill="#10b981"/>
      <circle cx="44" cy="44" r="3" fill="#f59e0b"/>
      <circle cx="8" cy="32" r="3" fill="#ef4444"/>
      <circle cx="44" cy="20" r="3" fill="#8b5cf6"/>
      <circle cx="20" cy="44" r="3" fill="#ec4899"/>
    </svg>`
  },
  
  3: {
    name: "MFE Shell Logo",
    description: "Stylized 'M' for MFE with shell/container concept",
    svg: `<svg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="shellGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#2563eb;stop-opacity:1" />
          <stop offset="50%" style="stop-color:#3b82f6;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#1d4ed8;stop-opacity:1" />
        </linearGradient>
        <linearGradient id="mGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#ffffff;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#e2e8f0;stop-opacity:1" />
        </linearGradient>
      </defs>
      
      <!-- Outer shell -->
      <circle cx="32" cy="32" r="30" fill="url(#shellGrad)" stroke="#1e40af" stroke-width="2"/>
      
      <!-- Inner container -->
      <circle cx="32" cy="32" r="22" fill="none" stroke="white" stroke-width="1" opacity="0.3"/>
      
      <!-- Stylized 'M' for MFE -->
      <path d="M 16 20 L 16 44 L 20 44 L 20 28 L 28 36 L 32 32 L 36 36 L 44 28 L 44 44 L 48 44 L 48 20 L 40 20 L 32 28 L 24 20 Z" 
            fill="url(#mGrad)" stroke="#1e40af" stroke-width="0.5"/>
      
      <!-- Component dots -->
      <circle cx="20" cy="16" r="2" fill="#06b6d4" opacity="0.8"/>
      <circle cx="44" cy="16" r="2" fill="#10b981" opacity="0.8"/>
      <circle cx="32" cy="48" r="2" fill="#f59e0b" opacity="0.8"/>
    </svg>`
  },
  
  4: {
    name: "Layered Components",
    description: "Stacked layers representing micro frontend architecture",
    svg: `<svg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="layer1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#2563eb;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#1d4ed8;stop-opacity:1" />
        </linearGradient>
        <linearGradient id="layer2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#3b82f6;stop-opacity:0.9" />
          <stop offset="100%" style="stop-color:#2563eb;stop-opacity:0.9" />
        </linearGradient>
        <linearGradient id="layer3" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#60a5fa;stop-opacity:0.8" />
          <stop offset="100%" style="stop-color:#3b82f6;stop-opacity:0.8" />
        </linearGradient>
      </defs>
      
      <!-- Background -->
      <circle cx="32" cy="32" r="30" fill="#1e40af" stroke="#1e40af" stroke-width="2"/>
      
      <!-- Layer 1 (bottom) -->
      <rect x="8" y="36" width="48" height="16" rx="4" fill="url(#layer1)"/>
      
      <!-- Layer 2 (middle) -->
      <rect x="12" y="28" width="40" height="16" rx="4" fill="url(#layer2)"/>
      
      <!-- Layer 3 (top) -->
      <rect x="16" y="20" width="32" height="16" rx="4" fill="url(#layer3)"/>
      
      <!-- Connection points -->
      <circle cx="20" cy="28" r="2" fill="white"/>
      <circle cx="32" cy="28" r="2" fill="white"/>
      <circle cx="44" cy="28" r="2" fill="white"/>
      
      <!-- Top accent -->
      <rect x="24" y="12" width="16" height="4" rx="2" fill="white" opacity="0.9"/>
    </svg>`
  },
  
  5: {
    name: "Hexagonal Components",
    description: "Modern hexagonal design representing modular architecture",
    svg: `<svg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="hexGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#2563eb;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#1d4ed8;stop-opacity:1" />
        </linearGradient>
      </defs>
      
      <!-- Background circle -->
      <circle cx="32" cy="32" r="30" fill="url(#hexGrad)" stroke="#1e40af" stroke-width="2"/>
      
      <!-- Central hexagon -->
      <polygon points="32,16 42,22 42,34 32,40 22,34 22,22" fill="white" opacity="0.9" stroke="#1e40af" stroke-width="1"/>
      
      <!-- Surrounding hexagons -->
      <polygon points="32,8 38,11 38,17 32,20 26,17 26,11" fill="#06b6d4" opacity="0.8"/>
      <polygon points="46,22 52,25 52,31 46,34 40,31 40,25" fill="#10b981" opacity="0.8"/>
      <polygon points="46,34 52,37 52,43 46,46 40,43 40,37" fill="#f59e0b" opacity="0.8"/>
      <polygon points="32,44 38,47 38,53 32,56 26,53 26,47" fill="#ef4444" opacity="0.8"/>
      <polygon points="18,34 24,37 24,43 18,46 12,43 12,37" fill="#8b5cf6" opacity="0.8"/>
      <polygon points="18,22 24,25 24,31 18,34 12,31 12,25" fill="#ec4899" opacity="0.8"/>
      
      <!-- Center dot -->
      <circle cx="32" cy="28" r="3" fill="#1e40af"/>
    </svg>`
  },
  
  6: {
    name: "Rocket Launch (Demo App Style)",
    description: "Rocket icon matching the demo app branding with launch effects",
    svg: `<svg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="rocketGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#2563eb;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#1d4ed8;stop-opacity:1" />
        </linearGradient>
        <linearGradient id="flameGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#f59e0b;stop-opacity:1" />
          <stop offset="50%" style="stop-color:#ef4444;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#dc2626;stop-opacity:1" />
        </linearGradient>
        <radialGradient id="bgGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" style="stop-color:#3b82f6;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#1e40af;stop-opacity:1" />
        </radialGradient>
      </defs>
      
      <!-- Background circle -->
      <circle cx="32" cy="32" r="30" fill="url(#bgGrad)" stroke="#1e40af" stroke-width="2"/>
      
      <!-- Rocket body (main) -->
      <path d="M32 8 L38 20 L38 32 L26 32 L26 20 Z" fill="white" stroke="#1e40af" stroke-width="1"/>
      
      <!-- Rocket nose cone -->
      <path d="M32 8 L26 20 L38 20 Z" fill="#e2e8f0" stroke="#1e40af" stroke-width="1"/>
      
      <!-- Rocket fins -->
      <path d="M26 28 L20 36 L26 32 Z" fill="#94a3b8" stroke="#1e40af" stroke-width="1"/>
      <path d="M38 28 L44 36 L38 32 Z" fill="#94a3b8" stroke="#1e40af" stroke-width="1"/>
      
      <!-- Rocket window -->
      <circle cx="32" cy="22" r="3" fill="#06b6d4" stroke="#0891b2" stroke-width="1"/>
      
      <!-- Flame/exhaust -->
      <path d="M28 32 L32 44 L36 32 Z" fill="url(#flameGrad)" opacity="0.9"/>
      <path d="M30 32 L32 40 L34 32 Z" fill="#fbbf24" opacity="0.8"/>
      
      <!-- Exhaust particles -->
      <circle cx="28" cy="46" r="1.5" fill="#f59e0b" opacity="0.7"/>
      <circle cx="36" cy="48" r="1" fill="#ef4444" opacity="0.6"/>
      <circle cx="32" cy="50" r="1.5" fill="#dc2626" opacity="0.8"/>
      
      <!-- Stars/sparkles -->
      <circle cx="16" cy="16" r="1" fill="white" opacity="0.8"/>
      <circle cx="48" cy="20" r="1" fill="white" opacity="0.6"/>
      <circle cx="20" cy="48" r="1" fill="white" opacity="0.7"/>
      <circle cx="44" cy="48" r="1" fill="white" opacity="0.5"/>
      
      <!-- Component indicators (small dots) -->
      <circle cx="24" cy="24" r="1" fill="#10b981" opacity="0.8"/>
      <circle cx="40" cy="26" r="1" fill="#8b5cf6" opacity="0.8"/>
    </svg>`
  },
  
  7: {
    name: "Simple Heroicons Rocket",
    description: "Clean, minimal rocket identical to Heroicons RocketLaunchIcon",
    svg: `<svg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="simpleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#2563eb;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#1d4ed8;stop-opacity:1" />
        </linearGradient>
      </defs>
      
      <!-- Background circle -->
      <circle cx="32" cy="32" r="30" fill="url(#simpleGrad)" stroke="#1e40af" stroke-width="2"/>
      
      <!-- Simple rocket outline (Heroicons style) -->
      <g transform="translate(32, 32)">
        <!-- Rocket body -->
        <path d="M-6 -16 L-6 8 L-2 12 L2 12 L6 8 L6 -16 L0 -20 Z" 
              fill="none" 
              stroke="white" 
              stroke-width="2" 
              stroke-linejoin="round" 
              stroke-linecap="round"/>
        
        <!-- Rocket fins -->
        <path d="M-6 4 L-10 8 L-6 8" 
              fill="none" 
              stroke="white" 
              stroke-width="2" 
              stroke-linejoin="round" 
              stroke-linecap="round"/>
        <path d="M6 4 L10 8 L6 8" 
              fill="none" 
              stroke="white" 
              stroke-width="2" 
              stroke-linejoin="round" 
              stroke-linecap="round"/>
        
        <!-- Rocket window -->
        <circle cx="0" cy="-8" r="2" 
                fill="none" 
                stroke="white" 
                stroke-width="2"/>
        
        <!-- Simple exhaust -->
        <path d="M-2 12 L0 18 L2 12" 
              fill="none" 
              stroke="#f59e0b" 
              stroke-width="2" 
              stroke-linejoin="round" 
              stroke-linecap="round"/>
      </g>
    </svg>`
  },
  
  8: {
    name: "Clean MFE Monogram",
    description: "Simple 'M' monogram with modern styling",
    svg: `<svg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="mGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#2563eb;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#1d4ed8;stop-opacity:1" />
        </linearGradient>
      </defs>
      
      <!-- Background circle -->
      <circle cx="32" cy="32" r="30" fill="url(#mGrad)" stroke="#1e40af" stroke-width="2"/>
      
      <!-- Clean M letter -->
      <path d="M18 20 L18 44 L22 44 L22 28 L30 36 L32 34 L34 36 L42 28 L42 44 L46 44 L46 20 L40 20 L32 30 L24 20 Z" 
            fill="white" 
            stroke="none"/>
    </svg>`
  },
  
  9: {
    name: "Modern Component Grid",
    description: "Clean 2x2 grid representing components",
    svg: `<svg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="gridGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#2563eb;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#1d4ed8;stop-opacity:1" />
        </linearGradient>
      </defs>
      
      <!-- Background circle -->
      <circle cx="32" cy="32" r="30" fill="url(#gridGrad)" stroke="#1e40af" stroke-width="2"/>
      
      <!-- Component grid -->
      <rect x="18" y="18" width="12" height="12" rx="2" fill="white" opacity="0.9"/>
      <rect x="34" y="18" width="12" height="12" rx="2" fill="white" opacity="0.7"/>
      <rect x="18" y="34" width="12" height="12" rx="2" fill="white" opacity="0.7"/>
      <rect x="34" y="34" width="12" height="12" rx="2" fill="white" opacity="0.9"/>
    </svg>`
  },
  
  10: {
    name: "Simple React Logo",
    description: "Minimalist React atom symbol",
    svg: `<svg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="reactGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#2563eb;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#1d4ed8;stop-opacity:1" />
        </linearGradient>
      </defs>
      
      <!-- Background circle -->
      <circle cx="32" cy="32" r="30" fill="url(#reactGrad)" stroke="#1e40af" stroke-width="2"/>
      
      <!-- React orbits -->
      <ellipse cx="32" cy="32" rx="20" ry="8" fill="none" stroke="white" stroke-width="2" opacity="0.8"/>
      <ellipse cx="32" cy="32" rx="20" ry="8" fill="none" stroke="white" stroke-width="2" opacity="0.8" transform="rotate(60 32 32)"/>
      <ellipse cx="32" cy="32" rx="20" ry="8" fill="none" stroke="white" stroke-width="2" opacity="0.8" transform="rotate(120 32 32)"/>
      
      <!-- Center dot -->
      <circle cx="32" cy="32" r="3" fill="white"/>
    </svg>`
  },
  
  11: {
    name: "Solid Primary Circle",
    description: "Ultra-minimal solid circle with primary brand color",
    svg: `<svg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <!-- Solid primary color circle -->
      <circle cx="32" cy="32" r="30" fill="#2563eb" stroke="#1e40af" stroke-width="2"/>
    </svg>`
  },
  
  12: {
    name: "Solid Circle with M",
    description: "Solid primary circle with white M monogram",
    svg: `<svg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <!-- Solid primary color circle -->
      <circle cx="32" cy="32" r="30" fill="#2563eb" stroke="#1e40af" stroke-width="2"/>
      
      <!-- White M monogram -->
      <path d="M20 22 L20 42 L24 42 L24 30 L30 36 L32 34 L34 36 L40 30 L40 42 L44 42 L44 22 L38 22 L32 30 L26 22 Z" 
            fill="white"/>
    </svg>`
  },
  
  13: {
    name: "Solid Circle with Dot",
    description: "Solid primary circle with centered white dot",
    svg: `<svg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <!-- Solid primary color circle -->
      <circle cx="32" cy="32" r="30" fill="#2563eb" stroke="#1e40af" stroke-width="2"/>
      
      <!-- White center dot -->
      <circle cx="32" cy="32" r="8" fill="white"/>
    </svg>`
  }
};

function qaFaviconSizes() {
  log('\n🔍 QA: Verifying favicon dimensions...', 'blue');
  
  const expectedSizes = [
    { file: 'favicon-16x16.png', expected: '16x16' },
    { file: 'favicon-32x32.png', expected: '32x32' },
    { file: 'favicon-48x48.png', expected: '48x48' },
    { file: 'apple-touch-icon.png', expected: '180x180' }
  ];
  
  const publicDir = path.join(process.cwd(), 'public');
  let allCorrect = true;
  
  log('================================', 'cyan');
  
  for (const { file, expected } of expectedSizes) {
    const filePath = path.join(publicDir, file);
    
    if (!fs.existsSync(filePath)) {
      log(`❌ ${file.padEnd(25)} Missing`, 'red');
      allCorrect = false;
      continue;
    }
    
    try {
      const { execSync } = require('child_process');
      const result = execSync(`file "${filePath}"`, { encoding: 'utf8' });
      const dimensionMatch = result.match(/(\d+)\s*x\s*(\d+)/);
      
      if (dimensionMatch) {
        const actual = `${dimensionMatch[1]}x${dimensionMatch[2]}`;
        if (actual === expected) {
          const stats = fs.statSync(filePath);
          const size = `${(stats.size / 1024).toFixed(1)}KB`;
          log(`✅ ${file.padEnd(25)} ${actual.padEnd(8)} ${size}`, 'green');
        } else {
          log(`❌ ${file.padEnd(25)} ${actual.padEnd(8)} (expected ${expected})`, 'red');
          allCorrect = false;
        }
      } else {
        log(`⚠️  ${file.padEnd(25)} Could not read dimensions`, 'yellow');
      }
    } catch (error) {
      log(`⚠️  ${file.padEnd(25)} Error checking: ${error.message}`, 'yellow');
    }
  }
  
  // Check SVG files
  const svgFiles = ['favicon.svg', 'apple-touch-icon.svg'];
  for (const file of svgFiles) {
    const filePath = path.join(publicDir, file);
    if (fs.existsSync(filePath)) {
      const stats = fs.statSync(filePath);
      const size = `${(stats.size / 1024).toFixed(1)}KB`;
      log(`✅ ${file.padEnd(25)} Vector   ${size}`, 'green');
    } else {
      log(`❌ ${file.padEnd(25)} Missing`, 'red');
      allCorrect = false;
    }
  }
  
  // Check ICO file
  const icoPath = path.join(publicDir, 'favicon.ico');
  if (fs.existsSync(icoPath)) {
    const stats = fs.statSync(icoPath);
    const size = `${(stats.size / 1024).toFixed(1)}KB`;
    log(`✅ ${'favicon.ico'.padEnd(25)} ICO      ${size}`, 'green');
  } else {
    log(`❌ ${'favicon.ico'.padEnd(25)} Missing`, 'red');
    allCorrect = false;
  }
  
  log('================================', 'cyan');
  
  if (allCorrect) {
    log('🎉 All favicon sizes are correct!', 'green');
  } else {
    log('⚠️  Some favicon issues detected. Run "npm run generate:images" to fix.', 'yellow');
  }
  
  return allCorrect;
}

function displayDesignOptions() {
  log('\n🎨 Available Favicon Designs:', 'bold');
  log('================================', 'cyan');
  
  Object.entries(faviconDesigns).forEach(([key, design]) => {
    log(`${key}. ${design.name}`, 'green');
    log(`   ${design.description}`, 'white');
    log('');
  });
}

function generateFavicon(designNumber) {
  const design = faviconDesigns[designNumber];
  if (!design) {
    log('❌ Invalid design number', 'red');
    return false;
  }
  
  log(`\n🎨 Generating "${design.name}" favicon...`, 'blue');
  
  const publicDir = path.join(process.cwd(), 'public');
  const faviconPath = path.join(publicDir, 'favicon.svg');
  
  // Create backup of existing favicon
  if (fs.existsSync(faviconPath)) {
    const backupPath = path.join(publicDir, 'favicon-backup.svg');
    fs.copyFileSync(faviconPath, backupPath);
    log(`  📦 Backed up existing favicon to favicon-backup.svg`, 'yellow');
  }
  
  // Write new favicon
  fs.writeFileSync(faviconPath, design.svg);
  log(`  ✅ Generated new favicon.svg`, 'green');
  
  // Also create apple-touch-icon.svg
  const appleTouchPath = path.join(publicDir, 'apple-touch-icon.svg');
  fs.writeFileSync(appleTouchPath, design.svg);
  log(`  ✅ Updated apple-touch-icon.svg`, 'green');
  
  return true;
}

async function regenerateAllSizes() {
  log('\n🔄 Regenerating all favicon sizes...', 'blue');
  
  try {
    const { execSync } = require('child_process');
    execSync('npm run generate:images', { stdio: 'inherit' });
    log('  ✅ All favicon sizes regenerated', 'green');
  } catch (error) {
    log('  ❌ Failed to regenerate sizes. Run "npm run generate:images" manually', 'red');
  }
}

function previewFavicon(designNumber) {
  const design = faviconDesigns[designNumber];
  if (!design) {
    log('❌ Invalid design number', 'red');
    return;
  }
  
  log(`\n👀 Preview: ${design.name}`, 'cyan');
  log(`Description: ${design.description}`, 'white');
  log('\nSVG Code:', 'yellow');
  log(design.svg, 'white');
}

async function main() {
  log('🎨 React MFE Shell - Professional Favicon Generator', 'bold');
  log('==================================================', 'cyan');
  
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    displayDesignOptions();
    log('Usage:', 'yellow');
    log('  npm run generate:favicon <design-number>     # Generate favicon', 'white');
    log('  npm run generate:favicon preview <number>    # Preview design', 'white');
    log('  npm run generate:favicon qa                  # QA favicon sizes', 'white');
    log('  npm run generate:favicon all                 # Show all options', 'white');
    log('\nExample:', 'yellow');
    log('  npm run generate:favicon 6                   # Generate Rocket design', 'white');
    return;
  }
  
  const command = args[0];
  
  if (command === 'qa') {
    qaFaviconSizes();
    return;
  }
  
  if (command === 'preview') {
    const designNumber = parseInt(args[1]);
    previewFavicon(designNumber);
    return;
  }
  
  if (command === 'all') {
    displayDesignOptions();
    return;
  }
  
  const designNumber = parseInt(command);
  if (isNaN(designNumber)) {
    log('❌ Please provide a valid design number (1-5)', 'red');
    displayDesignOptions();
    return;
  }
  
  const success = generateFavicon(designNumber);
  if (success) {
    await regenerateAllSizes();
    
    log('\n🎉 Favicon generation complete!', 'green');
    log('💡 Your new favicon is ready. Check these files:', 'yellow');
    log('   • public/favicon.svg (vector)', 'white');
    log('   • public/favicon-*.png (various sizes)', 'white');
    log('   • public/favicon.ico (legacy)', 'white');
    log('\n🚀 Build your demo to see the new favicon:', 'cyan');
    log('   npm run build:demo', 'white');
  }
}

if (require.main === module) {
  main();
}

module.exports = { faviconDesigns, generateFavicon };
