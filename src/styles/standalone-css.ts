/**
 * Standalone CSS Generator
 *
 * Generates complete CSS bundle without requiring Tailwind CSS
 * for consumers who want zero-config integration.
 */

import { tokens } from '../utils/tokens';

/**
 * Generate CSS custom properties from design tokens
 */
function generateCSSCustomProperties(): string {
  const {
    colors,
    spacing,
    typography,
    shadows: _shadows,
    borderRadius: _borderRadius,
    animation: _animation,
    zIndex: _zIndex,
  } = tokens;

  let css = ':root {\n';

  // Base colors
  Object.entries(colors.base).forEach(([colorName, shades]) => {
    if (typeof shades === 'object') {
      Object.entries(shades).forEach(([shade, value]) => {
        css += `  --color-${colorName}-${shade}: ${value};\n`;
      });
    }
  });

  // Semantic colors
  Object.entries(colors.semantic).forEach(([colorName, shades]) => {
    if (typeof shades === 'object') {
      Object.entries(shades).forEach(([shade, value]) => {
        css += `  --color-${colorName}-${shade}: ${value};\n`;
      });
    }
  });

  // Theme-aware colors (light theme defaults)
  css += `
  /* Theme-aware colors - Light theme */
  --color-background-primary: 255 255 255;
  --color-background-secondary: 249 250 251;
  --color-background-tertiary: 243 244 246;
  
  --color-surface-primary: 255 255 255;
  --color-surface-secondary: 249 250 251;
  --color-surface-tertiary: 243 244 246;
  --color-surface-elevated: 255 255 255;
  
  --color-text-primary: 17 24 39;
  --color-text-secondary: 75 85 99;
  --color-text-tertiary: 156 163 175;
  --color-text-inverse: 255 255 255;
  --color-text-disabled: 209 213 219;
  
  --color-border-primary: 229 231 235;
  --color-border-secondary: 243 244 246;
  --color-border-tertiary: 249 250 251;
  --color-border-focus: 59 130 246;
`;

  // Spacing
  Object.entries(spacing).forEach(([key, value]) => {
    css += `  --spacing-${key}: ${value};\n`;
  });

  // Typography
  Object.entries(typography.fontSize).forEach(([key, value]) => {
    css += `  --font-size-${key}: ${Array.isArray(value) ? value[0] : value};\n`;
  });

  css += '}\n\n';

  // Dark theme overrides
  css += `.dark {\n`;
  css += `
  /* Theme-aware colors - Dark theme */
  --color-background-primary: 17 24 39;
  --color-background-secondary: 31 41 55;
  --color-background-tertiary: 55 65 81;
  
  --color-surface-primary: 31 41 55;
  --color-surface-secondary: 55 65 81;
  --color-surface-tertiary: 75 85 99;
  --color-surface-elevated: 55 65 81;
  
  --color-text-primary: 243 244 246;
  --color-text-secondary: 209 213 219;
  --color-text-tertiary: 156 163 175;
  --color-text-inverse: 17 24 39;
  --color-text-disabled: 107 114 128;
  
  --color-border-primary: 75 85 99;
  --color-border-secondary: 55 65 81;
  --color-border-tertiary: 31 41 55;
  --color-border-focus: 96 165 250;
`;
  css += '}\n\n';

  return css;
}

/**
 * Generate component utility classes
 */
