/**
 * React MFE Shell - Tailwind CSS Preset
 *
 * This preset allows consumers to easily integrate our design system
 * with their existing Tailwind configuration.
 *
 * Usage:
 * ```js
 * // tailwind.config.js
 * const { mfeShellPreset } = require('@jonmatum/react-mfe-shell/preset');
 *
 * module.exports = {
 *   presets: [mfeShellPreset],
 *   content: [
 *     './src/**\/*.{js,ts,jsx,tsx}',
 *     './node_modules/@jonmatum/react-mfe-shell/dist/**\/*.js'
 *   ],
 *   // Your custom overrides here
 * }
 * ```
 */

// Import design tokens - will be available after build
const { tokens } = require('../utils/tokens');

const mfeShellPreset = {
  darkMode: 'class',

  theme: {
    extend: {
      // Colors from design tokens
      colors: {
        // Base colors (static)
        ...tokens.colors.base,

        // Semantic colors (static)
        primary: tokens.colors.semantic.primary,
        secondary: tokens.colors.semantic.secondary,
        success: tokens.colors.semantic.success,
        warning: tokens.colors.semantic.warning,
        error: tokens.colors.semantic.error,
        danger: tokens.colors.semantic.error, // Alias
        info: tokens.colors.semantic.info,

        // Theme-aware colors (CSS custom properties)
        background: {
          primary: 'rgb(var(--color-background-primary) / <alpha-value>)',
          secondary: 'rgb(var(--color-background-secondary) / <alpha-value>)',
          tertiary: 'rgb(var(--color-background-tertiary) / <alpha-value>)',
        },
        surface: {
          primary: 'rgb(var(--color-surface-primary) / <alpha-value>)',
          secondary: 'rgb(var(--color-surface-secondary) / <alpha-value>)',
          tertiary: 'rgb(var(--color-surface-tertiary) / <alpha-value>)',
          elevated: 'rgb(var(--color-surface-elevated) / <alpha-value>)',
        },
        text: {
          primary: 'rgb(var(--color-text-primary) / <alpha-value>)',
          secondary: 'rgb(var(--color-text-secondary) / <alpha-value>)',
          tertiary: 'rgb(var(--color-text-tertiary) / <alpha-value>)',
          inverse: 'rgb(var(--color-text-inverse) / <alpha-value>)',
          disabled: 'rgb(var(--color-text-disabled) / <alpha-value>)',
        },
        border: {
          primary: 'rgb(var(--color-border-primary) / <alpha-value>)',
          secondary: 'rgb(var(--color-border-secondary) / <alpha-value>)',
          tertiary: 'rgb(var(--color-border-tertiary) / <alpha-value>)',
          focus: 'rgb(var(--color-border-focus) / <alpha-value>)',
        },
      },

      // Typography from design tokens
      fontFamily: tokens.typography.fontFamily,
      fontSize: tokens.typography.fontSize,
      fontWeight: tokens.typography.fontWeight,
      letterSpacing: tokens.typography.letterSpacing,

      // Spacing from design tokens
      spacing: tokens.spacing,

      // Shadows from design tokens
      boxShadow: tokens.shadows.box,
      dropShadow: tokens.shadows.drop,

      // Border radius from design tokens
      borderRadius: tokens.borderRadius,

      // Breakpoints from design tokens
      screens: tokens.breakpoints,

      // Animation from design tokens
      transitionDuration: tokens.animation.duration,
      transitionTimingFunction: tokens.animation.timingFunction,

      // Z-index from design tokens
      zIndex: tokens.zIndex,
    },
  },

  // Safelist critical component classes
  safelist: [
    // Component variant classes
    {
      pattern:
        /^(bg|text|border)-(primary|secondary|success|warning|error|danger|info)-(50|100|200|300|400|500|600|700|800|900)$/,
      variants: ['hover', 'focus', 'dark', 'dark:hover', 'dark:focus'],
    },
    {
      pattern:
        /^(bg|text|border)-(background|surface|text|border)-(primary|secondary|tertiary|elevated|inverse|disabled|focus)$/,
      variants: ['hover', 'focus', 'dark', 'dark:hover', 'dark:focus'],
    },
    // Size classes
    {
      pattern: /^(w|h)-(3|4|5|6|8|12|16)$/,
    },
    // Focus ring classes
    {
      pattern:
        /^focus:ring-(primary|secondary|success|warning|error|danger|info)-(400|500)$/,
      variants: ['dark'],
    },
  ],

  plugins: [],
};

module.exports = { mfeShellPreset };
