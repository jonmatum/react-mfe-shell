/**
 * Style Adapter - Hybrid Styling System
 *
 * Provides a unified interface for components to work with both:
 * 1. Tailwind CSS classes (when Tailwind is available)
 * 2. Standalone CSS classes (when using CSS bundle)
 * 3. CSS-in-JS styles (for runtime styling)
 */

import { cssClassMap } from '../styles/standalone-css';
import { classNames } from './index';

// Detect if Tailwind CSS is available
let tailwindAvailable: boolean | null = null;

function detectTailwind(): boolean {
  if (typeof window === 'undefined') return false;
  if (tailwindAvailable !== null) return tailwindAvailable;

  // Check if Tailwind CSS is loaded by testing a common utility class
  const testElement = document.createElement('div');
  testElement.className = 'flex';
  testElement.style.position = 'absolute';
  testElement.style.visibility = 'hidden';
  document.body.appendChild(testElement);

  const computedStyle = window.getComputedStyle(testElement);
  const hasFlex = computedStyle.display === 'flex';

  document.body.removeChild(testElement);

  tailwindAvailable = hasFlex;
  return tailwindAvailable;
}

/**
 * Style configuration for different integration modes
 */
export type StyleMode = 'tailwind' | 'standalone' | 'css-in-js';

interface StyleConfig {
  mode: StyleMode;
  prefix?: string;
}

let globalStyleConfig: StyleConfig = {
  mode: 'tailwind', // Default to Tailwind
};

/**
 * Configure the styling system
 */
export function configureStyles(config: Partial<StyleConfig>): void {
  globalStyleConfig = { ...globalStyleConfig, ...config };
}

/**
 * Auto-detect the best styling mode
 */
export function autoDetectStyleMode(): StyleMode {
  if (detectTailwind()) {
    return 'tailwind';
  }
  return 'standalone';
}

/**
 * Style variant definitions for components
 */
interface ComponentStyles {
  tailwind: Record<string, string>;
  standalone: Record<string, string>;
  cssInJs?: Record<string, React.CSSProperties>;
}

/**
 * Button style variants
 */
export const buttonStyles: Record<string, ComponentStyles> = {
  // Base styles
  base: {
    tailwind:
      'inline-flex items-center justify-center rounded-md font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
    standalone: cssClassMap.button.base,
    cssInJs: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '0.375rem',
      fontWeight: '500',
      transition: 'all 0.2s ease-in-out',
      cursor: 'pointer',
      border: '1px solid transparent',
      outline: 'none',
    },
  },

  // Size variants
  'size-xs': {
    tailwind: 'px-2.5 py-1.5 text-xs',
    standalone: cssClassMap.button.sizes.xs,
    cssInJs: {
      padding: '0.375rem 0.625rem',
      fontSize: '0.75rem',
      lineHeight: '1rem',
    },
  },
  'size-sm': {
    tailwind: 'px-3 py-2 text-sm',
    standalone: cssClassMap.button.sizes.sm,
    cssInJs: {
      padding: '0.5rem 0.75rem',
      fontSize: '0.875rem',
      lineHeight: '1.25rem',
    },
  },
  'size-md': {
    tailwind: 'px-4 py-2.5 text-sm',
    standalone: cssClassMap.button.sizes.md,
    cssInJs: {
      padding: '0.625rem 1rem',
      fontSize: '0.875rem',
      lineHeight: '1.25rem',
    },
  },
  'size-lg': {
    tailwind: 'px-6 py-3 text-base',
    standalone: cssClassMap.button.sizes.lg,
    cssInJs: {
      padding: '0.75rem 1.5rem',
      fontSize: '1rem',
      lineHeight: '1.5rem',
    },
  },
  'size-xl': {
    tailwind: 'px-8 py-4 text-lg',
    standalone: cssClassMap.button.sizes.xl,
    cssInJs: {
      padding: '1rem 2rem',
      fontSize: '1.125rem',
      lineHeight: '1.75rem',
    },
  },

  // Color variants
  'variant-primary': {
    tailwind:
      'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500 dark:bg-primary-500 dark:hover:bg-primary-600',
    standalone: cssClassMap.button.variants.primary,
    cssInJs: {
      backgroundColor: 'rgb(var(--color-primary-600))',
      color: 'white',
    },
  },
  'variant-secondary': {
    tailwind:
      'bg-surface-secondary text-text-primary border border-border-primary hover:bg-surface-tertiary focus:ring-primary-500',
    standalone: cssClassMap.button.variants.secondary,
    cssInJs: {
      backgroundColor: 'rgb(var(--color-surface-secondary))',
      color: 'rgb(var(--color-text-primary))',
      borderColor: 'rgb(var(--color-border-primary))',
    },
  },
  'variant-ghost': {
    tailwind:
      'text-text-primary hover:bg-surface-secondary focus:ring-primary-500',
    standalone: cssClassMap.button.variants.ghost,
    cssInJs: {
      backgroundColor: 'transparent',
      color: 'rgb(var(--color-text-primary))',
    },
  },
  'variant-success': {
    tailwind:
      'bg-success-600 text-white hover:bg-success-700 focus:ring-success-500',
    standalone: cssClassMap.button.variants.success,
    cssInJs: {
      backgroundColor: 'rgb(var(--color-success-600))',
      color: 'white',
    },
  },
  'variant-warning': {
    tailwind:
      'bg-warning-600 text-white hover:bg-warning-700 focus:ring-warning-500',
    standalone: cssClassMap.button.variants.warning,
    cssInJs: {
      backgroundColor: 'rgb(var(--color-warning-600))',
      color: 'white',
    },
  },
  'variant-danger': {
    tailwind: 'bg-error-600 text-white hover:bg-error-700 focus:ring-error-500',
    standalone: cssClassMap.button.variants.danger,
    cssInJs: {
      backgroundColor: 'rgb(var(--color-error-600))',
      color: 'white',
    },
  },
};

