/**
 * Typography Utilities
 * DRY utilities for typography system
 */

import {
  TextVariant,
  TextSize,
  TextWeight,
  TextAlignment,
  TextTransform,
  TextDecoration,
  TextWhitespace,
  TextOverflow,
  LineClamp,
  ResponsiveTypographyValue,
  TypographyScale,
} from '../types';
import { classNames } from './index';

// =============================================================================
// TYPOGRAPHY VARIANT DEFINITIONS
// =============================================================================

/**
 * Typography variant configurations
 * Each variant defines semantic meaning and default styling
 */
export const typographyVariants: Record<
  TextVariant,
  {
    defaultSize: TextSize;
    defaultWeight: TextWeight;
    defaultColor: string;
    semanticElement?: string;
    description: string;
  }
> = {
  // Content variants
  body: {
    defaultSize: 'base',
    defaultWeight: 'normal',
    defaultColor: 'text-primary',
    semanticElement: 'p',
    description: 'Standard body text for content',
  },
  'body-large': {
    defaultSize: 'lg',
    defaultWeight: 'normal',
    defaultColor: 'text-primary',
    semanticElement: 'p',
    description: 'Larger body text for emphasis',
  },
  'body-small': {
    defaultSize: 'sm',
    defaultWeight: 'normal',
    defaultColor: 'text-primary',
    semanticElement: 'p',
    description: 'Smaller body text for secondary content',
  },
  caption: {
    defaultSize: 'sm',
    defaultWeight: 'normal',
    defaultColor: 'text-secondary',
    semanticElement: 'span',
    description: 'Captions and secondary information',
  },
  overline: {
    defaultSize: 'xs',
    defaultWeight: 'medium',
    defaultColor: 'text-secondary',
    semanticElement: 'span',
    description: 'Overline text with uppercase styling',
  },
  label: {
    defaultSize: 'sm',
    defaultWeight: 'medium',
    defaultColor: 'text-primary',
    semanticElement: 'label',
    description: 'Form labels and UI labels',
  },
  helper: {
    defaultSize: 'xs',
    defaultWeight: 'normal',
    defaultColor: 'text-secondary',
    semanticElement: 'span',
    description: 'Helper text and descriptions',
  },

  // Display variants
  display: {
    defaultSize: '6xl',
    defaultWeight: 'bold',
    defaultColor: 'text-primary',
    semanticElement: 'h1',
    description: 'Large display text for hero sections',
  },
  headline: {
    defaultSize: '4xl',
    defaultWeight: 'bold',
    defaultColor: 'text-primary',
    semanticElement: 'h1',
    description: 'Headlines and page titles',
  },
  title: {
    defaultSize: '2xl',
    defaultWeight: 'semibold',
    defaultColor: 'text-primary',
    semanticElement: 'h2',
    description: 'Section titles and headings',
  },
  subtitle: {
    defaultSize: 'lg',
    defaultWeight: 'medium',
    defaultColor: 'text-secondary',
    semanticElement: 'h3',
    description: 'Subtitles and subheadings',
  },

  // Specialized variants
  code: {
    defaultSize: 'sm',
    defaultWeight: 'normal',
    defaultColor: 'text-primary',
    semanticElement: 'code',
    description: 'Inline code and monospace text',
  },
  kbd: {
    defaultSize: 'xs',
    defaultWeight: 'medium',
    defaultColor: 'text-primary',
    semanticElement: 'kbd',
    description: 'Keyboard shortcuts and keys',
  },
  quote: {
    defaultSize: 'lg',
    defaultWeight: 'normal',
    defaultColor: 'text-secondary',
    semanticElement: 'blockquote',
    description: 'Quotes and testimonials',
  },
  lead: {
    defaultSize: 'xl',
    defaultWeight: 'normal',
    defaultColor: 'text-primary',
    semanticElement: 'p',
    description: 'Lead paragraphs and introductions',
  },
  muted: {
    defaultSize: 'base',
    defaultWeight: 'normal',
    defaultColor: 'text-tertiary',
    semanticElement: 'span',
    description: 'Muted text with reduced emphasis',
  },
};

// =============================================================================
// SIZE AND WEIGHT MAPPINGS
// =============================================================================

/**
 * Size class mappings
 */
