/**
 * Theme Management Utilities
 * Provides comprehensive theme switching and management functionality
 */

import { themeColors } from './tokens';
import type { ThemeMode, ThemeConfig, ThemeColors } from '../types/tokens';

// =============================================================================
// CONSTANTS
// =============================================================================

/**
 * Available theme modes
 */
export const THEME_MODES: ThemeMode[] = ['light', 'dark', 'system'] as const;

/**
 * Storage key for theme preference
 */
export const THEME_STORAGE_KEY = 'mfe-shell-theme' as const;

/**
 * CSS class names for themes
 */
export const THEME_CLASS_NAMES = {
  light: '',
  dark: 'dark',
} as const;

/**
 * Media query for system dark mode preference
 */
export const DARK_MODE_MEDIA_QUERY = '(prefers-color-scheme: dark)' as const;

// =============================================================================
// THEME DETECTION
// =============================================================================

/**
 * Detects the system's preferred color scheme
 */
export function getSystemTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') {
    return 'light'; // Default for SSR
  }

  try {
    const mediaQuery = window.matchMedia(DARK_MODE_MEDIA_QUERY);
    return mediaQuery.matches ? 'dark' : 'light';
  } catch {
    return 'light'; // Fallback if matchMedia is not supported
  }
}

/**
 * Resolves the actual theme based on the theme mode
 */
export function resolveTheme(mode: ThemeMode): 'light' | 'dark' {
  switch (mode) {
    case 'light':
      return 'light';
    case 'dark':
      return 'dark';
    case 'system':
      return getSystemTheme();
    default:
      return 'light';
  }
}

// =============================================================================
// THEME PERSISTENCE
// =============================================================================

/**
 * Saves theme preference to localStorage
 */
export function saveThemePreference(mode: ThemeMode): void {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, mode);
  } catch (error) {
    console.warn('Failed to save theme preference:', error);
  }
}

/**
 * Loads theme preference from localStorage
 */
export function loadThemePreference(): ThemeMode {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored && THEME_MODES.includes(stored as ThemeMode)) {
      return stored as ThemeMode;
    }
  } catch (error) {
    console.warn('Failed to load theme preference:', error);
  }

  return 'system'; // Default to system preference
}

/**
 * Clears theme preference from localStorage
 */
export function clearThemePreference(): void {
  try {
    localStorage.removeItem(THEME_STORAGE_KEY);
  } catch (error) {
    console.warn('Failed to clear theme preference:', error);
  }
}

// =============================================================================
// DOM MANIPULATION
// =============================================================================

/**
 * Applies theme classes to the document element
 */
export function applyThemeToDOM(mode: ThemeMode): void {
  if (typeof document === 'undefined') {
    return; // Skip in SSR environment
  }

  const resolvedTheme = resolveTheme(mode);
  const { classList } = document.documentElement;

  // Remove existing theme classes
  classList.remove('light', 'dark');

  // Add the resolved theme class
  if (resolvedTheme === 'dark') {
    classList.add('dark');
  }

  // Set data attribute for CSS targeting
  document.documentElement.setAttribute('data-theme', resolvedTheme);
}

/**
 * Gets the current theme from the DOM
 */
export function getCurrentThemeFromDOM(): 'light' | 'dark' {
  if (typeof document === 'undefined') {
    return 'light';
  }

  return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
}

// =============================================================================
// CSS CUSTOM PROPERTIES
// =============================================================================

/**
 * Generates CSS custom properties for a theme
 */
export function generateThemeCustomProperties(
  theme: ThemeColors
): Record<string, string> {
  return {
    // Background colors
    '--color-background-primary': theme.background.primary,
    '--color-background-secondary': theme.background.secondary,
    '--color-background-tertiary': theme.background.tertiary,

    // Surface colors
    '--color-surface-primary': theme.surface.primary,
    '--color-surface-secondary': theme.surface.secondary,
    '--color-surface-tertiary': theme.surface.tertiary,
    '--color-surface-elevated': theme.surface.elevated || theme.surface.primary,

    // Text colors
    '--color-text-primary': theme.text.primary,
    '--color-text-secondary': theme.text.secondary,
    '--color-text-tertiary': theme.text.tertiary,
    '--color-text-inverse': theme.text.inverse,
    '--color-text-disabled': theme.text.disabled,

    // Border colors
    '--color-border-primary': theme.border.primary,
    '--color-border-secondary': theme.border.secondary,
    '--color-border-tertiary': theme.border.tertiary,
    '--color-border-focus': theme.border.focus,

    // Interactive colors
    '--color-interactive-primary': theme.interactive.primary,
    '--color-interactive-primary-hover': theme.interactive['primary-hover'],
    '--color-interactive-primary-active': theme.interactive['primary-active'],
    '--color-interactive-secondary': theme.interactive.secondary,
    '--color-interactive-secondary-hover': theme.interactive['secondary-hover'],
    '--color-interactive-secondary-active':
      theme.interactive['secondary-active'],

    // Status colors
    '--color-status-success': theme.status.success,
    '--color-status-warning': theme.status.warning,
    '--color-status-error': theme.status.error,
    '--color-status-info': theme.status.info,
  };
}

/**
 * Applies CSS custom properties to the document root
 */
