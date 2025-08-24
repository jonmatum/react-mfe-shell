/**
 * Shared Component Utilities
 * Eliminates duplication across components following DRY principles
 */

// =============================================================================
// SHARED CLASS GENERATORS
// =============================================================================

/**
 * Base interactive element classes
 * Used by Button, Badge, Input, etc.
 */
export const BASE_INTERACTIVE_CLASSES = 'inline-flex items-center justify-center transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';

/**
 * Base component classes for consistent styling
 */
export const BASE_COMPONENT_CLASSES = {
  rounded: {
    none: '',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full',
  },
  shadow: {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
  },
  border: {
    none: '',
    default: 'border',
    thick: 'border-2',
  },
};

// =============================================================================
// SEMANTIC COLOR UTILITIES
// =============================================================================

/**
 * Semantic color variants generator
 * Eliminates duplication across Badge, Button, Alert, etc.
 */
export const createSemanticColorVariant = (
  colorName: string,
  type: 'solid' | 'soft' | 'outline' | 'ghost' = 'soft'
) => {
  const baseColor = colorName === 'danger' ? 'error' : colorName;
  
  const variants = {
    solid: `bg-${baseColor}-600 text-white hover:bg-${baseColor}-700 dark:bg-${baseColor}-500 dark:hover:bg-${baseColor}-600`,
    soft: `bg-${baseColor}-50 text-${baseColor}-700 border border-${baseColor}-200 dark:bg-${baseColor}-900/30 dark:text-${baseColor}-300 dark:border-${baseColor}-700/50`,
    outline: `border border-${baseColor}-300 text-${baseColor}-700 hover:bg-${baseColor}-50 dark:border-${baseColor}-600 dark:text-${baseColor}-300 dark:hover:bg-${baseColor}-900/20`,
    ghost: `text-${baseColor}-700 hover:bg-${baseColor}-50 dark:text-${baseColor}-300 dark:hover:bg-${baseColor}-900/20`,
  };

  return variants[type];
};

/**
 * Focus ring generator for semantic colors
 */
export const createSemanticFocusRing = (colorName: string) => {
  const baseColor = colorName === 'danger' ? 'error' : colorName;
  return `focus:ring-${baseColor}-500 dark:focus:ring-${baseColor}-400`;
};

// =============================================================================
// SIZE UTILITIES
// =============================================================================

/**
 * Standard size mappings for consistent sizing across components
 */
export const SIZE_MAPPINGS = {
  padding: {
    xs: 'px-2 py-1',
    sm: 'px-2.5 py-1.5',
    md: 'px-3 py-2',
    lg: 'px-4 py-2.5',
    xl: 'px-6 py-3',
  },
  text: {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-sm',
    lg: 'text-base',
    xl: 'text-lg',
  },
  gap: {
    xs: 'gap-1',
    sm: 'gap-1.5',
    md: 'gap-2',
    lg: 'gap-2.5',
    xl: 'gap-3',
  },
  icon: {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-8 h-8',
  },
};

/**
 * Generate size classes for components
 */
export const createSizeClasses = (
  size: string,
  options: {
    includePadding?: boolean;
    includeText?: boolean;
    includeGap?: boolean;
    customPadding?: Record<string, string>;
    customText?: Record<string, string>;
  } = {}
) => {
  const {
    includePadding = true,
    includeText = true,
    includeGap = true,
    customPadding,
    customText,
  } = options;

  const classes: string[] = [];

  if (includePadding) {
    const paddingMap = customPadding || SIZE_MAPPINGS.padding;
    classes.push(paddingMap[size as keyof typeof paddingMap] || paddingMap.md);
  }

  if (includeText) {
    const textMap = customText || SIZE_MAPPINGS.text;
    classes.push(textMap[size as keyof typeof textMap] || textMap.md);
  }

  if (includeGap) {
    classes.push(SIZE_MAPPINGS.gap[size as keyof typeof SIZE_MAPPINGS.gap] || SIZE_MAPPINGS.gap.md);
  }

  return classes.join(' ');
};

// =============================================================================
// ACCESSIBILITY UTILITIES
// =============================================================================

/**
 * Generate consistent aria-label with fallbacks
 */
