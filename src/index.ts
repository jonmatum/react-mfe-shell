/**
 * React MFE Shell - Main Entry Point
 * Exports all components, utilities, types, and design tokens
 */

// =============================================================================
// DESIGN TOKENS & THEME SYSTEM
// =============================================================================

// Complete design token system
export { default as tokens } from './utils/tokens';
export * from './utils/tokens';

// Theme management utilities
export * from './utils/theme';

// Legacy token exports (for backward compatibility)
export {
  colors,
  spacing,
  typography,
  borderRadius,
  shadows,
  breakpoints,
  transitions,
  zIndex,
} from './utils/tokens';

// =============================================================================
// TYPES
// =============================================================================

export * from './types';

// =============================================================================
// UTILITIES
// =============================================================================

export * from './utils';

// =============================================================================
// CONTEXTS & PROVIDERS
// =============================================================================

export { SettingsProvider, useSettings } from './contexts/SettingsContext';

// =============================================================================
// COMPONENTS
// =============================================================================

// Atoms
export { default as Button } from './components/atoms/Button';
export { default as LoadingSpinner } from './components/atoms/LoadingSpinner';
export { default as Switch } from './components/atoms/Switch';
export { default as Input } from './components/atoms/Input';
export { default as Badge } from './components/atoms/Badge';

// Molecules
export { default as Modal } from './components/molecules/Modal';
export { default as Card } from './components/molecules/Card';
