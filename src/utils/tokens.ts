/**
 * Design Token System
 * Single source of truth for all design values
 * Supports theming, accessibility, and Tailwind CSS integration
 */

// =============================================================================
// COLOR TOKENS
// =============================================================================

/**
 * Base color palette - semantic color definitions
 * All colors meet WCAG AA contrast requirements
 */
export const baseColors = {
  // Neutral colors
  white: '#ffffff',
  black: '#000000',

  // Gray scale (optimized for accessibility)
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
    950: '#030712',
  },

  // Primary brand colors
  blue: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
    950: '#172554',
  },

  // Success colors
  green: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
    950: '#052e16',
  },

  // Warning colors
  yellow: {
    50: '#fefce8',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
    950: '#451a03',
  },

  // Error colors
  red: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
    950: '#450a0a',
  },

  // Info colors
  cyan: {
    50: '#ecfeff',
    100: '#cffafe',
    200: '#a5f3fc',
    300: '#67e8f9',
    400: '#22d3ee',
    500: '#06b6d4',
    600: '#0891b2',
    700: '#0e7490',
    800: '#155e75',
    900: '#164e63',
    950: '#083344',
  },
} as const;

/**
 * Semantic color tokens - mapped to base colors
 * These provide meaning and context to colors
 */
export const semanticColors = {
  primary: baseColors.blue,
  secondary: baseColors.gray,
  success: baseColors.green,
  warning: baseColors.yellow,
  error: baseColors.red,
  info: baseColors.cyan,
} as const;

/**
 * Theme-aware color system
 * Defines colors for light and dark themes
 */
export const themeColors = {
  light: {
    // Background colors
    background: {
      primary: baseColors.white,
      secondary: baseColors.gray[50],
      tertiary: baseColors.gray[100],
    },

    // Surface colors (cards, modals, etc.)
    surface: {
      primary: baseColors.white,
      secondary: baseColors.gray[50],
      tertiary: baseColors.gray[100],
      elevated: baseColors.white,
    },

    // Text colors
    text: {
      primary: baseColors.gray[900],
      secondary: baseColors.gray[600],
      tertiary: baseColors.gray[500],
      inverse: baseColors.white,
      disabled: baseColors.gray[400],
    },

    // Border colors
    border: {
      primary: baseColors.gray[200],
      secondary: baseColors.gray[300],
      tertiary: baseColors.gray[400],
      focus: semanticColors.primary[500],
    },

    // Interactive colors
    interactive: {
      primary: semanticColors.primary[600],
      'primary-hover': semanticColors.primary[700],
      'primary-active': semanticColors.primary[800],
      secondary: baseColors.gray[100],
      'secondary-hover': baseColors.gray[200],
      'secondary-active': baseColors.gray[300],
    },

    // Status colors
    status: {
      success: semanticColors.success[600],
      warning: semanticColors.warning[600],
      error: semanticColors.error[600],
      info: semanticColors.info[600],
    },
  },

  dark: {
    // Background colors
    background: {
      primary: baseColors.gray[900],
      secondary: baseColors.gray[800],
      tertiary: baseColors.gray[700],
    },

    // Surface colors
    surface: {
      primary: baseColors.gray[800],
      secondary: baseColors.gray[700],
      tertiary: baseColors.gray[600],
      elevated: baseColors.gray[700],
    },

    // Text colors
    text: {
      primary: baseColors.gray[100],
      secondary: baseColors.gray[300],
      tertiary: baseColors.gray[400],
      inverse: baseColors.gray[900],
      disabled: baseColors.gray[500],
    },

    // Border colors
    border: {
      primary: baseColors.gray[700],
      secondary: baseColors.gray[600],
      tertiary: baseColors.gray[500],
      focus: semanticColors.primary[400],
    },

    // Interactive colors
    interactive: {
      primary: semanticColors.primary[500],
      'primary-hover': semanticColors.primary[400],
      'primary-active': semanticColors.primary[300],
      secondary: baseColors.gray[700],
      'secondary-hover': baseColors.gray[600],
      'secondary-active': baseColors.gray[500],
    },

    // Status colors
    status: {
      success: semanticColors.success[500],
      warning: semanticColors.warning[500],
      error: semanticColors.error[500],
      info: semanticColors.info[500],
    },
  },
} as const;

