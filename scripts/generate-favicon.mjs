#!/usr/bin/env node

/**
 * Favicon Generation Script
 * Creates various favicon formats for the React MFE Shell
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Modern MFE Shell favicon SVG
const faviconSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#2563eb;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#1d4ed8;stop-opacity:1" />
    </linearGradient>
  </defs>
  <!-- Background with rounded corners -->
  <rect width="32" height="32" rx="6" fill="url(#grad)"/>
  <!-- MFE Components Grid -->
  <g fill="white" opacity="0.95">
    <!-- Top left component -->
    <rect x="6" y="6" width="8" height="8" rx="2"/>
    <!-- Top right component -->
    <rect x="18" y="6" width="8" height="8" rx="2"/>
    <!-- Bottom left component -->
    <rect x="6" y="18" width="8" height="8" rx="2"/>
    <!-- Bottom right component -->
    <rect x="18" y="18" width="8" height="8" rx="2"/>
    <!-- Central hub -->
    <circle cx="16" cy="16" r="2" fill="white"/>
    <!-- Connection lines -->
    <path d="M14 10h4M10 14v4M18 14v4M14 22h4" stroke="white" stroke-width="1.5" stroke-linecap="round" opacity="0.8"/>
  </g>
</svg>`;

// Apple Touch Icon (larger version)
const appleTouchIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180" fill="none">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#2563eb;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#1d4ed8;stop-opacity:1" />
    </linearGradient>
  </defs>
  <!-- Background with rounded corners -->
  <rect width="180" height="180" rx="40" fill="url(#grad)"/>
  <!-- MFE Components Grid -->
  <g fill="white" opacity="0.95">
    <!-- Top left component -->
    <rect x="30" y="30" width="45" height="45" rx="8"/>
    <!-- Top right component -->
    <rect x="105" y="30" width="45" height="45" rx="8"/>
    <!-- Bottom left component -->
    <rect x="30" y="105" width="45" height="45" rx="8"/>
    <!-- Bottom right component -->
    <rect x="105" y="105" width="45" height="45" rx="8"/>
    <!-- Central hub -->
    <circle cx="90" cy="90" r="12" fill="white"/>
    <!-- Connection lines -->
    <path d="M75 52.5h30M52.5 75v30M105 75v30M75 127.5h30" stroke="white" stroke-width="6" stroke-linecap="round" opacity="0.8"/>
  </g>
</svg>`;

// Create public directory if it doesn't exist
const publicDir = path.join(__dirname, '..', 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Write favicon files
fs.writeFileSync(path.join(publicDir, 'favicon.svg'), faviconSVG);
fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.svg'), appleTouchIcon);

// Create a simple manifest.json for PWA support
const manifest = {
  name: "React MFE Shell",
  short_name: "MFE Shell",
  description: "A production-ready micro frontend shell with React, TypeScript, and modern tooling",
  start_url: "/",
  display: "standalone",
  background_color: "#ffffff",
  theme_color: "#2563eb",
  icons: [
    {
      src: "favicon.svg",
      sizes: "any",
      type: "image/svg+xml"
    },
    {
      src: "apple-touch-icon.svg",
      sizes: "180x180",
      type: "image/svg+xml"
    }
  ]
};

fs.writeFileSync(path.join(publicDir, 'manifest.json'), JSON.stringify(manifest, null, 2));

console.log('✅ Favicon files generated successfully!');
console.log('📁 Files created:');
console.log('   - public/favicon.svg');
console.log('   - public/apple-touch-icon.svg');
console.log('   - public/manifest.json');
