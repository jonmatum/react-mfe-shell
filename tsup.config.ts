import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  // Use esbuild instead of rollup to avoid native dependency issues
  bundle: true,
  minify: false,
  external: ['react', 'react-dom', '@heroicons/react'],
  tsconfig: 'tsconfig.lib.json',
  esbuildOptions(options) {
    options.banner = {
      js: '"use client"',
    };
    options.jsx = 'automatic';
    // Ensure we're using esbuild for everything
    options.platform = 'neutral';
  },
});
