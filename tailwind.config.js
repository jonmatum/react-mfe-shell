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
  safelist: [
    // Button variant classes - ensure these are always generated
    'bg-success-600',
    'bg-success-700',
    'bg-warning-600', 
    'bg-warning-700',
    'hover:bg-success-700',
    'hover:bg-warning-700',
    'dark:bg-success-500',
    'dark:bg-warning-500',
    'dark:hover:bg-success-600',
    'dark:hover:bg-warning-600',
    'text-white',
    'focus:ring-success-500',
    'focus:ring-warning-500',
    'dark:focus:ring-success-400',
    'dark:focus:ring-warning-400',
    
    // Badge variant classes - ensure these are always generated
    'bg-success-50',
    'bg-warning-50',
    'bg-error-50',
    'text-success-700',
    'text-warning-700',
    'text-error-700',
    'border-success-200',
    'border-warning-200',
    'border-error-200',
    'dark:bg-success-900/30',
    'dark:bg-warning-900/30',
    'dark:bg-error-900/30',
    'dark:text-success-300',
    'dark:text-warning-300',
    'dark:text-error-300',
    'dark:border-success-700/50',
    'dark:border-warning-700/50',
    'dark:border-error-700/50',
    
    // Badge remove button hover states
    'hover:bg-success-100',
    'hover:bg-warning-100',
    'hover:bg-error-100',
    'dark:hover:bg-success-800/50',
    'dark:hover:bg-warning-800/50',
    'dark:hover:bg-error-800/50',
    
    // Switch component classes - ensure these are always generated
    'bg-surface-secondary',
    'bg-primary-600',
    'bg-success-600',
    'bg-warning-600',
    'bg-danger-600',
    'focus:ring-primary-500',
    'focus:ring-success-500',
    'focus:ring-warning-500',
    'focus:ring-danger-500',
  ],
  plugins: [],
};