export const sizeClasses: Record<TextSize, string> = {
  xs: 'text-xs',
  sm: 'text-sm',
  base: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl',
  '3xl': 'text-3xl',
  '4xl': 'text-4xl',
  '5xl': 'text-5xl',
  '6xl': 'text-6xl',
  '7xl': 'text-7xl',
  '8xl': 'text-8xl',
  '9xl': 'text-9xl',
};

/**
 * Weight class mappings
 */
export const weightClasses: Record<TextWeight, string> = {
  thin: 'font-thin',
  extralight: 'font-extralight',
  light: 'font-light',
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
  extrabold: 'font-extrabold',
  black: 'font-black',
};

/**
 * Alignment class mappings
 */
export const alignmentClasses: Record<TextAlignment, string> = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
  justify: 'text-justify',
  start: 'text-start',
  end: 'text-end',
};

/**
 * Transform class mappings
 */
export const transformClasses: Record<TextTransform, string> = {
  none: '',
  uppercase: 'uppercase',
  lowercase: 'lowercase',
  capitalize: 'capitalize',
};

/**
 * Decoration class mappings
 */
export const decorationClasses: Record<TextDecoration, string> = {
  none: 'no-underline',
  underline: 'underline',
  overline: 'overline',
  'line-through': 'line-through',
};

/**
 * Whitespace class mappings
 */
export const whitespaceClasses: Record<TextWhitespace, string> = {
  normal: 'whitespace-normal',
  nowrap: 'whitespace-nowrap',
  pre: 'whitespace-pre',
  'pre-line': 'whitespace-pre-line',
  'pre-wrap': 'whitespace-pre-wrap',
  'break-spaces': 'whitespace-break-spaces',
};

/**
 * Overflow class mappings
 */
export const overflowClasses: Record<TextOverflow, string> = {
  visible: 'overflow-visible',
  hidden: 'overflow-hidden',
  clip: 'text-clip',
  ellipsis: 'text-ellipsis',
};

/**
 * Line height class mappings
 */
export const leadingClasses = {
  none: 'leading-none',
  tight: 'leading-tight',
  snug: 'leading-snug',
  normal: 'leading-normal',
  relaxed: 'leading-relaxed',
  loose: 'leading-loose',
};

/**
 * Letter spacing class mappings
 */
export const trackingClasses = {
  tighter: 'tracking-tighter',
  tight: 'tracking-tight',
  normal: 'tracking-normal',
  wide: 'tracking-wide',
  wider: 'tracking-wider',
  widest: 'tracking-widest',
};

/**
 * Line clamp class mappings
 */
export const lineClampClasses: Record<LineClamp, string> = {
  1: 'line-clamp-1',
  2: 'line-clamp-2',
  3: 'line-clamp-3',
  4: 'line-clamp-4',
  5: 'line-clamp-5',
  6: 'line-clamp-6',
};

// =============================================================================
// RESPONSIVE UTILITIES
// =============================================================================

/**
 * Generate responsive classes for a property
 */
export function generateResponsiveClasses<T>(
  value: ResponsiveTypographyValue<T>,
  classMap: Record<string, string>
): string[] {
  if (typeof value === 'string' || typeof value === 'number') {
    const className = classMap[value as string];
    return className ? [className] : [];
  }

  if (typeof value === 'object' && value !== null) {
    const classes: string[] = [];

    // Add base class (no breakpoint prefix)
    if ('base' in value && value.base) {
      const className = classMap[value.base as string];
      if (className) classes.push(className);
    }

    // Add responsive classes
    Object.entries(value).forEach(([breakpoint, val]) => {
      if (breakpoint !== 'base' && val) {
        const className = classMap[val as string];
        if (className) {
          const responsiveClass =
            breakpoint === 'xs' ? className : `${breakpoint}:${className}`;
          classes.push(responsiveClass);
        }
      }
    });

    return classes;
  }

  return [];
}

// =============================================================================
// TYPOGRAPHY SCALES
// =============================================================================

/**
 * Predefined typography scales
 */
