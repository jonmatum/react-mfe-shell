import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  // Force esbuild usage to avoid rollup native dependency issues
  bundle: true,
  minify: false,
  // Explicitly disable rollup-specific features
  treeshake: false,
  external: ['react', 'react-dom', '@heroicons/react'],
  tsconfig: 'tsconfig.lib.json',
  esbuildOptions(options) {
    options.banner = {
      js: '"use client"',
    };
    options.jsx = 'automatic';
    // Ensure we're using esbuild for everything
    options.platform = 'neutral';
    options.target = 'es2020';
  },
});
