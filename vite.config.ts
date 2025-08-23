import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

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
  },
});