function generateUtilityClasses(): string {
  let css = '';

  // Base component classes
  css += `
/* Base Component Classes */
.mfe-button-base {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.375rem;
  font-weight: 500;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  border: 1px solid transparent;
  text-decoration: none;
  outline: none;
}

.mfe-button-base:focus {
  outline: 2px solid transparent;
  outline-offset: 2px;
  box-shadow: 0 0 0 2px rgb(var(--color-border-focus));
}

.mfe-button-base:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Button Sizes */
.mfe-button-xs {
  padding: 0.375rem 0.625rem;
  font-size: 0.75rem;
  line-height: 1rem;
}

.mfe-button-sm {
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
}

.mfe-button-md {
  padding: 0.625rem 1rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
}

.mfe-button-lg {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  line-height: 1.5rem;
}

.mfe-button-xl {
  padding: 1rem 2rem;
  font-size: 1.125rem;
  line-height: 1.75rem;
}

/* Button Variants */
.mfe-button-primary {
  background-color: rgb(var(--color-primary-600));
  color: white;
}

.mfe-button-primary:hover:not(:disabled) {
  background-color: rgb(var(--color-primary-700));
}

.mfe-button-secondary {
  background-color: rgb(var(--color-surface-secondary));
  color: rgb(var(--color-text-primary));
  border-color: rgb(var(--color-border-primary));
}

.mfe-button-secondary:hover:not(:disabled) {
  background-color: rgb(var(--color-surface-tertiary));
}

.mfe-button-ghost {
  background-color: transparent;
  color: rgb(var(--color-text-primary));
}

.mfe-button-ghost:hover:not(:disabled) {
  background-color: rgb(var(--color-surface-secondary));
}

.mfe-button-success {
  background-color: rgb(var(--color-success-600));
  color: white;
}

.mfe-button-success:hover:not(:disabled) {
  background-color: rgb(var(--color-success-700));
}

.mfe-button-warning {
  background-color: rgb(var(--color-warning-600));
  color: white;
}

.mfe-button-warning:hover:not(:disabled) {
  background-color: rgb(var(--color-warning-700));
}

.mfe-button-danger {
  background-color: rgb(var(--color-error-600));
  color: white;
}

.mfe-button-danger:hover:not(:disabled) {
  background-color: rgb(var(--color-error-700));
}

/* Input Base Classes */
.mfe-input-base {
  display: block;
  width: 100%;
  border-radius: 0.375rem;
  border: 1px solid rgb(var(--color-border-primary));
  background-color: rgb(var(--color-surface-primary));
  color: rgb(var(--color-text-primary));
  padding: 0.625rem 0.75rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  transition: all 0.2s ease-in-out;
}

.mfe-input-base:focus {
  outline: none;
  border-color: rgb(var(--color-border-focus));
  box-shadow: 0 0 0 1px rgb(var(--color-border-focus));
}

.mfe-input-base:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background-color: rgb(var(--color-surface-secondary));
}

.mfe-input-base::placeholder {
  color: rgb(var(--color-text-tertiary));
}

/* Badge Base Classes */
.mfe-badge-base {
  display: inline-flex;
  align-items: center;
  border-radius: 9999px;
  font-weight: 500;
  font-size: 0.75rem;
  line-height: 1rem;
  padding: 0.125rem 0.625rem;
  border: 1px solid transparent;
}

.mfe-badge-primary {
  background-color: rgb(var(--color-primary-50));
  color: rgb(var(--color-primary-700));
  border-color: rgb(var(--color-primary-200));
}

.mfe-badge-success {
  background-color: rgb(var(--color-success-50));
  color: rgb(var(--color-success-700));
  border-color: rgb(var(--color-success-200));
}

.mfe-badge-warning {
  background-color: rgb(var(--color-warning-50));
  color: rgb(var(--color-warning-700));
  border-color: rgb(var(--color-warning-200));
}

.mfe-badge-danger {
  background-color: rgb(var(--color-error-50));
  color: rgb(var(--color-error-700));
  border-color: rgb(var(--color-error-200));
}

/* Dark theme adjustments */
.dark .mfe-badge-primary {
  background-color: rgb(var(--color-primary-900) / 0.3);
  color: rgb(var(--color-primary-300));
  border-color: rgb(var(--color-primary-700) / 0.5);
}

.dark .mfe-badge-success {
  background-color: rgb(var(--color-success-900) / 0.3);
  color: rgb(var(--color-success-300));
  border-color: rgb(var(--color-success-700) / 0.5);
}

.dark .mfe-badge-warning {
  background-color: rgb(var(--color-warning-900) / 0.3);
  color: rgb(var(--color-warning-300));
  border-color: rgb(var(--color-warning-700) / 0.5);
}

.dark .mfe-badge-danger {
  background-color: rgb(var(--color-error-900) / 0.3);
  color: rgb(var(--color-error-300));
  border-color: rgb(var(--color-error-700) / 0.5);
}

/* Utility Classes */
.mfe-sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.mfe-transition {
  transition: all 0.2s ease-in-out;
}

.mfe-shadow-sm {
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
}

.mfe-shadow-md {
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
}

.mfe-shadow-lg {
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
}
`;

  return css;
}

/**
 * Generate complete standalone CSS bundle
 */
export function generateStandaloneCSS(): string {
  let css = '';

  // Add header comment
  css += `/*
 * React MFE Shell - Standalone CSS Bundle
 * Generated automatically - do not edit directly
 * 
 * This CSS bundle provides all styles needed for MFE components
 * without requiring Tailwind CSS configuration.
 */

`;

  // Add CSS custom properties
  css += generateCSSCustomProperties();

  // Add utility classes
  css += generateUtilityClasses();

  return css;
}

/**
 * CSS class name mapping for components
 */
export const cssClassMap = {
  button: {
    base: 'mfe-button-base',
    sizes: {
      xs: 'mfe-button-xs',
      sm: 'mfe-button-sm',
      md: 'mfe-button-md',
      lg: 'mfe-button-lg',
      xl: 'mfe-button-xl',
    },
    variants: {
      primary: 'mfe-button-primary',
      secondary: 'mfe-button-secondary',
      ghost: 'mfe-button-ghost',
      success: 'mfe-button-success',
      warning: 'mfe-button-warning',
      danger: 'mfe-button-danger',
    },
  },
  input: {
    base: 'mfe-input-base',
  },
  badge: {
    base: 'mfe-badge-base',
    variants: {
      primary: 'mfe-badge-primary',
      success: 'mfe-badge-success',
      warning: 'mfe-badge-warning',
      danger: 'mfe-badge-danger',
    },
  },
  utils: {
    srOnly: 'mfe-sr-only',
    transition: 'mfe-transition',
    shadowSm: 'mfe-shadow-sm',
    shadowMd: 'mfe-shadow-md',
    shadowLg: 'mfe-shadow-lg',
  },
};
