/** @type {import('postcss-load-config').Config} */
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    // Add CSS optimization for production builds only if cssnano is available
    ...(process.env.NODE_ENV === 'production' && (() => {
      try {
        require.resolve('cssnano');
        return {
          cssnano: {
            preset: ['default', {
              discardComments: {
                removeAll: true,
              },
              normalizeWhitespace: true,
              minifySelectors: true,
            }],
          },
        };
      } catch {
        return {};
      }
    })()),
  },
};
