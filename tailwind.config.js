/** @type {import('tailwindcss').Config} */
// Import tokens from the built library
const { tokens } = require('./dist/index.cjs');

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './demo/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    // Override default Tailwind tokens with our design system
    extend: {
      // Colors from design tokens
      colors: {
        // Base colors
        ...tokens.colors.base,
        
        // Semantic colors
        primary: tokens.colors.semantic.primary,
        secondary: tokens.colors.semantic.secondary,
        success: tokens.colors.semantic.success,
        warning: tokens.colors.semantic.warning,
        error: tokens.colors.semantic.error,
        danger: tokens.colors.semantic.error, // Alias for error
        info: tokens.colors.semantic.info,
        
        // Theme-aware colors (CSS custom properties)
        background: {
          primary: 'var(--color-background-primary)',
          secondary: 'var(--color-background-secondary)',
          tertiary: 'var(--color-background-tertiary)',
        },
        surface: {
          primary: 'var(--color-surface-primary)',
          secondary: 'var(--color-surface-secondary)',
          tertiary: 'var(--color-surface-tertiary)',
          elevated: 'var(--color-surface-elevated)',
        },
        text: {
          primary: 'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
          tertiary: 'var(--color-text-tertiary)',
          inverse: 'var(--color-text-inverse)',
          disabled: 'var(--color-text-disabled)',
        },
        border: {
          primary: 'var(--color-border-primary)',
          secondary: 'var(--color-border-secondary)',
          tertiary: 'var(--color-border-tertiary)',
          focus: 'var(--color-border-focus)',
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
  plugins: [],
};
