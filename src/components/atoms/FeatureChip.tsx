import { forwardRef } from 'react';
import {
  FeatureChipProps,
  FEATURE_CHIP_VARIANTS,
  FEATURE_CHIP_SIZES,
} from '../../types';
import { classNames } from '../../utils';

// =============================================================================
// DRY UTILITIES - Shared across components
// =============================================================================

/**
 * Generates theme-aware variant classes for semantic colors
 * Eliminates duplication across color variants
 */
const createSemanticVariant = (colorName: string) => {
  const baseColor = colorName === 'danger' ? 'error' : colorName;
  return {
    background: `bg-${baseColor}-50 dark:bg-${baseColor}-900/30`,
    text: `text-${baseColor}-700 dark:text-${baseColor}-300`,
    icon: `text-${baseColor}-600 dark:text-${baseColor}-400`,
  };
};

/**
 * Generates size-based classes with conditional logic
 * Eliminates duplication in size mappings
 */
const createSizeClasses = (size: string) => {
  const sizeMap = {
    sm: {
      container: 'px-3 py-1.5 text-sm gap-2',
      icon: 'w-4 h-4',
    },
    md: {
      container: 'px-4 py-2 text-sm gap-2',
      icon: 'w-5 h-5',
    },
    lg: {
      container: 'px-5 py-2.5 text-base gap-2.5',
      icon: 'w-6 h-6',
    },
  };

  return sizeMap[size as keyof typeof sizeMap] || sizeMap.md;
};

/**
 * Generates accessible aria-label with consistent logic
 * Eliminates duplication in accessibility attributes
 */
const createAriaLabel = (
  children: React.ReactNode,
  fallback = 'Feature indicator'
) => {
  const text = typeof children === 'string' ? children : fallback;
  return text;
};

// =============================================================================
// COMPONENT IMPLEMENTATION
// =============================================================================

const FeatureChip = forwardRef<HTMLSpanElement, FeatureChipProps>(
  (
    {
      children,
      className,
      variant = 'default',
      size = 'md',
      icon,
      as: Component = 'span',
      ...props
    },
    ref
  ) => {
    // Base classes - shared foundation
    const baseClasses =
      'inline-flex items-center font-medium rounded-full transition-colors duration-200';

    // DRY variant classes using utility functions
    const variantStyles = {
      default: {
        background: 'bg-surface-secondary dark:bg-surface-tertiary',
        text: 'text-text-primary',
        icon: 'text-text-secondary',
      },
      primary: createSemanticVariant('primary'),
      secondary: {
        background: 'bg-surface-tertiary dark:bg-surface-secondary',
        text: 'text-text-secondary dark:text-text-primary',
        icon: 'text-text-tertiary dark:text-text-secondary',
      },
      success: createSemanticVariant('success'),
      warning: createSemanticVariant('warning'),
      danger: createSemanticVariant('danger'),
    };

    // DRY size classes using utility function
    const sizeConfig = createSizeClasses(size);

    // Get variant styling
    const currentVariant = variantStyles[variant];

    // DRY component props generation
    const getComponentProps = () => ({
      ref,
      className: classNames(
        baseClasses,
        currentVariant.background,
        currentVariant.text,
        sizeConfig.container,
        className
      ),
      role: 'status',
      'aria-label': createAriaLabel(children),
      ...props,
    });

    // Main component with icon and text handling
    return (
      <Component {...getComponentProps()}>
        {icon && (
          <span
            className={classNames(
              currentVariant.icon,
              sizeConfig.icon,
              'flex-shrink-0'
            )}
            aria-hidden='true'
          >
            {icon}
          </span>
        )}
        <span className='flex-shrink-0'>{children}</span>
      </Component>
    );
  }
);

FeatureChip.displayName = 'FeatureChip';

// Static properties
type FeatureChipWithStatics = typeof FeatureChip & {
  variants: typeof FEATURE_CHIP_VARIANTS;
  sizes: typeof FEATURE_CHIP_SIZES;
};

(FeatureChip as FeatureChipWithStatics).variants = FEATURE_CHIP_VARIANTS;
(FeatureChip as FeatureChipWithStatics).sizes = FEATURE_CHIP_SIZES;

export default FeatureChip;
