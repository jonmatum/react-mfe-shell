import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { readFileSync } from 'fs';

// Read package.json files to get versions
const mainPackageJson = JSON.parse(readFileSync('./package.json', 'utf-8'));
const demoPackageJson = JSON.parse(readFileSync('./demo/package.json', 'utf-8'));

export default defineConfig({
  plugins: [react()],
  root: '.',
  base: process.env.NODE_ENV === 'production' ? '/react-mfe-shell/' : '/',
  build: {
    outDir: 'dist-demo',
    sourcemap: true,
    minify: 'esbuild',
  },
  server: {
    port: 3000,
    host: true,
    cors: true,
  },
  preview: {
    port: 3000,
    host: true,
    cors: true,
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify(
      process.env.NODE_ENV || 'development'
    ),
    '__APP_VERSION__': JSON.stringify(mainPackageJson.version),
    '__DEMO_VERSION__': JSON.stringify(demoPackageJson.version),
  },
});