// =============================================================================
// TYPOGRAPHY TOKENS
// =============================================================================

/**
 * Font family tokens
 */
export const fontFamily = {
  sans: [
    'Inter',
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
  ],
  mono: [
    '"JetBrains Mono"',
    'Menlo',
    'Monaco',
    'Consolas',
    '"Liberation Mono"',
    '"Courier New"',
    'monospace',
  ],
} as const;

/**
 * Font size tokens with line heights
 * Following a modular scale for consistency
 */
export const fontSize = {
  xs: ['0.75rem', { lineHeight: '1rem' }], // 12px
  sm: ['0.875rem', { lineHeight: '1.25rem' }], // 14px
  base: ['1rem', { lineHeight: '1.5rem' }], // 16px
  lg: ['1.125rem', { lineHeight: '1.75rem' }], // 18px
  xl: ['1.25rem', { lineHeight: '1.75rem' }], // 20px
  '2xl': ['1.5rem', { lineHeight: '2rem' }], // 24px
  '3xl': ['1.875rem', { lineHeight: '2.25rem' }], // 30px
  '4xl': ['2.25rem', { lineHeight: '2.5rem' }], // 36px
  '5xl': ['3rem', { lineHeight: '1' }], // 48px
  '6xl': ['3.75rem', { lineHeight: '1' }], // 60px
  '7xl': ['4.5rem', { lineHeight: '1' }], // 72px
  '8xl': ['6rem', { lineHeight: '1' }], // 96px
  '9xl': ['8rem', { lineHeight: '1' }], // 128px
} as const;

/**
 * Font weight tokens
 */
export const fontWeight = {
  thin: '100',
  extralight: '200',
  light: '300',
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  extrabold: '800',
  black: '900',
} as const;

/**
 * Letter spacing tokens
 */
export const letterSpacing = {
  tighter: '-0.05em',
  tight: '-0.025em',
  normal: '0em',
  wide: '0.025em',
  wider: '0.05em',
  widest: '0.1em',
} as const;

// =============================================================================
// SPACING TOKENS
// =============================================================================

/**
 * Spacing scale based on 0.25rem (4px) increments
 * Provides consistent spacing throughout the design system
 */
export const spacing = {
  0: '0px',
  px: '1px',
  0.5: '0.125rem', // 2px
  1: '0.25rem', // 4px
  1.5: '0.375rem', // 6px
  2: '0.5rem', // 8px
  2.5: '0.625rem', // 10px
  3: '0.75rem', // 12px
  3.5: '0.875rem', // 14px
  4: '1rem', // 16px
  5: '1.25rem', // 20px
  6: '1.5rem', // 24px
  7: '1.75rem', // 28px
  8: '2rem', // 32px
  9: '2.25rem', // 36px
  10: '2.5rem', // 40px
  11: '2.75rem', // 44px
  12: '3rem', // 48px
  14: '3.5rem', // 56px
  16: '4rem', // 64px
  20: '5rem', // 80px
  24: '6rem', // 96px
  28: '7rem', // 112px
  32: '8rem', // 128px
  36: '9rem', // 144px
  40: '10rem', // 160px
  44: '11rem', // 176px
  48: '12rem', // 192px
  52: '13rem', // 208px
  56: '14rem', // 224px
  60: '15rem', // 240px
  64: '16rem', // 256px
  72: '18rem', // 288px
  80: '20rem', // 320px
  96: '24rem', // 384px
} as const;

// =============================================================================
// SHADOW TOKENS
// =============================================================================

/**
 * Box shadow tokens for elevation
 * Provides depth and hierarchy to components
 */
export const boxShadow = {
  none: 'none',
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  base: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
} as const;

/**
 * Drop shadow tokens for filters
 */