export function applyThemeCustomProperties(theme: ThemeColors): void {
  if (typeof document === 'undefined') {
    return;
  }

  const properties = generateThemeCustomProperties(theme);
  const { style } = document.documentElement;

  Object.entries(properties).forEach(([property, value]) => {
    style.setProperty(property, value);
  });
}

// =============================================================================
// SYSTEM THEME MONITORING
// =============================================================================

/**
 * Creates a media query listener for system theme changes
 */
export function createSystemThemeListener(
  callback: (isDark: boolean) => void
): (() => void) | null {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const mediaQuery = window.matchMedia(DARK_MODE_MEDIA_QUERY);

    const listener = (event: MediaQueryListEvent) => {
      callback(event.matches);
    };

    // Add listener
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', listener);

      // Return cleanup function
      return () => {
        mediaQuery.removeEventListener('change', listener);
      };
    } else if (mediaQuery.addListener) {
      // Fallback for older browsers
      mediaQuery.addListener(listener);

      return () => {
        mediaQuery.removeListener(listener);
      };
    }
  } catch (error) {
    console.warn('Failed to create system theme listener:', error);
  }

  return null;
}

// =============================================================================
// THEME CONFIGURATION
// =============================================================================

/**
 * Creates a complete theme configuration
 */
export function createThemeConfig(mode: ThemeMode): ThemeConfig {
  const resolvedTheme = resolveTheme(mode);
  const colors = themeColors[resolvedTheme];

  return {
    mode,
    colors,
  };
}

/**
 * Validates if a theme mode is valid
 */
export function isValidThemeMode(mode: string): mode is ThemeMode {
  return THEME_MODES.includes(mode as ThemeMode);
}

// =============================================================================
// THEME UTILITIES
// =============================================================================

/**
 * Gets the opposite theme
 */
export function getOppositeTheme(theme: 'light' | 'dark'): 'light' | 'dark' {
  return theme === 'light' ? 'dark' : 'light';
}

/**
 * Checks if the current theme is dark
 */
export function isDarkTheme(mode: ThemeMode): boolean {
  return resolveTheme(mode) === 'dark';
}

/**
 * Checks if the current theme is light
 */
export function isLightTheme(mode: ThemeMode): boolean {
  return resolveTheme(mode) === 'light';
}

/**
 * Gets theme-appropriate color value
 */
export function getThemeColor(
  colorPath: string,
  mode: ThemeMode = 'system'
): string {
  const resolvedTheme = resolveTheme(mode);
  const colors = themeColors[resolvedTheme];

  // Simple path resolution (e.g., 'text.primary' -> colors.text.primary)
  const pathParts = colorPath.split('.');
  let value: any = colors;

  for (const part of pathParts) {
    if (value && typeof value === 'object' && part in value) {
      value = value[part];
    } else {
      return ''; // Return empty string if path is invalid
    }
  }

  return typeof value === 'string' ? value : '';
}

// =============================================================================
// INITIALIZATION
// =============================================================================

/**
 * Initializes the theme system
 */
export function initializeTheme(): ThemeMode {
  const preferredMode = loadThemePreference();
  applyThemeToDOM(preferredMode);

  // Apply CSS custom properties for the resolved theme
  const resolvedTheme = resolveTheme(preferredMode);
  applyThemeCustomProperties(themeColors[resolvedTheme]);

  return preferredMode;
}

/**
 * Sets up complete theme management
 */
export function setupThemeManagement(
  onThemeChange?: (mode: ThemeMode, resolvedTheme: 'light' | 'dark') => void
): {
  currentMode: ThemeMode;
  setTheme: (mode: ThemeMode) => void;
  cleanup: () => void;
} {
  // Initialize theme
  const currentMode = initializeTheme();

  // Set up system theme listener
  const cleanup = createSystemThemeListener(isDark => {
    const storedMode = loadThemePreference();
    if (storedMode === 'system') {
      const newTheme = isDark ? 'dark' : 'light';
      applyThemeToDOM('system');
      applyThemeCustomProperties(themeColors[newTheme]);
      onThemeChange?.('system', newTheme);
    }
  });

  // Theme setter function
  const setTheme = (mode: ThemeMode) => {
    saveThemePreference(mode);
    applyThemeToDOM(mode);

    const resolvedTheme = resolveTheme(mode);
    applyThemeCustomProperties(themeColors[resolvedTheme]);

    onThemeChange?.(mode, resolvedTheme);
  };

  return {
    currentMode,
    setTheme,
    cleanup: cleanup || (() => {}),
  };
}

// =============================================================================
// EXPORTS
// =============================================================================

export default {
  // Theme detection
  getSystemTheme,
  resolveTheme,

  // Persistence
  saveThemePreference,
  loadThemePreference,
  clearThemePreference,

  // DOM manipulation
  applyThemeToDOM,
  getCurrentThemeFromDOM,

  // CSS custom properties
  generateThemeCustomProperties,
  applyThemeCustomProperties,

  // System monitoring
  createSystemThemeListener,

  // Configuration
  createThemeConfig,
  isValidThemeMode,

  // Utilities
  getOppositeTheme,
  isDarkTheme,
  isLightTheme,
  getThemeColor,

  // Initialization
  initializeTheme,
  setupThemeManagement,

  // Constants
  THEME_MODES,
  THEME_STORAGE_KEY,
  THEME_CLASS_NAMES,
  DARK_MODE_MEDIA_QUERY,
};
