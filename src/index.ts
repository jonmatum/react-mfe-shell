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
export * from './types/polymorphic';

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
export { default as Input } from './components/atoms/Input';
export { default as Label } from './components/atoms/Label';
export { default as Icon } from './components/atoms/Icon';
export { default as Badge } from './components/atoms/Badge';
export { default as Avatar } from './components/atoms/Avatar';
export { default as Divider } from './components/atoms/Divider';
export { default as Text } from './components/atoms/Text';
export { default as LoadingSpinner } from './components/atoms/LoadingSpinner';
export { default as Switch } from './components/atoms/Switch';

// Molecules
export { default as Modal } from './components/molecules/Modal';
export { default as Card } from './components/molecules/Card';

// Form Molecules
export { default as FormField } from './components/molecules/FormField';
export { default as SearchBox } from './components/molecules/SearchBox';
export { default as Select } from './components/molecules/Select';
export { default as Checkbox } from './components/molecules/Checkbox';
export { default as Radio } from './components/molecules/Radio';
export { default as SwitchField } from './components/molecules/SwitchField';
export { default as Textarea } from './components/molecules/Textarea';
export { default as FileUpload } from './components/molecules/FileUpload';