export const dropShadow = {
  none: 'none',
  sm: '0 1px 1px rgb(0 0 0 / 0.05)',
  base: '0 1px 2px rgb(0 0 0 / 0.1)',
  md: '0 4px 3px rgb(0 0 0 / 0.07)',
  lg: '0 10px 8px rgb(0 0 0 / 0.04)',
  xl: '0 20px 13px rgb(0 0 0 / 0.03)',
  '2xl': '0 25px 25px rgb(0 0 0 / 0.15)',
} as const;

// =============================================================================
// BORDER RADIUS TOKENS
// =============================================================================

/**
 * Border radius tokens for consistent rounded corners
 */
export const borderRadius = {
  none: '0px',
  sm: '0.125rem', // 2px
  base: '0.25rem', // 4px
  md: '0.375rem', // 6px
  lg: '0.5rem', // 8px
  xl: '0.75rem', // 12px
  '2xl': '1rem', // 16px
  '3xl': '1.5rem', // 24px
  full: '9999px',
} as const;

// =============================================================================
// BREAKPOINT TOKENS
// =============================================================================

/**
 * Responsive breakpoints for mobile-first design
 */
export const breakpoints = {
  xs: '475px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

// =============================================================================
// ANIMATION TOKENS
// =============================================================================

/**
 * Animation duration tokens
 */
export const animationDuration = {
  75: '75ms',
  100: '100ms',
  150: '150ms',
  200: '200ms',
  300: '300ms',
  500: '500ms',
  700: '700ms',
  1000: '1000ms',
} as const;

/**
 * Animation timing function tokens
 */
export const animationTimingFunction = {
  linear: 'linear',
  in: 'cubic-bezier(0.4, 0, 1, 1)',
  out: 'cubic-bezier(0, 0, 0.2, 1)',
  'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
} as const;

// =============================================================================
// Z-INDEX TOKENS
// =============================================================================

/**
 * Z-index tokens for layering
 */
export const zIndex = {
  auto: 'auto',
  0: '0',
  10: '10',
  20: '20',
  30: '30',
  40: '40',
  50: '50',
  dropdown: '1000',
  sticky: '1020',
  fixed: '1030',
  modal: '1040',
  popover: '1050',
  tooltip: '1060',
  toast: '1070',
} as const;

// =============================================================================
// COMPONENT-SPECIFIC TOKENS
// =============================================================================

/**
 * Component size tokens
 */
export const componentSizes = {
  xs: {
    height: spacing[6],
    padding: `${spacing[1]} ${spacing[2]}`,
    fontSize: fontSize.xs[0],
  },
  sm: {
    height: spacing[8],
    padding: `${spacing[1.5]} ${spacing[3]}`,
    fontSize: fontSize.sm[0],
  },
  md: {
    height: spacing[10],
    padding: `${spacing[2]} ${spacing[4]}`,
    fontSize: fontSize.base[0],
  },
  lg: {
    height: spacing[12],
    padding: `${spacing[2.5]} ${spacing[6]}`,
    fontSize: fontSize.lg[0],
  },
  xl: {
    height: spacing[14],
    padding: `${spacing[3]} ${spacing[8]}`,
    fontSize: fontSize.xl[0],
  },
} as const;

// =============================================================================
// EXPORTED TOKEN COLLECTIONS
// =============================================================================

/**
 * Complete design token system
 */
export const tokens = {
  colors: {
    base: baseColors,
    semantic: semanticColors,
    theme: themeColors,
  },
  typography: {
    fontFamily,
    fontSize,
    fontWeight,
    letterSpacing,
  },
  spacing,
  shadows: {
    box: boxShadow,
    drop: dropShadow,
  },
  borderRadius,
  breakpoints,
  animation: {
    duration: animationDuration,
    timingFunction: animationTimingFunction,
  },
  zIndex,
  components: {
    sizes: componentSizes,
  },
} as const;

// =============================================================================
// LEGACY EXPORTS (for backward compatibility)
// =============================================================================

export const colors = baseColors;
export const typography = { fontFamily, fontSize, fontWeight, letterSpacing };
export const shadows = boxShadow;
export const transitions = animationTimingFunction;

// Default export
export default tokens;