/**
 * Get styles for a component variant
 */
export function getComponentStyles(
  component: string,
  variants: string[],
  mode?: StyleMode
): { className?: string; style?: React.CSSProperties } {
  const styleMode = mode || globalStyleConfig.mode;
  const styles = component === 'button' ? buttonStyles : {};

  if (styleMode === 'css-in-js') {
    // Merge CSS-in-JS styles
    const mergedStyles: React.CSSProperties = {};
    variants.forEach(variant => {
      const variantStyles = styles[variant];
      if (variantStyles?.cssInJs) {
        Object.assign(mergedStyles, variantStyles.cssInJs);
      }
    });
    return { style: mergedStyles };
  }

  // Get class names for Tailwind or standalone mode
  const classNames: string[] = [];
  variants.forEach(variant => {
    const variantStyles = styles[variant];
    if (variantStyles) {
      const className =
        styleMode === 'tailwind'
          ? variantStyles.tailwind
          : variantStyles.standalone;
      if (className) {
        classNames.push(className);
      }
    }
  });

  return { className: classNames.join(' ') };
}

/**
 * Hook for component styling
 */
export function useComponentStyles(
  component: string,
  variants: string[],
  customClassName?: string,
  mode?: StyleMode
) {
  const { className, style } = getComponentStyles(component, variants, mode);

  return {
    className: classNames(className, customClassName),
    style,
  };
}

/**
 * Utility to create adaptive class names
 */
export function adaptiveClassName(
  tailwindClasses: string,
  standaloneClasses: string,
  mode?: StyleMode
): string {
  const styleMode = mode || globalStyleConfig.mode;

  if (styleMode === 'tailwind') {
    return tailwindClasses;
  }

  return standaloneClasses;
}

/**
 * Initialize the style adapter
 */
export function initializeStyleAdapter(config?: Partial<StyleConfig>): void {
  if (config) {
    configureStyles(config);
  } else {
    // Auto-detect the best mode
    const detectedMode = autoDetectStyleMode();
    configureStyles({ mode: detectedMode });
  }
}

// Auto-initialize in browser environment
if (typeof window !== 'undefined') {
  // Delay initialization to allow Tailwind to load
  setTimeout(() => {
    if (globalStyleConfig.mode === 'tailwind') {
      initializeStyleAdapter();
    }
  }, 100);
}
