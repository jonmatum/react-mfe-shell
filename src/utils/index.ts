// Utility functions for MFE Shell

/**
 * Combines CSS class names, filtering out falsy values
 * Optimized for performance with early returns
 */
export function classNames(
  ...classes: (string | undefined | null | false)[]
): string {
  if (classes.length === 0) return '';
  if (classes.length === 1) return classes[0] || '';

  return classes.filter(Boolean).join(' ');
}

/**
 * Local storage utilities with error handling
 * Note: Caching removed to avoid test interference
 */
export const storage = {
  get: <T>(key: string, defaultValue: T): T => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch {
      return defaultValue;
    }
  },

  set: <T>(key: string, value: T): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Silently fail if localStorage is not available
    }
  },

  remove: (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch {
      // Silently fail if localStorage is not available
    }
  },

  clear: (): void => {
    try {
      localStorage.clear();
    } catch {
      // Silently fail if localStorage is not available
    }
  },
};

/**
 * Theme utilities with caching for performance
 */
let systemThemeCache: 'light' | 'dark' | null = null;
let mediaQueryListener: ((e: MediaQueryListEvent) => void) | null = null;

export const theme = {
  /**
   * Gets the system theme preference with caching
   */
  getSystemTheme: (): 'light' | 'dark' => {
    if (typeof window === 'undefined') return 'light';

    if (systemThemeCache === null) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      systemThemeCache = mediaQuery.matches ? 'dark' : 'light';

      // Set up listener to update cache when system theme changes
      if (!mediaQueryListener && mediaQuery.addEventListener) {
        mediaQueryListener = e => {
          systemThemeCache = e.matches ? 'dark' : 'light';
        };
        mediaQuery.addEventListener('change', mediaQueryListener);
      }
    }

    return systemThemeCache;
  },

  /**
   * Applies theme to document with performance optimization
   */
  applyTheme: (themeName: 'light' | 'dark' | 'system'): void => {
    if (typeof document === 'undefined') return;

    const actualTheme =
      themeName === 'system' ? theme.getSystemTheme() : themeName;
    const { classList } = document.documentElement;

    // Only update if theme actually changed
    if (classList && classList.contains) {
      const currentTheme = classList.contains('dark') ? 'dark' : 'light';
      if (currentTheme !== actualTheme) {
        classList.remove('light', 'dark');
        classList.add(actualTheme);
      }
    } else {
      // Fallback for test environments
      classList.remove('light', 'dark');
      classList.add(actualTheme);
    }
  },

  /**
   * Clear theme cache (useful for testing)
   */
  clearCache: (): void => {
    systemThemeCache = null;
    if (mediaQueryListener && typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', mediaQueryListener);
      }
      mediaQueryListener = null;
    }
  },
};

/**
 * Debounce function for performance optimization
 * Uses WeakMap for cleanup to prevent memory leaks
 */
const debounceTimers = new WeakMap<
  (...args: unknown[]) => unknown,
  NodeJS.Timeout
>();

export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  return (...args: Parameters<T>) => {
    const existingTimer = debounceTimers.get(func);
    if (existingTimer) {
      clearTimeout(existingTimer);
    }

    const timer = setTimeout(() => {
      debounceTimers.delete(func);
      func(...args);
    }, wait);

    debounceTimers.set(func, timer);
  };
}

/**
 * Throttle function for performance optimization
 */
const throttleTimers = new WeakMap<
  (...args: unknown[]) => unknown,
  { timer: NodeJS.Timeout | null; lastRun: number }
>();

export function throttle<T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  return (...args: Parameters<T>) => {
    const now = Date.now();
    const throttleData = throttleTimers.get(func) || {
      timer: null,
      lastRun: 0,
    };

    if (now - throttleData.lastRun >= limit) {
      func(...args);
      throttleData.lastRun = now;
    } else if (!throttleData.timer) {
      throttleData.timer = setTimeout(
        () => {
          func(...args);
          throttleData.lastRun = Date.now();
          throttleData.timer = null;
        },
        limit - (now - throttleData.lastRun)
      );
    }

    throttleTimers.set(func, throttleData);
  };
}

/**
 * Generate unique IDs with better entropy
 */
let idCounter = 0;
export function generateId(prefix = 'id'): string {
  return `${prefix}-${++idCounter}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Format numbers with proper locale and caching
 */
const numberFormatters = new Map<string, Intl.NumberFormat>();

export function formatNumber(num: number, locale = 'en-US'): string {
  if (!numberFormatters.has(locale)) {
    numberFormatters.set(locale, new Intl.NumberFormat(locale));
  }
  return numberFormatters.get(locale)!.format(num);
}

/**
 * Truncate text with ellipsis (optimized)
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3) + '...';
}

/**
 * Deep merge objects (useful for settings)
 */
export function deepMerge<T extends Record<string, unknown>>(
  target: T,
  ...sources: Partial<T>[]
): T {
  if (!sources.length) return target;
  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        deepMerge(
          target[key] as Record<string, unknown>,
          source[key] as Record<string, unknown>
        );
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }

  return deepMerge(target, ...sources);
}

/**
 * Check if value is an object
 */
function isObject(item: unknown): item is Record<string, unknown> {
  return item !== null && typeof item === 'object' && !Array.isArray(item);
}

/**
 * Clamp a number between min and max values
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Check if code is running in browser environment
 */
export const isBrowser = typeof window !== 'undefined';

/**
 * Check if user prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
  if (!isBrowser) return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// Export form utilities
export * from './form';
