import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'ReactMFEShell',
      fileName: format => `react-mfe-shell.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom', '@heroicons/react'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          '@heroicons/react': 'HeroiconsReact',
        },
      },
    },
    sourcemap: true,
    minify: 'esbuild',
  },
});