export const typographyScales: Record<string, TypographyScale> = {
  default: {
    name: 'Default Scale',
    sizes: {
      xs: { fontSize: '0.75rem', lineHeight: '1rem' },
      sm: { fontSize: '0.875rem', lineHeight: '1.25rem' },
      base: { fontSize: '1rem', lineHeight: '1.5rem' },
      lg: { fontSize: '1.125rem', lineHeight: '1.75rem' },
      xl: { fontSize: '1.25rem', lineHeight: '1.75rem' },
      '2xl': { fontSize: '1.5rem', lineHeight: '2rem' },
      '3xl': { fontSize: '1.875rem', lineHeight: '2.25rem' },
      '4xl': { fontSize: '2.25rem', lineHeight: '2.5rem' },
      '5xl': { fontSize: '3rem', lineHeight: '1' },
      '6xl': { fontSize: '3.75rem', lineHeight: '1' },
      '7xl': { fontSize: '4.5rem', lineHeight: '1' },
      '8xl': { fontSize: '6rem', lineHeight: '1' },
      '9xl': { fontSize: '8rem', lineHeight: '1' },
    },
    weights: {
      thin: '100',
      extralight: '200',
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
      black: '900',
    },
  },

  compact: {
    name: 'Compact Scale',
    sizes: {
      xs: { fontSize: '0.625rem', lineHeight: '0.875rem' },
      sm: { fontSize: '0.75rem', lineHeight: '1rem' },
      base: { fontSize: '0.875rem', lineHeight: '1.25rem' },
      lg: { fontSize: '1rem', lineHeight: '1.5rem' },
      xl: { fontSize: '1.125rem', lineHeight: '1.5rem' },
      '2xl': { fontSize: '1.25rem', lineHeight: '1.75rem' },
      '3xl': { fontSize: '1.5rem', lineHeight: '2rem' },
      '4xl': { fontSize: '1.875rem', lineHeight: '2.25rem' },
      '5xl': { fontSize: '2.25rem', lineHeight: '2.5rem' },
      '6xl': { fontSize: '3rem', lineHeight: '1' },
      '7xl': { fontSize: '3.75rem', lineHeight: '1' },
      '8xl': { fontSize: '4.5rem', lineHeight: '1' },
      '9xl': { fontSize: '6rem', lineHeight: '1' },
    },
    weights: {
      thin: '100',
      extralight: '200',
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
      black: '900',
    },
  },

  generous: {
    name: 'Generous Scale',
    sizes: {
      xs: { fontSize: '0.875rem', lineHeight: '1.25rem' },
      sm: { fontSize: '1rem', lineHeight: '1.5rem' },
      base: { fontSize: '1.125rem', lineHeight: '1.75rem' },
      lg: { fontSize: '1.25rem', lineHeight: '1.875rem' },
      xl: { fontSize: '1.5rem', lineHeight: '2rem' },
      '2xl': { fontSize: '1.875rem', lineHeight: '2.25rem' },
      '3xl': { fontSize: '2.25rem', lineHeight: '2.5rem' },
      '4xl': { fontSize: '3rem', lineHeight: '1.2' },
      '5xl': { fontSize: '3.75rem', lineHeight: '1.1' },
      '6xl': { fontSize: '4.5rem', lineHeight: '1' },
      '7xl': { fontSize: '6rem', lineHeight: '1' },
      '8xl': { fontSize: '8rem', lineHeight: '1' },
      '9xl': { fontSize: '10rem', lineHeight: '1' },
    },
    weights: {
      thin: '100',
      extralight: '200',
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
      black: '900',
    },
  },
};

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

/**
 * Get variant configuration
 */
export function getVariantConfig(variant: TextVariant) {
  const config = typographyVariants[variant];

  if (!config && process.env.NODE_ENV === 'development') {
    console.warn(
      `Invalid typography variant: ${variant}. Falling back to 'body' variant.`
    );
    return typographyVariants.body;
  }

  return config || typographyVariants.body;
}

/**
 * Get semantic element for variant
 */
export function getSemanticElement(
  variant: TextVariant,
  as?: React.ElementType
): React.ElementType {
  if (as) return as;
  const variantConfig = typographyVariants[variant];
  if (!variantConfig) return 'span';
  const semanticElement = variantConfig.semanticElement;
  return (semanticElement as React.ElementType) || 'span';
}

/**
 * Generate typography classes
 */