export const createAriaLabel = (
  children: React.ReactNode,
  options: {
    prefix?: string;
    suffix?: string;
    fallback?: string;
  } = {}
) => {
  const { prefix = '', suffix = '', fallback = 'Element' } = options;
  const text = typeof children === 'string' ? children : fallback;
  
  return [prefix, text, suffix].filter(Boolean).join(' ').trim();
};

/**
 * Generate ARIA attributes for interactive elements
 */
export const createAriaAttributes = (
  props: {
    disabled?: boolean;
    loading?: boolean;
    expanded?: boolean;
    selected?: boolean;
    label?: string;
    describedBy?: string;
  }
) => {
  const attributes: Record<string, string | boolean | undefined> = {};

  if (props.disabled) attributes['aria-disabled'] = true;
  if (props.loading) attributes['aria-busy'] = true;
  if (props.expanded !== undefined) attributes['aria-expanded'] = props.expanded;
  if (props.selected !== undefined) attributes['aria-selected'] = props.selected;
  if (props.label) attributes['aria-label'] = props.label;
  if (props.describedBy) attributes['aria-describedby'] = props.describedBy;

  return attributes;
};

// =============================================================================
// THEME UTILITIES
// =============================================================================

/**
 * Surface color variants for consistent theming
 */
export const SURFACE_VARIANTS = {
  primary: 'bg-surface-primary text-text-primary border-border-primary',
  secondary: 'bg-surface-secondary text-text-primary border-border-primary',
  tertiary: 'bg-surface-tertiary text-text-secondary border-border-secondary',
  elevated: 'bg-surface-elevated text-text-primary border-border-primary shadow-sm',
};

/**
 * Interactive state classes
 */
export const INTERACTIVE_STATES = {
  hover: 'hover:bg-surface-secondary',
  active: 'active:bg-surface-tertiary',
  focus: 'focus:ring-border-focus',
  disabled: 'disabled:opacity-50 disabled:cursor-not-allowed',
};

// =============================================================================
// VALIDATION UTILITIES
// =============================================================================

/**
 * Validation state classes
 */
export const VALIDATION_STATES = {
  default: '',
  valid: 'border-success-300 focus:border-success-500 focus:ring-success-500',
  invalid: 'border-error-300 focus:border-error-500 focus:ring-error-500',
  warning: 'border-warning-300 focus:border-warning-500 focus:ring-warning-500',
};

/**
 * Generate validation classes based on state
 */
export const createValidationClasses = (
  state: 'default' | 'valid' | 'invalid' | 'warning' = 'default'
) => {
  return VALIDATION_STATES[state];
};

// =============================================================================
// COMPOUND COMPONENT UTILITIES
// =============================================================================

/**
 * Create compound component with proper TypeScript support
 */
export const createCompoundComponent = <
  TMain extends React.ComponentType<any>,
  TCompounds extends Record<string, React.ComponentType<any>>
>(
  MainComponent: TMain,
  compounds: TCompounds,
  staticProps?: Record<string, any>
): TMain & TCompounds & typeof staticProps => {
  const CompoundComponent = MainComponent as any;

  // Attach compound components
  Object.entries(compounds).forEach(([key, component]) => {
    CompoundComponent[key] = component;
  });

  // Attach static properties
  if (staticProps) {
    Object.entries(staticProps).forEach(([key, value]) => {
      CompoundComponent[key] = value;
    });
  }

  return CompoundComponent;
};

// =============================================================================
// PERFORMANCE UTILITIES
// =============================================================================

/**
 * Memoized class name generator to prevent unnecessary re-renders
 */
const classNameCache = new Map<string, string>();

export const memoizedClassNames = (...classes: (string | undefined | null | false)[]): string => {
  const key = classes.join('|');
  
  if (classNameCache.has(key)) {
    return classNameCache.get(key)!;
  }

  const result = classes.filter(Boolean).join(' ');
  classNameCache.set(key, result);
  
  // Prevent memory leaks by limiting cache size
  if (classNameCache.size > 1000) {
    const firstKey = classNameCache.keys().next().value;
    classNameCache.delete(firstKey);
  }

  return result;
};