export function generateTypographyClasses({
  variant = 'body',
  size,
  weight,
  align,
  transform,
  decoration,
  whitespace,
  overflow,
  leading,
  tracking,
  lineClamp,
  truncate,
  color,
  gradient,
  selectable,
}: Partial<{
  variant: TextVariant;
  size: ResponsiveTypographyValue<TextSize>;
  weight: ResponsiveTypographyValue<TextWeight>;
  align: ResponsiveTypographyValue<TextAlignment>;
  transform: TextTransform;
  decoration: TextDecoration;
  whitespace: TextWhitespace;
  overflow: TextOverflow;
  leading: keyof typeof leadingClasses;
  tracking: keyof typeof trackingClasses;
  lineClamp: LineClamp;
  truncate: boolean;
  color: string;
  gradient: boolean;
  selectable: boolean;
}>): string {
  const variantConfig = getVariantConfig(variant);
  const classes: string[] = [];

  // Variant-specific classes
  if (variant === 'overline') {
    classes.push('uppercase', 'tracking-wide');
  }

  if (variant === 'code') {
    classes.push('font-mono');
  }

  if (variant === 'kbd') {
    classes.push(
      'font-mono',
      'px-1.5',
      'py-0.5',
      'text-xs',
      'bg-surface-secondary',
      'border',
      'border-border-primary',
      'rounded'
    );
  }

  if (variant === 'quote') {
    classes.push('italic', 'border-l-4', 'border-border-primary', 'pl-4');
  }

  // Size classes
  if (size) {
    classes.push(...generateResponsiveClasses(size, sizeClasses));
  } else {
    classes.push(sizeClasses[variantConfig.defaultSize]);
  }

  // Weight classes
  if (weight) {
    classes.push(...generateResponsiveClasses(weight, weightClasses));
  } else {
    classes.push(weightClasses[variantConfig.defaultWeight]);
  }

  // Alignment classes
  if (align) {
    classes.push(...generateResponsiveClasses(align, alignmentClasses));
  }

  // Transform classes
  if (transform && transform !== 'none') {
    classes.push(transformClasses[transform]);
  }

  // Decoration classes
  if (decoration && decoration !== 'none') {
    classes.push(decorationClasses[decoration]);
  }

  // Whitespace classes
  if (whitespace && whitespace !== 'normal') {
    classes.push(whitespaceClasses[whitespace]);
  }

  // Overflow classes
  if (overflow && overflow !== 'visible') {
    classes.push(overflowClasses[overflow]);
  }

  // Leading classes
  if (leading && leading !== 'normal') {
    classes.push(leadingClasses[leading]);
  }

  // Tracking classes
  if (tracking && tracking !== 'normal') {
    classes.push(trackingClasses[tracking]);
  }

  // Line clamp
  if (lineClamp) {
    classes.push(lineClampClasses[lineClamp]);
  }

  // Truncation
  if (truncate) {
    classes.push('truncate');
  }

  // Color
  if (color && (color.startsWith('text-') || color.startsWith('bg-'))) {
    classes.push(color);
  } else {
    classes.push(variantConfig.defaultColor);
  }

  // Gradient text
  if (gradient) {
    classes.push('bg-gradient-to-r', 'bg-clip-text', 'text-transparent');
  }

  // Selectability
  if (selectable === false) {
    classes.push('select-none');
  } else if (selectable === true) {
    classes.push('select-text');
  }

  return classNames(...classes);
}

/**
 * Generate heading level classes
 */
export function generateHeadingClasses(level: 1 | 2 | 3 | 4 | 5 | 6): {
  defaultSize: TextSize;
  defaultWeight: TextWeight;
} {
  const headingMap = {
    1: { defaultSize: '4xl' as TextSize, defaultWeight: 'bold' as TextWeight },
    2: { defaultSize: '3xl' as TextSize, defaultWeight: 'bold' as TextWeight },
    3: {
      defaultSize: '2xl' as TextSize,
      defaultWeight: 'semibold' as TextWeight,
    },
    4: {
      defaultSize: 'xl' as TextSize,
      defaultWeight: 'semibold' as TextWeight,
    },
    5: { defaultSize: 'lg' as TextSize, defaultWeight: 'medium' as TextWeight },
    6: {
      defaultSize: 'base' as TextSize,
      defaultWeight: 'medium' as TextWeight,
    },
  };

  return headingMap[level];
}

/**
 * Validate typography props
 */
export function validateTypographyProps(props: Record<string, any>): string[] {
  const errors: string[] = [];

  if (props.variant && !(props.variant in typographyVariants)) {
    errors.push(`Invalid variant: ${props.variant}`);
  }

  if (
    props.size &&
    typeof props.size === 'string' &&
    !(props.size in sizeClasses)
  ) {
    errors.push(`Invalid size: ${props.size}`);
  }

  if (
    props.weight &&
    typeof props.weight === 'string' &&
    !(props.weight in weightClasses)
  ) {
    errors.push(`Invalid weight: ${props.weight}`);
  }

  return errors;
}
